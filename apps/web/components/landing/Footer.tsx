import React from "react";
import Link from "next/link";
import { Zap, Github, Twitter, MessageSquare } from "lucide-react";

const LINKS = {
  Platform: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "DeFi",      href: "/defi" },
    { label: "NFTs",      href: "/nfts" },
    { label: "DAO",       href: "/dao" },
  ],
  Developers: [
    { label: "GitHub",       href: "https://github.com/yourorg/web3-platform" },
    { label: "API Docs",     href: "http://localhost:4000/api/docs" },
    { label: "Smart Contracts", href: "https://github.com/yourorg/web3-platform/tree/main/packages/contracts" },
    { label: "Audits",       href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy",  href: "#" },
    { label: "Risk Disclosure", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-white/2 py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow-blue">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white text-[15px]">Web3 Platform</span>
            </Link>
            <p className="text-white/35 text-sm leading-relaxed mb-5">
              Enterprise-grade DeFi, NFT, and DAO infrastructure on Ethereum.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Github,       href: "https://github.com/yourorg/web3-platform",  label: "GitHub" },
                { icon: Twitter,      href: "https://twitter.com",                        label: "Twitter" },
                { icon: MessageSquare,href: "https://discord.gg",                         label: "Discord" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-white text-sm font-semibold mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-white/40 hover:text-white text-sm transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Web3 Platform. All rights reserved.
          </p>
          <p className="text-white/25 text-xs">
            Built with Next.js 15 · NestJS · Solidity · Ethereum
          </p>
        </div>
      </div>
    </footer>
  );
}
