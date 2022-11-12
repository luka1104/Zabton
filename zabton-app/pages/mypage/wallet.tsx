import React, { useContext, useEffect, useState } from 'react'
import { Box, Center, Button, Text, Image, SimpleGrid} from '@chakra-ui/react'
import { AccountContext } from 'contexts/account'
import getBFT from 'utils/getBFT'
import type { NextPage } from "next";
import Card from 'components/mypage/card';
import ViewNFT from 'components/mypage/viewNFT';
import { useRouter } from 'next/router'
import type { GetServerSideProps } from "next";
import prisma from 'lib/prisma'
import { ZbtnDetail } from 'interfaces'
import WalletCard from 'components/mypage/walletCard';

interface Props  {
  details: ZbtnDetail[]
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const detailsRaw = await prisma.zbtnDetail.findMany()
  const details = JSON.parse(JSON.stringify(detailsRaw)).reverse()
  return {
    props: {
      details,
    },
  };
}

interface PropTypes {
  details: ZbtnDetail[]
}

const Wallet: NextPage<PropTypes> = ({ details }) => {
  const router = useRouter()
  const { zbtn, user } = useContext(AccountContext)
  const [BFTs, setBFTs] = useState<any[]>()
  const [uri, setUri] = useState<any>()

  const getBFTs = async () => {
    const uris = await getBFT(user.address)
    setBFTs(uris)
  }

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
        <Box color='black' mt='10px' fontWeight='bold' fontSize='xl'>
          {details && user && details.filter(d => d.userId === user.id).slice(0, 3).map((val: ZbtnDetail, key: number) => {
            return (
              <Box key={key}>
                <WalletCard detail={val} />
              </Box>
            )
          })}
          {details.length === 0 && (
            <>
              履歴はありません
            </>
          )}

        </Box>
        {details.filter(d => d.userId === user.id).length > 3 && (
          <Center>
            <Button
              color='black'
              bg='white'
              border='1px solid black'
              borderRadius='30px'
              w='90%'
              h='60px'
              fontSize='xl'
              mt='30px'
              onClick={() => {router.push('/mypage/history')}}
            >
              もっと見る
            </Button>
          </Center>
        )}
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
