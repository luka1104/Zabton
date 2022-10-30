import { NextPage } from 'next'
import Image from 'next/image'
import React, { useState, useRef, useCallback } from 'react'
import { Box, Center, Icon, Input, Button } from '@chakra-ui/react'
import { AiOutlineLeft, AiOutlineCloseCircle } from 'react-icons/ai'
import inputForm from '../../assets/images/inputForm.png'

interface Props {
  setStep: Function
  selectedType: number
  setImage: Function
  image: string
  setPreview: Function
  preview: string
  setContents: Function
  contents: string
}

const InputForm: NextPage<Props> = ({ setStep, selectedType, setImage, image, setPreview, preview, setContents, contents }) => {
  const [placeHolder, setPlaceHolder] = useState<string>('Aa')
  const inputRef = useRef(null)
  const inputRefText = useRef(null)

  const uploadImage = useCallback((e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  const previewImage = useCallback((e: any) => {
    const file = e.target.files[0]
    if(!file) return
    setPreview(window.URL.createObjectURL(file))
  }, [])

  return (
    <>
      <Box pt='80px'>
        {selectedType === 1 ? (
          <>
            <Input
              hidden
              type='file'
              ref={inputRef}
              onChange={(e) => {
                uploadImage(e)
                previewImage(e)
              }}
            />
            <Box position='relative'>
              <Box w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black'>
                <Center w='100%' h='100%'>
                <Image
                    src={preview ? preview : inputForm}
                    alt="image form"
                    width={window.innerWidth}
                    height={window.innerWidth}
                    //@ts-ignore
                    onClick={() => {preview ? null : inputRef.current.click()}}
                  />
                </Center>
              </Box>
              <Icon
                color='black'
                display={preview ? 'block' : 'none'}
                position='absolute'
                top='10px'
                right='10px'
                fontSize='3xl'
                as={AiOutlineCloseCircle}
                onClick={() => {setPreview('')}}
              />
            </Box>
            <Center>
              <Button
                disabled={!image}
                color='black'
                bg='white'
                border='1px solid black'
                borderRadius='30px'
                w='80%'
                h='60px'
                fontSize='xl'
                mt='30px'
                mb='30px'
                onClick={() => {setStep(2)}}
              >
                確認画面へ
              </Button>
            </Center>
          </>
        ) : selectedType === 2 ? (
          <>
            <Center color='black'>
              <Input
                color='black'
                bg='white'
                _placeholder={{
                  color: 'gray'
                }}
                placeholder={placeHolder}
                type='text'
                w={window.innerWidth}
                h={window.innerWidth}
                value={contents}
                border='1px solid black'
                borderRadius='0px'
                fontSize='30px'
                fontWeight='bold'
                textAlign='center'
                onFocus={() => {setPlaceHolder('お題を入力')}}
                onBlur={() => {setPlaceHolder('Aa')}}
                onChange={(e) => {setContents(e.target.value)}}
              />
            </Center>
            <Center>
              <Button
                disabled={!contents}
                color='black'
                bg='white'
                border='1px solid black'
                borderRadius='30px'
                w='80%'
                h='60px'
                fontSize='xl'
                mt='30px'
                mb='30px'
                onClick={() => {setStep(2)}}
              >
                確認画面へ
              </Button>
            </Center>
          </>
        ) : (
          <>
            <Input
              hidden
              type='file'
              ref={inputRefText}
              onChange={(e) => {
                uploadImage(e)
                previewImage(e)
              }}
            />
            <Box position='relative' w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black'>
              <Center>
                <Image
                  src={preview ? preview : inputForm}
                  alt="image form"
                  width={window.innerWidth * 0.8}
                  height={window.innerWidth * 0.8}
                  //@ts-ignore
                  onClick={() => {preview ? null : inputRefText.current.click()}}
                />
                <Icon
                  display={preview ? 'block' : 'none'}
                  color='black'
                  position='absolute'
                  top='10px'
                  right='10px'
                  fontSize='3xl'
                  as={AiOutlineCloseCircle}
                  onClick={() => {setPreview(''), setImage('')}}
                />
              </Center>
              <Box
                w='100%'
                h='100%'
                position='absolute'
              >
                <Input
                  color='black'
                  fontWeight='bold'
                  fontSize='19px'
                  bg='white'
                  placeholder={placeHolder}
                  type='text'
                  textAlign='center'
                  h={window.innerWidth * 0.19}
                  w='100%'
                  value={contents}
                  onFocus={() => {setPlaceHolder('お題を入力')}}
                  onBlur={() => {setPlaceHolder('Aa')}}
                  onChange={(e) => {setContents(e.target.value)}}
                />
              </Box>
            </Box>
            <Center>
              <Button
                disabled={!image || !contents}
                color='black'
                bg='white'
                border='1px solid black'
                borderRadius='30px'
                w='80%'
                h='60px'
                fontSize='xl'
                mt='30px'
                mb='30px'
                onClick={() => {setStep(2)}}
              >
                確認画面へ
              </Button>
            </Center>
          </>
        )}
      </Box>
    </>
  )
}

export default InputForm
