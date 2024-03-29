export const contractAddress = "0xD2b9cdEBe48f924C452C1507E2a2b942Ce5861ca";

export const contractAbi = [{
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "bidder",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "productId",
                "type": "bytes32"
            }
        ],
        "name": "BidFailedEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "bidder",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "productId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "BidPlacedEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "productId",
                "type": "bytes32"
            }
        ],
        "name": "ProductClosedEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "productId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "ProductLaunchEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "productId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "ProductSoldEvent",
        "type": "event"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "activeProductIds",
        "outputs": [{
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [{
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }],
        "name": "activeProducts",
        "outputs": [{
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "lowerBound",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "noOfBids",
                "type": "uint256"
            },
            {
                "components": [{
                        "internalType": "address",
                        "name": "bidder",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "bidPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "bidTime",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Structures.Bid",
                "name": "highestBid",
                "type": "tuple"
            },
            {
                "internalType": "bool",
                "name": "isReal",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "seller",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [{
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "lowerBound",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "addProduct",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "bytes32",
            "name": "productId",
            "type": "bytes32"
        }],
        "name": "getProductDetailsById",
        "outputs": [{
            "components": [{
                    "internalType": "bytes32",
                    "name": "id",
                    "type": "bytes32"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "lowerBound",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "noOfBids",
                    "type": "uint256"
                },
                {
                    "components": [{
                            "internalType": "address",
                            "name": "bidder",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bidPrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bidTime",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Structures.Bid",
                    "name": "highestBid",
                    "type": "tuple"
                },
                {
                    "internalType": "bool",
                    "name": "isReal",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                }
            ],
            "internalType": "struct Structures.Product",
            "name": "",
            "type": "tuple"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "getProductIds",
        "outputs": [{
            "internalType": "bytes32[]",
            "name": "",
            "type": "bytes32[]"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [{
            "internalType": "bytes32",
            "name": "productId",
            "type": "bytes32"
        }],
        "name": "placeBid",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    },
    {
        "inputs": [],
        "name": "getMyProducts",
        "outputs": [{
            "components": [{
                    "internalType": "bytes32",
                    "name": "id",
                    "type": "bytes32"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "lowerBound",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "noOfBids",
                    "type": "uint256"
                },
                {
                    "components": [{
                            "internalType": "address",
                            "name": "bidder",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bidPrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bidTime",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Structures.Bid",
                    "name": "highestBid",
                    "type": "tuple"
                },
                {
                    "internalType": "bool",
                    "name": "isReal",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                }
            ],
            "internalType": "struct Structures.Product[]",
            "name": "",
            "type": "tuple[]"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [{
            "internalType": "bytes32",
            "name": "productId",
            "type": "bytes32"
        }],
        "name": "getHighestBid",
        "outputs": [{
            "components": [{
                    "internalType": "address",
                    "name": "bidder",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "bidPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "bidTime",
                    "type": "uint256"
                }
            ],
            "internalType": "struct Structures.Bid",
            "name": "",
            "type": "tuple"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [{
            "internalType": "bytes32",
            "name": "productId",
            "type": "bytes32"
        }],
        "name": "closeAuction",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    },
    {
        "inputs": [{
            "internalType": "bytes32",
            "name": "productId",
            "type": "bytes32"
        }],
        "name": "sellAuction",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    }
];