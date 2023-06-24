"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import {ethers} from 'ethers'

import { nftMarketaddress, nftaddress } from "/block chain/Projects/Market/Contract-hardhat/config";
import  NFT  from "/block chain/Projects/Market/Contract-hardhat/artifacts/contracts/NFT.sol/NFT.json";
import  KryptoAmir  from "/block chain/Projects/Market/Contract-hardhat/artifacts/contracts/KryptoAmir.sol/KryptoAmir.json";

// import {path} from 'path'
// const currentDir= __dirname;
// const nextDir=path.join(currentDir,'/nft-marketplace-kryptoamir/.next')

export default function Home() {
  const [nfts, setNFTs] = useState([]);
  const [loadingState, setLoadingState] = useState("not Loaded");
  // const owner = '0x';

  useEffect(() => {
    LoadNFTs()
  }, [])

  async function LoadNFTs() {
    const Provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, Provider);
    const marketContract = new ethers.Contract(nftMarketaddress, KryptoAmir.abi, Provider);
    
    const data = await marketContract.getUnsoldedNFTS();

    const items = await Promise.all(data.map(async i => {
      const tokenuri = await tokenContract.GetTokenURI(i.tokenId);
      const meta = await axios.get(tokenuri);
      const price = ethers.utils.parseUnits(i.price.toString(),'ether')

      const item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description
      };

      return item;
    }));
    console.log("items:",items);
    console.log(loadingState);
    setNFTs(items);
    setLoadingState('Loaded');
  }
  async function buyNFT(nft) {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner();

    const contract = new ethers.Contract(nftMarketaddress, KryptoAmir.abi, signer);
    const PriceNFT = ethers.utils.parseUnits(nft.price.toString(), 'ether');

    const transaction = await contract.BuyNft(nftaddress, nft.tokenId, { value: PriceNFT });

    await transaction.wait();
    LoadNFTs();
  }
  
  LoadNFTs()
  console.log(loadingState);

  if (loadingState==="Loaded" && !nfts.length){
    return <div style={{width:100,height:200,marginLeft:150,marginTop:150}}><h1 style={{color:'white',marginTop:100,marginLeft:100,fontSize:50}} > No NFT in Market </h1></div> 
  } 

  return (
    <>

        {nfts.map((nft,i)=>(
          <div className={styles.offertitlecontentsdiv}>
          <div key={i} className={styles.offercontents}>
            <Image
              src={nft.image}
              className={styles.tokenslg}
              alt=""
              width={100}
              height={100}
            />
            <p className={styles.rightcontents}></p>
            <h3 id="tmreward" className={styles.font}>
              {nft.name}
            </h3>
            <p className={styles.rightcontents}></p>
            <h3 className={styles.cldivs}>{nft.description}</h3>
            <h3 className={styles.rightcontents}>Price</h3>
            <h3 className={`${styles.cldivs} ${styles.top}`}>Jun 12</h3>
            <h3
              className={`${styles.rightcontents} ${styles.top}`}
              id="stakeamt"
            >
              {nft.price} ETH
            </h3>
            <button className={styles.btn} onClick={()=> buyNFT(nft)}>BUY NFT</button>
          </div>
        </div>
        ))}      
    </>
  );
}

// Mark the parent component as a Client Component
// export function Page() {
//   // useClient();

//   return <Home />;
// }
