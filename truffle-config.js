const fs = require("fs");
require("dotenv").config();
const { MNEMONIC, PROJECT_KEY } = process.env;

const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },

    "inf_Z-Transfer_goerli": {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(
        MNEMONIC,
        `https://goerli.infura.io/v3/${PROJECT_KEY}`
      ),
    },
  },
  compilers: {
    solc: {
      version: "0.8.16",
    },
  },
};
