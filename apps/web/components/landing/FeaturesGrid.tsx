"use client";

import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { TrendingUp, Image, Vote, Shield, Zap, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: TrendingUp,
    title: "DeFi Yield Farming",
    description:
      "Stake PLT tokens in multi-pool vaults modeled after Masterchef. Earn compounding rewards with transparent, audited smart contracts.",
    badge: "Live",
    badgeClass: "badge-blue",
    color: "text-brand-400",
    iconBg: "bg-brand-500/12",
    iconBorder: "border-brand-500/20",
    spotlightColor: "rgba(59,130,246,0.14)",
    borderHover: "rgba(59,130,246,0.4)",
  },
  {
    icon: Image,
    title: "NFT Marketplace",
    description:
      "Mint ERC-721 NFTs with on-chain royalties. List at fixed price or auction with anti-sniping protection built into the contract.",
    badge: "Live",
    badgeClass: "badge-purple",
    color: "text-violet-400",
    iconBg: "bg-violet-500/12",
    iconBorder: "border-violet-500/20",
    spotlightColor: "rgba(124,58,237,0.14)",
    borderHover: "rgba(124,58,237,0.4)",
  },
  {
    icon: Vote,
    title: "DAO Governance",
    description:
      "Vote on proposals with your staked PLT. A 2-day TimeLock protects against flash-loan attacks. On-chain, transparent, permissionless.",
    badge: "Live",
    badgeClass: "badge-cyan",
    color: "text-cyan-400",
    iconBg: "bg-cyan-500/12",
    iconBorder: "border-cyan-500/20",
    spotlightColor: "rgba(34,211,238,0.12)",
    borderHover: "rgba(34,211,238,0.4)",
  },
  {
    icon: Shield,
    title: "MultiSig Treasury",
    description:
      "N-of-M multi-signature wallet guards platform funds. All treasury actions require on-chain confirmation from a threshold of keyholders.",
    badge: "Live",
    badgeClass: "badge-green",
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/12",
    iconBorder: "border-emerald-500/20",
    spotlightColor: "rgba(16,185,129,0.12)",
    borderHover: "rgba(16,185,129,0.4)",
  },
  {
    icon: Zap,
    title: "SIWE Authentication",
    description:
      "Sign-In With Ethereum — no passwords, no custodians. Your wallet is your identity. JWT sessions with rolling refresh token rotation.",
    badge: "Secure",
    badgeClass: "badge-orange",
    color: "text-yellow-400",
    iconBg: "bg-yellow-500/12",
    iconBorder: "border-yellow-500/20",
    spotlightColor: "rgba(234,179,8,0.12)",
    borderHover: "rgba(234,179,8,0.4)",
  },
  {
    icon: Globe,
    title: "Multi-Chain Ready",
    description:
      "Mainnet, Sepolia, Polygon, Arbitrum, Base, and Optimism — all pre-configured. Switch chains in your wallet, the UI adapts instantly.",
    badge: "6 Chains",
    badgeClass: "badge-orange",
    color: "text-orange-400",
    iconBg: "bg-orange-500/12",
    iconBorder: "border-orange-500/20",
    spotlightColor: "rgba(249,115,22,0.12)",
    borderHover: "rgba(249,115,22,0.35)",
  },
];

function FeatureCard({ feat, i }: { feat: typeof FEATURES[0]; i: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const Icon = feat.icon;

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${feat.spotlightColor}, transparent 75%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      className="group relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "linear-gradient(145deg, rgba(12,16,24,0.95), rgba(8,11,20,0.8))",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 300ms ease, box-shadow 300ms ease, transform 200ms ease",
      }}
      whileHover={{
        y: -3,
        boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px " + feat.borderHover,
        borderColor: feat.borderHover,
      }}
    >
      {/* Mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlightBg }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${feat.borderHover}, transparent)` }}
      />

      <div className="relative p-6">
        {/* Icon */}
        <motion.div
          className={`w-12 h-12 rounded-xl ${feat.iconBg} border ${feat.iconBorder} flex items-center justify-center mb-5`}
          whileHover={{ scale: 1.08, rotate: 3 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Icon className={`w-5 h-5 ${feat.color}`} />
        </motion.div>

        {/* Title + badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-white font-semibold text-base leading-snug">{feat.title}</h3>
          <span className={`${feat.badgeClass} shrink-0 text-[10px]`}>{feat.badge}</span>
        </div>

        {/* Description */}
        <p className="text-white/45 text-sm leading-relaxed">{feat.description}</p>

        {/* Bottom arrow */}
        <div className="mt-4 flex items-center gap-1.5 text-xs text-white/0 group-hover:text-white/40 transition-colors duration-300">
          <span className={`${feat.color} text-[11px] font-medium`}>Learn more</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturesGrid() {
  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="badge-blue mb-4 inline-block">Platform Features</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
            Everything Web3{" "}
            <span className="gradient-text">in One Platform</span>
          </h2>
          <p className="text-white/45 mt-5 max-w-2xl mx-auto text-lg">
            Production-ready DeFi, NFTs, and DAO governance — all backed by
            audited Solidity contracts and a high-performance NestJS API.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feat, i) => (
            <FeatureCard key={feat.title} feat={feat} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
