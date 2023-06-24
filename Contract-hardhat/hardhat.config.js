require("@nomicfoundation/hardhat-toolbox");
require('hardhat-gas-reporter');
/** @type import('hardhat/config').HardhatUserConfig */



module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    ganashe:{
      url:"HTTP://127.0.0.1:7545"
    }
    // mumbai:{
    //   url:
      
    // }

    // infura:{
    //   url:"https://linea-goerli.infura.io/v3/fceea00c10644775bcbe9fc5e4866e99",
    //   accounts:[],
    //   chainId:
    // }
      
  },
  solidity: "0.8.17",
  gasReporter:{
    enabled:true,
    outputFile:"gas-reporter.txt",
    noColors:true,
    currency:"USD"
  }
};
