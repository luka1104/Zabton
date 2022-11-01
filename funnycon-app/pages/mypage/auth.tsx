import { NextPage } from 'next'
import React, { useContext, useState } from 'react'
import { Box, Center, Button, Text, Input, Link } from '@chakra-ui/react'
import { AccountContext } from 'contexts/account'
import axios from 'axios'

const Auth: NextPage = () => {
  const { login, logout, address, user, loading } = useContext(AccountContext)
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
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
          ログアウト
        </Center>
        <Center h='60vh'>
          <Box>
            <Button bg='white' h='140px' borderRadius='0' border='1px solid black' onClick={() => {logout()}}>
              <Text color='black'>
                久しぶりに<br />
                ログインしたら<br />
                最悪だった。<br />
                なんで？
              </Text>
            </Button>
            <Text color='black' fontWeight='bold' fontSize='sm' mt='10px'>
              ↑クリックしてログアウト
            </Text>
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
