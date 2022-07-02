import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";


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

export const walletconnect = new WalletConnectConnector({
  rpc: {
    3: process.env.REACT_APP_ROPSTEN_RPC_URL,
  },
  bridge: "wss://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 12000
});

export const Injected = new InjectedConnector({
  supportedChainIds: [3],
});
