"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Github, Twitter, MessageSquare, ArrowUp, Send, CheckCircle2 } from "lucide-react";

const LINKS = {
  Platform: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "DeFi",      href: "/defi" },
    { label: "NFTs",      href: "/nfts" },
    { label: "DAO",       href: "/dao" },
  ],
  Developers: [
    { label: "GitHub",           href: "https://github.com/AnuraagChetia/web3-platform" },
    { label: "API Docs",         href: "https://github.com/AnuraagChetia/web3-platform#api" },
    { label: "Smart Contracts",  href: "https://github.com/AnuraagChetia/web3-platform/tree/main/packages/contracts" },
    { label: "Audits",           href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy",   href: "#" },
    { label: "Risk Disclosure",  href: "#" },
  ],
};

function BackToTop() {
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white transition-all"
      aria-label="Back to top"
    >
      <ArrowUp className="w-4 h-4" />
    </motion.button>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  }

  return (
    <div className="mt-5">
      <p className="text-white/35 text-xs mb-2.5">Get protocol updates</p>
      {sent ? (
        <div className="flex items-center gap-2 text-accent-green text-sm">
          <CheckCircle2 className="w-4 h-4" />
          <span>You're on the list!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.09] text-white text-xs placeholder-white/25 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-lg bg-brand-500/80 hover:bg-brand-500 text-white transition-colors"
            aria-label="Subscribe"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t section-divider overflow-hidden" style={{ background: "rgba(255,255,255,0.01)" }}>
      {/* Subtle top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), rgba(124,58,237,0.3), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                  boxShadow: "0 0 20px rgba(59,130,246,0.3)",
                }}
              >
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white text-[15px] tracking-tight">Web3 Platform</span>
            </Link>

            <p className="text-white/30 text-sm leading-relaxed mb-5 max-w-xs">
              Enterprise-grade DeFi, NFT, and DAO infrastructure built on Ethereum.
              Open source, non-custodial, and fully on-chain.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2.5">
              {[
                { icon: Github,        href: "https://github.com/AnuraagChetia/web3-platform", label: "GitHub" },
                { icon: Twitter,       href: "https://twitter.com",                             label: "Twitter" },
                { icon: MessageSquare, href: "https://discord.gg",                              label: "Discord" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-white transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>

            <Newsletter />
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4 opacity-60">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-white/35 hover:text-white text-sm transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Web3 Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-white/20 text-xs">
              Built with Next.js 15 · NestJS · Solidity · Ethereum
            </p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
