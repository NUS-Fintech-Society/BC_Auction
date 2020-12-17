// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "./Structures.sol";
import "./Products.sol";
contract Buyers is Structures, Products {
    event Bidplaced(address indexed bidder, bytes32 productId, uint price);

    function highestBid(bytes32 productId) public view returns(uint) { //add modifier Buyer
         return activeProducts[productId].highestBid.bidprice;
    }   
}

<<<<<<< HEAD

=======
contract Buyers is Structures {

    event BidPlacedEvent(address indexed bidder, bytes32 productId, uint price);
    
}
>>>>>>> 14ca4f4982b9af320c55fdd260ae0639a1e1c7ce
