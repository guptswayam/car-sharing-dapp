import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";


export function activateInjectedProvider(providerName) {
  const { ethereum } = window;

  if (!ethereum?.providers) {
    return undefined;
  }

  let provider;
  switch (providerName) {
    case "CoinBase":
      provider = ethereum.providers.find(
        ({ isCoinbaseWallet }) => isCoinbaseWallet
      );
      break;
    case "MetaMask":
      provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
      break;
    default:
      provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
  }

  if (provider) {
    ethereum.setSelectedProvider(provider);
  }
}

export const coinbaseWallet = new WalletLinkConnector({

  url: process.env.REACT_APP_GOERLI_RPC_URL,
 
  appName: "Car Sharing DApp",
 
  supportedChainIds: process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",")
 
 });

export const walletconnect = new WalletConnectConnector({
  rpc: {
    5: process.env.REACT_APP_INFURA_GOERLI_URL_FOR_WALLET_CONNECT,
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 12000
});

export const Injected = new InjectedConnector({
  supportedChainIds: process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",").map(el => +el)
});
