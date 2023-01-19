import { useState } from "react";
import { ethers } from 'ethers';
import BetOnPrice from '../artifacts/contracts/BetOnprice.sol/BetOnPrice.json';
import Homepage from './HomePage';
//require('dotenv').config();


function Admin() {
    const { REACT_APP_PRIVATE_KEY, REACT_APP_PROVIDER} = process.env;

    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [network, setNetwork] = useState(null);
    const betOnPriceAddress = '0x9d38cCAB9511960E2f4FD826F2B59192bA51fb73';
    let provider = new ethers.providers.JsonRpcProvider(REACT_APP_PROVIDER);
    const wallet = new ethers.Wallet(REACT_APP_PRIVATE_KEY, provider);    
  
    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccounts(accounts);
            const contract = new ethers.Contract(betOnPriceAddress, BetOnPrice.abi, wallet);
            setContract(contract);
            const network = await provider.getNetwork();
            setNetwork(network.name);
        }
    }

      /**
   * @function upgrade
   * @dev Allows the contract owner to upgrade the contract to a newer version
   * @notice checks for the availability of ethereum in the browser
   * @param contractAddress - the address of the new implementation contract
   */
  
    async function upgrade() {
        if (typeof window.ethereum !== 'undefined') {
        const contractAddress = document.getElementById('proxy').value;
        try {
            const transaction = await contract.upgrade(contractAddress);
            await transaction.wait;
            console.log('Contract upgraded successfully');
        }
        catch (err) {
            console.log(err.message);
        }
        }
    }

    async function rewardWinner() {
        try {
            const transaction = await contract.rewardWinner();
            await transaction.wait();
            console.log("Winner rewarded");
        } catch (error) {
            console.log("Error while rewarding winner: ", error);
        }
    }

    const date = new Date("February 1, 2023 00:00:00");
    const currentDate = new Date();
    const timeToWait = date.getTime() - currentDate.getTime();
    setTimeout(rewardWinner, timeToWait);

    return (
        <div>
            <Homepage connectWallet={connectWallet} network={network} accounts={accounts}></Homepage>
            <h3>Reward set to February 1, 2022 00:00:00</h3>
            <br />
            {accounts[0]=="0x3fa9dd7e1907a1d97ffd0bb59b4bed0d85b44aec" ?
                <div>
                    <button onClick={rewardWinner}>Get Winner</button>
                    <h5>Are you sure you want to reward now, this action is ireversible !</h5>
                    <br />
                    <input type="text" id="proxy" placeholder="0xa2...h7g" />
                    <button onClick={upgrade}>Upgrade contract</button>
                </div >
                :
                <div>You are not the admin ! </div>
            }
        </div>
    )
}

export default Admin;