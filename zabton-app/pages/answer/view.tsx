import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'
import { Box, Center, Button, Icon, Modal, ModalOverlay, ModalContent, ModalBody, Text, Image } from '@chakra-ui/react'
import { BsFacebook, BsTelegram } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { AccountContext } from 'contexts/account'
import { transfer } from 'utils/transferToken'
import { useRouter } from 'next/router'
import PacmanLoader from "react-spinners/PacmanLoader"
import axios from 'axios'
import { Theme, Answer } from 'interfaces'
import { getStorageFileURL } from 'supabase/storage'
import { prizeAmount } from 'constants/index'
import { toast } from 'react-toastify'
import type { GetServerSideProps } from "next";
import prisma from 'lib/prisma'

type Props = {
  theme: Theme
  answer: Answer
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const id = JSON.parse(context.query.id as string);
  const themeId = JSON.parse(context.query.themeId as string);
  const answerRaw = await prisma.answer.findUnique({
    where: {
      id: id,
    },
  });
  const answer = JSON.parse(JSON.stringify(answerRaw));
  const themeRaw = await prisma.theme.findUnique({
    where: {
      id: themeId,
    },
  });
  const theme = JSON.parse(JSON.stringify(themeRaw));
  return {
    props: {
      theme,
      answer,
    },
  };
}

interface PropTypes {
  theme: Theme
  answer: Answer
}

