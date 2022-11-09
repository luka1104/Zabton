import { providers, Wallet, Contract, utils } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY || "0x";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "hogehoge";
const alchemyProvider = new providers.AlchemyProvider("maticmum", API_KEY);
const contract = require('contracts/BokeFT.json');
const contractAddress = process.env.NEXT_PUBLIC_BFT_CONTRACT_ADDRESS || "0x";
const signer = new Wallet(PRIVATE_KEY, alchemyProvider);
const contractInterface = new utils.Interface(contract.abi as any)
const BFTContract = new Contract(contractAddress, contractInterface, signer);

const mint = async (address: string, tokenUri: any) => {
  const receipt = await BFTContract.mintNFT(address, tokenUri, { gasLimit: 1000000, maxFeePerGas: 1000000, maxPriorityFeePerGas: 1000000 })
  return receipt
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('REQ.BODY', req.body);
  const data = {
    'imagePath': req.body.theme.imagePath,
    'theme': req.body.theme,
    'contents': req.body.answer.contents,
    'place': req.body.answer.place,
    'date': req.body.theme.deadline,
  }
  console.log(JSON.stringify(data));
  const receipt = await mint(req.body.address, JSON.stringify(data))
  if(receipt.hash) res.status(200).json({ hash: receipt.hash })
  if(!receipt.hash) res.status(500)
};
export default handler;
