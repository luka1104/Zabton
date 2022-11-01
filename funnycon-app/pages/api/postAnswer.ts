import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";
import { Answer } from 'interfaces/index'

const postAnswer = async (data: Answer) => {
    const resp = await prisma.answer.create({
      data: {
        ownerAddress: data.ownerAddress,
        themeId: data.themeId,
        contents: data.contents,
      },
    });
    return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const data = {
    ownerAddress: req.body.ownerAddress,
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
