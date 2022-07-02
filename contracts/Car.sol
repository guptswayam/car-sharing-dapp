// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Ownable} from "./Ownable.sol";
import "hardhat/console.sol";     // console.sol only works in hardhat network


contract Car is Ownable {
  struct CarStruct {
    string name;
    string description;
    string category;
    uint bookedAt;
    uint duration;
    address bookedBy;
    uint pricePerHour;
    uint id;
  }

  mapping(uint => CarStruct) public cars;
  uint public carsCount;

  event CarBooked(uint carId, address indexed bookedBy, uint bookedAt, uint amount, uint duration, string name, string category);

  function division(uint x, uint y) public pure returns(uint[2] memory){
    uint q = x/y;
    uint r = x%y;

    uint[2] memory res = [q,r];

    return res;
  }

  function bookCar(uint carId, uint durationInHours) public payable {
    uint currentTime = block.timestamp;
    uint duration  = durationInHours * 60 * 60;
    uint bookTill = currentTime + duration;
    uint amount = msg.value;
    require(bookTill > currentTime, "Please send the valid duration");

    CarStruct storage car = cars[carId];

    require(amount == car.pricePerHour * durationInHours, "Invalid Amount!");

    if(car.bookedAt + duration > currentTime) {
      revert("Car is not available");
    }

    payable(owner).transfer(amount);

    car.bookedBy = msg.sender;
    car.duration = durationInHours;
    car.bookedAt = currentTime;

    console.log("car booked with car id as %s", car.id);
    emit CarBooked(carId, msg.sender, car.bookedAt, amount, duration, car.name, car.category);
  }

  function addCar(string memory name, string memory description, string memory category, uint pricePerHour) public onlyOwner {
    carsCount++;
    cars[carsCount] = CarStruct(name, description, category, 0, 0, address(0), pricePerHour, carsCount);
  }

  function getAvailableCars(uint itemStartId, uint limit, uint currentTime) public view returns(CarStruct[] memory) {
    CarStruct[] memory availableCars = new CarStruct[](limit);

    uint i=0;

    while(itemStartId <= carsCount && i < limit) {
      if(cars[itemStartId].bookedAt + cars[itemStartId].duration * 60 * 60 <= currentTime) {
        availableCars[i] = cars[itemStartId];
        i++;
      }
      itemStartId++;
    }

    CarStruct[] memory res = new CarStruct[](i);

    for(uint j=0;j<i;j++) {
      res[j] = availableCars[j];
    }

    return res;
  }

}
