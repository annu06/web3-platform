"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Image, Vote, Shield, Zap, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: TrendingUp,
    title: "DeFi Yield Farming",
    description:
      "Stake PLT tokens in multi-pool vaults modeled after Masterchef. Earn compounding rewards with transparent, audited smart contracts.",
    badge: "Live",
    color: "text-brand-400",
    bg: "bg-brand-500/10",
  },
  {
    icon: Image,
    title: "NFT Marketplace",
    description:
      "Mint ERC-721 NFTs with on-chain royalties. List at fixed price or auction with anti-sniping protection built into the contract.",
    badge: "Live",
    color: "text-accent-purple",
    bg: "bg-purple-500/10",
  },
  {
    icon: Vote,
    title: "DAO Governance",
    description:
      "Vote on proposals with your staked PLT. A 2-day TimeLock protects against flash-loan attacks. On-chain, transparent, permissionless.",
    badge: "Live",
    color: "text-accent-cyan",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Shield,
    title: "MultiSig Treasury",
    description:
      "N-of-M multi-signature wallet guards platform funds. All treasury actions require on-chain confirmation from a threshold of keyholders.",
    badge: "Live",
    color: "text-accent-green",
    bg: "bg-green-500/10",
  },
  {
    icon: Zap,
    title: "SIWE Authentication",
    description:
      "Sign-In With Ethereum — no passwords, no custodians. Your wallet is your identity. JWT sessions with rolling refresh token rotation.",
    badge: "Secure",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Globe,
    title: "Multi-Chain Ready",
    description:
      "Mainnet, Sepolia, Polygon, Arbitrum, Base, and Optimism — all pre-configured. Switch chains in your wallet, the UI adapts instantly.",
    badge: "6 Chains",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-blue mb-4 inline-block">Platform Features</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Everything Web3 in One Platform
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg">
            Production-ready DeFi, NFTs, and DAO governance — all backed by
            audited Solidity contracts and a high-performance NestJS API.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-card p-6 hover:border-white/20 transition-colors group"
              >
                <div className={`w-11 h-11 rounded-xl ${feat.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <Icon className={`w-5 h-5 ${feat.color}`} />
                </div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-white font-semibold">{feat.title}</h3>
                  <span className="badge-blue text-[10px] shrink-0">{feat.badge}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
