// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');
const fs=require('fs');

async function main() {
  const contract = await  hre.ethers.getContractFactory("KryptoAmir");
  const Market = await contract.deploy();
  await Market.deployed();
  const Marketaddress= Market.address;
  console.log("nftMarket Contract deployed to:",Marketaddress);


  const nftContract = await hre.ethers.getContractFactory("NFT");
  const NFT = await nftContract.deploy(Marketaddress);
  await NFT.deployed();
  const nftaddress=NFT.address
  console.log("nft Contract deployed to:",nftaddress);

  console.log("deployed all contract successfuly");
  
  let config=`
    export const nftMarketaddress="${Marketaddress}"
    export const nftaddress="${nftaddress}"
  `

  let data= JSON.stringify(config)

  fs.writeFileSync("./config.js",JSON.parse(data))

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
