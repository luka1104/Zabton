import React from 'react'
import { Center, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

const Header: React.FC = () => {
  return (
    <>
      <Center top='0' position='fixed' zIndex='overlay' w='100%' h='60px' bg='#F445BE' border='3px solid #242424' fontSize='2xl'>
        <NextLink href='/' passHref>
          <Text color='white'>
            ZABTON
          </Text>
        </NextLink>
      </Center>
    </>
  )
}

export default Header
