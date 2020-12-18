// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;
import "./Buyers.sol";
import "./Sellers.sol";

contract Products is Buyers,Sellers { //TODO: import new holder contract (contains Seller and Buyer)

    mapping(bytes32 => Product) activeProducts;
    bytes32[] activeProductIds;
    mapping(address => Product[]) private sellerToProduct;
    uint numOfProducts;

    

    modifier onlySellers() {
        require(sellerToProduct[msg.sender].length > 0 );
        _;
    }

    function closeAuction(bytes32 productId) public payable onlySellers() {
        address payable highestBidder = address(uint(activeProducts[productId].highestBid.bidder));
        uint highestBidPrice = activeProducts[productId].highestBid.bidPrice;
        highestBidder.transfer(highestBidPrice);
        

        removeProduct(productId);

    }

    function removeProduct(bytes32 productId) internal onlySellers() {
        delete activeProducts[productId];

    }

    

    // function getProductById(bytes32 id) public view returns (Product) {
    //     return activeProducts[id];
    // }

    function addProduct(string memory name, string memory description, uint lowerBound, uint deadline) public {
        bytes32 productID = keccak256(abi.encodePacked(name, description, deadline));
        Bid memory emptyBid = Bid(address(0), 0, 0);
        Product memory product = Product(productID, name, description, lowerBound, deadline, 0, emptyBid, true, seller);
        activeProducts[productID] = product;
        sellerToProduct[msg.sender][sellerToProduct[msg.sender].length] = product;
        activeProductIds[numOfProducts] = productID;
        numOfProducts++;
    }

    function getProductDetailsById(bytes32 id) public view returns 
        (string memory _name, string memory _description, uint _lowerBound, uint _deadline, address _seller) 
    {
        Product memory product = activeProducts[id];
        _name = product.name;
        _description = product.description;
        _lowerBound = product.lowerBound;
        _deadline = product.deadline;
        _seller = product.seller;
    }

    modifier isValidBid(bytes32 productId, uint price) {
        Product storage currentProduct = activeProducts[productId];
        require(currentProduct.isReal, "Product does not exist");
        
        require(block.timestamp < currentProduct.deadline, "Auction time elapsed");
        require(price > currentProduct.highestBid.bidPrice, "Bid price must be higher than current bid");
        require(price >= currentProduct.lowerBound, "Bid price must be higher than lower bound");
        require(msg.sender != currentProduct.seller, "You are not allowed to place a bid");
        _;
    }

    function placeBid(bytes32 productId, uint price) public payable isValidBid(productId, price) {
        Product storage currentProduct = activeProducts[productId];
        
        Bid memory newBid = Bid({
            bidder: payable(msg.sender),
            bidPrice: msg.value,
            bidTime: block.timestamp
        });

        currentProduct.highestBid = newBid;
        currentProduct.noOfBids += 1;

        emit BidPlaced(newBid.bidder, productId, price); 
    }
    
    

    function viewAllActiveProducts() onlySellers public view returns(Product[] memory)  { //add modifier Seller               
         Product[] memory currAll = sellerToProduct[msg.sender] ;
         Product[] memory currActive;

         uint index = 0;
         for(uint i = 0 ; i<currAll.length; i++) {
            if(activeProducts[currAll[i].id].isReal){
               currActive[index] = currAll[i];
               index += 1;
            }
         }
         return currActive;
     } 


    function highestBid(bytes32 productId) public view returns(uint) { 
         return activeProducts[productId].highestBid.bidPrice;
    }   
    
}
