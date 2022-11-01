import { NextPage } from 'next'
import React, { useContext, useState, useRef } from 'react'
import { Box, Center, Button, Text, Input, Link, Flex, Icon, Image, useDisclosure } from '@chakra-ui/react'
import { AccountContext } from 'contexts/account'
import axios from 'axios'
import { CiBellOn } from 'react-icons/ci'
import { IoSettingsOutline } from 'react-icons/io5'
import ProgressBar from "@ramonak/react-progress-bar";
import { useRouter } from 'next/router'

const Auth: NextPage = () => {
  const router = useRouter()
  const { login, logout, address, user, loading } = useContext(AccountContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const [nickname, setNickname] = useState<string>('')
  const [birthday, setBirthday] = useState<string>('')

  const handleSubmit = async () => {
    if(!address) return
    const data = {
      'address': address,
      'nickname': nickname,
      'birthday': birthday,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(data)
    return new Promise((resolve, reject) => {
      axios.post('/api/postUser', data, config)
      .then(response => {
        if(response.status !== 200) throw Error("Server error")
        resolve(response)
        window.location.reload()
      })
      .catch(e => {
        reject(e);
        throw Error("Server error:" + e)
      })
    })
  }

  if(!address && !loading) return (
    <Box pt='60px'>
      <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
        ログイン
      </Center>
      <Center h='60vh'>
        <Box>
          <Button bg='white' h='140px' borderRadius='0' border='1px solid black' onClick={() => {login()}}>
            <Text color='black'>
              久しぶりに<br />
              ログインしたら<br />
              最悪だった。<br />
              なんで？
            </Text>
          </Button>
          <Text color='black' fontWeight='bold' fontSize='sm' mt='10px'>
            ↑クリックしてログイン
          </Text>
        </Box>
      </Center>
    </Box>
  )

  if(!user && !loading) return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
          アカウン◯登録
        </Center>
        <Center w='100%' h='60vh'>
          <Box>
            <Text textAlign='center' color='black' fontWeight='bold' fontSize='20px'>
              ユーザー名
            </Text>
            <Input
              type="text"
              color='black'
              w={window.innerWidth * 0.9}
              h='60px'
              fontSize='20px'
              fontWeight='bold'
              textAlign='center'
              borderRadius='0'
              variant='outline'
              border='1px solid black'
              borderColor='black'
              bg='white'
              value={nickname}
              onChange={(e) => {setNickname(e.target.value)}}
            />
            <Text mt='40px' textAlign='center' color='black' fontWeight='bold' fontSize='20px'>
              生年月日
            </Text>
            <Input
              type="date"
              color='black'
              css={`
                  ::-webkit-calendar-picker-indicator {
                      background: url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png) center/80% no-repeat;
                      color: black;
                  }
              `}
              w={window.innerWidth * 0.9}
              h='60px'
              fontSize='20px'
              fontWeight='bold'
              textAlign='center'
              borderRadius='0'
              variant='outline'
              border='1px solid black'
              borderColor='black'
              bg='white'
              value={birthday}
              onChange={(e) => {setBirthday(e.target.value)}}
            />
            <Text mt='40px' textAlign='center' color='black' fontWeight='bold' fontSize='13px'>
              ※利用規約は{' '}
              <Link color='#F345BE' href='/tos'>
                こちら
              </Link>
            </Text>
            <Button
              disabled={!nickname || !birthday}
              color='black'
              bg='white'
              border='1px solid black'
              borderRadius='30px'
              w='100%'
              h='60px'
              fontSize='xl'
              mt='30px'
              mb='30px'
              onClick={handleSubmit}
            >
              ユーザー規約に同意し登録する
            </Button>
          </Box>
        </Center>
      </Box>
    </>
  )

  if(!loading) return (
    <>
      <Box pt='60px' ref={finalRef}>
        <Center color='black' pt='40px' justifyContent='space-between' w='80%' m='0 auto'>
          <Text fontWeight='bold' fontSize='20px'>{user?.nickname}</Text>
          <Flex gap='2'>
            <Button border='1px solid black' bg='white' borderRadius='0' fontWeight='bold' fontSize='20px'>
              Lv.{user?.level}
            </Button>
            <Button border='1px solid black' bg='white' borderRadius='0' fontWeight='bold' fontSize='20px' w='20px' onClick={() => {router.replace('/mypage/notifications')}}>
              <Icon as={CiBellOn} />
            </Button>
          </Flex>
        </Center>
        <Center mt='10px'>
          <Box>
            <ProgressBar
              //@ts-ignore
              width={window.innerWidth * 0.8}
              height='35px'
              completed={60}
              customLabel="レート 60"
              bgColor='#F345BE'
              baseBgColor='#F5C9E6'
            />
            <Flex mt='10px' w='100%' color='black' gap='1.5'>
              <Button p='3' border='1px solid black' bg='white' borderRadius='0' fontWeight='bold' fontSize='13px'>
                <Text mt='5px'>
                  残り <span style={{fontSize: "23px"}}>1/4</span> ボケ
                </Text>
              </Button>
              <Button p='3' border='1px solid black' bg='white' color='black' borderRadius='0' fontWeight='bold' fontSize='20px' onClick={() => {router.replace('/mypage/wallet')}}>
                <Image
                  src='/logo.png'
                  alt="preview"
                  w='30px'
                  mr='3px'
                />
                26 ZBTN
              </Button>
              <Button p='0' border='1px solid black' bg='white' borderRadius='0' fontWeight='bold' fontSize='20px' onClick={() => {router.replace('/mypage/options')}}>
                <Icon as={IoSettingsOutline} />
              </Button>
            </Flex>
          </Box>
        </Center>
      </Box>
    </>
  )
  return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
          Loading...
        </Center>
      </Box>
    </>
  )
}

export default Auth
