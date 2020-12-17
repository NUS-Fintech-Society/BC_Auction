// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;
import "./Buyers.sol";
import "./Sellers.sol";

contract Products is Buyers, Sellers { //TODO: import new holder contract (contains Seller and Buyer)
<<<<<<< HEAD

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
=======

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
    
>>>>>>> 14ca4f4982b9af320c55fdd260ae0639a1e1c7ce
}
