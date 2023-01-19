// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const BetOnPrice = await hre.ethers.getContractFactory("BetOnPrice");
  const betOnPrice = await BetOnPrice.deploy();

  await betOnPrice.deployed();

  console.log(
    `deployed to : ${betOnPrice.address}`
  );

  // const V2 = await hre.ethers.getContractFactory("V2");
  // const v2 = await V2.deploy();

  // await v2.deployed();

  // console.log(
  //   `deployed to : ${v2.address}`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// V1.sol contract address : 0xd1B40F05BCc42d9476b60aa2fBb649794d63f667
// V2.sol contract address : 0x3837D00A1D7d314698f251f15dB5BbdE63e24008
// BetOnPrice.sol contract address : 0x9d38cCAB9511960E2f4FD826F2B59192bA51fb73

