import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react'
import { Box, SimpleGrid, Center } from '@chakra-ui/react'
import { Theme } from 'interfaces'
// import { shuffleArray } from 'utils'
import Card from 'components/theme/card'

interface PropTypes {
  themes: Theme[]
  setStep: Function
  selectedTheme?: Theme
  setSelectedTheme: Function
}

const Select: NextPage<PropTypes> = ({ themes, setStep, selectedTheme, setSelectedTheme }) => {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    setWidth(window.innerWidth * 0.5)
  }, [])

  useEffect(() => {
    console.log(selectedTheme);
    if(!selectedTheme) return
    setStep(1)
  }, [selectedTheme])

  return (
    <>
      <Box mt='60px' color='black'>
        <Center color='black' pt='20px' fontWeight='bold' fontSize='2xl'>
          どのお題を評価する？
        </Center>
        <SimpleGrid pt='20px' columns={2} spacing={2}>
          {themes.map((val: any, key: any) => {
            return (
              <Box onClick={() => {setSelectedTheme(val)}}>
                <Card
                  theme={val}
                  w={width}
                  key={key}
                />
              </Box>
            )
          })}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default Select
