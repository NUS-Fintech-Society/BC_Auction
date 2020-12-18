// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "./Buyers.sol";
import "./Sellers.sol";

contract Products is Buyers, Sellers { //TODO: import new holder contract (contains Seller and Buyer)

    mapping(bytes32 => Product) activeProducts;
    bytes32[] activeProductIds;
    mapping(address => Product[]) private sellerToProduct;

    function addProduct(bytes32 productId, string name, string description, uint lowerBound, 
        uint deadline, uint noOfBids, Bid highestBid, bool isReal) public {
        Product product = Product( productID, name, description, lowerBound, deadline, noOfBids, highestBid, isReal);
        activeProducts[productId] = product;
        sellerToProduct[msg.sender] = product;
    }

    modifier onlySellers() {
        require(sellerToProduct[msg.sender].length > 0 );
        _;
    }

    function closeAuction(bytes32 productId) internal onlySellers() {
        address highestBidder = activeProducts[productId].highestbid.bidder;
        uint highestBidPrice = activeProducts[productId].highestbid.bidPrice;
        address(msg.sender).transfer(highestBidPrice);
        

        removeProduct(productId);

    }

    function removeProduct(bytes32 productId) internal onlySellers() {
        delete activeProducts[productId];

    }

    

    function getProductById(bytes32 id) public view returns (Product) {
        return activeProducts[id];
    }

    modifier isValidBid(bytes32 productId, uint price) {
        Product storage currentProduct = activeProducts[productId];
        require(currentProduct.isReal, "Product does not exist");
        require(!sellerToProduct[msg.sender]==0);
        require(block.timestamp < currentProduct.deadline, "Auction time elapsed");
        require(price > currentProduct.highestBid.bidPrice, "Bid price must be higher than current bid");
        require(price >= currentProduct.lowerBound, "Bid price must be higher than lower bound");
        
        _;
    }

    function placeBid(bytes32 productId, uint price) public isValidBid(productId, price) {
        Product storage currentProduct = activeProducts[productId];
        
        Bid memory newBid = Bid({
            bidder: msg.sender,
            bidPrice: price,
            bidTime: block.timestamp
        });

        currentProduct.highestBid = newBid;
        currentProduct.noOfBids += 1;

        emit BidPlacedEvent(newBid.bidder, productId, price); 
    }
    
}
