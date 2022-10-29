import { NextPage } from 'next'
import React from 'react'
import { Box, Center } from '@chakra-ui/react'

const Select: NextPage = () => {
  return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='2xl'>
          どのお題でボケる？
        </Center>
      </Box>
    </>
  )
}

export default Select
