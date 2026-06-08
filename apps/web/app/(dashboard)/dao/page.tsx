"use client";

import React, { useState } from "react";
import { useAccount }       from "wagmi";
import { ConnectButton }    from "@rainbow-me/rainbowkit";
import { motion }           from "framer-motion";
import { Vote, Plus, CheckCircle, XCircle, MinusCircle, Clock, Shield } from "lucide-react";
import { Navbar }  from "@/components/ui/Navbar";
import { cn }      from "@/lib/utils";

type ProposalStatus = "Active" | "Pending" | "Succeeded" | "Defeated" | "Queued" | "Executed";
type VoteType = "For" | "Against" | "Abstain";

interface Proposal {
  id:          string;
  title:       string;
  description: string;
  status:      ProposalStatus;
  forVotes:    number;
  againstVotes:number;
  abstainVotes:number;
  quorum:      number;
  startBlock:  number;
  endBlock:    number;
  proposer:    string;
  myVote?:     VoteType;
}

const PROPOSALS: Proposal[] = [
  {
    id: "1",
    title: "PIP-7: Increase Staking Vault Allocation to 45%",
    description: "Proposal to increase alloc points for PLT-ETH LP pool from 40% to 45% to attract more liquidity.",
    status: "Active",
    forVotes:     142_800,
    againstVotes:  28_400,
    abstainVotes:   8_200,
    quorum: 40,
    startBlock: 19_800_000,
    endBlock:   19_850_400,
    proposer: "0xAbcD...1234",
  },
  {
    id: "2",
    title: "PIP-6: Add USDC Liquidity Mining Pool",
    description: "Add a new USDC single-asset yield farming pool with 10% alloc points.",
    status: "Succeeded",
    forVotes:     320_000,
    againstVotes:  12_000,
    abstainVotes:   5_400,
    quorum: 40,
    startBlock: 19_720_000,
    endBlock:   19_770_400,
    proposer: "0xEfGh...5678",
    myVote: "For",
  },
  {
    id: "3",
    title: "PIP-5: Reduce Platform NFT Fee from 2.5% to 2.0%",
    description: "Reduce the marketplace platform fee to increase volume and competitiveness.",
    status: "Defeated",
    forVotes:      80_000,
    againstVotes: 260_000,
    abstainVotes:  14_000,
    quorum: 40,
    startBlock: 19_640_000,
    endBlock:   19_690_400,
    proposer: "0xIjKl...9012",
    myVote: "Against",
  },
  {
    id: "4",
    title: "PIP-8: Treasury MultiSig Threshold Change 3-of-5 → 4-of-5",
    description: "Increase multisig threshold for enhanced treasury security.",
    status: "Queued",
    forVotes:     188_000,
    againstVotes:  24_000,
    abstainVotes:  10_000,
    quorum: 40,
    startBlock: 19_860_000,
    endBlock:   19_910_400,
    proposer: "0xMnOp...3456",
  },
];

const STATUS_CONFIG: Record<ProposalStatus, { color: string; badge: string; icon: React.ElementType }> = {
  Active:    { color: "text-brand-400",    badge: "badge-blue",   icon: Vote },
  Pending:   { color: "text-yellow-400",  badge: "badge-orange", icon: Clock },
  Succeeded: { color: "text-accent-green", badge: "badge-green", icon: CheckCircle },
  Defeated:  { color: "text-red-400",     badge: "badge-red",    icon: XCircle },
  Queued:    { color: "text-accent-cyan",  badge: "badge-blue",  icon: Clock },
  Executed:  { color: "text-accent-green", badge: "badge-green", icon: Shield },
};

function VoteBar({ forVotes, againstVotes, abstainVotes }: { forVotes: number; againstVotes: number; abstainVotes: number }) {
  const total = forVotes + againstVotes + abstainVotes || 1;
  const forPct     = (forVotes     / total) * 100;
  const againstPct = (againstVotes / total) * 100;
  const abstainPct = (abstainVotes / total) * 100;

  return (
    <div>
      <div className="flex rounded-full overflow-hidden h-2 mb-1.5">
        <div className="bg-accent-green transition-all" style={{ width: `${forPct}%` }} />
        <div className="bg-red-500 transition-all"      style={{ width: `${againstPct}%` }} />
        <div className="bg-white/20 transition-all"     style={{ width: `${abstainPct}%` }} />
      </div>
      <div className="flex justify-between text-[10px] text-white/40">
        <span className="text-accent-green">{forPct.toFixed(1)}% For</span>
        <span className="text-red-400">{againstPct.toFixed(1)}% Against</span>
        <span>{abstainPct.toFixed(1)}% Abstain</span>
      </div>
    </div>
  );
}

