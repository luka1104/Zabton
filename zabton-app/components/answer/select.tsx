import React, { useState, useEffect, useRef } from 'react'
import { Box, Button, Center, Icon, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure, Text } from '@chakra-ui/react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Theme } from 'interfaces'
import Card from 'components/answer/card'
import { IoWarningOutline } from 'react-icons/io5'

interface PropTypes {
  themes: Theme[]
  setStep: Function
  selectedTheme?: Theme
  setSelectedTheme: Function
}

const Select: React.FC<PropTypes> = ({ themes, setStep, selectedTheme, setSelectedTheme }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [width, setWidth] = useState<number>(0)
  const finalRef = useRef(null)
  const sliderRef = useRef(null)

  const settings = {
    dots: true,
    infinite: true,
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

  useEffect(() => {
    setWidth(window.innerWidth * 0.8)
  }, [])

  useEffect(() => {
    if(!selectedTheme) return
    console.log(selectedTheme);
    setStep(1)
  }, [selectedTheme])

  return (
    <>
      <Box ref={finalRef}>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='2xl'>
          どのお題でボケる？
        </Center>
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
          {themes.map((val: any, key: any) => {
            return (
              <Box key={key}>
                <Card
                  theme={val}
                  w={width}
                  key={key}
                />
                <Center color='black' mt='20px' fontWeight='bold'>
                  回答期限　残り{calcTime(val.deadline)}時間
                </Center>
                <Box w='100%' m='0 auto' h='120px' mt='20px'>
                  <Center h='100%' color='black' gap='20%'>
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
                        //@ts-ignore
                        onClick={() => (sliderRef.current ? sliderRef.current.slickNext() : null)}
                      >
                        ちゃう
                      </Button>
                    </Box>
                    <Button
                      w='35%'
                      h='110px'
                      colorScheme='pink'
                      borderRadius='30px'
                      border='1px solid black'
                      onClick={() => {setSelectedTheme(val)}}
                    >
                      ボケる
                    </Button>
                  </Center>
                </Box>
              </Box>
            )
          })}
        </Slider>
      </Box>
    </>
  )
}

export default Select
