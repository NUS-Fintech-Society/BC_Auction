// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
import "./Structures.sol";

contract Sellers is Structures {

    event ProductLaunchEvent(address indexed seller, bytes32 indexed productId, string name, string description,uint deadline);
    event ProductClosedEvent(address indexed seller, bytes32 indexed productId);
    event ProductSoldEvent(address indexed seller, address indexed buyer, bytes32 indexed productId, uint price); //highest price by buyer

}
