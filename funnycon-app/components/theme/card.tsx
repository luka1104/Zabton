import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Box, Center, Icon, Button } from '@chakra-ui/react'
import { Theme } from 'interfaces'
import { getStorageFileURL } from 'supabase/storage'

interface Props {
  theme: Theme
}
const Card: React.FC<Props> = ({ theme }) => {
  const [imagePath, setImagePath] = useState<string>('')
  const [width, setWidth] = useState<number>(0)

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
    handleRenderImage()
    setWidth(window.innerWidth)
  }, [])

  if(width === 0) return (
    <></>
  )

  return (
    <>
      <Box mt='20px'>
        {theme.type === 1 ? (
          <>
            <Image
              src={imagePath}
              alt="preview"
              width={window.innerWidth}
              height={window.innerHeight}
            />
          </>
        ) : theme.type === 2 ? (
          <>
            <Box w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black' >
              <Center w='100%' h='100%' fontWeight='bold' fontSize='30px' textAlign='center'>
                {theme.contents}
              </Center>
            </Box>
          </>
        ) : (
          <>
            <Box position='relative'>
              <Image
                src={imagePath}
                alt="preview"
                width={window.innerWidth}
                height={window.innerHeight}
              />
              <Box
                w='100%'
                h='100%'
                p='5%'
                fontWeight='bold'
                fontSize='30px'
                textAlign='center'
                position='absolute'
                top={window.innerWidth - 160}
              >
                {theme.contents}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}

export default Card
