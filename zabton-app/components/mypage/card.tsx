import React, { useState, useCallback, useEffect } from 'react'
import { Box, Center, Icon, Button, Image } from '@chakra-ui/react'
import { Theme } from 'interfaces'
import { getStorageFileURL } from 'supabase/storage'

interface Props {
  val: any
}

const Card: React.FC<Props> = ({ val }) => {
  const [imagePath, setImagePath] = useState<string>('')

  const handleRenderImage = useCallback(async () => {
    if (val === undefined || !val.imagePath) return;
    const path = await getStorageFileURL({
      bucketName: "themeimage",
      pathName: val.imagePath,
    });
    if (!path) return;
    setImagePath(path);
  }, []);

  useEffect(() => {
    console.log(val);
    if(val === undefined) return
    if(val.imagePath) handleRenderImage()
  }, [val])

  useEffect(() => {
    console.log(imagePath);
  }, [imagePath])

  if(!val) return (
    <>loading...</>
  )
  return (
    <>
      <Center>
        <Box w={window.innerWidth * 0.5} h={window.innerWidth * 0.5} bg='white' border='2px solid black' position='relative'>
          <Center w='100%' h='100%' position='relative'>
            <Image
              src={imagePath ? imagePath : 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=82a1493bfjwdf7s60z91zdcn2shhelixehwbsbke650n3kxp&rid=200w.gif&ct=g'}
              alt="preview"
              maxH={window.innerWidth * 0.49}
            />
          </Center>
          <Center color='black' mt='5px' fontWeight='bold' fontSize='xl'>
            {val.contents}
          </Center>
        </Box>
      </Center>
    </>
  )
}

export default Card