const View: React.FC<PropTypes> = ({ theme, answer }) => {
  const router = useRouter()
  const finalRef = useRef(null)
  const { user } = useContext(AccountContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [zbtnLoading, setZbtnLoading] = useState<boolean>(false)
  const [mintLoading, setMintLoading] = useState<boolean>(false)
  const [imagePath, setImagePath] = useState<string>('')
  const [date, setDate] = useState<Date>()
  const [place, setPlace] = useState<number>()

  const handleRenderImage = useCallback(async () => {
    if (!theme.imagePath) return;
    const path = await getStorageFileURL({
      bucketName: "themeimage",
      pathName: theme.imagePath,
    });
    if (!path) return;
    setImagePath(path);
  }, []);

  const checkResult = async () => {
    if(answer.place) return
    setLoading(true)
    const data = {
      'themeId': theme.id,
      'answerId': answer.id,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    return new Promise((resolve, reject) => {
      axios.post('/api/collectResult', data, config)
      .then(response => {
        if(response.status !== 200) throw Error("Server error")
        resolve(response)
        setPlace(response.data.place)
        setLoading(false)
      })
      .catch(e => {
        reject(e);
        throw Error("Server error:" + e)
      })
    })
  }

  const handleMint = async () => {
    setMintLoading(true)
    const data = {
      'address': user.address,
      'theme': theme,
      'answer': answer,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    return new Promise((resolve, reject) => {
      axios.post('/api/tokens/mintBFT', data, config)
      .then(response => {
        if(response.status !== 200) throw Error("Server error")
        resolve(response)
        console.log(response.data.hash);
        setMintLoading(false)
        toast('NFTが発行されました！')
      })
      .catch(e => {
        reject(e);
        throw Error("Server error:" + e)
      })
    })
  }

  useEffect(() => {
    if(theme.type === 2) return
    console.log(theme);
    handleRenderImage()
  }, [theme])

  useEffect(() => {
    checkResult()
    const deadlineDate = new Date(theme.deadline)
    setDate(deadlineDate)
  }, [answer])

  // useEffect(() => {
  //   if(!place) return
  //   setZbtnLoading(true)
  //   transfer(user.address, prizeAmount[place -1], setZbtnLoading)
  // }, [place])

  return (
    <>
      <Box ref={finalRef} pt='60px'>
        <Modal finalFocusRef={finalRef} isOpen={loading} onClose={() => {setLoading(false)}}>
          <ModalOverlay backdropFilter='blur(5px)' />
          <ModalContent bg='white' border='1px solid black' w='90%' h='350px' borderRadius='0' top='100px'>
            <ModalBody paddingInline='0'>
              <Box mt='20px'>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px'>
                  結果を集計しています！
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
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal finalFocusRef={finalRef} isOpen={zbtnLoading} onClose={() => {setZbtnLoading(false)}}>
          <ModalOverlay backdropFilter='blur(5px)' />
          <ModalContent bg='white' border='1px solid black' w='90%' h='400px' borderRadius='0' top='100px'>
            <ModalBody paddingInline='0'>
              <Box mt='20px'>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px'>
                  {place}位だったので{prizeAmount[place -1]}ZBTN付与！
                  ZBTNを用意しています！
                </Text>
                <Center w='80%' mt='40px' mb='40px'>
                  <PacmanLoader
                    color='#F345BE'
                    loading={zbtnLoading}
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
                    onClick={() => {setZbtnLoading(false)}}
                  >
                    閉じる
                  </Button>
                </Center>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal finalFocusRef={finalRef} isOpen={mintLoading} onClose={() => {setMintLoading(false)}}>
          <ModalOverlay backdropFilter='blur(5px)' />
          <ModalContent bg='white' border='1px solid black' w='90%' h='350px' borderRadius='0' top='100px'>
            <ModalBody paddingInline='0'>
              <Box mt='20px'>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px'>
                  NFTを発行しています！
                </Text>
                <Center w='80%' mt='40px' mb='40px'>
                  <PacmanLoader
                    color='#F345BE'
                    loading={mintLoading}
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
                    onClick={() => {setMintLoading(false)}}
                  >
                    閉じる
                  </Button>
                </Center>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box pt='20px'>
          {theme.type === 1 ? (
            <>
              <Box w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black'>
                <Center w='100%' h='100%' position='relative'>
                  <Image
                    src={imagePath ? imagePath : 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=82a1493bfjwdf7s60z91zdcn2shhelixehwbsbke650n3kxp&rid=200w.gif&ct=g'}
                    alt="preview"
                    maxH={window.innerWidth * 0.99}
                  />
                </Center>
              </Box>
            </>
          ) : theme.type === 2 ? (
            <>
              <Box w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black' >
                <Center w='100%' h='100%' fontWeight='bold' fontSize='30px' textAlign='center' color='black'>
                  {theme.contents}
                </Center>
              </Box>
            </>
          ) : (
            <>
              <Box position='relative' w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black'>
                <Center>
                  <Image
                    src={imagePath ? imagePath : 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=82a1493bfjwdf7s60z91zdcn2shhelixehwbsbke650n3kxp&rid=200w.gif&ct=g'}
                    alt="preview"
                    maxH={window.innerWidth * 0.85}
                  />
                </Center>
                <Box
                  w='100%'
                  h='100%'
                  p='5px'
                  color='black'
                  fontWeight='bold'
                  fontSize='19px'
                  textAlign='center'
                  position='absolute'
                >
                  {theme.contents}
                </Box>
              </Box>
            </>
          )}
        </Box>
        <Text
          mt='10px'
          w={window.innerWidth}
          h='80px'
          color='black'
          borderRadius='0'
          fontSize='30px'
          textAlign='center'
          fontWeight='bold'
        >
          {answer.contents}
        </Text>
        <Center color='black' mt='5px' fontWeight='bold' fontSize='12px'>
          {answer.place ? answer.place : place}位｜ {`${date?.getFullYear()}.${date?.getMonth()}.${date?.getDay()}`}
        </Center>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='25px'>
          Let&apos;s Share!
        </Center>
        <Center gap='2'>
          <Icon as={BsFacebook} fontSize='40px' color='#1977F2' />
          <Icon as={AiFillTwitterCircle} fontSize='46px' color='#1C9BF0' />
          <Icon as={BsTelegram} fontSize='40px' color='#26A4E2' />
        </Center>
        <Center pt='20px' gap='5'>
          <Button w='80%' h='60px' fontSize='20px' color='black' bg='#F5F5F5' border='1px solid black' borderRadius='30px' onClick={() => {router.push('/')}}>
            戻る
          </Button>
        </Center>
      </Box>
    </>
  )
}

export default View
