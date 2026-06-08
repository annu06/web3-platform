import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const PRIVATE_KEY  = process.env.DEPLOYER_PRIVATE_KEY ?? "0x" + "0".repeat(64);
const INFURA_KEY   = process.env.INFURA_API_KEY ?? "";
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY ?? "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: true,
    },
  },

  networks: {
    hardhat: {
      chainId: 31337,
      forking: process.env.MAINNET_RPC_URL
        ? { url: process.env.MAINNET_RPC_URL, blockNumber: 21_000_000 }
        : undefined,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY],
      gasPrice: "auto",
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY],
      gasPrice: "auto",
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    base: {
      url: "https://mainnet.base.org",
      accounts: [PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: {
      mainnet:          ETHERSCAN_KEY,
      sepolia:          ETHERSCAN_KEY,
      polygon:          process.env.POLYGONSCAN_API_KEY ?? "",
      arbitrumOne:      process.env.ARBISCAN_API_KEY ?? "",
      base:             process.env.BASESCAN_API_KEY ?? "",
    },
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    coinmarketcap: process.env.CMC_API_KEY,
    outputFile: "gas-report.txt",
    noColors: true,
  },

  paths: {
    sources:   "./contracts",
    tests:     "./test",
    cache:     "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