function ProposalCard({ p }: { p: Proposal }) {
  const [voting, setVoting] = useState<VoteType | null>(null);
  const cfg = STATUS_CONFIG[p.status];
  const StatusIcon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={cfg.badge + " text-[10px]"}>{p.status}</span>
            <span className="text-white/20 text-xs">by {p.proposer}</span>
          </div>
          <h3 className="text-white font-semibold">{p.title}</h3>
        </div>
        <StatusIcon className={`w-5 h-5 shrink-0 ${cfg.color}`} />
      </div>

      <p className="text-white/40 text-sm mb-5 leading-relaxed">{p.description}</p>

      <VoteBar forVotes={p.forVotes} againstVotes={p.againstVotes} abstainVotes={p.abstainVotes} />

      {p.status === "Active" && !p.myVote && (
        <div className="flex gap-2 mt-5">
          {(["For", "Against", "Abstain"] as VoteType[]).map(v => (
            <button
              key={v}
              onClick={() => setVoting(v)}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-medium border transition-all",
                voting === v
                  ? v === "For"
                    ? "bg-accent-green/20 border-accent-green/50 text-accent-green"
                    : v === "Against"
                    ? "bg-red-500/20 border-red-500/50 text-red-400"
                    : "bg-white/10 border-white/30 text-white"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white"
              )}
            >
              {v === "For" ? "✓ For" : v === "Against" ? "✗ Against" : "— Abstain"}
            </button>
          ))}
        </div>
      )}

      {voting && p.status === "Active" && (
        <button className="w-full mt-2 btn-primary text-xs py-2.5">
          Submit Vote ({voting})
        </button>
      )}

      {p.myVote && (
        <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
          <CheckCircle className="w-3.5 h-3.5 text-accent-green" />
          You voted <span className="text-white font-medium">{p.myVote}</span>
        </div>
      )}
    </motion.div>
  );
}

export default function DaoPage() {
  const { isConnected } = useAccount();
  const [filter, setFilter] = useState<ProposalStatus | "All">("All");

  const filtered = PROPOSALS.filter(p => filter === "All" || p.status === filter);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-hero px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">DAO Governance</h1>
              <p className="text-white/40 text-sm mt-0.5">
                Vote on proposals · 2-day TimeLock · 4% quorum required
              </p>
            </div>
            {isConnected && (
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" /> New Proposal
              </button>
            )}
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Active",    count: PROPOSALS.filter(p => p.status === "Active").length },
              { label: "Succeeded", count: PROPOSALS.filter(p => p.status === "Succeeded").length },
              { label: "Total",     count: PROPOSALS.length },
            ].map(s => (
              <div key={s.label} className="glass-card p-4 text-center">
                <p className="text-2xl font-bold text-white">{s.count}</p>
                <p className="text-white/40 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {(["All", "Active", "Pending", "Succeeded", "Defeated", "Queued"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium transition-all border",
                  filter === f
                    ? "bg-brand-600 border-brand-600 text-white"
                    : "border-white/10 text-white/40 hover:border-white/20 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Proposals */}
          {!isConnected ? (
            <div className="glass-card p-12 text-center">
              <Vote className="w-10 h-10 text-brand-400 mx-auto mb-3" />
              <p className="text-white font-semibold mb-2">Connect wallet to vote</p>
              <p className="text-white/40 text-sm mb-6">Voting requires PLT tokens. Proposals are visible to everyone.</p>
              <ConnectButton />
            </div>
          ) : null}

          <div className="grid gap-4">
            {filtered.map(p => <ProposalCard key={p.id} p={p} />)}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/30">No proposals found</div>
          )}
        </div>
      </div>
    </>
  );
}
