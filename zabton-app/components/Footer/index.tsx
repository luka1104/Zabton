import NextLink from 'next/link'
import React from 'react'
import { Center, Icon, Divider } from '@chakra-ui/react'
import { RiQuestionnaireLine } from 'react-icons/ri'
import { AiOutlineMessage, AiOutlineUser } from 'react-icons/ai'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'

const Footer: React.FC = () => {
  return (
    <>
      <Center maxW={{ base: '100vw', md: '100vw', lg: '25vw' }} bottom='0' position='fixed' w='100%' h='60px' bg='#F445BE' border='3px solid #242424' fontSize='2xl' color='black' gap={8}>
        <NextLink href='/theme/create' passHref>
          <Icon fontSize='30px' as={RiQuestionnaireLine} />
        </NextLink>
        <Divider orientation='vertical' h='3vh' border='1.5px solid black' opacity='1' />
        <NextLink href='/answer/create' passHref>
          <Icon fontSize='30px' as={AiOutlineMessage} />
        </NextLink>
        <Divider orientation='vertical' h='3vh' border='1.5px solid black' opacity='1' />
        <NextLink href='/validate' passHref>
          <Icon fontSize='30px' as={HiOutlineClipboardDocumentList} />
        </NextLink>
        <Divider orientation='vertical' h='3vh' border='1.5px solid black' opacity='1' />
        <NextLink href='/mypage' passHref>
          <Icon fontSize='30px' as={AiOutlineUser} />
        </NextLink>
      </Center>
    </>
  )
}

export default Footer
