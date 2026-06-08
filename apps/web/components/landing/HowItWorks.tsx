"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wallet, Coins, BarChart3 } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Wallet,
    title: "Connect Your Wallet",
    description:
      "Use MetaMask, Coinbase Wallet, or any WalletConnect-compatible wallet. Sign in with Ethereum — no email, no password.",
    color: "text-brand-400",
    iconBg: "bg-brand-500/12",
    iconBorder: "border-brand-500/25",
    glow: "rgba(59,130,246,0.3)",
    gradientFrom: "#3b82f6",
  },
  {
    step: "02",
    icon: Coins,
    title: "Acquire PLT Tokens",
    description:
      "Stake ETH or LP tokens to earn PLT. Use PLT to vote in the DAO, access premium features, and earn yield in staking vaults.",
    color: "text-violet-400",
    iconBg: "bg-violet-500/12",
    iconBorder: "border-violet-500/25",
    glow: "rgba(124,58,237,0.3)",
    gradientFrom: "#7c3aed",
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Earn, Trade & Govern",
    description:
      "Farm yield in DeFi pools, mint or trade NFTs in the marketplace, and participate in on-chain DAO governance to shape the platform.",
    color: "text-cyan-400",
    iconBg: "bg-cyan-500/12",
    iconBorder: "border-cyan-500/25",
    glow: "rgba(34,211,238,0.3)",
    gradientFrom: "#22d3ee",
  },
];

export function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lineRef, { once: true, margin: "-80px" });

  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden section-divider">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(255,255,255,0.012)" }}
      />
      <div className="absolute inset-0 dot-grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-brand-500/[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="badge-blue mb-4 inline-block">How It Works</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
            Three Steps to the{" "}
            <span className="gradient-text">Decentralized Economy</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto">
            Get started in minutes. No KYC, no sign-up, no custody. Just connect and go.
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated connector line (desktop) */}
          <div
            ref={lineRef}
            className="hidden sm:block absolute top-[52px] left-[calc(16.66%+40px)] right-[calc(16.66%+40px)] h-px overflow-hidden"
          >
            {/* Base line */}
            <div className="absolute inset-0 bg-white/[0.06]" />
            {/* Animated fill */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                originX: 0,
                background: "linear-gradient(90deg, #3b82f6, #7c3aed, #22d3ee)",
              }}
              className="absolute inset-0"
            />
            {/* Moving dot */}
            <motion.div
              initial={{ left: "0%" }}
              animate={inView ? { left: "100%" } : { left: "0%" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-sm"
              style={{ boxShadow: "0 0 8px rgba(255,255,255,0.8)" }}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-10 sm:gap-8">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center group relative"
                >
                  {/* Icon circle */}
                  <div className="relative inline-block mb-6">
                    {/* Glow ring */}
                    <motion.div
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                      className="absolute -inset-3 rounded-full blur-xl pointer-events-none"
                      style={{ background: s.glow }}
                    />

                    {/* Icon container */}
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className={`relative w-24 h-24 rounded-2xl ${s.iconBg} border ${s.iconBorder} flex items-center justify-center`}
                      style={{ boxShadow: `0 0 0 1px ${s.iconBorder}, 0 8px 24px rgba(0,0,0,0.4)` }}
                    >
                      <Icon className={`w-9 h-9 ${s.color}`} />
                    </motion.div>

                    {/* Step badge */}
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${s.gradientFrom}, rgba(124,58,237,0.9))` }}
                    >
                      {s.step}
                    </div>
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-3">{s.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed max-w-xs mx-auto">
                    {s.description}
                  </p>

                  {/* Mobile arrow */}
                  {i < STEPS.length - 1 && (
                    <div className="sm:hidden mt-8 flex justify-center">
                      <svg className="w-5 h-5 text-white/15 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
