// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;
import "./Buyers.sol";
import "./Sellers.sol";

contract Products is Buyers, Sellers { //TODO: import new holder contract (contains Seller and Buyer)

    mapping(bytes32 => Product) activeProducts;
    mapping(address => Product[]) private sellerToProduct;

    function addProduct(bytes32 productId, string name, string description, uint lowerBound, 
        uint deadline, uint noOfBids, Bid highestBid, bool isReal) public {
        product = Product(productID, name, description, lowerBound, deadline, noOfBids, highestBid, isReal);
        activeProducts[productId] = product;
        sellerToProduct[msg.sender] = product;
    }

    function getAllProducts() public view returns (mapping(bytes32 => Product)) {
        return activeProducts;
    }

    modifier isValidBid(bytes32 productId, uint price) {
        Product storage currentProduct = activeProducts[productId];
        require(currentProduct.isReal, "Product does not exist");
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

    function viewAllActiveContracts() public view returns(Product[] memory) { //add modifier Seller               
         Product[] memory currAll = SellerToProduct[msg.sender] ;
         Product[] memory currActive;

         uint index = 0;
         for(uint i = 0 ; i<currAll.length; i++) {
            if(activeProducts[currAll[i].id].id != 0){
               currActive[index] = currAll[i];
               index += 1;
            }
         }
         return currActive;
     }       
}
