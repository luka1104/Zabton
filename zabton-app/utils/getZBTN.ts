import { utils, ethers, providers, Wallet } from "ethers"
import contract from 'contracts/ZBTNCoin.json'

const getZBTN = async (address: string) => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "hogehoge";
  const ZBTNInterface = new utils.Interface(contract.abi as any)
  const alchemyProvider = new providers.AlchemyProvider("maticmum", API_KEY);
  const ZBTNContract = new ethers.Contract(contractAddress, ZBTNInterface, alchemyProvider)
  const res = await ZBTNContract.balanceOf(address)
  return res
}

export default getZBTN
