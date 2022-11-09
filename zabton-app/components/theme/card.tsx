import React, { useState, useCallback, useEffect } from 'react'
import { Box, Center, Icon, Button, Image } from '@chakra-ui/react'
import { Theme } from 'interfaces'
import { getStorageFileURL } from 'supabase/storage'
import { getFontSize } from 'utils'

interface Props {
  theme: Theme
  w: number
  notFinished?: string
}
const Card: React.FC<Props> = ({ theme, w, notFinished }) => {
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

  if(theme.type !== 2 && !imagePath) return (
    <></>
  )

  if(theme) return (
    <>
      <Center>
        <Box w={w} h={w} bg='white' border={notFinished === undefined || notFinished === 'true' ? '2px solid black' : '2px solid #F345BE' } position='relative'>
          {notFinished === 'false' ? (
            <Center top='0' right='0' w='40%' h='20px' bg='#F345BE' color='white' position='absolute' zIndex='overlay' fontSize='12px' fontWeight='bold' borderBottomLeftRadius='10px'>
              結果を見る
            </Center>
          ) : null }
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
                <Center w={w} h={w} color='black' fontWeight='bold' fontSize='23px' p='10px' textAlign='center'>
                  {theme.contents}
                </Center>
              </Box>
            </>
          ) : theme.type === 3 ? (
            <>
              <Box>
                <Center w='100%' h='100%' position='relative'>
                  <Image
                    src={imagePath ? imagePath : 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=82a1493bfjwdf7s60z91zdcn2shhelixehwbsbke650n3kxp&rid=200w.gif&ct=g'}
                    alt="preview"
                    maxH={w * 0.85}
                  />
                </Center>
                <Box
                  color='black'
                  w='100%'
                  h='100%'
                  fontWeight='bold'
                  fontSize='15px'
                  textAlign='center'
                  position='absolute'
                >
                  {theme.contents}
                </Box>
              </Box>
            </>
          ) : null}
        </Box>
      </Center>
    </>
  )

  return (
    <></>
  )
}

export default Card
