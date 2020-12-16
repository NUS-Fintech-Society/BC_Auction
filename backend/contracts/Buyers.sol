// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
import "./Structures.sol";
import "./Products.sol";
contract Buyers is Structures, Products {

    event Bidplaced(address indexed bidder, bytes32 productId, uint price);

    function highestBid(bytes32 productId) public view returns(uint) { //add modifier Buyer
        
         return active[productId].highestBid.bidprice;
    }   
}