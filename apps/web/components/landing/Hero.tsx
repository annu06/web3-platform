"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";

const TRUST_BADGES = [
  { icon: Shield, text: "Audited Contracts" },
  { icon: Zap,    text: "Gas Optimized" },
  { icon: Globe,  text: "Multi-chain" },
];

export function HeroSection() {
  const { isConnected } = useAccount();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-accent-purple/10 blur-3xl"
        />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 text-brand-400 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          Now live on Ethereum Mainnet
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
        >
          The Future of{" "}
          <span className="relative inline-block">
            <span className="gradient-text">Decentralized Finance</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-brand origin-left"
            />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Stake tokens, trade NFTs, participate in governance, and access DeFi yields —
          all secured by audited smart contracts on Ethereum.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {isConnected ? (
            <Link href="/dashboard" className="btn-primary text-base px-8 py-3.5 rounded-2xl">
              Open Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="btn-primary text-base px-8 py-3.5 rounded-2xl"
                >
                  Connect Wallet to Start
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </ConnectButton.Custom>
          )}
          <Link href="/dao" className="btn-secondary text-base px-8 py-3.5 rounded-2xl">
            Explore DAO Governance
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {TRUST_BADGES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/40 text-sm">
              <Icon className="w-4 h-4 text-accent-green" />
              {text}
            </div>
          ))}
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-20 relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-brand rounded-3xl blur opacity-20" />
          <div className="relative glass rounded-3xl p-6 border border-white/10">
            {/* Mock dashboard UI */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: "TVL", value: "$48.2M", change: "+12.4%" },
                { label: "Token Price", value: "$4.82", change: "+3.1%" },
                { label: "Active Stakers", value: "12,841", change: "+891" },
                { label: "DAO Proposals", value: "7 Active", change: "4 Pending" },
              ].map(stat => (
                <div key={stat.label} className="glass-card p-4 rounded-xl">
                  <p className="text-white/40 text-xs mb-1">{stat.label}</p>
                  <p className="text-white font-bold text-lg">{stat.value}</p>
                  <p className="text-accent-green text-xs">{stat.change}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="flex-1 glass rounded-xl p-4 h-28" />
              <div className="w-40 glass rounded-xl p-4 h-28" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
