import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";
import { answerDayCap } from 'constants/index';
import { User } from '.prisma/client';

const postAnswer = async (user: User) => {
  const resp = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      answerLeft: {
        increment: answerDayCap[user.level],
      }
    },
  })
  return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const resp = await postAnswer(req.body)
  console.log(resp);
  if(resp) {
      res.status(200).json({"message":"Added successfully"})
  } else {
      res.status(500).json({"message":"Sorry, Something went wrong"})
  }
};
export default handler;
