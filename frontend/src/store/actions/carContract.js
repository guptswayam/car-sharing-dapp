import * as actionTypes from "./actionTypes"
import carAddress from "./../../contracts/Car-address.json"
import carAbi from "./../../contracts/Car.json"
import { ethers } from "ethers"

export function setCarContract() {
  return (dispatch) => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_GOERLI_RPC_URL);
    const carInstance = new ethers.Contract(carAddress.address, carAbi.abi, provider);
    dispatch({
      type: actionTypes.SET_CAR_CONTRACT,
      data: carInstance
    })
  }
}

export function setCarContractSigner(carInstance, library) {
  return async (dispatch) => {
    const signer = library.getSigner();
    let newCarInstance = carInstance.connect(signer);
    const isOwner = await newCarInstance.isOwner();
    dispatch({
      type: actionTypes.SET_SIGNER,
      data: newCarInstance,
      isOwner: isOwner
    })
  }
}