// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
import "./Structures.sol";

contract Buyers is Structures{

    event Bidplaced(address indexed bidder, bytes32 productId, uint price);
    
}