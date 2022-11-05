import { utils, ethers, providers, Wallet } from "ethers"
import contract from 'contracts/BokeFT.json'

const getBFT = async (address: string) => {
  const contractAddress = process.env.NEXT_PUBLIC_BFT_CONTRACT_ADDRESS || "0x";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "hogehoge";
  const BFTInterface = new utils.Interface(contract.abi as any)
  const alchemyProvider = new providers.AlchemyProvider("maticmum", API_KEY);
  const BFTContract = new ethers.Contract(contractAddress, BFTInterface, alchemyProvider)
  const res = await BFTContract.getTokenUriFromAddress(address)
  console.log(res);
  return res
}

export default getBFT
