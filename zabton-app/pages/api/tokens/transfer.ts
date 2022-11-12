import { providers, Wallet, Contract, utils } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "lib/prisma";

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY || "0x";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "hogehoge";
const alchemyProvider = new providers.AlchemyProvider("maticmum", API_KEY);
const contract = require('contracts/ZBTNCoin.json');
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x";
const signer = new Wallet(PRIVATE_KEY, alchemyProvider);
const contractInterface = new utils.Interface(contract.abi as any)
const ZBTNContract = new Contract(contractAddress, contractInterface, signer);

const transfer = async (address: string, amount: number) => {
  const receipt = await ZBTNContract.transfer(address, amount, { gasLimit: 1000000, maxFeePerGas: 1000000, maxPriorityFeePerGas: 1000000 })
  return receipt
}

const createNotification = async (userId: number, contents: string, timestamp: number) => {
  const resp = await prisma.notification.create({
    data: {
      userId: userId,
      contents: contents,
      timestamp: timestamp,
    },
  });
  return resp
}

const createHistory = async (userId: number, contents: string, timestamp: number, amount: number) => {
  const resp = await prisma.zbtnDetail.create({
    data: {
      userId: userId,
      contents: contents,
      timestamp: timestamp,
      amount: amount,
    },
  });
  return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('REQ.BODY', req.body);
  const receipt = await transfer(req.body.user.address, req.body.amount)
  if(receipt.hash) {
    createNotification(req.body.user.id, req.body.contents, req.body.timestamp)
    createHistory(req.body.user.id, req.body.contents, req.body.timestamp, req.body.amount)
    res.status(200).json({ hash: receipt.hash })
  }
  if(!receipt.hash) res.status(500)
};
export default handler;
