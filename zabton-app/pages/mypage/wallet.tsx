import React, { useContext, useEffect } from 'react'
import { Box, Center, Button, Text, Image } from '@chakra-ui/react'
import { AccountContext } from 'contexts/account'

const Wallet: React.FC = () => {
  const { zbtn } = useContext(AccountContext)

  useEffect(() => {
    console.log(zbtn);
  }, [zbtn])
  return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='40px' fontWeight='bold' fontSize='7xl' h='58px'>
          <Image
            src='/Logo.png'
            alt="preview"
            w='30px'
            mr='5px'
            alignSelf='self-end'
            mb='4px'
          />
          {zbtn}
          <Text fontSize='20px' alignSelf='self-end' ml='5px'>
            ZBTN
          </Text>
        </Center>
        <Center color='black' mt='40px' fontWeight='bold' fontSize='2xl'>
          History
        </Center>
        <Center color='black' mt='40px' fontWeight='bold' fontSize='xl'>
          {/* 履歴表示 */}
          履歴はありません
        </Center>
        <Center>
          <Button
            disabled
            color='black'
            bg='white'
            border='1px solid black'
            borderRadius='30px'
            w='90%'
            h='60px'
            fontSize='xl'
            mt='30px'
            // onClick={() => {logout()}}
          >
            もっと見る
          </Button>
        </Center>
        <Center color='black' mt='40px' fontWeight='bold' fontSize='2xl'>
          保有NFT
        </Center>
      </Box>
    </>
  )
}

export default Wallet
