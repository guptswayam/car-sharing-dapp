import React from 'react'
import { Modal } from 'react-bootstrap';
import { activateInjectedProvider, Injected, walletconnect } from '../utils/wallets';
import { useWeb3React } from "@web3-react/core";
import mmImage from "./../assets/wallets/mm.png"
import wcImage from "./../assets/wallets/wc.png"

export default function WalletConnectModal({show, setShowModal}) {

  const { activate, deactivate } = useWeb3React();

  return (
    <>
      <Modal show={show} onHide={() => {setShowModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Connect To Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center m-2 mb-4'>
          <button
            onClick={() => {
              activateInjectedProvider(); // To select metamask
              activate(Injected);
            }}
            className="w-full flex justify-center mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-600 hover:text-white hover:bg-primary-500 border-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <img src={mmImage} alt='metamask' height={25} width={25} />
            <span className='m-3'> Login with Metamask</span>
          </button>
          <br></br>
          <br></br>
          <button
            onClick={async() => {await activate(walletconnect);}}
            className="w-full flex justify-center mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-600 hover:text-white hover:bg-primary-500 border-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <img src={wcImage} alt='Wallet Connect' height={25} width={25} />
            <span className='m-3'>Login with Wallet Connect</span>
          </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
