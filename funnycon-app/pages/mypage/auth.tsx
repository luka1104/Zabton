import { NextPage } from 'next'
import React, { useContext } from 'react'
import { Box, Center, Button, Text } from '@chakra-ui/react'
import { AccountContext } from 'contexts/account'

const Auth: NextPage = () => {
  const { web3auth, login, logout } = useContext(AccountContext)
  return (
    <Box pt='60px'>
      <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
        ログイン
      </Center>
      <Center h='60vh'>
        <Box>
          <Button bg='white' h='140px' borderRadius='0' border='1px solid black' onClick={() => {web3auth?.provider? logout() : login()}}>
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
}

export default Auth
