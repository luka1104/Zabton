import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { Box, Center, Icon, Button, Select } from '@chakra-ui/react'
import { AiOutlineLeft } from 'react-icons/ai'
import axios from 'axios'
import { uploadStorage } from 'supabase/storage'
import { AccountContext } from 'contexts/account'

interface Props {
  setStep: Function
  selectedType: number
  image?: Blob
  contents?: string
}

const Preview: React.FC<Props> = ({ setStep, selectedType, image, contents }) => {
  const { user } = useContext(AccountContext)
  const [preview, setPreview] = useState<string>('')
  const [deadline, setDeadline] = useState<number>(2)

  const handleUploadStorage = async (image: Blob | null) => {
    if (!image) return
    const { pathname } = await uploadStorage({
      image,
      bucketName: "themeimage",
    })
    if (pathname) console.debug({ pathname })
    return pathname
  }

  const calcDeadline = () => {
    var time = new Date
    switch (deadline) {
      case 1:
        time.setHours(time.getHours() + 3)
        break;
      case 2:
        time.setDate(time.getDate() + 1)
        break;
      case 3:
        time.setDate(time.getDate() + 3)
        break;
      case 4:
        time.setDate(time.getDate() + 7)
        break;
      default:
        time
    }
    return time
  }

  const handleSubmit = async () => {
    if(!user) return
    const deadlineDateTime = calcDeadline()
    if(image) {
      const pathname = await handleUploadStorage(image)
      const data = {
        'userId': user.id,
        'contents': contents ? contents : '',
        'imagePath': pathname,
        'type': selectedType,
        'deadline': deadlineDateTime,
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      console.log(data)
      return new Promise((resolve, reject) => {
        axios.post('/api/postTheme', data, config)
        .then(response => {
          if(response.status !== 200) throw Error("Server error")
          resolve(response)
          window.location.replace('/')
        })
        .catch(e => {
          reject(e);
          throw Error("Server error:" + e)
        })
      })
    } else {
      const data = {
        'userId': user.id,
        'contents': contents,
        'type': selectedType,
        'deadline': deadlineDateTime,
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      console.log(data);
      return new Promise((resolve, reject) => {
        axios.post('/api/postTheme', data, config)
        .then(response => {
          if(response.status !== 200) throw Error("Server error")
          resolve(response)
          window.location.replace('/')
        })
        .catch(e => {
          reject(e)
          throw Error("Server error:" + e)
        })
      })
    }
  }

  useEffect(() => {
    if(!image) return
    setPreview(window.URL.createObjectURL(image))
  }, [image])

  return (
    <>
      <Box pt='80px'>
        {selectedType === 1 ? (
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
        ) : selectedType === 2 ? (
          <>
            <Box w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black' >
              <Center w='100%' h='100%' fontWeight='bold' fontSize='30px' textAlign='center' color='black'>
                {contents}
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
                {contents}
              </Box>
            </Box>
          </>
        )}
        <Center color='black' mt='20px' fontSize='20px' fontWeight='bold' gap='5'>
          回答期限
          <Select
            placeholder='期限を選択'
            w='40%'
            bg='white'
            fontWeight='bold'
            value={deadline}
            onChange={(e) => {setDeadline(JSON.parse(e.target.value))}}
          >
            <option value='1'>1時間</option>
            <option value='2'>24時間</option>
            <option value='3'>3日間</option>
            <option value='4'>1週間</option>
          </Select>
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