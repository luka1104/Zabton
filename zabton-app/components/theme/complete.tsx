import React, { useState, useEffect, useContext, useRef } from 'react'
import Image from 'next/image'
import { Box, Center, Button, Icon, Modal, ModalOverlay, ModalContent, ModalBody, Text } from '@chakra-ui/react'
import { BsFacebook, BsTelegram } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { AccountContext } from 'contexts/account'
import { calcTime } from 'utils'
import { useRouter } from 'next/router'
import axios from 'axios'
import PacmanLoader from "react-spinners/PacmanLoader"
import { toast } from 'react-toastify'

interface Props {
  selectedType: number
  image?: Blob
  contents?: string
  deadline: number
}

const Complete: React.FC<Props> = ({ selectedType, image, contents, deadline }) => {
  const router = useRouter()
  const finalRef = useRef(null)
  const { user } = useContext(AccountContext)
  const [preview, setPreview] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const transfer = async (address: string, amount: number) => {
    const data = {
      'address': address,
      'amount': amount * (10 ** 8),
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(data)
    return new Promise((resolve, reject) => {
      axios.post('/api/tokens/transfer', data, config)
      .then(response => {
        if(response.status !== 200) throw Error("Server error")
        resolve(response)
        console.log(response.data.hash);
        setLoading(false)
        toast('ZBTNが付与されました！')
      })
      .catch(e => {
        // エラー解決必須　useEffect経由での発火が問題？
        console.log(e);
      })
    })
  }


  const calcDeadline = (deadline: number) => {
    var time = new Date
    switch (deadline) {
      case 1:
        time.setHours(time.getHours() + 3)
        break;
      case 2:
        time.setDate(time.getDate() + 1)
        break;
      case 3:
        time.setDate(time.getDate() + 3)
        break;
      case 4:
        time.setDate(time.getDate() + 7)
        break;
      default:
        time
    }
    return time
  }

  useEffect(() => {
    if(!image) return
    setPreview(window.URL.createObjectURL(image))
  }, [image])

  useEffect(() => {
    setLoading(true)
    transfer(user.address, 2)
  }, [])

  return (
    <>
      <Box pt='80px' ref={finalRef}>
        <Modal finalFocusRef={finalRef} isOpen={loading} onClose={() => {setLoading(false)}}>
          <ModalOverlay backdropFilter='blur(5px)' />
          <ModalContent bg='white' border='1px solid black' w='90%' h='350px' borderRadius='0' top='100px'>
            <ModalBody paddingInline='0'>
              <Box mt='20px'>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px'>
                  ZBTNを用意しています！
                </Text>
                <Center w='80%' mt='40px' mb='40px'>
                  <PacmanLoader
                    color='#F345BE'
                    loading={loading}
                    // cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </Center>
                <Center>
                  <Button
                    mt='50px'
                    color='black'
                    bg='white'
                    border='1px solid black'
                    borderRadius='30px'
                    w='90%'
                    h='60px'
                    fontSize='xl'
                    mb='30px'
                    onClick={() => {setLoading(false)}}
                  >
                    閉じる
                  </Button>
                </Center>
              </Box>
              <Center mt='60px' gap='10'>

              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
        {selectedType === 1 ? (
          <>
            <Box w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black'>
              <Center w='100%' h='100%'>
                <Image
                  src={preview}
                  alt="preview"
                  width={window.innerWidth}
                  height={window.innerWidth}
                />
              </Center>
            </Box>
          </>
        ) : selectedType === 2 ? (
          <>
            <Box w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black' >
              <Center w='100%' h='100%' fontWeight='bold' fontSize='30px' textAlign='center' color='black'>
                {contents}
              </Center>
            </Box>
          </>
        ) : (
          <>
            <Box position='relative' w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black'>
              <Center>
                <Image
                  src={preview}
                  alt="preview"
                  width={window.innerWidth * 0.8}
                  height={window.innerWidth * 0.8}
                />
              </Center>
              <Box
                w='100%'
                h='100%'
                p='5%'
                color='black'
                fontWeight='bold'
                fontSize='19px'
                textAlign='center'
                position='absolute'
              >
                {contents}
              </Box>
            </Box>
          </>
        )}
        <Center color='black' mt='5px' fontWeight='bold' fontSize='12px'>
          ボケ募集中｜回答期限　残り{calcTime(calcDeadline(deadline))}時間
        </Center>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='25px'>
          Let's Share!
        </Center>
        <Center gap='2'>
          <Icon as={BsFacebook} fontSize='40px' color='#1977F2' />
          <Icon as={AiFillTwitterCircle} fontSize='46px' color='#1C9BF0' />
          <Icon as={BsTelegram} fontSize='40px' color='#26A4E2' />
        </Center>
        <Center>
          <Button
            mt='50px'
            color='black'
            bg='white'
            border='1px solid black'
            borderRadius='30px'
            w='90%'
            h='60px'
            fontSize='xl'
            mb='30px'
            onClick={() => {router.push('/theme/create')}}
          >
            続けてお題を投稿する
          </Button>
        </Center>
      </Box>
    </>
  )
}

export default Complete
