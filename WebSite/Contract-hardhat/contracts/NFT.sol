// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';


contract NFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address private marketcontract;

    // mapping(uint256 => TokenDetails) private TokenDT;

    struct TokenDetails {
        address creator;
        string tokenURI;
    }

    constructor(address marketplaceAddress ) ERC721("KryptoAmir","KRPAMIR") {
        marketcontract=marketplaceAddress;
    }

    function mintToken(string memory tokenURI) public returns(uint256) {
        _tokenIds.increment();
        uint256 newtokenId=_tokenIds.current();

        // TokenDT[newtokenId]=TokenDetails(msg.sender,tokenURI);
        // mint function get 2 argumet: 1- address hoes mint token 2-tokenId
        _mint(msg.sender,newtokenId);

        // setTokenURI function get 2 argumet: 1- tokenid 2-tokenURI
        _setTokenURI(newtokenId,tokenURI);

        //give the marketplace approval to transact between Users
        setApprovalForAll(marketcontract,true);

        return newtokenId;
    }

    function GetTokenURI(uint256 tokeId) public view returns(string memory) {

        string memory tokenuri=tokenURI(tokeId);
        return tokenuri;

    }

    function getOwnerMintedToken(uint256 tokenid) public view returns(address){
        return _ownerOf(tokenid);
    }

    

}