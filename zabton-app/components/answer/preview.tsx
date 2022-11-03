import React, { useContext } from 'react'
import Image from 'next/image'
import { Box, Center, Text, Button } from '@chakra-ui/react'
import { Theme } from 'interfaces'
import axios from 'axios'
import { AccountContext } from 'contexts/account'

interface PropTypes {
  selectedTheme: Theme
  setStep: Function
  contents: string
  preview: string
}

const Preview: React.FC<PropTypes> = ({ selectedTheme, setStep, contents, preview }) => {
  const { user } = useContext(AccountContext)

  const handleSubmit = async () => {
    if(!user) return
    const data = {
      'userId': user.id,
      'themeId': selectedTheme.id,
      'contents': contents ? contents : '',
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    console.log(data)
    return new Promise((resolve, reject) => {
      axios.post('/api/postAnswer', data, config)
      .then(response => {
        if(response.status !== 200) throw Error("Server error")
        resolve(response)
        setStep(3)
      })
      .catch(e => {
        reject(e);
        throw Error("Server error:" + e)
      })
    })
  }

  return (
    <>
      <Box pt='20px'>
        {selectedTheme.type === 1 ? (
          <>
            <Box w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black'>
              <Center w='100%' h='100%'>
                <Image
                  src={preview}
                  alt="preview"
                  width={window.innerWidth}
                  height={window.innerWidth}
                />
              </Center>
            </Box>
          </>
        ) : selectedTheme.type === 2 ? (
          <>
            <Box w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black' >
              <Center w='100%' h='100%' fontWeight='bold' fontSize='30px' textAlign='center' color='black'>
                {selectedTheme.contents}
              </Center>
            </Box>
          </>
        ) : (
          <>
            <Box position='relative' w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black'>
              <Center>
                <Image
                  src={preview}
                  alt="preview"
                  width={window.innerWidth * 0.8}
                  height={window.innerWidth * 0.8}
                />
              </Center>
              <Box
                w='100%'
                h='100%'
                p='5%'
                color='black'
                fontWeight='bold'
                fontSize='19px'
                textAlign='center'
                position='absolute'
              >
                {selectedTheme.contents}
              </Box>
            </Box>
          </>
        )}
        <Text
          mt='10px'
          w={window.innerWidth}
          h='80px'
          color='black'
          borderRadius='0'
          fontSize='30px'
          textAlign='center'
          fontWeight='bold'
        >
          {contents}
        </Text>
        <Center color='black' w={window.innerWidth} fontWeight='bold'>
          {/* 実際の数値入れる */}
          残りボケ数　2/4 → 1/4
        </Center>
        <Center gap='10'>
          <Button
            color='black'
            bg='white'
            border='1px solid black'
            borderRadius='30px'
            w='40%'
            h='60px'
            fontSize='xl'
            mt='30px'
            mb='30px'
            onClick={() => {setStep(1)}}
          >
            戻る
          </Button>
          <Button
            color='black'
            bg='white'
            border='1px solid black'
            borderRadius='30px'
            w='40%'
            h='60px'
            fontSize='xl'
            mt='30px'
            mb='30px'
            onClick={handleSubmit}
          >
            確定
          </Button>
        </Center>
      </Box>
    </>
  )
}

export default Preview
