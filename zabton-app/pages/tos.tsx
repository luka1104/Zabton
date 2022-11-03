import React from 'react'
import { Box, Center, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Tos: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
          利用規約
        </Center>
        <Center>
          <Button
            mt='50vh'
            color='black'
            bg='white'
            border='1px solid black'
            borderRadius='30px'
            w='80%'
            h='60px'
            fontSize='xl'
            mb='30px'
            onClick={() => {router.push('/mypage/auth')}}
          >
            戻る
          </Button>
        </Center>
      </Box>
    </>
  )
}

export default Tos
