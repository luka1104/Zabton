import { Answer, Theme, User } from 'interfaces'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { Box, Button, Center, Icon, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure, Text, Checkbox } from '@chakra-ui/react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoWarningOutline } from 'react-icons/io5'
import Card from './card';
import { AccountContext } from 'contexts/account';
import axios from 'axios'
import { useRouter } from 'next/router'
import { transfer, transferFrom } from 'utils/transferToken'
import PacmanLoader from "react-spinners/PacmanLoader"

interface Props {
  setStep: Function
  selectedTheme: Theme
  imagePath: string
  setImagePath: Function
  answers: Answer[]
  setAnswerId: Function
  users: User[]
}

const Validation: React.FC<Props> = ({ setStep, selectedTheme, imagePath, setImagePath, answers, setAnswerId, users }) => {
  const router = useRouter()
  const { user, zbtn } = useContext(AccountContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tipOpen, setTipOpen] = useState<boolean>(false)
  const [width, setWidth] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const finalRef = useRef(null)
  const sliderRef = useRef(null)

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    //@ts-ignore
    dots: false,
    arrows: false,
  }

  const calcTime = (deadline: string) => {
    const deadlineDateTime = new Date(deadline)
    const now = new Date
    const timeLeft = (deadlineDateTime.getTime() - now.getTime()) / (60*60*1000)
    return Math.floor(timeLeft)
  }

  const handleSubmit = async (answerId: number) => {
    if(!user) return
    const data = {
      'userId': user.id,
      'answerId': answerId,
      'themeId': selectedTheme.id
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(data)
    return new Promise((resolve, reject) => {
      axios.post('/api/postValidation', data, config)
      .then(response => {
        if(response.status !== 200) throw Error("Server error")
        resolve(response)
        // setAnswerId(answerId)
        // setStep(2)
      })
      .catch(e => {
        reject(e);
        throw Error("Server error:" + e)
      })
    })
  }

  useEffect(() => {
    setWidth(window.innerWidth * 0.8)
  }, [])

  useEffect(() => {
    if(!selectedTheme) return
    console.log(selectedTheme);
    setStep(1)
  }, [selectedTheme])

  if(answers.filter(a => a.themeId === selectedTheme.id).length === 0) return (
    <Box>
      <Center color='black' pt='20px' fontWeight='bold' fontSize='2xl'>
        ボケがまだないようです！
      </Center>
      <Center>
        <Button
          mt='30vh'
          color='black'
          bg='white'
          border='1px solid black'
          borderRadius='30px'
          w='80%'
          h='60px'
          fontSize='xl'
          mb='30px'
          onClick={() => {router.push('/answer/create')}}
        >
          ボケる！
        </Button>
      </Center>
    </Box>
  )

  return (
    <>
      <Box ref={finalRef}>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay backdropFilter='blur(5px)' />
          <ModalContent bg='white' border='1px solid black' w='90%' h='350px' borderRadius='0' top='100px'>
            <ModalBody paddingInline='0'>
              <Box mt='20px'>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px'>
                  このお題を報告します
                </Text>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='18px' mt='20px'>
                  報告されることが多いユーザーには<br />
                  ペナルティが課されます。
                </Text>
                <Text color='black' textAlign='center' fontWeight='bold' fontSize='18px' mt='20px'>
                  本当にこのユーザーを報告しますか？
                </Text>
              </Box>
              <Center mt='60px' gap='10'>
                <Button w='40%' h='60px' fontSize='20px' color='black' bg='#F5F5F5' border='1px solid black' borderRadius='30px' onClick={onClose}>
                  報告しない
                </Button>
                <Button w='40%' h='60px' fontSize='20px' color='black' bg='#F5F5F5' border='1px solid black' borderRadius='30px'>
                  報告する
                </Button>
              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Slider ref={sliderRef} {...settings}>
          {answers.filter(a => a.themeId === selectedTheme.id).map((val: any, key: any) => {
            return (
              <Box key={key} ref={finalRef}>
                <Modal finalFocusRef={finalRef} isOpen={tipOpen} onClose={() => {setTipOpen(false)}}>
                  <ModalOverlay backdropFilter='blur(5px)' />
                  <ModalContent bg='white' border='1px solid black' w='90%' h='350px' borderRadius='0' top='100px'>
                    <ModalBody paddingInline='0'>
                      <Box mt='20px'>
                        <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px'>
                          「ざぶとん一枚！」
                        </Text>
                        <Text color='black' textAlign='center' fontWeight='bold' fontSize='18px' mt='20px'>
                          ZBTNを一枚消費してボケ主を<br />
                          応援することができます！
                        </Text>
                        <Text color='black' textAlign='center' fontWeight='bold' fontSize='18px' mt='20px'>
                          残りZBTN {zbtn} → {zbtn - 1}
                        </Text>
                        <Center mt='25px' color='black'>
                          <Checkbox border='1px solid black' borderRadius='3px' />
                          <Text fontWeight='bold' fontSize='15px' ml='5px'>今後、この確認を出さない。</Text>
                        </Center>
                      </Box>
                      <Center mt='30px' gap='10'>
                        <Button w='40%' h='60px' fontSize='20px' color='black' bg='#F5F5F5' border='1px solid black' borderRadius='30px' onClick={() => {setTipOpen(false)}}>
                          また今度
                        </Button>
                        <Button
                          w='40%'
                          h='60px'
                          fontSize='20px'
                          color='black'
                          bg='#F5F5F5'
                          border='1px solid black'
                          borderRadius='30px'
                          onClick={() => {transferFrom(user.address, users.find(u => u.id === val.userId).address, 1, setLoading), setTipOpen(false)}}
                        >
                          応援する
                        </Button>
                      </Center>
                    </ModalBody>
                  </ModalContent>
                </Modal>
                <Modal finalFocusRef={finalRef} isOpen={loading} onClose={() => {setLoading(false)}}>
                  <ModalOverlay backdropFilter='blur(5px)' />
                  <ModalContent bg='white' border='1px solid black' w='90%' h='350px' borderRadius='0' top='100px'>
                    <ModalBody paddingInline='0'>
                      <Box mt='20px'>
                        <Text color='black' textAlign='center' fontWeight='bold' fontSize='25px'>
                          ZBTNを用意しています！
                        </Text>
                        <Center w='80%' mt='40px' mb='40px'>
                          <PacmanLoader
                            color='#F345BE'
                            loading={loading}
                            // cssOverride={override}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </Center>
                        <Center>
                          <Button
                            mt='50px'
                            color='black'
                            bg='white'
                            border='1px solid black'
                            borderRadius='30px'
                            w='90%'
                            h='60px'
                            fontSize='xl'
                            mb='30px'
                            onClick={() => {setLoading(false)}}
                          >
                            閉じる
                          </Button>
                        </Center>
                      </Box>
                    </ModalBody>
                  </ModalContent>
                </Modal>
                <Card
                  theme={selectedTheme}
                  answer={val}
                  w={width}
                  imagePath={imagePath}
                  setImagePath={setImagePath}
                  key={key}
                />
                <Center color='black' mt='20px' fontWeight='bold'>
                  評価期限　残り{calcTime(selectedTheme.deadline)}時間
                </Center>
                <Box w='95%' m='0 auto' h='120px' mt='20px'>
                  <Center h='100%' color='black' gap='2'>
                    <Box w='35%'>
                      <Button w='100%' mb='10px' bg='black' color='white' borderRadius='20px' onClick={onOpen}>
                        <Icon as={IoWarningOutline} mr='2px' />
                        あかん
                      </Button><br />
                      <Button
                        w='100%'
                        h='60px'
                        bg='white'
                        borderRadius='20px'
                        border='1px solid black'
                        onClick={() => (handleSubmit(val.id), transfer(user.address, 1), sliderRef.current ? sliderRef.current.slickNext() : null)}
                      >
                        ちゃう
                      </Button>
                    </Box>
                    <Box w='25%' m='0 auto'>
                      <Center bg='white' color='black' fontWeight='bold'>
                        {zbtn} ZBTN
                      </Center>
                      <Center>
                        <Button
                          bg='#F445BE'
                          color='white'
                          h='70px'
                          w='70px'
                          mt='12px'
                          borderRadius='30px'
                          border='1px solid black'
                          onClick={() => {setTipOpen(true)}}
                        >
                          ざぶとん
                        </Button>
                      </Center>
                    </Box>
                    <Button
                      w='35%'
                      h='110px'
                      colorScheme='pink'
                      borderRadius='30px'
                      border='1px solid black'
                      onClick={() => (handleSubmit(val.id), transfer(user.address, 1), sliderRef.current ? sliderRef.current.slickNext() : null)}
                    >
                      ええやん
                    </Button>
                  </Center>
                </Box>
              </Box>
            )
          })}
        </Slider>
        <Center>
          <Button
            mt='30px'
            color='black'
            bg='white'
            border='1px solid black'
            borderRadius='30px'
            w='80%'
            h='60px'
            fontSize='xl'
            mb='30px'
            onClick={() => {router.reload()}}
          >
            お題選びに戻る
          </Button>
        </Center>
      </Box>
    </>
  )
}

export default Validation
