import React, { useContext, useEffect, useState } from 'react'
import { Box, Center, Button, Text, Image, SimpleGrid} from '@chakra-ui/react'
import { AccountContext } from 'contexts/account'
import getBFT from 'utils/getBFT'
import type { NextPage } from "next";
import Card from 'components/mypage/card';
import ViewNFT from 'components/mypage/viewNFT';
import { useRouter } from 'next/router'


const Wallet: NextPage = () => {
  const router = useRouter()
  const { zbtn, user } = useContext(AccountContext)
  const [BFTs, setBFTs] = useState<any[]>()
  const [uri, setUri] = useState<any>()

  const getBFTs = async () => {
    const uris = await getBFT(user.address)
    setBFTs(uris)
  }

  useEffect(() => {
  }, [zbtn])

  useEffect(() => {
    if(!user) return
    getBFTs()
  }, [user])

  if(uri) return (
    <>
      <ViewNFT val={JSON.parse(uri)} />
    </>
  )

  return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='40px' fontWeight='bold' fontSize='7xl' h='58px'>
          <Image
            src='/LogoWallet.png'
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
          >
            もっと見る
          </Button>
        </Center>
        <Center color='black' mt='40px' fontWeight='bold' fontSize='2xl'>
          保有NFT
        </Center>
        <SimpleGrid pt='20px' columns={2} spacing={2}>
          {BFTs?.map((val: any, key: any) => {
            if(!val) return
            return (
              <Box mt='40px' key={key} onClick={() => {setUri(val)}}>
                <Card val={JSON.parse(val)} key={key} />
              </Box>
            )
          })}
        </SimpleGrid>
        <Center>
          <Button
            color='black'
            bg='white'
            border='1px solid black'
            borderRadius='30px'
            w='90%'
            h='60px'
            fontSize='xl'
            mt='100px'
            mb='30px'
            onClick={() => {router.push('/mypage')}}
          >
            マイページに戻る
          </Button>
        </Center>
      </Box>
    </>
  )
}

export default Wallet
