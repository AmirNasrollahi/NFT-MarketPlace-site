// const {
//   time,
//   loadFixture,
// } = require("@nomicfoundation/hardhat-network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KRPAMIR", function () {
  it("should be deploy the marketplace contract and nft contract", async function () {
    // deploy the Market Contract and get the address of contract
    const MarketContract = await ethers.getContractFactory("KryptoAmir");
    const Market = await MarketContract.deploy();
    await Market.deployed();
    const MarketContractAddress = Market.address;
    console.log(MarketContractAddress);
    // get the listingprice and auctionprice
    let listingprice=await Market.GetListingPrice();
    listingprice=listingprice.toString()

    // console.log(listingprice);

    const auctionprice = await ethers.utils.parseUnits("100", "ether");

    // deploy the NFT contract
    const nftContract = await ethers.getContractFactory("NFT");
    const NFT = await nftContract.deploy(MarketContractAddress);
    await NFT.deployed();
    const NFTContractAddress = NFT.address;
    
    // mint a new token
    await NFT.mintToken("http-Token1");
    await NFT.mintToken("http-Token2");
    
    
    // const ownerToken= await NFT.getOwnerMintedToken(TokenId1);
    // console.log("owner the minted Token",ownerToken.toString());

    
    // Prepare tokens for sale on Market
    await Market.sell(NFTContractAddress,1,auctionprice,{value: listingprice})
    await Market.sell(NFTContractAddress,2,auctionprice,{value: listingprice})


    // Buy token from Market
    const [sellerAddress,buyerAddress]=await ethers.getSigners()

    await Market.connect(buyerAddress).BuyNft(NFTContractAddress,1,{value:auctionprice})

    // get list of the token user Buyed
    let Items=await Market.connect(buyerAddress).FetchMyNFTS()

    Items=await Promise.all(Items.map(async index =>{

      const TokenUri=NFT.GetTokenURI(index.tokenId)

      let item={
        Price:index.price.toString(),
        TokenId:index.tokenId.toString(),
        Seller:index.seller,
        Owner:index.owner,
        TokenUri
      }

      return item

    }))

    let unsoldedItems= await Market.getUnsoldedNFTS()

    unsoldedItems = await Promise.all(unsoldedItems.map(async i =>{
      const tokenURI=await NFT.GetTokenURI(i.tokenId)

      let item={
        Price: ethers.utils.formatUnits(i.price,'ether').toString(),
        TokenId: i.tokenId.toString(),
        Seller: i.seller,
        tokenURI
      }

      return item

    }))

    console.log("your Items:",Items)


    console.log("Unsolded Items:",unsoldedItems);


  });
});
