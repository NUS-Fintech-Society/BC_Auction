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
        Product storage currentProduct = activeProducts[productId];
        require(block.timestamp >= currentProduct.deadline);
        require(msg.sender == currentProduct.seller, "You can't declare the auction as closed");
        //address payable highestBidder = address(uint(activeProducts[productId].highestBid.bidder));
        uint highestBidPrice = activeProducts[productId].highestBid.bidPrice;
        msg.sender.transfer(highestBidPrice);
        

        removeProduct(productId);

    }

    function soldAuction(bytes32 productId) public payable onlySellers() {
        Product storage currentProduct = activeProducts[productId];
        require(block.timestamp < currentProduct.deadline);
        require(msg.sender == currentProduct.seller, "You can't declare the auction as sold");
        //address payable highestBidder = address(uint(activeProducts[productId].highestBid.bidder));
        uint highestBidPrice = activeProducts[productId].highestBid.bidPrice;
        msg.sender.transfer(highestBidPrice);
        

        removeProduct(productId);

    }

    function removeProduct(bytes32 productId) internal onlySellers() {
        if (productId >= array.length) return;

        for (uint i = productId; i<array.length-1; i++){
            array[i] = array[i+1];
        }
        array.length--;

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
        (string memory _name, string memory _description, uint _lowerBound, uint _deadline) 
    {
        Product memory product = activeProducts[id];
        _name = product.name;
        _description = product.description;
        _lowerBound = product.lowerBound;
        _deadline = product.deadline;
    }

    modifier isValidBid(bytes32 productId) {
        Product storage currentProduct = activeProducts[productId];
        require(currentProduct.isReal, "Product does not exist");
        require(block.timestamp < currentProduct.deadline, "Auction time elapsed");
        require(msg.value > currentProduct.highestBid.bidPrice, "Bid price must be higher than current bid");
        require(msg.value >= currentProduct.lowerBound, "Bid price must be higher than lower bound");
        require(msg.sender != currentProduct.seller, "You are not allowed to place a bid");
        _;
    }

    function placeBid(bytes32 productId) public payable isValidBid(productId) {
        Product storage currentProduct = activeProducts[productId];
        
        Bid memory newBid = Bid({
            bidder: payable(msg.sender),
            bidPrice: msg.value,
            bidTime: block.timestamp
        });

        if (currentProduct.noOfBids >= 1) {
        address payable previousBidder = address(uint(currentProduct.highestBid.bidder));   
        uint returnBidAmount = currentProduct.highestBid.bidPrice;
        previousBidder.transfer(returnBidAmount);
        }
        
        currentProduct.highestBid = newBid;
        currentProduct.noOfBids += 1;

        emit BidPlaced(newBid.bidder, productId, msg.value); 
    }
    
    

    function getMyProducts() onlySellers public view returns(Product[] memory)  { //add modifier Seller               
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