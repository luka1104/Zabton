import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";

const postAnswer = async (data: any) => {
  const resp = await prisma.answer.create({
    data: {
      userId: data.userId,
      themeId: data.themeId,
      contents: data.contents,
    },
  });
  if(resp) await prisma.user.update({
    where: {
      id: data.userId,
    },
    data: {
      answerLeft: {
        increment: -1,
      },
      exp: {
        increment: 5,
      },
    },
  })
  return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const data = {
    userId: req.body.userId,
    themeId: req.body.themeId,
    contents: req.body.contents,
  }
  console.log(data);
  const resp = await postAnswer(data)
  console.log(resp);
  if(resp) {

      res.status(200).json({"message":"Added successfully"})
  } else {
      res.status(500).json({"message":"Sorry, Something went wrong"})
  }
};
export default handler;
