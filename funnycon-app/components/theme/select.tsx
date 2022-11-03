import React from 'react'
import Image from 'next/image'
import { Box, Center, SimpleGrid } from '@chakra-ui/react'
import imageOnly from 'assets/images/imageOnly.png'
import imageText from 'assets/images/imageText.png'
import TextOnly from 'assets/images/TextOnly.png'

interface Props {
  setStep: Function
  setSelectedType: Function
}

const Select: React.FC<Props> = ({ setStep, setSelectedType }) => {
  const handleSelect = (type: number) => {
    if(!type) return
    setSelectedType(type)
    setStep(1)
  }
  return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='2xl'>
          お題のフォーマットを選んでね
        </Center>
        <Center mt='20px'>
          <SimpleGrid columns={2} spacing={5}>
            <Box>
              <Image
                src={imageOnly}
                alt="image only"
                onClick={() => {handleSelect(1)}}
              />
              <Center mt='10px' fontWeight='bold' fontSize='xl' color='black'>
                画像のみ
              </Center>
            </Box>
            <Box>
              <Image
                src={TextOnly}
                alt="text only"
                onClick={() => {handleSelect(2)}}
              />
              <Center mt='10px' fontWeight='bold' fontSize='xl' color='black'>
                文字のみ
              </Center>
            </Box>
            <Box>
              <Image
                src={imageText}
                alt="image text"
                onClick={() => {handleSelect(3)}}
              />
              <Center mt='10px' fontWeight='bold' fontSize='xl' color='black'>
                画像＆文字
              </Center>
            </Box>
          </SimpleGrid>
        </Center>
      </Box>
    </>
  )
}

export default Select
