// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;
import "./Buyers.sol";
import "./Sellers.sol";

contract Products is Buyers, Sellers {

    mapping(bytes32 => Product) activeProducts;
    bytes32[] public activeProductIds;
    mapping(address => Product[]) private sellerToProduct;

    //did not put message
    modifier onlySellers() 
    {
        require(sellerToProduct[msg.sender].length > 0);
        _;
    }

    modifier isValidBid(bytes32 productId) 
    {
        Product storage currentProduct = activeProducts[productId];
        require(currentProduct.isReal, "Product does not exist");
        require(block.timestamp < currentProduct.deadline, "Auction time elapsed");
        require(msg.value > currentProduct.highestBid.bidPrice, "Bid price must be higher than current bid");
        require(msg.value >= currentProduct.lowerBound, "Bid price must be higher than lower bound");
        require(msg.sender != currentProduct.seller, "You are not allowed to place a bid");
        _;
    }

    function addProduct(string memory name, string memory description, uint lowerBound, uint deadline) public 
    {
        bytes32 productId = keccak256(abi.encodePacked(name, description, deadline));
        require(!activeProducts[productId].isReal, "Product already exists");
        Bid memory emptyBid = Bid(address(0), 0, 0);
        Product memory product = Product(productId, name, description, lowerBound, deadline, 0, emptyBid, true, msg.sender);
        activeProducts[productId] = product;
        sellerToProduct[msg.sender].push(product);
        activeProductIds.push(productId);

        emit ProductLaunchEvent(msg.sender, productId, name, description);
    }

    function getProductDetailsById(bytes32 productId) public view returns (Product memory)
    {
        require(activeProducts[productId].isReal, "Product does not exist");
        
        Product memory product = activeProducts[productId];
        return product;
    }

    function getProductIds() public view returns (bytes32[] memory) {
        return activeProductIds;
    }

    function placeBid(bytes32 productId) public payable isValidBid(productId) 
    {
        Product storage currentProduct = activeProducts[productId];
        
        Bid memory newBid = Bid({
            bidder: msg.sender,
            bidPrice: msg.value,
            bidTime: block.timestamp
        });

        if (currentProduct.noOfBids >= 1) {
            address payable previousBidder = address(uint(currentProduct.highestBid.bidder));   
            uint returnBidAmount = currentProduct.highestBid.bidPrice;
            previousBidder.transfer(returnBidAmount);

            emit BidFailedEvent(previousBidder, productId);
        }
        
        currentProduct.highestBid = newBid;
        currentProduct.noOfBids += 1;

        emit BidPlacedEvent(newBid.bidder, productId, msg.value); 
    }

    function getMyProducts() onlySellers public view returns(Product[] memory)  
    {               
        Product[] memory currAll = sellerToProduct[msg.sender];
        return currAll;
     } 


    function getHighestBid(bytes32 productId) public view returns(Bid memory) 
    { 
         return activeProducts[productId].highestBid;
    }   
    
    function closeAuction(bytes32 productId) public payable onlySellers() 
    {
        Product storage currentProduct = activeProducts[productId];
        require(block.timestamp >= currentProduct.deadline);
        require(msg.sender == currentProduct.seller, "You can't declare the auction as closed");

        if (currentProduct.highestBid.bidder != address(0)) {         
            uint highestBidPrice = currentProduct.highestBid.bidPrice;
            address payable previousBidder = address(uint(currentProduct.highestBid.bidder));   
            previousBidder.transfer(highestBidPrice);

            emit BidFailedEvent(previousBidder, productId);
        }
        
        removeProduct(productId);

        emit ProductClosedEvent(msg.sender, productId);
    }

    function sellAuction(bytes32 productId) public payable onlySellers() 
    {
        Product storage currentProduct = activeProducts[productId];
        require(block.timestamp < currentProduct.deadline);
        require(msg.sender == currentProduct.seller, "You cannot declare the auction as sold");
        require(currentProduct.highestBid.bidder != address(0), "You cannot sell a product with no bids");

        uint highestBidPrice = activeProducts[productId].highestBid.bidPrice;
        msg.sender.transfer(highestBidPrice);

        address payable highestBidder = address(uint(activeProducts[productId].highestBid.bidder));

        removeProduct(productId);

        emit ProductSoldEvent(msg.sender, highestBidder, highestBidPrice);

    }
    
    function removeProduct(bytes32 productId) internal 
    {
        delete activeProducts[productId];

        for(uint i = 0; i < activeProductIds.length; i++) {
            if(activeProductIds[i] == productId) {
                activeProductIds[i] = activeProductIds[activeProductIds.length-1];
                activeProductIds.pop();
            }
        }
        

        for(uint i = 0; i < sellerToProduct[msg.sender].length; i++) {
            if (sellerToProduct[msg.sender][i].id == activeProducts[productId].id) {
                sellerToProduct[msg.sender][i] = sellerToProduct[msg.sender][sellerToProduct[msg.sender].length - 1];
                sellerToProduct[msg.sender].pop();
            }
        }
        
    }

}
