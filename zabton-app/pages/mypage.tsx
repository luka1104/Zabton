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
import { checkDeadline } from 'utils'
import ViewResult from 'components/mypage/viewResult'
import { answerDayCap, expRequired, upgradeFee } from 'constants/index'

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

const Mypage: NextPage<PropTypes> = ({ themes, answers }) => {
  const router = useRouter()
  const { login, address, user, loading, zbtn, getBalance, getUser } = useContext(AccountContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const [nickname, setNickname] = useState<string>('')
  const [birthday, setBirthday] = useState<string>('')
  const [levelModal, setLevelModal] = useState<boolean>(false)
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>()

  useEffect(() => {
    if(loading) return
    if(!user) return
    getBalance()
  }, [loading])

  useEffect(() => {
    if(!address) return
    getUser()
  }, [])

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

  const handleHeal = async () => {
    if(!user) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    return new Promise((resolve, reject) => {
      axios.post('/api/updateAnswerLimit', user, config)
      .then(response => {
        if(response.status !== 200) throw Error("Server error")
        resolve(response)
        getUser()
      })
      .catch(e => {
        reject(e);
        throw Error("Server error:" + e)
      })
    })
  }

  const handleLevelUp = async () => {
    if(!user) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    return new Promise((resolve, reject) => {
      axios.post('/api/levelUp', user, config)
      .then(response => {
        if(response.status !== 200) throw Error("Server error")
        resolve(response)
        setLevelModal(false)
        getUser()
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

  if(!loading && themes && answers) return (
    <>
      <Box pt='60px' pb='100px' ref={finalRef}>
        {selectedAnswer ? (
          <ViewResult
            theme={themes.find(t => t.id === selectedAnswer.themeId)}
            answer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />
        ) : (
          <>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay backdropFilter='blur(5px)' />
              <ModalContent bg='white' border='1px solid black' w='90%' h='350px' borderRadius='0' top='100px'>
                <ModalBody paddingInline='0'>
                  <Box mt='20px'>
                    <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px'>
                      もっとボケよう！
                    </Text>
                    <Text color='black' textAlign='center' fontWeight='bold' fontSize='18px' mt='20px'>
                      ZBTNを2枚消費して残りボケ数を<br />
                      回復させることができます。
                    </Text>
                    <Text color='black' textAlign='center' fontWeight='bold' fontSize='13px' mt='20px'>
                      残りZBTN {zbtn} → {zbtn - 2}
                    </Text>
                    <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px' mt='20px'>
                      残りボケ数 {`${user.answerLeft}/${user.answerLimit} → ${user.answerLimit}/${user.answerLimit}`}
                    </Text>
                  </Box>
                  <Center mt='30px' gap='10'>
                    <Button w='40%' h='60px' fontSize='20px' color='black' bg='#F5F5F5' border='1px solid black' borderRadius='30px' onClick={onClose}>
                      また今度
                    </Button>
                    <Button disabled={zbtn < 2 || user.answerLeft === answerDayCap[user.level]} w='40%' h='60px' fontSize='20px' color='black' bg='#F5F5F5' border='1px solid black' borderRadius='30px' onClick={handleHeal}>
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
                      ZBTNを{upgradeFee[user.level]}枚消費してレベルをあげる<br />
                      ことができます。レベルを上げること<br />
                      で、1日のボケ上限が増加します。
                    </Text>
                    <Text color='black' textAlign='center' fontWeight='bold' fontSize='13px' mt='20px'>
                      残りZBTN {zbtn} → {zbtn - upgradeFee[user.level]}
                    </Text>
                    <Text color='black' textAlign='center' fontWeight='bold' fontSize='13px' mt='3px'>
                      残りボケ数 {`${user.answerLeft}/${user.answerLimit} → ${answerDayCap[user.level + 1]}/${answerDayCap[user.level + 1]}`}
                    </Text>
                    <Text color='black' textAlign='center' fontWeight='bold' fontSize='30px' mt='20px'>
                      {`Lv. ${user.level} → ${user.level + 1}`}
                    </Text>
                  </Box>
                  <Center mt='60px' gap='10'>
                    <Button w='40%' h='60px' fontSize='20px' color='black' bg='#F5F5F5' border='1px solid black' borderRadius='30px' onClick={() => {setLevelModal(false)}}>
                      また今度
                    </Button>
                    <Button disabled={zbtn < upgradeFee[user.level] || user.exp < expRequired[user.level]} w='40%' h='60px' fontSize='20px' color='black' bg='#F5F5F5' border='1px solid black' borderRadius='30px' onClick={handleLevelUp}>
                      レベルアップ
                    </Button>
                  </Center>
                </ModalBody>
              </ModalContent>
            </Modal>
            <Center color='black' pt='40px' justifyContent='space-between' w='80%' m='0 auto'>
              <Text fontWeight='bold' fontSize='20px'>{user?.nickname}</Text>
              <Flex gap='2'>
                <Button border={user.exp >= expRequired[user.level] ? '1px solid #F244BE' : '1px solid black'} bg='white' borderRadius='0' fontWeight='bold' fontSize='20px' onClick={() => {setLevelModal(true)}}>
                  Lv.{user.level}
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
                  width={window.innerWidth * 0.65}
                  height='35px'
                  completed={user.exp}
                  maxCompleted={expRequired[user.level]}
                  labelAlignment='outside'
                  labelColor='black'
                  customLabel={`${user.exp} EXP`}
                  bgColor='#F345BE'
                  baseBgColor='#F5C9E6'
                />
                <Center mt='10px' w={window.innerWidth * 0.8} color='black' gap='1.5%'>
                  <Button p='' w='37%' border='1px solid black' bg='white' borderRadius='0' fontWeight='bold' fontSize='13px' onClick={onOpen}>
                    <Text mt='5px'>
                      残り <span style={{fontSize: "23px"}}>{`${user.answerLeft}/${user.answerLimit}`}</span> ボケ
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
              {answers.filter(a => a.userId === user.id).length !== 0 ? (
                <SimpleGrid pt='20px' columns={2} spacing={2}>
                  {answers.filter(a => a.userId === user.id).map((val: Answer, key: any) => {
                    return (
                      <Box key={key} mt='5px' onClick={checkDeadline(themes.find(t => t.id === val.themeId).deadline) ? null : () => setSelectedAnswer(val)}>
                        <Card
                          theme={themes.find(t => t.id === val.themeId)}
                          w={window.innerWidth * 0.5}
                          notFinished={JSON.stringify(checkDeadline(themes.find(t => t.id === val.themeId).deadline))}
                          key={key}
                        />
                        <Center key={key} color='black' mt='5px' fontWeight='bold' fontSize='xl'>
                          {val.contents}
                        </Center>
                      </Box>
                    )
                  })}
                </SimpleGrid>
              ) : (
                <>
                  <Box>
                    <Center　color='black' mt='40px' fontWeight='bold' fontSize='xl'>
                      投稿したボケがありません
                    </Center><br />
                    <Center>
                      <Button
                        mt='5px'
                        color='black'
                        bg='white'
                        border='1px solid black'
                        borderRadius='30px'
                        w={window.innerWidth * 0.9}
                        h='60px'
                        fontSize='xl'
                        mb='30px'
                        onClick={() => {router.push('/answer/create')}}
                      >
                        ボケる！
                      </Button>
                    </Center>
                  </Box>
                </>
              )}
            </Center>
            <Center color='black' mt='40px' fontWeight='bold' fontSize='2xl'>
              投稿したお題
            </Center>
            <Center>
              {themes.filter(t => t.userId === user.id).length !== 0 ? (
                <SimpleGrid pt='20px' columns={2} spacing={2}>
                  {themes.filter(t => t.userId === user.id).map((val: Theme, key: any) => {
                    return (
                      <Card
                        theme={val}
                        w={window.innerWidth * 0.5}
                        key={key}
                      />
                    )
                  })}
                </SimpleGrid>
              ) : (
                <Box>
                  <Center　color='black' mt='40px' fontWeight='bold' fontSize='xl'>
                    投稿したお題がありません
                  </Center><br />
                  <Center>
                    <Button
                      mt='5px'
                      color='black'
                      bg='white'
                      border='1px solid black'
                      borderRadius='30px'
                      w={window.innerWidth * 0.9}
                      h='60px'
                      fontSize='xl'
                      mb='30px'
                      onClick={() => {router.push('/theme/create')}}
                    >
                      お題を投稿する！
                    </Button>
                  </Center>
                </Box>
              )}
            </Center>
          </>
        )}
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

export default Mypage
