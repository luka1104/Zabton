import React, { useState, useEffect, useContext, useRef } from 'react'
import { Box, Center, Button, Icon, Modal, ModalOverlay, ModalContent, ModalBody, Text, Image, useDisclosure, theme } from '@chakra-ui/react'
import { BsFacebook, BsTelegram } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { AccountContext } from 'contexts/account'
import { calcTime } from 'utils'
import { useRouter } from 'next/router'
import PacmanLoader from "react-spinners/PacmanLoader"
import { transfer } from 'utils/transferToken'
import ProgressBar from '@ramonak/react-progress-bar'
import { expRequired } from 'constants/index'
import { Theme } from 'interfaces'

interface Props {
  selectedType: number
  image?: Blob
  contents?: string
  deadline: number
  theme: Theme
}

const Complete: React.FC<Props> = ({ selectedType, image, contents, deadline, theme }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const finalRef = useRef(null)
  const { user } = useContext(AccountContext)
  const [preview, setPreview] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isFinish, setIsFinish] = useState(false)
  const [exp, setExp] = useState<number>(user.exp)

  const calcDeadline = (deadline: number) => {
    var time = new Date
    switch (deadline) {
      case 1:
        time.setHours(time.getHours() + 1)
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
    transfer(user, 2, `お題${selectedType === 2 ? `『${contents}}』` : ''}を投稿した報酬として2ZBTN受け取りました。`, setLoading, setIsFinish)
  }, [])

  useEffect(() => {
    if(isFinish)  {
      onOpen()
      setInterval(setExp, 500, user.exp + 10)
    }
  }, [isFinish])

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
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay backdropFilter='blur(5px)' />
          <ModalContent bg='white' border='1px solid black' w='90%' h='320px' borderRadius='0' top='100px'>
            <ModalBody paddingInline='0'>
              <Box mt='20px'>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px'>
                  10EXPが付与されました！！
                </Text>
                <Center w='100%' mt='40px' mb='20px'>
                  <ProgressBar
                    //@ts-ignore
                    width={window.innerWidth * 0.5}
                    height='35px'
                    completed={exp}
                    maxCompleted={expRequired[user.level]}
                    labelAlignment='outside'
                    labelColor='black'
                    customLabel={`${exp} EXP`}
                    bgColor='#F345BE'
                    baseBgColor='#F5C9E6'
                  />
                </Center>
                <Center color='black' fontWeight='bold'>
                  レベルアップまで：{expRequired[user.level] - exp}
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
                    onClick={onClose}
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
              <Center w='100%' h='100%' position='relative'>
                <Image
                  src={preview ? preview : 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=82a1493bfjwdf7s60z91zdcn2shhelixehwbsbke650n3kxp&rid=200w.gif&ct=g'}
                  alt="preview"
                  maxH={window.innerWidth * 0.99}
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
                  src={preview ? preview : 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=82a1493bfjwdf7s60z91zdcn2shhelixehwbsbke650n3kxp&rid=200w.gif&ct=g'}
                  alt="preview"
                  maxH={window.innerWidth * 0.85}
                />
              </Center>
              <Box
                w='100%'
                h='100%'
                p='5%'
                color='black'
                fontWeight='bold'
                fontSize='25px'
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
          Let&apos;s Share!
        </Center>
        <Center gap='2'>
          <Icon as={BsFacebook} fontSize='40px' color='#1977F2' />
          <Icon as={AiFillTwitterCircle} fontSize='46px' color='#1C9BF0' onClick={() => {router.push(`http://twitter.com/share?url=https://zabton.vercel.app/answer/create?id=${theme.id}`)}} />
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
            onClick={() => {router.reload()}}
          >
            続けてお題を投稿する
          </Button>
        </Center>
      </Box>
    </>
  )
}

export default Complete
