import { NextPage } from 'next'
import React from 'react'
import dynamic from "next/dynamic";
import { Box } from '@chakra-ui/react'

const AuthButton = dynamic(
  () => {
    return import("../../components/auth/auth");
  },
  { ssr: false }
);

const Auth: NextPage = () => {
  return (
    <Box>
      <AuthButton />
    </Box>
  )
}

export default Auth
