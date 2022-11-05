import { NextPage } from 'next'
import React, { useState } from 'react'
import type { GetServerSideProps } from "next";
import prisma from 'lib/prisma'
import { Box } from '@chakra-ui/react'
import { Theme, Answer, User } from 'interfaces'
import Select from 'components/validate/select'
import Validation from 'components/validate/validation'
import Award from 'components/validate/award'
import Complete from 'components/validate/complete';

type Props = {
  themes: Theme[]
  answers: Answer[]
  users: User[]
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const themesRaw = await prisma.theme.findMany()
  const themes = JSON.parse(JSON.stringify(themesRaw))
  const answersRaw = await prisma.answer.findMany()
  const answers = JSON.parse(JSON.stringify(answersRaw))
  const usersRaw = await prisma.user.findMany()
  const users = JSON.parse(JSON.stringify(usersRaw))
  return {
    props: {
      themes,
      answers,
      users,
    },
  };
}
interface PropTypes {
  themes: Theme[]
  answers: Answer[]
  users: User[]
}

const Validate: NextPage<PropTypes> = ({ themes, answers, users }) => {
  const [step, setStep] = useState<number>(0)
  const [selectedTheme, setSelectedTheme] = useState<Theme>()
  const [imagePath, setImagePath] = useState<string>('')
  const [answerId, setAnswerId] = useState<number>(0)
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
          <Validation
            setStep={setStep}
            selectedTheme={selectedTheme!}
            imagePath={imagePath}
            setImagePath={setImagePath}
            answers={answers}
            setAnswerId={setAnswerId}
            users={users}
          />
        ) : step === 2 ? (
          <Complete
            selectedTheme={selectedTheme!}
            imagePath={imagePath}
            answers={answers}
            answerId={answerId}
          />
        ) : null }
      </Box>
    </>
  )
}

export default Validate
