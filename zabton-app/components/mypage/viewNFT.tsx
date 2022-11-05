import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Box, Center, Icon, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getStorageFileURL } from 'supabase/storage'

interface Props {
  val: any
}

const ViewNFT: React.FC<Props> = ({ val }) => {
  const ruoter = useRouter()
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
      <Center pt='80px'>
        <Box w={window.innerWidth} h={window.innerWidth} bg='white' border='2px solid black' position='relative'>
          <Center w='100%' h='100%' position='relative'>
            <Image
              src={imagePath}
              alt="preview"
              fill={true}
              style={{objectFit: "contain"}}
            />
          </Center>
          <Center color='black' mt='5px' fontWeight='bold' fontSize='4xl'>
            {val.contents}
          </Center>
          <Center color='black' mt='80px' fontWeight='bold' fontSize='md'>
            {val.place}位 | {`${val.date.slice(0,4)}.${val.date.slice(5,7)}.${val.date.slice(9,10)}`} | ZABTON
          </Center>
          <Center>
            <Button
              color='black'
              bg='white'
              border='1px solid black'
              borderRadius='30px'
              w='90%'
              h='60px'
              fontSize='xl'
              mt='30px'
              onClick={() => {ruoter.push('/mypage')}}
            >
              マイページに戻る
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  )
}

export default ViewNFT
