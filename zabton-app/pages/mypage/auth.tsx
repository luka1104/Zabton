import { NextPage } from 'next'
import React, { useContext, useState, useRef, useEffect } from 'react'
import { Box, Center, Button, Text, Input, Link, Flex, Icon, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, SimpleGrid } from '@chakra-ui/react'
import { AccountContext } from 'contexts/account'
import axios from 'axios'
import { CiBellOn } from 'react-icons/ci'
import { IoSettingsOutline } from 'react-icons/io5'
import ProgressBar from "@ramonak/react-progress-bar";
import { useRouter } from 'next/router'
import type { GetServerSideProps } from "next";
import prisma from 'lib/prisma'
import { Theme, Answer } from 'interfaces'
import Card from 'components/theme/card'

type Props = {
  themes: Theme[]
  answers: Answer[]
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const themesRaw = await prisma.theme.findMany()
  const themes = JSON.parse(JSON.stringify(themesRaw))
  const answersRaw = await prisma.answer.findMany()
  const answers = JSON.parse(JSON.stringify(answersRaw))
  return {
    props: {
      themes,
      answers,
    },
  };
}
interface PropTypes {
  themes: Theme[]
  answers: Answer[]
}

const Auth: NextPage<PropTypes> = ({ themes, answers }) => {
  const router = useRouter()
  const { login, address, user, loading, zbtn, getBalance } = useContext(AccountContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const [nickname, setNickname] = useState<string>('')
  const [birthday, setBirthday] = useState<string>('')
  const [levelModal, setLevelModal] = useState<boolean>(false)

  useEffect(() => {
    if(loading) return
    if(!user) return
    getBalance()
  }, [loading])

  const handleSubmit = async () => {
    if(!address) return
    const data = {
      'address': address,
      'nickname': nickname,
      'birthday': birthday,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(data)
    return new Promise((resolve, reject) => {
      axios.post('/api/postUser', data, config)
      .then(response => {
        if(response.status !== 200) throw Error("Server error")
        resolve(response)
        window.location.reload()
      })
      .catch(e => {
        reject(e);
        throw Error("Server error:" + e)
      })
    })
  }

  if(!address && !loading) return (
    <Box pt='60px'>
      <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
        ログイン
      </Center>
      <Center h='60vh'>
        <Box>
          <Button bg='white' h='140px' borderRadius='0' border='1px solid black' onClick={() => {login()}}>
            <Text color='black'>
              久しぶりに<br />
              ログインしたら<br />
              最悪だった。<br />
              なんで？
            </Text>
          </Button>
          <Text color='black' fontWeight='bold' fontSize='sm' mt='10px'>
            ↑クリックしてログイン
          </Text>
        </Box>
      </Center>
    </Box>
  )

  if(!user && !loading) return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
          アカウン◯登録
        </Center>
        <Center w='100%' h='60vh'>
          <Box>
            <Text textAlign='center' color='black' fontWeight='bold' fontSize='20px'>
              ユーザー名
            </Text>
            <Input
              type="text"
              color='black'
              w={window.innerWidth * 0.9}
              h='60px'
              fontSize='20px'
              fontWeight='bold'
              textAlign='center'
              borderRadius='0'
              variant='outline'
              border='1px solid black'
              borderColor='black'
              bg='white'
              value={nickname}
              onChange={(e) => {setNickname(e.target.value)}}
            />
            <Text mt='40px' textAlign='center' color='black' fontWeight='bold' fontSize='20px'>
              生年月日
            </Text>
            <Input
              type="date"
              color='black'
              css={`
                  ::-webkit-calendar-picker-indicator {
                      background: url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png) center/80% no-repeat;
                      color: black;
                  }
              `}
              w={window.innerWidth * 0.9}
              h='60px'
              fontSize='20px'
              fontWeight='bold'
              textAlign='center'
              borderRadius='0'
              variant='outline'
              border='1px solid black'
              borderColor='black'
              bg='white'
              value={birthday}
              onChange={(e) => {setBirthday(e.target.value)}}
            />
            <Text mt='40px' textAlign='center' color='black' fontWeight='bold' fontSize='13px'>
              ※利用規約は{' '}
              <Link color='#F345BE' href='/tos'>
                こちら
              </Link>
            </Text>
            <Button
              disabled={!nickname || !birthday}
              color='black'
              bg='white'
              border='1px solid black'
              borderRadius='30px'
              w='100%'
              h='60px'
              fontSize='xl'
              mt='30px'
              mb='30px'
              onClick={handleSubmit}
            >
              ユーザー規約に同意し登録する
            </Button>
          </Box>
        </Center>
      </Box>
    </>
  )

  if(!loading) return (
    <>
      <Box pt='60px' ref={finalRef}>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay backdropFilter='blur(5px)' />
          <ModalContent bg='white' border='1px solid black' w='90%' h='350px' borderRadius='0' top='100px'>
            <ModalBody paddingInline='0'>
              <Box mt='20px'>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px'>
                  もっとボケよう！
                </Text>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='18px' mt='20px'>
                  ZBTNを5枚消費して残りボケ数を<br />
                  回復させることができます。
                </Text>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='13px' mt='20px'>
                  残りZBTN {zbtn} → {zbtn - 5}
                </Text>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px' mt='20px'>
                  残りボケ数 1/4 → 2/4
                </Text>
              </Box>
              <Center mt='30px' gap='10'>
                <Button w='40%' h='60px' fontSize='20px' color='black' bg='#F5F5F5' border='1px solid black' borderRadius='30px' onClick={onClose}>
                  また今度
                </Button>
                <Button w='40%' h='60px' fontSize='20px' color='black' bg='#F5F5F5' border='1px solid black' borderRadius='30px'>
                  回復する
                </Button>
              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal finalFocusRef={finalRef} isOpen={levelModal} onClose={() => {setLevelModal(false)}}>
          <ModalOverlay backdropFilter='blur(5px)' />
          <ModalContent bg='white' border='1px solid black' w='90%' h='450px' borderRadius='0' top='100px'>
            <ModalBody paddingInline='0'>
              <Box mt='20px'>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px'>
                  レベルアァッップ！！
                </Text>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='18px' mt='20px'>
                  ZBTNを10枚消費してレベルをあげる<br />
                  ことができます。レベルを上げること<br />
                  で、1日のボケ上限が増加します。
                </Text>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='13px' mt='20px'>
                  残りZBTN {zbtn} → {zbtn - 10}
                </Text>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='13px' mt='3px'>
                  残りボケ数 1/4 → 5/5
                </Text>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='30px' mt='20px'>
                  Lv. 0 → 1
                </Text>
              </Box>
              <Center mt='60px' gap='10'>
                <Button w='40%' h='60px' fontSize='20px' color='black' bg='#F5F5F5' border='1px solid black' borderRadius='30px' onClick={() => {setLevelModal(false)}}>
                  また今度
                </Button>
                <Button w='40%' h='60px' fontSize='20px' color='black' bg='#F5F5F5' border='1px solid black' borderRadius='30px'>
                  回復する
                </Button>
              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Center color='black' pt='40px' justifyContent='space-between' w='80%' m='0 auto'>
          <Text fontWeight='bold' fontSize='20px'>{user?.nickname}</Text>
          <Flex gap='2'>
            <Button border='1px solid black' bg='white' borderRadius='0' fontWeight='bold' fontSize='20px' onClick={() => {setLevelModal(true)}}>
              Lv.{user?.level}
            </Button>
            <Button border='1px solid black' bg='white' borderRadius='0' fontWeight='bold' fontSize='20px' w='20px' onClick={() => {router.replace('/mypage/notifications')}}>
              <Icon as={CiBellOn} />
            </Button>
          </Flex>
        </Center>
        <Center mt='10px'>
          <Box>
            <ProgressBar
              //@ts-ignore
              width={window.innerWidth * 0.8}
              height='35px'
              completed={60}
              customLabel="レート 60"
              bgColor='#F345BE'
              baseBgColor='#F5C9E6'
            />
            <Center mt='10px' w={window.innerWidth * 0.8} color='black' gap='1.5%'>
              <Button p='' w='37%' border='1px solid black' bg='white' borderRadius='0' fontWeight='bold' fontSize='13px' onClick={onOpen}>
                <Text mt='5px'>
                  残り <span style={{fontSize: "23px"}}>1/4</span> ボケ
                </Text>
              </Button>
              <Button p='3' w='47%' border='1px solid black' bg='white' color='black' borderRadius='0' fontWeight='bold' fontSize='20px' onClick={() => {router.replace('/mypage/wallet')}}>
                <Image
                  src='/Logo.png'
                  alt="preview"
                  w='30px'
                  mr='3px'
                />
                {zbtn} ZBTN
              </Button>
              <Button p='0' w='13%' border='1px solid black' bg='white' borderRadius='0' fontWeight='bold' fontSize='20px' onClick={() => {router.replace('/mypage/options')}}>
                <Icon as={IoSettingsOutline} />
              </Button>
            </Center>
          </Box>
        </Center>
        <Center color='black' mt='40px' fontWeight='bold' fontSize='2xl'>
          投稿したボケ
        </Center>
        <Center>
          <SimpleGrid pt='20px' columns={2} spacing={2}>
            {answers ? answers.filter(a => a.userId === user.id).map((val: Answer, key: any) => {
              return (
                <Box mt='5px'>
                  <Card
                    theme={themes.find(t => t.id === val.id)}
                    w={window.innerWidth * 0.5}
                    key={key}
                  />
                  <Center color='black' mt='5px' fontWeight='bold' fontSize='xl'>
                    {val.contents}
                  </Center>
                </Box>
              )
            }) : null}
          </SimpleGrid>
        </Center>
        <Center color='black' mt='40px' fontWeight='bold' fontSize='2xl'>
          投稿したお題
        </Center>
        <Center>
          <SimpleGrid pt='20px' columns={2} spacing={2}>
            {themes ? themes.filter(t => t.userId === user.id).map((val: Theme, key: any) => {
              return (
                <Card
                  theme={val}
                  w={window.innerWidth * 0.5}
                  key={key}
                />
              )
            }) : null}
          </SimpleGrid>
        </Center>
      </Box>
    </>
  )
  return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='3xl'>
          Loading...
        </Center>
      </Box>
    </>
  )
}

export default Auth
