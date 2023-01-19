require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const { REACT_APP_PRIVATE_KEY, REACT_APP_PROVIDER, ETHERSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.7",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {

    hardhat: {  
      chainId: 1337
    },

    goerli: {
      url: REACT_APP_PROVIDER,
      accounts: [`0x${REACT_APP_PRIVATE_KEY}`]
    }
  },
  etherscan : {
    apiKey: ETHERSCAN_API_KEY
  }
};
