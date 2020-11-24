import Web3Modal from 'web3modal';
import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect';

export const wallet = new ThreeIdConnect();

export const web3Modal = new Web3Modal({
  theme: 'dark',
  cacheProvider: false,
});

export const getAuthProvider = async () => {
  const ethProvider = await web3Modal.connect();
  const addresses = await ethProvider.enable();

  const authProvider = new EthereumAuthProvider(ethProvider, addresses[0]);

  return {
    authProvider,
    web3Modal,
  };
};