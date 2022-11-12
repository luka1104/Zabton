import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";
import { Theme } from 'interfaces/index'

const postTheme = async (data: any) => {
    const resp = await prisma.theme.create({
      data: {
        userId: data.userId,
        contents: data.contents ? data.contents : '',
        imagePath: data.imagePath,
        type: data.type,
        deadline: data.deadline,
      },
    });
    if(resp) await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        themeLeft: {
          increment: -1,
        },
        exp: {
          increment: 10,
        },
      },
    })
    return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const data = {
    userId: req.body.userId,
    contents: req.body.contents,
    imagePath: req.body.imagePath,
    type: JSON.parse(req.body.type),
    deadline: req.body.deadline,
  }
  console.log(data);
  const resp = await postTheme(data)
  console.log(resp);
  if(resp) {
      res.status(200).json({"message":"Added successfully"})
  } else {
      res.status(500).json({"message":"Sorry, Something went wrong"})
  }
};
export default handler;
