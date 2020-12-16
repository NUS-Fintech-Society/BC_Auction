// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;
import "./Buyers.sol";
import "./Sellers.sol";
import "./Structures.sol";
contract Products is Structures,Sellers { //TODO: import new holder contract (contains Seller and Buyer)
  
     mapping(bytes32 => Product) activeProducts; //make mapping, product id => product
    mapping(address => Product[]) SellerToProduct; //add bool active to Product struct

    function viewAllActiveContracts() public view returns(Product[] memory) { //add modifier Seller               
         Product[] memory currAll = SellerToProduct[msg.sender] ;
         Product[] memory currActive;

         uint index = 0;
         for(uint i = 0 ; i<currAll.length; i++) {
            if(activeProducts[currAll[i].id].id != 0){
               currActive[index]=currAll[i];
               index+=1;
            }
         }
         return currActive;
     }   
}