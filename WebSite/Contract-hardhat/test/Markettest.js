const { expect, assert } = require("chai");
const { ethers }=require('hardhat');

describe("KryptoAmir", function () {
  let Market,
    NFT,
    MarketContractAddress,
    NFTContractAddress,
    listingPrice,
    auctionPrice,
    tokenId,
    owner,
    TokenId
    ;

  auctionPrice = ethers.utils.parseUnits("10", "ether");

  beforeEach(async function () {
    const MarketContract = await ethers.getContractFactory("KryptoAmir");
    Market = await MarketContract.deploy();
    await Market.deployed();
    MarketContractAddress = Market.address;

    const NFTcontract = await ethers.getContractFactory("NFT");
    NFT = await NFTcontract.deploy(MarketContractAddress);
    await NFT.deployed();
    NFTContractAddress = NFT.address;
  });

  it("should get the listing Price", async function () {
    listingPrice = await Market.GetListingPrice();
    listingPrice = listingPrice.toString();

    // assert.equal(await Market.GetListingPrice(), listingPrice);
  });

  it("should mint a new token in NFT contract and sell in market", async function () {
    const MarketContract2 = await ethers.getContractFactory("KryptoAmir");
    const Market2 = await MarketContract2.deploy();
    await Market2.deployed();
    const MarketContractAddress2 = Market2.address;
    ///////////////////////////////////////
    const nftContract2 = await ethers.getContractFactory("NFT");
    const NFT2 = await nftContract2.deploy(MarketContractAddress2);
    await NFT2.deployed();
    const NFTContractAddress2 = NFT2.address;
    ////////////////////////////////////////////
    tokenId = await NFT2.mintToken("http-Token12222");
    // const ttlSupply=await NFT2.totalSupply()
    await Market2.sell(NFTContractAddress2, 1, auctionPrice, {
      value: listingPrice,
    });


    let items= await Market2.getUnsoldedNFTS()

    items=await Promise.all(items.map( async i=>{
        const uri=await NFT2.GetTokenURI(i.tokenId)

        const item={
          Tokenid:i.tokenId.toString(),
          Price: ethers.utils.formatUnits(i.price,"ether").toString(),
          Seller: i.seller,
          Owner:i.owner,
          uri

        }

        return item
    }))

    console.log("unsolded items:",items);
  });


  it("should be return the owner of token id", async function () {
    owner = NFT.getOwnerMintedToken(tokenId);
    owner = owner.toString();
  });

  // console.log(owner);

  // it("should sell NFT in the Market", async function () {
    
  //   // Perform necessary assertions or checks here
  // });
});
