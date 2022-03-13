// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Contractio {
  uint256 public contractCount = 0;
  uint256 public userCount=0;
  uint256 public bidCount=0;
  
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() public{
        owner = msg.sender;
    }

    struct Contract {
        uint256 id;
        string name;
        string sector;
        string description;
        uint256 baseAmount;
        uint256 createdAt;
        string allocatedTo;
        bool completed;
    }

    struct User {
        uint256 id;
        string username;
        string email;
        uint256 createdAt;
    }
   
    struct Bid{
        uint256 id;
        string desc;
        uint256 amount;
        string forContract;
        string bidder;
        bool approved;
    }

    mapping(uint => Contract) public contracts;
    mapping(uint => User) public users;
    mapping(uint => Bid) public bids;

    
    function addUser(string memory _username,string memory _email) public {
        userCount++;
        users[userCount]=User(userCount,_username,_email,block.timestamp);
    }

    function addContract(string memory _name,string memory _sector,string memory _description,uint256 _baseAmount) public{
        contractCount++;
        contracts[contractCount]=Contract(contractCount,_name,_sector,_description,_baseAmount,block.timestamp,"gov",false);
        
    }

    function addBid(string memory _desc,uint256 _amount,string memory _forContract,string memory _bidder) public{
        bidCount++;
        bids[bidCount]=Bid(bidCount,_desc,_amount,_forContract,_bidder,false);
    }
   
    function approveBid(uint256 _bidSerial,uint256 _contractSerial) public{
        
        bids[_bidSerial].approved= true;
        contracts[_contractSerial].allocatedTo=bids[_bidSerial].bidder;
        contracts[_contractSerial].completed=true;
    }


}




