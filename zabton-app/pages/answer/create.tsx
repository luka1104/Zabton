import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { Box, Button, Center, theme } from '@chakra-ui/react'
import type { GetServerSideProps } from "next";
import prisma from 'lib/prisma'
import Select from 'components/answer/select'
import { Theme } from 'interfaces'
import InputForm from 'components/answer/input';
import Preview from 'components/answer/preview';
import Complete from 'components/answer/complete';
import { useRouter } from 'next/router'

type Props = {
  themes: Theme[]
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const themesRaw = await prisma.theme.findMany()
  const themes = JSON.parse(JSON.stringify(themesRaw)).reverse()
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
  const router = useRouter()
  const [step, setStep] = useState<number>(0)
  const [selectedTheme, setSelectedTheme] = useState<Theme>()
  const [contents, setContents] = useState<string>('')
  const [preview, setPreview] = useState<string>('')

  useEffect(() => {
    if(themes.length === 0 || !router) return
    if(router.query.id) {
      setSelectedTheme(themes.find(t => t.id === JSON.parse(router.query.id as string)))
      setStep(1)
    }
  }, [router, themes])

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
        ) : step === 3 ? (
          <Complete
            selectedTheme={selectedTheme!}
            contents={contents}
            preview={preview}
          />
        ) : null }
      </Box>
    </>
  )
}

export default Create
