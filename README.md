# Web3 Platform — Enterprise DeFi · NFT · DAO

> Production-ready Web3 platform built on Ethereum with Next.js 15, NestJS, Solidity, and PostgreSQL.

---

## Architecture

```
web3-platform/                    ← Turborepo monorepo (pnpm workspaces)
├── apps/
│   ├── web/                      ← Next.js 15 frontend (Vercel)
│   └── api/                      ← NestJS backend (Railway)
└── packages/
    └── contracts/                ← Hardhat + OpenZeppelin smart contracts
```

## Smart Contracts

| Contract          | Purpose                                  | Standard        |
|-------------------|------------------------------------------|-----------------|
| `PlatformToken`   | Governance token with built-in staking   | ERC-20 + Votes  |
| `PlatformNFT`     | NFT with marketplace + auction           | ERC-721 + 2981  |
| `GovernorContract`| DAO on-chain governance                  | OpenZeppelin Gov |
| `TimeLock`        | 2-day timelock for DAO actions           | TimelockController |
| `StakingVault`    | Multi-pool yield farming (Masterchef)    | Custom          |
| `MultiSigWallet`  | N-of-M multisig treasury                 | Custom          |

## Tech Stack

| Layer      | Technology                                          |
|------------|-----------------------------------------------------|
| Frontend   | Next.js 15, React 19, TypeScript, TailwindCSS       |
| Web3 UI    | Wagmi v2, RainbowKit, Ethers.js v6, SIWE            |
| State      | Zustand, TanStack Query v5                          |
| Backend    | NestJS, TypeScript, Prisma ORM, JWT + SIWE auth     |
| Database   | PostgreSQL 16, Redis 7                              |
| Blockchain | Solidity 0.8.24, Hardhat, OpenZeppelin v5           |
| Infra      | Vercel (frontend), Railway (API), Docker Compose    |
| CI/CD      | GitHub Actions                                      |

## Quick Start

### Prerequisites
- Node.js 20+, pnpm 9+
- Docker & Docker Compose
- An Ethereum wallet + Infura/Alchemy API key

### 1. Clone & install
```bash
git clone https://github.com/yourorg/web3-platform.git
cd web3-platform
pnpm install
```

### 2. Environment setup
```bash
# API
cp apps/api/.env.example apps/api/.env.local
# Web
cp apps/web/.env.example apps/web/.env.local
# Contracts
cp packages/contracts/.env.example packages/contracts/.env
```

Fill in:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — 32+ char random string
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` — from cloud.walletconnect.com
- `INFURA_API_KEY` — from infura.io
- `DEPLOYER_PRIVATE_KEY` — wallet private key for deployments

### 3. Database
```bash
docker compose up postgres redis -d
pnpm --filter @web3/api exec prisma migrate dev
```

### 4. Compile & test contracts
```bash
pnpm contracts:compile
pnpm contracts:test
```

### 5. Run locally
```bash
pnpm dev
# Web: http://localhost:3000
# API: http://localhost:4000
# Docs: http://localhost:4000/api/docs
```

## Contract Deployment

```bash
# Local Hardhat node
npx hardhat node
pnpm --filter @web3/contracts deploy

# Sepolia testnet
pnpm --filter @web3/contracts deploy:sepolia

# Mainnet (careful!)
pnpm --filter @web3/contracts deploy:mainnet
```

After deployment, update `.env.local` with the deployed contract addresses.

## Production Deployment

### Vercel (Frontend)
```bash
cd apps/web
vercel --prod
```

### Railway (API)
```bash
railway up --service api
```

### Docker (Self-hosted)
```bash
docker compose -f docker-compose.yml up -d --build
```

## What's Implemented (This Scaffold)

### ✅ Complete
- Monorepo structure (Turborepo + pnpm)
- All Solidity contracts: ERC-20+Staking, ERC-721+Marketplace+Auction, DAO Governor, TimeLock, MultiSig, StakingVault
- Hardhat config (multi-network, gas reporting, Etherscan verification)
- Deployment script with Etherscan verification
- Next.js 15 app with root layout, providers, globals.css
- Wagmi v2 config (6 chains: Mainnet, Sepolia, Polygon, Arbitrum, Base, Optimism)
- RainbowKit wallet connection with SIWE support
- TanStack Query client
- Dark/light theme provider
- Navbar with wallet balance display, network badge, mobile menu
- Landing page (hero with animated orbs, stat cards preview, CTAs)
- Dashboard page (stat cards, TVL area chart, portfolio pie, transaction table)
- NestJS app structure + all module declarations
- NestJS main.ts (Helmet, CORS, rate limiting, Swagger)
- Auth module (SIWE verification, JWT + refresh tokens, session persistence)
- Complete Prisma schema (Users, Wallets, NFTs, Collections, Transactions, Proposals, Votes, Staking, Treasury, Notifications, Analytics, AuditLog)
- Docker Compose (Postgres, Redis, API, Web, Nginx)
- GitHub Actions CI/CD (lint, type-check, contract tests, API tests, Slither audit, Vercel + Railway deploy)
- Utility functions (formatAddress, formatUSD, etherscanTx, ipfsToHttp, timeAgo)
- TailwindCSS design system (glassmorphism, gradient tokens, animations)

### 📋 Next Steps (implement in order)

1. **Frontend pages**
   - `/defi` — Staking interface (useContractWrite to StakingVault)
   - `/nfts` — NFT gallery + mint + marketplace
   - `/dao` — Proposal list, vote, delegate
   - `/profile` — User profile + activity

2. **API modules** (each follows NestJS module pattern)
   - `UsersModule` — CRUD, settings
   - `NftModule` — IPFS upload via Pinata, metadata storage
   - `DefiModule` — Sync staking positions from chain events
   - `DaoModule` — Sync proposals/votes from Governor events
   - `AnalyticsModule` — Daily snapshots, TVL calculation
   - `NotifyModule` — WebSocket push + email (SendGrid)

3. **Blockchain indexing**
   - Event listener service (viem `watchContractEvent`)
   - Sync TransactionConfirmed/NFTSold/VoteCast events to DB

4. **AI features**
   - OpenAI GPT-4o assistant (wallet/NFT/DeFi context)
   - Portfolio risk analysis
   - NFT recommendation engine

5. **Testing**
   - Hardhat tests for all contracts (target 95% branch coverage)
   - NestJS e2e tests (supertest)
   - Playwright tests for critical user flows

## Security Checklist

- [x] Reentrancy protection (ReentrancyGuard on all external calls)
- [x] Access control (OpenZeppelin AccessControl + Ownable)
- [x] Pausable contracts
- [x] TimeLock on governance actions (2-day delay)
- [x] Anti-sniping auction extension
- [x] Royalty enforcement in marketplace
- [x] JWT with refresh token rotation
- [x] SIWE signature verification with nonce expiry
- [x] Rate limiting (10 req/s, 100 req/min)
- [x] Helmet HTTP security headers
- [x] Input validation (class-validator)
- [ ] Slither static analysis (run in CI)
- [ ] Formal audit before mainnet (recommended: Code4rena or Sherlock)

## License

MIT
