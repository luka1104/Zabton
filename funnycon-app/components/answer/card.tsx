import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Box, Center, Icon, Button } from '@chakra-ui/react'
import { Theme } from 'interfaces'
import { getStorageFileURL } from 'supabase/storage'

interface Props {
  theme: Theme
  w: number
}
const Card: React.FC<Props> = ({ theme, w }) => {
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
      <Center mt='20px'>
        <Box w={w} h={w} bg='white' border='2px solid black'>
          {theme.type === 1 ? (
            <Center h={w}>
              <Image
                src={imagePath}
                alt="preview"
                width={w}
                height={w}
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
        </Box>
      </Center>
    </>
  )

  return (
    <></>
  )
}

export default Card
