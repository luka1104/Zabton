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

const assignPlaces = async (resultArr: any[]) => {
  switch(resultArr.length) {
    case 0:
      break;
    case 1:
      await assignPlace(resultArr[0][0], 1)
      break;
    case 2:
      await assignPlace(resultArr[0][0], 1)
      await assignPlace(resultArr[1][0], 2)
      break;
    default:
      await assignPlace(resultArr[0][0], 1)
      await assignPlace(resultArr[1][0], 2)
      await assignPlace(resultArr[2][0], 3)
      break;
  }
  return true
}

const updateTheme = async (id: number, contents?: string[]) => {
  const resp = await prisma.theme.update({
    where: {
      id: id,
    },
    data: {
      isFinished: true,
      // answers: contents,
    }
  });
  return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const validations = await getValidation(req.body.themeId)
  console.log(validations);
  let answerIds = []
  validations.map((val: Validation, key: number) => {
    answerIds.push(val.answerId)
  })
  answerIds = Array.from(new Set(answerIds))
  let resultArr = []
  // let answerContents = []
  answerIds.map((val: number, key: number) => {
    resultArr.push([val, validations.filter(v => v.answerId === val).length])
  })
  resultArr.sort((first: any, second: any) => {
    return first[1] - second[1]
  })
  resultArr.reverse()
  // resultArr.map((val: any, key: any) => {
  //   answerContents.push([req.body.answers.find(a => a.id === val).contents])
  // })
  // console.log(answerContents);
  await assignPlaces(resultArr)
  return new Promise((resolve, reject) => {
    updateTheme(req.body.themeId)
      .then(response => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.end(JSON.stringify(response));
        resolve(response);
      })
      .catch(error => {
        res.json(error);
        res.status(405).end();
        reject();
      });
  });
};
export default handler;
