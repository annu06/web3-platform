import { http, createConfig } from "wagmi";
import { mainnet, sepolia, polygon, arbitrum, base, optimism } from "wagmi/chains";
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";

export const wagmiConfig = getDefaultConfig({
  appName:     "Web3 Platform",
  appIcon:     "/logo.png",
  projectId,
  chains:      [mainnet, sepolia, polygon, arbitrum, base, optimism],
  transports: {
    [mainnet.id]:   http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL),
    [sepolia.id]:   http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
    [polygon.id]:   http(),
    [arbitrum.id]:  http(),
    [base.id]:      http(),
    [optimism.id]:  http(),
  },
  ssr: true,
});

// Contract addresses — populated from deployment output
export const CONTRACTS = {
  mainnet: {
    PlatformToken:    (process.env.NEXT_PUBLIC_TOKEN_ADDRESS_MAINNET    ?? "") as `0x${string}`,
    PlatformNFT:      (process.env.NEXT_PUBLIC_NFT_ADDRESS_MAINNET      ?? "") as `0x${string}`,
    GovernorContract: (process.env.NEXT_PUBLIC_GOVERNOR_ADDRESS_MAINNET ?? "") as `0x${string}`,
    TimeLock:         (process.env.NEXT_PUBLIC_TIMELOCK_ADDRESS_MAINNET ?? "") as `0x${string}`,
    StakingVault:     (process.env.NEXT_PUBLIC_STAKING_ADDRESS_MAINNET  ?? "") as `0x${string}`,
    MultiSigWallet:   (process.env.NEXT_PUBLIC_MULTISIG_ADDRESS_MAINNET ?? "") as `0x${string}`,
  },
  sepolia: {
    PlatformToken:    (process.env.NEXT_PUBLIC_TOKEN_ADDRESS_SEPOLIA    ?? "") as `0x${string}`,
    PlatformNFT:      (process.env.NEXT_PUBLIC_NFT_ADDRESS_SEPOLIA      ?? "") as `0x${string}`,
    GovernorContract: (process.env.NEXT_PUBLIC_GOVERNOR_ADDRESS_SEPOLIA ?? "") as `0x${string}`,
    TimeLock:         (process.env.NEXT_PUBLIC_TIMELOCK_ADDRESS_SEPOLIA ?? "") as `0x${string}`,
    StakingVault:     (process.env.NEXT_PUBLIC_STAKING_ADDRESS_SEPOLIA  ?? "") as `0x${string}`,
    MultiSigWallet:   (process.env.NEXT_PUBLIC_MULTISIG_ADDRESS_SEPOLIA ?? "") as `0x${string}`,
  },
} as const;
