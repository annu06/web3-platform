"use client";

import React, { useState } from "react";
import { useAccount }       from "wagmi";
import { ConnectButton }    from "@rainbow-me/rainbowkit";
import { motion }           from "framer-motion";
import { Search, Grid3X3, List, Tag, Gavel, Plus, ExternalLink } from "lucide-react";
import { Navbar }           from "@/components/ui/Navbar";
import { formatUSD, formatAddress, ipfsToHttp } from "@/lib/utils";
import { cn }               from "@/lib/utils";

type ViewMode = "grid" | "list";

const SAMPLE_NFTS = [
  { id: "1", tokenId: "001", name: "Genesis #001", collection: "Genesis Collection", image: "", price: "0.85", currency: "ETH", isListed: true,  isAuction: false, owner: "0xAbcD...1234" },
  { id: "2", tokenId: "002", name: "Genesis #002", collection: "Genesis Collection", image: "", price: "1.20", currency: "ETH", isListed: true,  isAuction: true,  owner: "0x5678...EfGh" },
  { id: "3", tokenId: "003", name: "Genesis #003", collection: "Genesis Collection", image: "", price: "0.65", currency: "ETH", isListed: false, isAuction: false, owner: "0xIjKl...9012" },
  { id: "4", tokenId: "101", name: "Artifact #101", collection: "Artifact Series",  image: "", price: "2.40", currency: "ETH", isListed: true,  isAuction: false, owner: "0xMnOp...3456" },
  { id: "5", tokenId: "102", name: "Artifact #102", collection: "Artifact Series",  image: "", price: "3.10", currency: "ETH", isListed: true,  isAuction: true,  owner: "0xQrSt...7890" },
  { id: "6", tokenId: "103", name: "Artifact #103", collection: "Artifact Series",  image: "", price: "1.75", currency: "ETH", isListed: false, isAuction: false, owner: "0xUvWx...1234" },
];

const TABS = ["All", "Listed", "Auction", "My NFTs"] as const;
type Tab = typeof TABS[number];

function NftCard({ nft }: { nft: typeof SAMPLE_NFTS[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card overflow-hidden group cursor-pointer hover:border-white/20 transition-colors"
    >
      {/* Image placeholder */}
      <div className="aspect-square bg-gradient-to-br from-brand-600/20 to-accent-purple/20 relative flex items-center justify-center">
        <span className="text-white/20 text-4xl font-bold font-mono">#{nft.tokenId}</span>
        {nft.isAuction && (
          <div className="absolute top-3 left-3">
            <span className="badge-orange flex items-center gap-1 text-[10px]">
              <Gavel className="w-3 h-3" /> Auction
            </span>
          </div>
        )}
        {nft.isListed && !nft.isAuction && (
          <div className="absolute top-3 left-3">
            <span className="badge-blue flex items-center gap-1 text-[10px]">
              <Tag className="w-3 h-3" /> Listed
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button className="btn-primary px-4 py-2 text-xs">
            {nft.isAuction ? "Place Bid" : nft.isListed ? "Buy Now" : "View"}
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{nft.collection}</p>
        <h3 className="text-white font-semibold text-sm mb-2">{nft.name}</h3>
        <div className="flex items-center justify-between">
          <div>
            {nft.isListed ? (
              <>
                <p className="text-white/30 text-[10px]">{nft.isAuction ? "Min bid" : "Price"}</p>
                <p className="text-white font-bold text-sm">{nft.price} {nft.currency}</p>
              </>
            ) : (
              <p className="text-white/30 text-xs">Not listed</p>
            )}
          </div>
          <a
            href={`https://etherscan.io/nft/${nft.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/20 hover:text-white/60 transition-colors"
            onClick={e => e.stopPropagation()}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function NftsPage() {
  const { isConnected }         = useAccount();
  const [activeTab, setTab]     = useState<Tab>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch]     = useState("");

  const filtered = SAMPLE_NFTS.filter(n => {
    if (activeTab === "Listed")  return n.isListed && !n.isAuction;
    if (activeTab === "Auction") return n.isAuction;
    if (activeTab === "My NFTs") return false;
    return true;
  }).filter(n =>
    !search || n.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-hero px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">NFT Marketplace</h1>
              <p className="text-white/40 text-sm mt-0.5">ERC-721 with royalties, auctions, and anti-sniping</p>
            </div>
            {isConnected && (
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" /> Mint NFT
              </button>
            )}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-white/5 w-fit">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setTab(tab)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-medium transition-all",
                    activeTab === tab ? "bg-brand-600 text-white" : "text-white/40 hover:text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                type="text"
                placeholder="Search NFTs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-500/50"
              />
            </div>

            {/* View toggle */}
            <div className="flex gap-1 p-1 rounded-xl bg-white/5 w-fit">
              <button onClick={() => setViewMode("grid")} className={cn("p-2 rounded-lg transition-all", viewMode === "grid" ? "bg-white/10 text-white" : "text-white/30")}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode("list")} className={cn("p-2 rounded-lg transition-all", viewMode === "list" ? "bg-white/10 text-white" : "text-white/30")}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid */}
          {activeTab === "My NFTs" && !isConnected ? (
            <div className="glass-card p-12 text-center">
              <p className="text-white font-semibold mb-2">Connect wallet to view your NFTs</p>
              <p className="text-white/40 text-sm mb-6">Your minted and purchased NFTs will appear here</p>
              <ConnectButton />
            </div>
          ) : (
            <div className={cn(
              "grid gap-4",
              viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6" : "grid-cols-1"
            )}>
              {filtered.map(nft => <NftCard key={nft.id} nft={nft} />)}
            </div>
          )}

          {filtered.length === 0 && activeTab !== "My NFTs" && (
            <div className="text-center py-20 text-white/30">
              No NFTs found
            </div>
          )}
        </div>
      </div>
    </>
  );
}
