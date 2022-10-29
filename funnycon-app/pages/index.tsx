import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import type { GetServerSideProps } from "next";
import prisma from 'lib/prisma'
import { Theme } from 'interfaces'
import { shuffleArray } from 'utils'
import Card from 'components/theme/card'

type Props = {
  themes: Theme[]
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const themesRaw = await prisma.theme.findMany()
  const themes = JSON.parse(JSON.stringify(themesRaw))
  return {
    props: {
      themes,
    },
  };
}

interface PropTypes {
  themes: Theme[]
}

const Home: NextPage<PropTypes> = ({ themes }) => {
  // const randThemes =  shuffleArray(themes)
  const [width, setWidth] = useState<number>(0)
  useEffect(() => {
    setWidth(window.innerWidth * 0.45)
  }, [])
  return (
    <>
      <Box mt='60px' color='black'>
        <SimpleGrid columns={2} spacing={5}>
          {themes.map((val: any, key: any) => {
            return (
              <Card
                theme={val}
                w={width}
                key={key}
              />
            )
          })}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default Home
