import './App.css'
import { useState } from 'react';
import Homepage from './components/HomePage';
import { ethers } from 'ethers';
// ABI + contrat address
import BetOnPrice from './artifacts/contracts/BetOnprice.sol/BetOnPrice.json';
const betOnPriceAddress = '0x9d38cCAB9511960E2f4FD826F2B59192bA51fb73';

const App = () => {

  // State variables
  const [contract, setContract] = useState([]);
  const [network, setNetwork] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [price, setPrice] = useState(1);

  // Event listeners for changes in the user's accounts, disconnections, and network changes
  window.ethereum.on('accountsChanged', () => {
    window.location.reload();
  })

  window.ethereum.on('disconnect', () => {
    window.location.reload();
  })

  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  })

  /**
   * @function connectWallet
   * @dev Connects the user's wallet to the contract
   * @notice checks for the availability of ethereum in the browser and request for accounts access
   * @notice sets the contract, network and user's accounts in the state
   */
  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accounts);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(betOnPriceAddress, BetOnPrice.abi, signer);
      setContract(contract);
      const network = await provider.getNetwork();
      setNetwork(network.name);
      if (network.name !== 'goerli') {
        alert('Please switch to goerli network');
      }
      try {
        const transaction = await contract.getPrice();
        await transaction.wait;
        setPrice(transaction/10000000000000000);
      }
      catch (err) {
        setError(err.message);
      }
    }
  }

  /**
   * @function placeBet
   * @dev Allows the user to place a bet on the price
   * @notice Checks for the availability of ethereum in the browser
   * @param bet - the price the user is betting on
   * @notice requires a value of 0.01 ether to be sent along with the transaction
   */
  async function placeBet() {
    if (typeof window.ethereum !== 'undefined') {
      const bet = document.getElementById('bet').value;
      try {
        const transaction = await contract.placeBet(bet,{
          value: ethers.utils.parseEther("0.01"),
        });
        await transaction.wait;
        setSuccess('Bet placed successfully');
      }
      catch (err) {
        setError(err.message);
      }
    }
  }

  return (
    <div className="App">
      {error && <p className='alert error'>{error}</p>}
      {success && <p className='alert success'>{success}</p>}
      <Homepage connectWallet={connectWallet} network={network} accounts={accounts}></Homepage>
      <div>
        <br />
        <h3>You are betting on the price of ETH/USD to the date of February 1st 2023 at 00:00:00.</h3>
        <br />
        {price==1 ?
                <h4>Bet price is {price/100} eth, it's V1.</h4>
                :
                <h4>Bet price is {price/100} eth, we upgraded to V2. </h4>
            }
        <input type="number" id="bet" step="1" placeholder="0" />

        <button onClick={placeBet} >Place Bet</button>
      </div>
    </div>
  );
}

export default App;
