"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ArrowRight, Shield, Zap, Globe, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ROTATING_WORDS = [
  "Decentralized Finance",
  "NFT Trading",
  "DAO Governance",
  "DeFi Yields",
];

const TVL_DATA = [
  { day: "Jan 8",  tvl: 31.2 },
  { day: "Jan 12", tvl: 33.7 },
  { day: "Jan 16", tvl: 32.4 },
  { day: "Jan 20", tvl: 36.1 },
  { day: "Jan 24", tvl: 38.8 },
  { day: "Jan 28", tvl: 37.5 },
  { day: "Feb 1",  tvl: 40.3 },
  { day: "Feb 5",  tvl: 42.1 },
  { day: "Feb 9",  tvl: 41.0 },
  { day: "Feb 13", tvl: 44.6 },
  { day: "Feb 17", tvl: 43.9 },
  { day: "Feb 21", tvl: 46.2 },
  { day: "Feb 25", tvl: 47.0 },
  { day: "Mar 1",  tvl: 48.2 },
];

const TRUST_BADGES = [
  { icon: Shield,     text: "Audited Contracts" },
  { icon: Zap,        text: "Gas Optimized"     },
  { icon: Globe,      text: "6 Chains"          },
  { icon: TrendingUp, text: "$48M+ TVL"         },
];

const DASHBOARD_STATS = [
  { label: "TVL",            value: "$48.2M", change: "+12.4%", positive: true  },
  { label: "Token Price",    value: "$4.82",  change: "+3.1%",  positive: true  },
  { label: "Active Stakers", value: "12,841", change: "+891",   positive: true  },
  { label: "DAO Proposals",  value: "7 Live", change: "4 pending", positive: null },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass px-3 py-2 rounded-lg text-xs text-white border border-white/10">
      <span className="text-accent-green font-semibold">${payload[0].value}M</span>
    </div>
  );
}

export function HeroSection() {
  const { isConnected } = useAccount();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex(prev => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4 overflow-hidden">

      {/* Dot-grid background */}
      <div className="absolute inset-0 dot-grid-bg opacity-100 pointer-events-none" />

      {/* Radial gradient vignette over dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124,58,237,0.07) 0%, transparent 60%), radial-gradient(ellipse at center, transparent 50%, #050810 100%)",
        }}
      />

      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/5 left-1/6 w-[500px] h-[500px] rounded-full bg-brand-500/[0.10] blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.35, 0.18] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/3 right-1/6 w-[400px] h-[400px] rounded-full bg-accent-purple/[0.10] blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.25, 0.12] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-accent-cyan/[0.08] blur-3xl pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto text-center">

        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 cursor-default"
          style={{
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.25)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" />
          </span>
          <span className="text-brand-400 text-sm font-medium">Now live on Ethereum Mainnet</span>
          <ArrowRight className="w-3.5 h-3.5 text-brand-400/70" />
        </motion.div>

        {/* Headline with cycling words */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-extrabold text-white leading-[1.08] tracking-tight mb-4">
            The Future of
          </h1>
          <div className="h-[1.2em] overflow-hidden mb-6">
            <AnimatePresence mode="wait">
              <motion.h1
                key={wordIndex}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl lg:text-[80px] font-extrabold leading-[1.08] tracking-tight gradient-text"
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/55 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Stake tokens, trade NFTs, participate in governance, and access DeFi yields —
          all secured by audited smart contracts on Ethereum.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          {isConnected ? (
            <Link href="/dashboard" className="btn-primary text-base px-8 py-3.5 rounded-2xl">
              Open Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="btn-primary text-base px-8 py-3.5 rounded-2xl"
                >
                  Connect Wallet to Start <ArrowRight className="w-4 h-4" />
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-16"
        >
          {TRUST_BADGES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/40 text-sm">
              <Icon className="w-3.5 h-3.5 text-accent-green" />
              {text}
            </div>
          ))}
        </motion.div>

        {/* Dashboard preview card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glow behind card */}
          <div className="absolute -inset-1 rounded-3xl blur-2xl opacity-20"
            style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
          />

          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "rgba(12,16,24,0.9)",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Fake top bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 mx-4 h-6 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center px-3">
                <span className="text-white/25 text-[11px] font-mono">app.web3platform.io/dashboard</span>
              </div>
              <div className="flex items-center gap-1.5 text-accent-green text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                <span className="font-mono">Live</span>
              </div>
            </div>

            <div className="p-5">
              {/* Stat cards row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {DASHBOARD_STATS.map(stat => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3.5"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p className="text-white/35 text-[11px] font-medium mb-1">{stat.label}</p>
                    <p className="text-white font-bold text-lg leading-none mb-1.5">{stat.value}</p>
                    <p className={`text-[11px] font-medium ${stat.positive === true ? "text-accent-green" : stat.positive === false ? "text-red-400" : "text-white/30"}`}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart + sidebar row */}
              <div className="flex gap-3">
                {/* TVL Area Chart */}
                <div
                  className="flex-1 rounded-xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/50 text-xs font-medium">Total Value Locked</span>
                    <span className="text-accent-green text-xs font-semibold">+12.4% ↑</span>
                  </div>
                  <ResponsiveContainer width="100%" height={90}>
                    <AreaChart data={TVL_DATA} margin={{ top: 2, right: 2, bottom: 0, left: 2 }}>
                      <defs>
                        <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" hide />
                      <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                      <Tooltip content={<CustomTooltip />} cursor={false} />
                      <Area
                        type="monotone"
                        dataKey="tvl"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#tvlGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Mini sidebar */}
                <div
                  className="w-36 rounded-xl p-4 flex flex-col gap-3"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-white/40 text-[11px] font-medium">Top Pools</p>
                  {[
                    { name: "ETH-PLT", apy: "24.8%", color: "#3b82f6" },
                    { name: "USDC-PLT", apy: "18.2%", color: "#7c3aed" },
                    { name: "PLT Solo", apy: "12.5%", color: "#10b981" },
                  ].map(pool => (
                    <div key={pool.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: pool.color }} />
                        <span className="text-white/60 text-[11px]">{pool.name}</span>
                      </div>
                      <span className="text-accent-green text-[11px] font-semibold">{pool.apy}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
