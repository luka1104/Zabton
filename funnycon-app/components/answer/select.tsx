import React, { useState, useEffect } from 'react'
import { Box, Button, Center, Icon } from '@chakra-ui/react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Theme } from 'interfaces'
import Card from 'components/answer/card'
import { IoWarningOutline } from 'react-icons/io5'

interface PropTypes {
  themes: Theme[]
}

const Select: React.FC<PropTypes> = ({ themes }) => {
  const [width, setWidth] = useState<number>(0)

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

  return (
    <>
      <Slider {...settings}>
        {themes.map((val: any, key: any) => {
          return (
            <Box>
              <Card
                theme={val}
                w={width}
                key={key}
              />
              <Center color='black' mt='20px' fontWeight='bold'>
                回答期限　残り{calcTime(val.deadline)}時間
              </Center>
            </Box>
          )
        })}
      </Slider>
      <Box w='100%' m='0 auto' h='120px' mt='20px'>
        <Center h='100%' color='black' gap='20%'>
          <Box w='35%'>
            <Button w='100%' mb='10px' bg='black' color='white' borderRadius='20px'>
              <Icon as={IoWarningOutline} mr='2px' />
              あかん
            </Button><br />
            <Button w='100%' h='60px' bg='white' borderRadius='20px' border='1px solid black'>
              ちゃう
            </Button>
          </Box>
          <Button w='35%' h='110px' colorScheme='pink' borderRadius='30px' border='1px solid black'>
            ボケる
          </Button>
        </Center>
      </Box>
    </>
  )
}

export default Select
