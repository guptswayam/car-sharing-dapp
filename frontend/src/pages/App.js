import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import {useWeb3React} from "@web3-react/core"
import WalletConnectModal from "../components/WalletConnectModal";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { useDispatch, useSelector } from "react-redux";
import { setCarContract, setCarContractSigner } from "../store/actions/carContract";
import MySpinner from "../components/MySpinner";
import CreateCar from "./CreateCar";
import MyBookings from "./MyBookings";

function App() {

  const [showModal, setShowModal] = useState(false);

  const { account, library } = useWeb3React();
  const carInstance = useSelector((state) => state.carContractReducer.carInstance);
  const isOwner = useSelector((state) => state.carContractReducer.isOwner);
  const dispatch = useDispatch();

  useEffect(() => {
    if(account) {
      dispatch(setCarContractSigner(carInstance, library))
      setShowModal(false)
    }
  }, [account])

  useEffect(() => {
    dispatch(setCarContract());
  }, [])

  if(!carInstance)
    return <MySpinner />

  return (
    <div className="text-center">
      <Navigation account={account} setShowModal={setShowModal} isOwner={isOwner} />
      <WalletConnectModal show={showModal} setShowModal={setShowModal} />
      <div className="m-4">
        <Routes>
          <Route path="/" element={<Home />} />
          {account && <Route path="/bookings" element={<MyBookings />} />}
          {isOwner && <Route path="/create" element={<CreateCar />} />}
          <Route path="*" element={<h1>Path Not Found!</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
