const { ethers } = require("hardhat")

async function main() {
  const TESTNFT = await ethers.getContractFactory("TESTNFT")

  const TestNFT = await TESTNFT.deploy()
  await TestNFT.deployed()
  console.log("Contract deployed to address:", TestNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
