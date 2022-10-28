import { NextPage } from 'next'
import React from 'react'
import { Center } from '@chakra-ui/react'

const Header: NextPage = () => {
  return (
    <>
      <Center top='0' position='fixed' w='100%' h='60px' bg='#F445BE' border='3px solid #242424' fontSize='2xl'>
        FunnyCon
      </Center>
    </>
  )
}

export default Header
