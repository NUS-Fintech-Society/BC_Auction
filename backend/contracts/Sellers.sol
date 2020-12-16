// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
import "./Products.sol";
import "./Structures.sol";
contract Sellers is Structures {

     event ProductLaunchEvent(address indexed seller, bytes32 productId);
     event ProductSoldEvent(address indexed seller, address indexed Buyer, uint price, string name); //highest price by buyer
   
    

}