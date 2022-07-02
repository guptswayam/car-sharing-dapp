// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const artifacts = hre.artifacts;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Car = await hre.ethers.getContractFactory("Car");
  const car = await Car.deploy();

  await car.deployed();

  console.log("Car deployed to:", car.address);

  saveContractAndContractAddress(car, "Car")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

function saveContractAndContractAddress(contract, name) {
  const fs = require("fs");
  const contractsDir = `${__dirname}/../frontend/src/contracts`;
  if(!fs.existsSync(contractsDir))
    fs.mkdirSync(contractsDir);

  fs.writeFileSync(`${contractsDir}/${name}-address.json`, JSON.stringify({address: contract.address}, undefined, 2));

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(`${contractsDir}/${name}.json`, JSON.stringify(contractArtifact, null, 2))

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
