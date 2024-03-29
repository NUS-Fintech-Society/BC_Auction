// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

contract Structures {
    
    struct Bid {
        address bidder;
        uint bidPrice;
        uint bidTime;
    }

    struct Product {
        bytes32 id;
        string name;
        string description;
        uint lowerBound;
        uint deadline;
        uint noOfBids;
        Bid highestBid;
        bool isReal;
        address seller;
    }

}
