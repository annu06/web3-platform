"use client";

import React from "react";
import { useAccount, useBalance, useBlockNumber } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import {
  Wallet, TrendingUp, Image as ImageIcon, Vote,
  ArrowUpRight, ArrowDownRight, ExternalLink, RefreshCw
} from "lucide-react";
import { formatAddress, formatUSD } from "@/lib/utils";
import { Navbar } from "@/components/ui/Navbar";

const CHART_DATA = [
  { month: "Jul", tvl: 28, staked: 12, nftVol: 4 },
  { month: "Aug", tvl: 32, staked: 15, nftVol: 6 },
  { month: "Sep", tvl: 38, staked: 19, nftVol: 5 },
  { month: "Oct", tvl: 35, staked: 17, nftVol: 8 },
  { month: "Nov", tvl: 44, staked: 22, nftVol: 11 },
  { month: "Dec", tvl: 48, staked: 26, nftVol: 9 },
];

const PORTFOLIO_PIE = [
  { name: "Staked PLT", value: 45, color: "#3b82f6" },
  { name: "ETH",        value: 30, color: "#7c3aed" },
  { name: "NFTs",       value: 15, color: "#06b6d4" },
  { name: "LP Tokens",  value: 10, color: "#10b981" },
];

const RECENT_TXN = [
  { hash: "0x1a2b...9f0c", type: "Stake",    amount: "+5,000 PLT", status: "Confirmed", time: "2m ago" },
  { hash: "0x3c4d...8e1f", type: "Mint NFT", amount: "-0.05 ETH",  status: "Confirmed", time: "1h ago" },
  { hash: "0x5e6f...7d2a", type: "Vote",     amount: "Proposal #7", status: "Confirmed", time: "3h ago" },
  { hash: "0x7g8h...6c3b", type: "Harvest",  amount: "+124 PLT",   status: "Pending",   time: "5h ago" },
];

function StatCard({
  title, value, change, positive, icon: Icon, delay = 0,
}: {
  title: string; value: string; change?: string; positive?: boolean;
  icon: React.ElementType; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="stat-card"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-white/50 text-sm">{title}</p>
        <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-brand-400" />
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {change && (
        <div className={`flex items-center gap-1 mt-1 text-sm ${positive ? "text-accent-green" : "text-red-400"}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      )}
    </motion.div>
  );
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { data: balance }        = useBalance({ address });
  const { data: blockNumber }    = useBlockNumber({ watch: true });

  if (!isConnected) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center max-w-md"
          >
            <Wallet className="w-12 h-12 text-brand-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-white/50 mb-6 text-sm">
              Connect your Ethereum wallet to access your dashboard, portfolio, and DeFi positions.
            </p>
            <ConnectButton />
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-hero px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-white/40 text-sm mt-0.5">
                {address && formatAddress(address)} · Block #{blockNumber?.toString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-xs"
              >
                Etherscan <ExternalLink className="w-3 h-3" />
              </a>
              <ConnectButton accountStatus="address" showBalance chainStatus="icon" />
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="ETH Balance"   value={`${parseFloat(balance?.formatted ?? "0").toFixed(4)} ETH`} change="+0.012 ETH" positive icon={Wallet}    delay={0} />
            <StatCard title="PLT Staked"    value="52,400 PLT"  change="+8.3%"  positive icon={TrendingUp} delay={0.05} />
            <StatCard title="NFTs Owned"    value="14 NFTs"     change="+2 this month" positive icon={ImageIcon}  delay={0.1} />
            <StatCard title="DAO Votes"     value="7 Cast"      change="3 pending" positive={false} icon={Vote} delay={0.15} />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* TVL Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 lg:col-span-2"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white font-semibold">Platform TVL</h3>
                  <p className="text-white/40 text-xs mt-0.5">Total value locked ($M)</p>
                </div>
                <span className="badge-green">+12.4%</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={CHART_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tvlGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="stakGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#161b27", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
                    labelStyle={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="tvl"    name="TVL"    stroke="#3b82f6" fill="url(#tvlGrad)"  strokeWidth={2} />
                  <Area type="monotone" dataKey="staked" name="Staked" stroke="#7c3aed" fill="url(#stakGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Portfolio pie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass-card p-6"
            >
              <h3 className="text-white font-semibold mb-1">Portfolio</h3>
              <p className="text-white/40 text-xs mb-4">Asset allocation</p>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={PORTFOLIO_PIE} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {PORTFOLIO_PIE.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#161b27", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff", fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-3">
                {PORTFOLIO_PIE.map(item => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                      <span className="text-white/60">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold">Recent Transactions</h3>
              <button className="btn-ghost text-xs">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-white/40 text-xs border-b border-white/5">
                    <th className="pb-3 font-medium">Transaction</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {RECENT_TXN.map(txn => (
                    <tr key={txn.hash} className="group hover:bg-white/2 transition-colors">
                      <td className="py-3.5 font-mono text-white/60 text-xs">{txn.hash}</td>
                      <td className="py-3.5">
                        <span className="badge-blue">{txn.type}</span>
                      </td>
                      <td className="py-3.5 text-white font-medium">{txn.amount}</td>
                      <td className="py-3.5">
                        <span className={txn.status === "Confirmed" ? "badge-green" : "badge-orange"}>
                          {txn.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-white/40 text-xs">{txn.time}</td>
                      <td className="py-3.5">
                        <a
                          href={`https://etherscan.io/tx/${txn.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 text-brand-400 hover:text-brand-300 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
