import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react'
import { Box, SimpleGrid, Center } from '@chakra-ui/react'
import type { GetServerSideProps } from "next";
import prisma from 'lib/prisma'
import { Answer, Theme, Validation } from 'interfaces'
import { getRandNum } from 'utils'
import Card from 'components/theme/card'
import AnswerCard from 'components/index/answerCard';
import { checkDeadline, calcPlace } from 'utils'
import { useRouter } from 'next/router'

type Props = {
  themes: Theme[]
  answers: Answer[]
  validations: Validation[]
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const themesRaw = await prisma.theme.findMany()
  const themes = JSON.parse(JSON.stringify(themesRaw)).reverse()
  const answersRaw = await prisma.answer.findMany()
  const answers = JSON.parse(JSON.stringify(answersRaw)).reverse()
  const validationsRaw = await prisma.validation.findMany()
  const validations = JSON.parse(JSON.stringify(validationsRaw)).reverse()
  return {
    props: {
      themes,
      answers,
      validations,
    },
  };
}

interface PropTypes {
  themes: Theme[]
  answers: Answer[]
  validations: Validation[]
}

const Home: NextPage<PropTypes> = ({ themes, answers, validations }) => {
  const router = useRouter()
  const [width, setWidth] = useState<number>(0)
  const [answerIds, setAnswerIds] = useState<any>([])
  // const [randAnswer, setRandAnswer] = useState<Answer>()
  // const [answersLeft, setAnswersLeft] = useState<Answer[]>([])
  useEffect(() => {
    setWidth(window.innerWidth * 0.45)
  }, [])

  useEffect(() => {
    setAnswerIds(calcPlace(validations).slice(0, 6));
  }, [validations])

  // useEffect(() => {
  //   const rand = getRandNum(answers.length)
  //   setRandAnswer(answers[rand])
  //   setAnswersLeft(answers.filter(i => i !== answers[rand]))
  // }, [answers])
  return (
    <>
      <Box mt='60px' pb='20px' color='black'>
        {/* <Box pt='10px' pb='20px'>
          {randAnswer && themes && (
            <AnswerCard theme={themes.find(t => t.id === randAnswer.themeId)} answer={randAnswer} w={window.innerWidth} />
          )}
        </Box> */}
        <Center pt='20px' fontSize='25px' fontWeight='bold'>
          Popular
        </Center>
        <Box pt='10px' pb='20px'>
          <SimpleGrid columns={2} spacing={5}>
            {answerIds.map((val: any, key: number) => {
              let answer = answers.find(a => a.id === val[0])
              let theme = themes.find(t => t.id === answer.themeId)
              return (
                <Box key={key} onClick={() => {router.push(`/answer/view?id=${answer.id}&themeId=${theme.id}`)}}>
                  <AnswerCard theme={theme} answer={answer} w={width} />
                </Box>
              )
            })}
          </SimpleGrid>
        </Box>
        <Center pt='20px' pb='20px' fontSize='25px' fontWeight='bold'>
          New
        </Center>
        <SimpleGrid pb='40px' columns={2} spacing={5}>
          {themes.slice(0, 6).map((val: Theme, key: number) => {
            return (
              <Box key={key} onClick={() => {checkDeadline(val.deadline) ? router.push(`/answer/create?id=${val.id}`) : ''}}>
                <Card
                  theme={val}
                  w={width}
                />
              </Box>
            )
          })}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default Home
