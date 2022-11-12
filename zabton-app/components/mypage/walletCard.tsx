import { ZbtnDetail } from 'interfaces'
import React, { useState, useEffect } from 'react'
import { Center, Box, Text } from '@chakra-ui/react'

interface Props {
  detail: ZbtnDetail
}

const WalletCard: React.FC<Props> = ({ detail }) => {
  const [date, setDate] = useState<Date>()

  useEffect(() => {
    const date = new Date(detail.timestamp * 1000)
    setDate(date)
  }, [detail])
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
          {date && `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`}
        </Box>
      </Box>
    </>
  )
}

export default WalletCard
