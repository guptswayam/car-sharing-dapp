// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Ownable {
    address internal owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "You are not allowed!");
        _;
    }

    function isOwner() public view returns(bool) {
      return msg.sender == owner;
    }

}