import React, { useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Box, Center, Text, Button } from '@chakra-ui/react'
import { Answer, Theme } from 'interfaces'
import { getStorageFileURL } from 'supabase/storage'

interface Props {
  theme: Theme
  answer: Answer
  w: number
  imagePath: string
  setImagePath: Function
}

const Card: React.FC<Props> = ({ theme, answer, w, imagePath, setImagePath }) => {

  const handleRenderImage = useCallback(async () => {
    if (!theme.imagePath) return;
    const path = await getStorageFileURL({
      bucketName: "themeimage",
      pathName: theme.imagePath,
    });
    if (!path) return;
    setImagePath(path);
  }, []);

  useEffect(() => {
    if(theme.type === 2) return
    handleRenderImage()
  }, [theme])

  if(w === 0) return (
    <></>
  )

  if(!answer) return (
    <>loading</>
  )

  return (
    <>
      <Box mt='20px'>
        <Center w={w} h={w} m='0 auto' bg='white' border='2px solid black'>
          {theme.type === 1 ? (
            <Center w='100%' h='100%' position='relative'>
              <Image
                src={imagePath}
                alt="preview"
                fill={true}
                style={{objectFit: "contain"}}
              />
            </Center>
          ) : theme.type === 2 ? (
            <>
              <Box>
                <Center w={w} h={w} color='black' fontWeight='bold' fontSize='30px' textAlign='center'>
                  {theme.contents}
                </Center>
              </Box>
            </>
          ) : theme.type === 3 ? (
            <>
              <Box position='relative'>
                <Center>
                  <Image
                    src={imagePath}
                    alt="preview"
                    width={w * 0.8}
                    height={w * 0.8}
                  />
                </Center>
                <Box
                  color='black'
                  w='100%'
                  h='100%'
                  p='5%'
                  fontWeight='bold'
                  fontSize='19px'
                  textAlign='center'
                  position='absolute'
                >
                  {theme.contents}
                </Box>
              </Box>
            </>
          ) : null}
        </Center>
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
          {answer.contents}
        </Text>
      </Box>
    </>
  )
}

export default Card
