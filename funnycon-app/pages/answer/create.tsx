import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { Box, Button, Center } from '@chakra-ui/react'
import type { GetServerSideProps } from "next";
import prisma from 'lib/prisma'
import Select from 'components/answer/select'
import { Theme } from 'interfaces'
import Input from 'components/answer/input';
import Preview from 'components/answer/preview';

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

const Create: NextPage<PropTypes> = ({ themes }) => {
  const [step, setStep] = useState<number>(0)

  return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='2xl'>
          どのお題でボケる？
        </Center>
        <Box>
          {step === 0 ? (
            <Select themes={themes} />
          ) : step === 1 ? (
            <Input />
          ) : step === 2 ? (
            <Preview />
          ) : null }
        </Box>
      </Box>
    </>
  )
}

export default Create
