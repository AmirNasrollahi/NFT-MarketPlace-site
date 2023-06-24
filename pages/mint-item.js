"use client"
import axios from "axios";
import { useState } from "react";
import Web3Modal from "web3modal";
import {ethers} from 'ethers'
import {create as ipfsHttpClient} from 'ipfs-http-client'
import { nftMarketaddress, nftaddress } from "/block chain/Projects/Market/Contract-hardhat/config";
import  NFT  from "/block chain/Projects/Market/Contract-hardhat/artifacts/contracts/NFT.sol/NFT.json";
import  KryptoAmir  from "/block chain/Projects/Market/Contract-hardhat/artifacts/contracts/KryptoAmir.sol/KryptoAmir.json";
import { useRouter } from "next/router";


const client=ipfsHttpClient("http://ipfs.infura.io:5001/api/v0")

 function mintitem(){
    const [fileUrl,setFileUrl]=useState(null)
    const [formInput,updateFormatInput]=useState({price:'',name:'',description:''})

    
    const router=useRouter()

    async function onchange(e){
        const file= e.target.files[0]
        try{
            const added= await client.add(file,{progress:(prog)=>console.log(`received: ${prog}`)})
            const url=`http://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        }
        catch(error){
            console.log('Error uploading file:',error)
        }
    }

    async function createMarket(){
        const {name,description,price}=formInput
        // if(!name || !description || !price || !fileUrl) return console.log("please Complete All information for Mint NFT");

        const data =JSON.stringify({name,description,image:fileUrl})

        try{
            const added= await client.add(data)
            const url=`http://ipfs.infura.io/ipfs/${added.path}`
            createSale(url)
        }
        catch(error){
            console.log('Error uploading file:',error)
        }
    }

    async function createSale(url){
        const web3modal=new Web3Modal()
        const connection=await web3modal.connect()
        const provider=new ethers.providers.Web3Provider(connection)
        const signer=provider.getSigner()

        //............... create a token in NFT contract....................
        let contract=new ethers.Contract(nftaddress,NFT.abi,signer)
        let transaction=await contract.mintToken(url)
        const tx =await transaction.wait()
        const event= tx.events[0]
        const value= event.args[2]
        const tokenId=value.toNumber()
        const Price= ethers.utils.parseUnits(formatInput.price,'ether')

        //................. create a item in Marketplace.....................
        contract=new ethers.Contract(nftMarketaddress,KryptoAmir.abi,signer)
        let listingPrice=await contract.GetListingPrice()
        listingPrice=listingPrice.toString()
        transaction= await contract.sell(nftaddress,tokenId,Price,{value:listingPrice})
        await transaction.wait()
        router.push("./")
    }

    return(
        <div>
            <div>
                <input 
                    placeholder="Asset Name"
                    onChange={e => updateFormatInput({...formInput,name:e.target.value})}                
                />
                <textarea 
                    placeholder="Asset Description"
                    onChange={e => updateFormatInput({...formInput,description:e.target.value})}                
                />
                <input 
                    placeholder="Asset Price"
                    onChange={e => updateFormatInput({...formInput,price:e.target.value})}                
                />
                <input 
                    type="file"
                    name="Asset"
                    onChange={onchange}                
                />
                {
                    fileUrl && ( <img width='350px' src={fileUrl} />)
                }
                <button onClick={createMarket}>
                    Mint NFT
                </button>
            </div>
        </div>
    )
}

export default mintitem;