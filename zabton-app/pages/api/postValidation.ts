import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";
import { Validation } from 'interfaces/index'

const postValidation = async (data: Validation) => {
    const resp = await prisma.validation.create({
      data: {
        userId: data.userId,
        answerId: data.answerId,
        themeId: data.themeId,
      },
    });
    return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const data = {
    userId: req.body.userId,
    answerId: req.body.answerId,
    themeId: req.body.themeId,
  }
  console.log(data);
  const resp = await postValidation(data)
  console.log(resp);
  if(resp) {
      res.status(200).json({"message":"Added successfully"})
  } else {
      res.status(500).json({"message":"Sorry, Something went wrong"})
  }
};
export default handler;
