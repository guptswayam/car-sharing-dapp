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

  url: process.env.REACT_APP_ROPSTEN_RPC_URL,
 
  appName: "Car Sharing DApp",
 
  supportedChainIds: [3],
 
 });

export const walletconnect = new WalletConnectConnector({
  rpc: {
    3: process.env.REACT_APP_INFURA_ROPSTEN_URL_FOR_WALLET_CONNECT,
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 12000
});

export const Injected = new InjectedConnector({
  supportedChainIds: [3],
});
