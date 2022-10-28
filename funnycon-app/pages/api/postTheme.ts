import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";
import { Theme } from 'interfaces/index'

const postTheme = async (data: Theme) => {
    const resp = await prisma.theme.create({
      data: {
        ownerAddress: '',
        contents: data.contents ? data.contents : '',
        imagePath: data.imagePath,
        type: data.type,
      },
    });
    return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const data = {
    ownerAddress: req.body.ownerAddress,
    contents: req.body.contents,
    imagePath: req.body.imagePath,
    type: JSON.parse(req.body.type),
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
