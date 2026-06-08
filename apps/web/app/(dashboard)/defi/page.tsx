"use client";

import React, { useState } from "react";
import { useAccount }       from "wagmi";
import { ConnectButton }    from "@rainbow-me/rainbowkit";
import { motion }           from "framer-motion";
import { TrendingUp, Wallet, Zap, Clock, ArrowUpRight, Info } from "lucide-react";
import { Navbar }           from "@/components/ui/Navbar";
import { formatUSD, formatNumber } from "@/lib/utils";

const POOLS = [
  {
    id:       0,
    name:     "PLT-ETH LP",
    token:    "UNI-V2",
    apr:      "148.2%",
    tvl:      "$12.4M",
    rewards:  "PLT",
    allocPt:  40,
    userStaked: "0",
    userPending: "0",
    color:    "#3b82f6",
  },
  {
    id:       1,
    name:     "PLT Single Stake",
    token:    "PLT",
    apr:      "84.6%",
    tvl:      "$8.1M",
    rewards:  "PLT",
    allocPt:  35,
    userStaked: "0",
    userPending: "0",
    color:    "#7c3aed",
  },
  {
    id:       2,
    name:     "PLT-USDC LP",
    token:    "UNI-V2",
    apr:      "61.4%",
    tvl:      "$5.8M",
    rewards:  "PLT",
    allocPt:  25,
    userStaked: "0",
    userPending: "0",
    color:    "#06b6d4",
  },
];

const OVERVIEW_STATS = [
  { label: "Total PLT Staked",   value: "52,400 PLT",  icon: TrendingUp, color: "text-brand-400" },
  { label: "Pending Rewards",    value: "124.8 PLT",   icon: Zap,        color: "text-yellow-400" },
  { label: "APR (Best Pool)",    value: "148.2%",      icon: ArrowUpRight, color: "text-accent-green" },
  { label: "Lock Period",        value: "7 Days",      icon: Clock,      color: "text-accent-purple" },
];

function PoolCard({ pool }: { pool: typeof POOLS[0] }) {
  const [amount, setAmount] = useState("");
  const [tab, setTab]       = useState<"stake" | "unstake">("stake");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white"
            style={{ background: pool.color + "25", border: `1px solid ${pool.color}40` }}
          >
            {pool.token.slice(0, 3)}
          </div>
          <div>
            <h3 className="text-white font-semibold">{pool.name}</h3>
            <p className="text-white/40 text-xs">{pool.token} → {pool.rewards}</p>
          </div>
        </div>
        <span className="badge-green">{pool.apr} APR</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5 p-3 rounded-xl bg-white/3">
        <div>
          <p className="text-white/40 text-xs">TVL</p>
          <p className="text-white text-sm font-semibold">{pool.tvl}</p>
        </div>
        <div>
          <p className="text-white/40 text-xs">Alloc Points</p>
          <p className="text-white text-sm font-semibold">{pool.allocPt}%</p>
        </div>
        <div>
          <p className="text-white/40 text-xs">Your Staked</p>
          <p className="text-white text-sm font-semibold">{pool.userStaked} PLT</p>
        </div>
        <div>
          <p className="text-white/40 text-xs">Pending Reward</p>
          <p className="text-accent-green text-sm font-semibold">{pool.userPending} PLT</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg bg-white/5">
        {(["stake", "unstake"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
              tab === t ? "bg-brand-600 text-white" : "text-white/40 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-500/50"
        />
        <button className="btn-primary px-4 py-2.5 text-sm">
          {tab === "stake" ? "Stake" : "Unstake"}
        </button>
      </div>

      <button className="w-full mt-2 py-2 rounded-xl text-xs text-accent-green border border-accent-green/20 hover:bg-accent-green/5 transition-colors">
        Harvest Rewards
      </button>
    </motion.div>
  );
}

export default function DefiPage() {
  const { isConnected } = useAccount();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-hero px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">

          <div>
            <h1 className="text-2xl font-bold text-white">DeFi Yield Farming</h1>
            <p className="text-white/40 text-sm mt-0.5">
              Stake LP tokens in Masterchef-style vaults and earn PLT rewards
            </p>
          </div>

          {/* Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {OVERVIEW_STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white/40 text-xs">{s.label}</p>
                    <Icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <p className="text-white font-bold text-xl">{s.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Info banner */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-sm text-white/60">
            <Info className="w-4 h-4 text-brand-400 shrink-0" />
            <p>
              Staking rewards are minted from platform supply headroom (max 1B PLT). There is a
              7-day lock period enforced in the smart contract before you can unstake.
            </p>
          </div>

          {/* Pools */}
          {!isConnected ? (
            <div className="glass-card p-12 text-center">
              <Wallet className="w-10 h-10 text-brand-400 mx-auto mb-3" />
              <p className="text-white font-semibold mb-2">Connect wallet to start farming</p>
              <p className="text-white/40 text-sm mb-6">Your staking positions will appear here</p>
              <ConnectButton />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {POOLS.map(pool => (
                <PoolCard key={pool.id} pool={pool} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
