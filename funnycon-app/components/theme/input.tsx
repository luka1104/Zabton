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
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='2xl'>
        <Icon position='absolute' left='20px' float='left' as={AiOutlineLeft} onClick={() => {setStep(0)}} />
          お題を作成
        </Center>
        {selectedType === 1 ? (
          <>
            <Center color='black' mt='20px' fontWeight='bold' fontSize='xl' mb='10px'>
              画像を選択
            </Center>
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
              <Image
                src={preview ? preview : inputForm}
                alt="image form"
                width={window.innerWidth}
                height={window.innerHeight}
                //@ts-ignore
                onClick={() => {preview ? null : inputRef.current.click()}}
              />
              <Icon
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
                colorScheme='pink'
                w='40%'
                mt='30px'
                onClick={() => {setStep(2)}}
              >
                次へ
              </Button>
            </Center>
          </>
        ) : selectedType === 2 ? (
          <>
            <Center color='black' mt='40px' fontWeight='bold' fontSize='xl' mb='20px'>
              文字を入力
            </Center>
            <Center>
              <Input
                color='black'
                bg='white'
                placeholder={placeHolder}
                type='text'
                w='80%'
                value={contents}
                onFocus={() => {setPlaceHolder('お題を入力')}}
                onBlur={() => {setPlaceHolder('Aa')}}
                onChange={(e) => {setContents(e.target.value)}}
              />
            </Center>
            <Center>
              <Button
                disabled={!contents}
                colorScheme='pink'
                w='40%'
                mt='30px'
                onClick={() => {setStep(2)}}
              >
                次へ
              </Button>
            </Center>
          </>
        ) : (
          <>
            <Center color='black' mt='20px' fontWeight='bold' fontSize='xl' mb='10px'>
              画像を選択
            </Center>
            <Input
              hidden
              type='file'
              ref={inputRefText}
              onChange={(e) => {
                uploadImage(e)
                previewImage(e)
              }}
            />
            <Box position='relative'>
              <Image
                src={preview ? preview : inputForm}
                alt="image form"
                width={window.innerWidth}
                height={window.innerHeight}
                //@ts-ignore
                onClick={() => {preview ? null : inputRefText.current.click()}}
              />
              <Icon
                display={preview ? 'block' : 'none'}
                position='absolute'
                top='10px'
                right='10px'
                fontSize='3xl'
                as={AiOutlineCloseCircle}
                onClick={() => {setPreview(''), setImage('')}}
              />
            </Box>
            <Center color='black' mt='20px' fontWeight='bold' fontSize='xl' mb='10px'>
              文字を入力
            </Center>
            <Center>
              <Input
                color='black'
                bg='white'
                placeholder={placeHolder}
                type='text'
                w='80%'
                value={contents}
                onFocus={() => {setPlaceHolder('お題を入力')}}
                onBlur={() => {setPlaceHolder('Aa')}}
                onChange={(e) => {setContents(e.target.value)}}
              />
            </Center>
            <Center>
              <Button
                disabled={!image || !contents}
                colorScheme='pink'
                w='40%'
                mt='30px'
                onClick={() => {setStep(2)}}
              >
                次へ
              </Button>
            </Center>
          </>
        )}
      </Box>
    </>
  )
}

export default InputForm
