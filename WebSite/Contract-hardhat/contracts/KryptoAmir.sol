// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KryptoAmir is ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _itemId;
    Counters.Counter private _tokenSold;
    uint256 private listingprice = 0.045 ether;

    address private owner;

    struct TokenIteminf {
        uint itemId;
        address nftcontract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool issold;
    }

    mapping(uint256 => TokenIteminf) private mintMarket;

    constructor(){
        owner = payable(msg.sender);
    }

    function GetListingPrice() public view returns(uint256){
        return listingprice;
    }

    
    //..................... Mint NFT in Market .....................

    function sell(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "the Priec must be gratter then zero");
        require(
            msg.value == listingprice,
            "for mint NFT you must have have listingprice"
        );
        _itemId.increment();
        uint256 newItem = _itemId.current();

        mintMarket[newItem] = TokenIteminf(
            newItem,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        // payable(owner).transfer(listingprice);
    }

    //..................... Buy NFT From Market .....................
    function BuyNft(
        address nftContract,
        uint256 itemId
    ) public payable nonReentrant {
        uint256 price = mintMarket[itemId].price;
        uint256 tokenId = mintMarket[itemId].tokenId;
        require(
            msg.value == price,
            "please submit the asking price to continue"
        );
        // send amount of nft for seller
        mintMarket[itemId].seller.transfer(msg.value);

        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        mintMarket[itemId].owner = payable(msg.sender);
        mintMarket[itemId].issold = true;

        // delete(mintMarket[itemId]);
        payable(owner).transfer(listingprice);
    }

    //..................... see the unsolded NFT in Market.....................
    function getUnsoldedNFTS() public view returns (TokenIteminf[] memory) {
        uint itemsCount = _itemId.current();
        uint unsoldedCount = _itemId.current() - _tokenSold.current();
        uint index = 0;
        TokenIteminf[] memory unsoldeditems = new TokenIteminf[](unsoldedCount);

        for (uint i = 0; i < itemsCount; i++) {
            if (mintMarket[i + 1].issold == false) {
                TokenIteminf storage currentItem = mintMarket[i + 1];
                unsoldeditems[index] = currentItem;
                index++;
            }
        }

        return unsoldeditems;
    }

    //..................... see the NFTS that user Buy ......................
    function FetchMyNFTS() public view returns (TokenIteminf[] memory) {
        uint totalitemsCount = _itemId.current();
        uint index = 0;
        uint purchasedCount = 0;

        for (uint i = 0; i < totalitemsCount; i++) {
            if (mintMarket[i + 1].owner == msg.sender) {
                purchasedCount++;
            }
        }

        TokenIteminf[] memory purchasededitems = new TokenIteminf[](
            purchasedCount
        );

        for (uint i = 0; i < totalitemsCount; i++) {
            if (mintMarket[i + 1].owner == msg.sender) {
                TokenIteminf storage currentItem = mintMarket[i + 1];
                purchasededitems[index] = currentItem;
                index++;
            }
        }

        return purchasededitems;
    }

    // ................. see the NFTS that User Sold in Market ....................
    function FetchItemsCreated() public view returns (TokenIteminf[] memory) {
        uint totalitemsCount = _itemId.current();
        uint index = 0;
        uint mintedCount = 0;

        for (uint i = 0; i < totalitemsCount; i++) {
            if (mintMarket[i + 1].seller == msg.sender) {
                mintedCount++;
            }
        }

        TokenIteminf[] memory minteditems = new TokenIteminf[](mintedCount);

        for (uint i = 0; i < totalitemsCount; i++) {
            if (mintMarket[i + 1].seller == msg.sender) {
                TokenIteminf storage currentItem = mintMarket[i + 1];
                minteditems[index] = currentItem;
                index++;
            }
        }

        return minteditems;
    }
}
