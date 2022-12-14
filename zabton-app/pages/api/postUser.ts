import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";
import { User } from '.prisma/client';

const postUser = async (data) => {
    const resp = await prisma.user.create({
      data: {
        address: data.address,
        nickname: data.nickname,
        birthday: data.birthday,
      },
    });
    return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const data = {
    address: req.body.address,
    nickname: req.body.nickname,
    birthday: req.body.birthday,
  }
  console.log(data);
  const resp = await postUser(data)
  console.log(resp);
  if(resp) {
      res.status(200).json({"message":"Added successfully"})
  } else {
      res.status(500).json({"message":"Sorry, Something went wrong"})
  }
};
export default handler;
