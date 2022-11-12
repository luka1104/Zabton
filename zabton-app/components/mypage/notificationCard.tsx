import { Notification } from 'interfaces'
import React from 'react'
import { Center, Box, Text } from '@chakra-ui/react'

interface Props {
  notification: Notification
}

const NotificationCard: React.FC<Props> = ({ notification }) => {
  return (
    <>
      <Box>
        <Center w='100%' p='10px 5% 0 5%' color='black' fontSize='15px' justifyContent='space-between'>
          <Text w='100%'>
            {notification.contents}
          </Text>
        </Center>
        <Box pl='5%' fontSize='13px'>
          {`${notification.timestamp.slice(0, 4)}.${notification.timestamp.slice(5, 7)}.${notification.timestamp.slice(8, 10)}`}
        </Box>
      </Box>
    </>
  )
}

export default NotificationCard
