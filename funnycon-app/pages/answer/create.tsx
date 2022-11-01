import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { Box, Button, Center } from '@chakra-ui/react'
import type { GetServerSideProps } from "next";
import prisma from 'lib/prisma'
import Select from 'components/answer/select'
import { Theme } from 'interfaces'
import InputForm from 'components/answer/input';
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
  const [selectedTheme, setSelectedTheme] = useState<Theme>()
  const [contents, setContents] = useState<string>('')
  const [preview, setPreview] = useState<string>('')

  return (
    <>
      <Box pt='60px'>
        {step === 0 ? (
          <Select
            themes={themes}
            setStep={setStep}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        ) : step === 1 ? (
          <InputForm
            selectedTheme={selectedTheme!}
            setSelectedTheme={setSelectedTheme}
            setStep={setStep}
            contents={contents}
            setContents={setContents}
            preview={preview}
            setPreview={setPreview}
          />
        ) : step === 2 ? (
          <Preview
            selectedTheme={selectedTheme!}
            setStep={setStep}
            contents={contents}
            preview={preview}
          />
        ) : null }
      </Box>
    </>
  )
}

export default Create
