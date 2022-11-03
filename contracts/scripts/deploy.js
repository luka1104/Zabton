const { ethers } = require("hardhat")

async function main() {
  const ZBTN = await ethers.getContractFactory("ZBTNCoin")

  const Zbtn = await ZBTN.deploy()
  await Zbtn.deployed()
  console.log("Contract deployed to address:", Zbtn.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
