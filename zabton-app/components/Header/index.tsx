import React from 'react'
import { Center } from '@chakra-ui/react'
import NextLink from 'next/link'
import Image from 'next/image'
import headerBanner from 'assets/images/headerBanner.png'

const Header: React.FC = () => {
  return (
    <>
      <Center top='0' position='fixed' zIndex='overlay' w='100%' h='60px' bg='#F445BE' border='3px solid #242424' fontSize='2xl'>
        <NextLink href='/' passHref>
          <Image src={headerBanner} alt='header banner' />
        </NextLink>
      </Center>
    </>
  )
}

export default Header
