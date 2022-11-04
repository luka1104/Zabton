const { ethers } = require("hardhat")

async function main() {
  const BFT = await ethers.getContractFactory("BokeFT")

  const bft = await BFT.deploy()
  await bft.deployed()
  console.log("Contract deployed to address:", bft.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
