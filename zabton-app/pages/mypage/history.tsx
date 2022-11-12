import React, { useContext } from 'react'
import { Box, Button, Center } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from "next";
import prisma from 'lib/prisma'
import { ZbtnDetail } from 'interfaces'
import WalletCard from 'components/mypage/walletCard';
import { AccountContext } from 'contexts/account';
import { useRouter } from 'next/router';

type Props = {
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

const History: NextPage<PropTypes> = ({ details }) => {
  const { user } = useContext(AccountContext)
  const router = useRouter()
  return (
    <>
      <Box p='40px 0' fontWeight='bold' color='black'>
        <Center color='black' mt='40px' fontWeight='bold' fontSize='3xl'>
          ZBTN 履歴
        </Center>
        <Box mt='20px'>
          {details && user && (
            details.filter(d => d.userId === user.id).map((val: ZbtnDetail, key: number) => {
              return (
                <Box mt='10px' key={key}>
                  <WalletCard detail={val} />
                </Box>
              )
            })
          )}
        </Box>
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
              onClick={() => {router.push('/mypage/wallet')}}
            >
              戻る
            </Button>
        </Center>
      </Box>
    </>
  )
}

export default History
