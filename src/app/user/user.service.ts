import { Injectable } from '@angular/core';
import { ethers, Contract } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any = null;
  private isLog: boolean = false;
  private cart: string[] = [];
  private contract: ethers.Contract | null = null;
  //private contract: ethers.Contract;

  constructor() {
    this.initContract();
  }

  private initContract(){
    const contractAddress = '0xfC1DC26Da13406Ac9FECCc220c7f2e75C3E23C65'; 
    const contractABI = [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bytes32[]",
            "name": "productIds",
            "type": "bytes32[]"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "OrderPlaced",
        "type": "event"
      },
      {
        "inputs": [
          { "internalType": "bytes32[]", "name": "productIds", "type": "bytes32[]" }
        ],
        "name": "placeOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      this.contract = new ethers.Contract(contractAddress, contractABI, signer); 
    }
  }

  
  async login() {
    try {
      if (window.ethereum) {
        await window.ethereum.enable();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const address = await signer.getAddress();
        console.log('Logged in with address:', address);

        const message = "Welcome to Marketplace\n\nClick on sign to authenticate and log into market" ;

        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, address],
        });
  
        const verifiedAddress = ethers.utils.verifyMessage(message, signature);
        if (address.toLowerCase() !== verifiedAddress.toLowerCase()) {
          throw new Error('Signature verification failed. Access denied.');
        }

        const userBalance = await provider.getBalance(address);
        const etherBalance = ethers.utils.formatEther(userBalance);
        console.log('Balance:', etherBalance);

        this.user = {
          address: address,
          balance: etherBalance
        };

        this.isLog = true;
      } else {
        throw new Error('Ethereum provider (MetaMask) is not available.');
      }
    } catch (error) {
      console.error('Error logging in with Metamask:', error);
      throw error;
    }
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return this.isLog;
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }

async placeOrder(productIds: string[]) {
  try {
    if (!this.isLoggedIn) {
      throw new Error('User is not logged in.');
    }
    if (!this.contract) {
      throw new Error('Contract is not initialized.');
    }

    const transaction = await this.contract['placeOrder'](productIds);
    await transaction.wait();

    console.log('Transaction mined:', transaction.hash);
  
    this.clearCart();
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
}

getContract(): ethers.Contract | null {
  return this.contract;
}


}
