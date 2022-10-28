import { NextPage } from 'next'
import React from 'react'
import dynamic from "next/dynamic";
import { Box, Center } from '@chakra-ui/react'

const AuthButton = dynamic(
  () => {
    return import("../../components/auth/auth");
  },
  { ssr: false }
);

const Auth: NextPage = () => {
  return (
    <Box pt='60px'>
      <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
        ログイン
      </Center>
      <AuthButton />
    </Box>
  )
}

export default Auth
