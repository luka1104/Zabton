import { utils, ethers, providers, Wallet } from "ethers"
import contract from 'contracts/ZBTNCoin.json'

const getZBTN = async (address: string) => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x";
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY || "0x";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "hogehoge";
  const ZBTNInterface = new utils.Interface(contract.abi as any)
  const alchemyProvider = new providers.AlchemyProvider("maticmum", API_KEY);
  const signer = new Wallet(PRIVATE_KEY, alchemyProvider);
  const ZBTNContract = new ethers.Contract(contractAddress, ZBTNInterface, signer)
  const res = await ZBTNContract.balanceOf(address)
  return res
}

export default getZBTN
