import type { NextPage } from 'next';
import React from 'react'
import { Box } from '@chakra-ui/react'
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
  const randThemes =  shuffleArray(themes)
  console.log(randThemes);
  return (
    <>
      <Box mt='60px' color='black'>
        {randThemes.map((val: any, key: any) => {
          return (
            <Card
              theme={val}
              key={key}
            />
          )
        })}
      </Box>
    </>
  );
}

export default Home
