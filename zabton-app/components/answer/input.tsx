import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Box, Center, Icon, Input, Button } from '@chakra-ui/react'
import { Theme } from 'interfaces'
import { getStorageFileURL } from 'supabase/storage'

interface PropTypes {
  selectedTheme: Theme
  setSelectedTheme: Function
  setStep: Function
  contents: string
  setContents: Function
  preview: string
  setPreview: Function
}

const InputForm: React.FC<PropTypes> = ({ selectedTheme, setSelectedTheme, setStep, contents, setContents, preview, setPreview }) => {

  const handleRenderImage = useCallback(async () => {
    if (!selectedTheme.imagePath) return;
    const path = await getStorageFileURL({
      bucketName: "themeimage",
      pathName: selectedTheme.imagePath,
    });
    if (!path) return;
    setPreview(path);
  }, []);

  useEffect(() => {
    if(selectedTheme.type === 2) return
    console.log('aaa');
    handleRenderImage()
  }, [selectedTheme])

  if(!selectedTheme) return (
    <>loading</>
  )

  if(selectedTheme.type !== 2 && !preview) return (
    <>loading</>
  )

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
        <Input
          mt='10px'
          w={window.innerWidth}
          h='80px'
          bg='white'
          color='black'
          border='2px solid black'
          borderRadius='0'
          fontSize='30px'
          textAlign='center'
          fontWeight='bold'
          value={contents}
          onChange={(e) => {setContents(e.target.value)}}
        />
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
            onClick={() => {setStep(0), setSelectedTheme()}}
          >
            戻る
          </Button>
          <Button
            disabled={!contents}
            color='black'
            bg='white'
            border='1px solid black'
            borderRadius='30px'
            w='40%'
            h='60px'
            fontSize='xl'
            mt='30px'
            mb='30px'
            onClick={() => {setStep(2)}}
          >
            確認画面へ
          </Button>
        </Center>
      </Box>
    </>
  )
}

export default InputForm
