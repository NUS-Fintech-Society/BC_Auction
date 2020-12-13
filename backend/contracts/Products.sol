// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "./Buyers.sol";
import "./Sellers.sol";
import "./Structures.sol";

contract Products is Structures{ //TODO: import new holder contract (contains Seller and Buyer)

    Product[] active;
    mapping(address => Product[]) SellerToProduct;
    


}