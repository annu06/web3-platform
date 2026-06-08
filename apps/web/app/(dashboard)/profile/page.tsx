"use client";

import React, { useState } from "react";
import { useAccount, useBalance, useEnsName } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion }        from "framer-motion";
import { Copy, Check, ExternalLink, Settings, TrendingUp, Image, Vote, Clock } from "lucide-react";
import { Navbar }        from "@/components/ui/Navbar";
import { formatAddress } from "@/lib/utils";

const ACTIVITY = [
  { type: "Stake",      desc: "Staked 5,000 PLT in PLT-ETH pool",       time: "2h ago",  icon: TrendingUp, color: "text-brand-400" },
  { type: "Vote",       desc: "Voted For on PIP-7: Staking Allocation",  time: "1d ago",  icon: Vote,       color: "text-accent-cyan" },
  { type: "Mint NFT",  desc: "Minted Genesis #004",                      time: "2d ago",  icon: Image,      color: "text-accent-purple" },
  { type: "Harvest",   desc: "Claimed 248 PLT staking rewards",          time: "3d ago",  icon: TrendingUp, color: "text-accent-green" },
  { type: "Vote",       desc: "Voted Against on PIP-5: Fee Reduction",   time: "7d ago",  icon: Vote,       color: "text-red-400" },
];

function CopyAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-white/60 hover:text-white transition-all"
    >
      {formatAddress(address)}
      {copied ? <Check className="w-3.5 h-3.5 text-accent-green" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const { data: balance }        = useBalance({ address });
  const { data: ens }            = useEnsName({ address });
  const [tab, setTab]            = useState<"activity" | "settings">("activity");

  if (!isConnected) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center max-w-md w-full"
          >
            <p className="text-white font-semibold text-lg mb-2">Connect Your Wallet</p>
            <p className="text-white/40 text-sm mb-8">View your profile, activity, and settings</p>
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
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Profile header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-purple flex items-center justify-center text-white text-2xl font-bold shrink-0">
                {address ? address.slice(2, 4).toUpperCase() : "?"}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-white text-xl font-bold mb-1">
                  {ens ?? formatAddress(address ?? "")}
                </h1>
                {ens && (
                  <p className="text-white/40 text-sm font-mono mb-2">{formatAddress(address ?? "")}</p>
                )}
                <div className="flex flex-wrap items-center gap-2">
                  {address && <CopyAddress address={address} />}
                  <a
                    href={`https://etherscan.io/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white transition-all"
                  >
                    Etherscan <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                {[
                  { label: "ETH",    value: parseFloat(balance?.formatted ?? "0").toFixed(4) },
                  { label: "NFTs",   value: "14" },
                  { label: "Staked", value: "52K PLT" },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-white font-bold text-lg">{s.value}</p>
                    <p className="text-white/30 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl bg-white/5 w-fit">
            {(["activity", "settings"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  tab === t ? "bg-brand-600 text-white" : "text-white/40 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "activity" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-6"
            >
              <h2 className="text-white font-semibold mb-5">Recent Activity</h2>
              <div className="space-y-1">
                {ACTIVITY.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/3 transition-colors">
                      <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${a.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">{a.desc}</p>
                        <p className="text-white/30 text-xs mt-0.5">{a.type}</p>
                      </div>
                      <div className="flex items-center gap-1 text-white/30 text-xs shrink-0">
                        <Clock className="w-3 h-3" />
                        {a.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-6"
            >
              <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
                <Settings className="w-4 h-4 text-white/40" />
                Settings
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Email Notifications",  sub: "Receive alerts for NFT sales and rewards" },
                  { label: "Push Notifications",   sub: "Browser push for real-time updates" },
                  { label: "Show Portfolio Value", sub: "Display USD value of your holdings" },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5">
                    <div>
                      <p className="text-white text-sm font-medium">{s.label}</p>
                      <p className="text-white/40 text-xs mt-0.5">{s.sub}</p>
                    </div>
                    <button className="relative w-11 h-6 rounded-full bg-brand-600 transition-colors">
                      <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
