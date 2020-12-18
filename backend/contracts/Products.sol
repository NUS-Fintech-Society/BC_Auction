// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "./Buyers.sol";
import "./Sellers.sol";

contract Products is Buyers, Sellers { //TODO: import new holder contract (contains Seller and Buyer)

    mapping(bytes32 => Product) activeProducts;
    bytes32[] activeProductIds;
    mapping(address => Product[]) private sellerToProduct;
    uint numOfProducts;

    function addProduct(string memory name, string memory description, uint lowerBound, uint deadline) public {
        bytes32 productID = keccak256(abi.encodePacked(name, description, deadline));
        Bid memory emptyBid = Bid(address(0), 0, 0);
        Product memory product = Product(productID, name, description, lowerBound, deadline, 0, emptyBid, true);
        activeProducts[productID] = product;
        sellerToProduct[msg.sender][sellerToProduct[msg.sender].length] = product;
        activeProductIds[numOfProducts] = productID;
        numOfProducts++;
    }

    function getProductDetailsById(bytes32 id) public view returns 
        (string memory _name, string memory _description, uint _lowerBound, uint _deadline) 
    {
        Product memory product = activeProducts[id];
        _name = product.name;
        _description = product.description;
        _lowerBound = product.lowerBound;
        _deadline = product.deadline;
    }

    modifier isValidBid(bytes32 productId, uint price) {
        Product storage currentProduct = activeProducts[productId];
        require(currentProduct.isReal, "Product does not exist");
        require(block.timestamp < currentProduct.deadline, "Auction time elapsed");
        require(price > currentProduct.highestBid.bidPrice, "Bid price must be higher than current bid");
        require(price >= currentProduct.lowerBound, "Bid price must be higher than lower bound");
        _;
    }

    function placeBid(bytes32 productId, uint price) public payable isValidBid(productId, price) {
        Product storage currentProduct = activeProducts[productId];
        
        Bid memory newBid = Bid({
            bidder: msg.sender,
            bidPrice: msg.value,
            bidTime: block.timestamp
        });

        currentProduct.highestBid = newBid;
        currentProduct.noOfBids += 1;

        emit BidPlacedEvent(newBid.bidder, productId, price); 
    }
    
}
