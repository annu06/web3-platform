"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, Coins, BarChart3, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Wallet,
    title: "Connect Your Wallet",
    description:
      "Use MetaMask, Coinbase Wallet, or any WalletConnect-compatible wallet. Sign in with Ethereum — no email, no password.",
  },
  {
    step: "02",
    icon: Coins,
    title: "Acquire PLT Tokens",
    description:
      "Stake ETH or LP tokens to earn PLT. Use PLT to vote in the DAO, access premium features, and earn yield in staking vaults.",
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Earn, Trade & Govern",
    description:
      "Farm yield in DeFi pools, mint or trade NFTs in the marketplace, and participate in on-chain DAO governance to shape the platform.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-white/2 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-blue mb-4 inline-block">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Three Steps to the Decentralized Economy
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden sm:block absolute top-10 left-[calc(33%+2rem)] right-[calc(33%+2rem)] h-px bg-gradient-to-r from-brand-500/30 via-accent-purple/30 to-accent-cyan/30" />

          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="relative inline-flex">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-brand/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-8 h-8 text-brand-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.description}</p>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="sm:hidden w-5 h-5 text-white/20 mx-auto mt-6" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
