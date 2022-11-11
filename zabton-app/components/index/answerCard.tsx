import React, { useCallback, useEffect, useState } from 'react'
import { Box, Center, Text, Button, Image } from '@chakra-ui/react'
import { Answer, Theme } from 'interfaces'
import { getStorageFileURL } from 'supabase/storage'
import { getFontSize } from 'utils'

interface Props {
  theme: Theme
  answer: Answer
  w: number
}

const AnswerCard: React.FC<Props> = ({ theme, answer, w }) => {
  const [imagePath, setImagePath] = useState<string>('')

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

  if(!answer || !theme) return (
    <>loading</>
  )

  return (
    <>
      <Box mt='20px'>
        <Box w={w} h={w} m='0 auto' bg='white' border='2px solid black'>
          {theme.type === 1 ? (
            <Center w='100%' h='100%' position='relative'>
              <Image
                src={imagePath ? imagePath : 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=82a1493bfjwdf7s60z91zdcn2shhelixehwbsbke650n3kxp&rid=200w.gif&ct=g'}
                alt="preview"
                maxH={w * 0.99}
              />
            </Center>
          ) : theme.type === 2 ? (
            <>
              <Box>
                <Center w={w} h={w} color='black' fontWeight='bold' fontSize={w === window.innerWidth ? '30px' : '19px'} p='10px' textAlign='center'>
                  {theme.contents}
                </Center>
              </Box>
            </>
          ) : theme.type === 3 ? (
            <>
              <Box w='100%' h='80%' position='relative'>
                <Center>
                  <Image
                    src={imagePath ? imagePath : 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=82a1493bfjwdf7s60z91zdcn2shhelixehwbsbke650n3kxp&rid=200w.gif&ct=g'}
                    alt="preview"
                    maxH={getFontSize(theme.contents) ? w * 0.85 : w * 0.70}
                  />
                </Center>
                <Box
                  color='black'
                  w='100%'
                  h='100%'
                  // p='5px'
                  fontWeight='bold'
                  fontSize={w === window.innerWidth ? '19px' : '15px'}
                  textAlign='center'
                  position='absolute'
                >
                  {theme.contents}
                </Box>
              </Box>
            </>
          ) : null}
        </Box>
        <Text
          mt='10px'
          w={w}
          // h='80px'
          color='black'
          borderRadius='0'
          fontSize={w === window.innerWidth ? '30px' : '19px'}
          textAlign='center'
          fontWeight='bold'
        >
          {answer.contents}
        </Text>
      </Box>
    </>
  )
}

export default AnswerCard
