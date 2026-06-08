"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, TrendingUp, Image, Vote, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/defi",      label: "DeFi",      icon: TrendingUp },
  { href: "/nfts",      label: "NFTs",      icon: Image },
  { href: "/dao",       label: "DAO",       icon: Vote },
];

export function Navbar() {
  const pathname                = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobile] = useState(false);
  const { address, isConnected } = useAccount();

  const { data: balance } = useBalance({
    address,
    query: { enabled: isConnected },
  });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isLanding = pathname === "/";

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || !isLanding
            ? "backdrop-blur-xl border-b border-white/[0.07]"
            : "bg-transparent"
        )}
        style={
          scrolled || !isLanding
            ? { background: "rgba(5,8,16,0.85)" }
            : {}
        }
      >
        {/* Bottom glow line when scrolled */}
        {(scrolled || !isLanding) && (
          <div
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.25), rgba(124,58,237,0.2), transparent)",
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <motion.div
                whileHover={{ scale: 1.06, rotate: -5 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
                  boxShadow: "0 0 16px rgba(59,130,246,0.35)",
                }}
              >
                <Zap className="w-4 h-4 text-white" />
              </motion.div>
              <span className="font-semibold text-white text-[15px] tracking-tight">
                Web3 Platform
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {NAV_ITEMS.map(({ href, label }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      active
                        ? "text-brand-400"
                        : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                    )}
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: "rgba(59,130,246,0.1)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2.5">
              {isConnected && balance && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] text-sm"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-white/60 font-mono text-xs">
                    {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                  </span>
                </div>
              )}
              <ThemeToggle />
              <ConnectButton
                accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
                chainStatus={{ smallScreen: "icon", largeScreen: "full" }}
                showBalance={false}
              />
              <button
                onClick={() => setMobile(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/[0.06] transition-colors text-white/70 hover:text-white"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mobileOpen ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden border-b border-white/[0.07]"
            style={{ background: "rgba(5,8,16,0.95)", backdropFilter: "blur(20px)" }}
          >
            <div className="px-4 py-3 space-y-0.5">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobile(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      active
                        ? "bg-brand-500/[0.12] text-brand-400"
                        : "text-white/55 hover:text-white hover:bg-white/[0.05]"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLanding && <div className="h-16" />}
    </>
  );
}
