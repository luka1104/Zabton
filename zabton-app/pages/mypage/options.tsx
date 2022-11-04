import React, { useContext } from 'react'
import { Box, Center, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AccountContext } from 'contexts/account'

const Options: React.FC = () => {
  const { login, logout, address, user, loading } = useContext(AccountContext)
  const router = useRouter()
  return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
          オプション
        </Center>
        <Center flexFlow='column'>
        <Button
          color='black'
          bg='white'
          border='1px solid black'
          borderRadius='30px'
          w='90%'
          h='60px'
          fontSize='xl'
          mt='30px'
          onClick={() => {logout()}}
        >
          別のアカウントでログイン
        </Button>
        <Button
          color='black'
          bg='white'
          border='1px solid black'
          borderRadius='30px'
          w='90%'
          h='60px'
          fontSize='xl'
          mt='10px'
          onClick={() => {logout()}}
        >
          ログアウト
        </Button>
        <Button
          color='black'
          bg='white'
          border='1px solid black'
          borderRadius='30px'
          w='90%'
          h='60px'
          fontSize='xl'
          mt='10px'
          onClick={() => {router.replace('https://discord.com')}}
        >
          Discord
        </Button>
        <Button
          color='black'
          bg='white'
          border='1px solid black'
          borderRadius='30px'
          w='90%'
          h='60px'
          fontSize='xl'
          mt='10px'
          onClick={() => {router.replace('/tos')}}
        >
          利用規約
        </Button>
        <Button
          color='black'
          bg='white'
          border='1px solid black'
          borderRadius='30px'
          w='90%'
          h='60px'
          fontSize='xl'
          mt='10px'
          // onClick={handleSubmit}
        >
          運営会社
        </Button>
        <Button
          color='black'
          bg='white'
          border='1px solid black'
          borderRadius='30px'
          w='90%'
          h='60px'
          fontSize='xl'
          mt='10px'
          onClick={() => {router.replace('/mypage')}}
        >
          戻る
        </Button>
        </Center>
      </Box>
    </>
  )
}

export default Options
