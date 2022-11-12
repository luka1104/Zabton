import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";

const updateAnswer = async (id: number) => {
  const resp = await prisma.answer.update({
    where: {
      id: id,
    },
    data: {
      hasReceived: true,
    },
  })
  return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const resp = await updateAnswer(req.body)
  console.log(resp);
  if(resp) {
      res.status(200).json({"message":"Added successfully"})
  } else {
      res.status(500).json({"message":"Sorry, Something went wrong"})
  }
};
export default handler;
