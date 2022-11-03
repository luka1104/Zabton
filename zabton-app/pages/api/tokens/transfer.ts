import { providers, Wallet, Contract, utils } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY || "0x";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "hogehoge";
const alchemyProvider = new providers.AlchemyProvider("maticmum", API_KEY);
const contract = require('contracts/ZBTNCoin.json');
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x";
const signer = new Wallet(PRIVATE_KEY, alchemyProvider);
const contractInterface = new utils.Interface(contract.abi as any)
const ZBTNContract = new Contract(contractAddress, contractInterface, signer);

const transfer = async (address: string, amount: number) => {
  const receipt = await ZBTNContract.transfer(address, amount, { gasLimit: 100000 })
  return receipt
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('REQ.BODY', req.body);
  const receipt = await transfer(req.body.address, req.body.amount)
  if(receipt) res.status(200).json({ receipt: receipt })
};
export default handler;
