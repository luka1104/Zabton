import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";

const addExp = async (id: number, amount: number) => {
  const resp = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      exp: {
        increment: amount,
      },
    },
  })
  return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const resp = await addExp(req.body.userId, req.body.amount)
  console.log(resp);
  if(resp) {

      res.status(200).json({"message":"Added successfully"})
  } else {
      res.status(500).json({"message":"Sorry, Something went wrong"})
  }
};
export default handler;
