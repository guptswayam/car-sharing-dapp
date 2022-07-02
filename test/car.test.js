const chai = require("chai");
const chaiAsPromise = require("chai-as-promised")
const {ethers} = require("hardhat")

chai.use(chaiAsPromise);

const {expect} = chai;

function etherToWei(value) {
  return ethers.utils.parseEther(value)
}

function weiToEther(value) {
  return ethers.utils.formatEther(value)
}

describe('Car Contract', () => {
  let carInstance;

  let deployer, addr1;
  const PRICE_PER_HOUR = 1;

  before(async () => {
    [deployer, addr1] = await ethers.getSigners();
    const Car = await ethers.getContractFactory("Car");
    carInstance = await Car.deploy();
  })

  it('should create a car', async () => {
    await expect(carInstance.connect(deployer).addCar("Dzire", "Swift Dzire", "Sedan", etherToWei(PRICE_PER_HOUR.toString()))).to.eventually.be.fulfilled;

    // console.log((await carInstance.carsCount());
    await expect(carInstance.carsCount()).to.eventually.be.equal("1");

  });

  it('should create another car', async () => {
    await expect(carInstance.connect(deployer).addCar("Kwid", "Renault Kwid", "Hatchback", etherToWei(PRICE_PER_HOUR.toString()))).to.eventually.be.fulfilled;

    // console.log((await carInstance.carsCount());
    await expect(carInstance.carsCount()).to.eventually.be.equal("2");

  });

  it('should rent the car 1', async () => {
    const duration = 2;
    expect(await carInstance.connect(addr1).bookCar(1, duration, {value: etherToWei((duration*PRICE_PER_HOUR).toString())})).to.emit(carInstance, "CarBooked");
    const car = await carInstance.cars("1")
    expect(car.bookedBy).to.equal(addr1.address);
  })

  it('should not rent the car 1 again', async () => {
    const duration = 1;
    await expect(carInstance.connect(addr1).bookCar(1, duration, {value: etherToWei((duration*PRICE_PER_HOUR).toString())})).revertedWith("Car is not available")
  })

  it('should return the error for invalid duration', async () => {
    const duration = 1
    await expect(carInstance.connect(addr1).bookCar(2, duration - 1, {value: etherToWei((duration*PRICE_PER_HOUR).toString())})).revertedWith("Please send the valid duration");
  })

  it("should return the available cars", async () => {
    console.log(await carInstance.getAvailableCars(1, 10, Math.floor(Date.now()/1000)));
  })

});