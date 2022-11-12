import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";
import { User } from 'interfaces';
import { expRequired, themeDayCap, answerDayCap, validateDayCap } from 'constants/index';

const levelUp = async (user: User) => {
  const resp = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      level: {
        increment: 1,
      },
      exp: {
        increment: - expRequired[user.level]
      },
      themeLeft: themeDayCap[user.level + 1],
      themeLimit: themeDayCap[user.level + 1],
      answerLeft: answerDayCap[user.level + 1],
      answerLimit: answerDayCap[user.level + 1],
      validateLeft: validateDayCap[user.level + 1],
      validateLimit: validateDayCap[user.level + 1],
    },
  })
  return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const resp = await levelUp(req.body)
  console.log(resp);
  if(resp) {
      res.status(200).json({"message":"Added successfully"})
  } else {
      res.status(500).json({"message":"Sorry, Something went wrong"})
  }
};
export default handler;
