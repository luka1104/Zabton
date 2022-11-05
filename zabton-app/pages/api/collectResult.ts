import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";
import { Validation } from 'interfaces'

const getValidation = async (themeId: number) => {
  const resp = await prisma.validation.findMany({
    where: {
      themeId: themeId,
    },
  });
  return resp
}

const assignPlace = async (answerId: number, place: number) => {
  const resp = await prisma.answer.update({
    where: {
      id: answerId,
    },
    data: {
      place: place,
    },
  });
  return resp
}


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const validations = await getValidation(req.body)
  console.log(validations);
  let answerIds = []
  validations.map((val: Validation, key: number) => {
    answerIds.push(val.answerId)
  })
  answerIds = Array.from(new Set(answerIds))
  let resultArr = []
  answerIds.map((val: number, key: number) => {
    resultArr.push([val, validations.filter(v => v.answerId === val).length])
  })
  resultArr.sort((first: any, second: any) => {
    return first[1] - second[1]
  })
  resultArr.reverse()
  const firstId = resultArr[0][0]
  // const secondId = resultArr[1][0]
  // const thirdId = resultArr[2][0]
  assignPlace(firstId, 1)
  // if(secondId) assignPlace(secondId, 2)
  // if(thirdId) assignPlace(thirdId, 3)
  res.status(200)
};
export default handler;
