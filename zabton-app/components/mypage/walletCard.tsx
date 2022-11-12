import { ZbtnDetail } from 'interfaces'
import React from 'react'
import { Center, Box, Text } from '@chakra-ui/react'

interface Props {
  detail: ZbtnDetail
}

const WalletCard: React.FC<Props> = ({ detail }) => {
  return (
    <>
      <Box>
        <Center w='100%' p='10px 5% 0 5%' color='black' fontSize='15px' justifyContent='space-between'>
          <Text w='70%'>
            {detail.contents}
          </Text>
          <Text w='20%'>
            {detail.amount / (10 ** 8)} ZBTN
          </Text>
        </Center>
        <Box pl='5%' fontSize='13px'>
          {`${detail.timestamp.slice(0, 4)}.${detail.timestamp.slice(5, 7)}.${detail.timestamp.slice(8, 10)}`}
        </Box>
      </Box>
    </>
  )
}

export default WalletCard
