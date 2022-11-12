import React, { useContext } from 'react'
import { Box, Center, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import type { GetServerSideProps, NextPage } from "next";
import prisma from 'lib/prisma'
import { Notification } from 'interfaces'
import NotificationCard from 'components/mypage/notificationCard';
import { AccountContext } from 'contexts/account';

type Props = {
  notifications: Notification[]
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const notificationsRaw = await prisma.notification.findMany()
  const notifications = JSON.parse(JSON.stringify(notificationsRaw)).reverse()
  return {
    props: {
      notifications,
    },
  };
}

interface PropTypes {
  notifications: Notification[]
}

const Notifications: NextPage<PropTypes> = ({ notifications }) => {
  const router = useRouter()
  const { user } = useContext(AccountContext)
  return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
          通知一覧
        </Center>
        <Box color='black' mt='20px' fontWeight='bold' fontSize='xl'>
          {notifications && user && (
            notifications.filter(n => n.userId === user.id).map((val: Notification, key: number) => {
              return (
                <NotificationCard notification={val} key={key} />
              )
            })
          )}
          {notifications && user && (
            notifications.filter(n => n.userId === user.id).length === 0 && (
              <>
                通知はありません
              </>
            )
          )}
        </Box>
        <Center pb='30px'>
          <Button
            color='black'
            bg='white'
            border='1px solid black'
            borderRadius='30px'
            w='90%'
            h='60px'
            fontSize='xl'
            mt='50px'
            onClick={() => {router.replace('/mypage')}}
          >
            戻る
          </Button>
        </Center>
      </Box>
    </>
  )
}

export default Notifications
