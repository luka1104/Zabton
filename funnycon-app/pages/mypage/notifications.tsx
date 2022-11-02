import React from 'react'
import { Box, Center, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Notifications: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
          通知一覧
        </Center>
        <Center>
          <Button
            color='black'
            bg='white'
            border='1px solid black'
            borderRadius='30px'
            w='90%'
            h='60px'
            fontSize='xl'
            mt='100px'
            onClick={() => {router.replace('/mypage/auth')}}
          >
            戻る
          </Button>
        </Center>
      </Box>
    </>
  )
}

export default Notifications
