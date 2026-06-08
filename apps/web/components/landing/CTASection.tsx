"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowRight, BookOpen, Zap, Users, DollarSign } from "lucide-react";

const QUICK_STATS = [
  { icon: DollarSign, value: "$48M+", label: "TVL" },
  { icon: Users,      value: "6,400+", label: "Stakers" },
  { icon: Zap,        value: "24.8%",  label: "Max APY" },
];

export function CTASection() {
  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-500/[0.08] blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.25, 0.12] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent-purple/[0.08] blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, rgba(12,16,24,0.97), rgba(8,11,20,0.95))",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* Animated mesh gradient background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(124,58,237,0.12) 0%, transparent 60%)",
                  "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 20% 70%, rgba(124,58,237,0.12) 0%, transparent 60%)",
                  "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(124,58,237,0.12) 0%, transparent 60%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
            {/* Top gradient line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(124,58,237,0.4), transparent)" }}
            />
            {/* Dot grid */}
            <div className="absolute inset-0 dot-grid-bg opacity-30" />
          </div>

          <div className="relative px-8 py-14 sm:px-14 sm:py-20 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="badge-green mb-7 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open Beta — Live on Mainnet
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
            >
              Start Earning in the{" "}
              <span className="gradient-text">Decentralized Economy</span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-white/50 text-lg mb-8 max-w-xl mx-auto leading-relaxed"
            >
              Connect your wallet, stake PLT, mint NFTs, and vote on platform governance —
              all in one place. No sign-up. No KYC. No custody.
            </motion.p>

            {/* Quick stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex items-center justify-center gap-6 sm:gap-10 mb-10"
            >
              {QUICK_STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-xl sm:text-2xl font-bold gradient-text">{value}</p>
                  <p className="text-white/35 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <button
                    onClick={openConnectModal}
                    className="btn-primary text-base px-9 py-4 rounded-2xl"
                  >
                    Launch App <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </ConnectButton.Custom>

              <Link
                href="https://github.com/AnuraagChetia/web3-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-base px-9 py-4 rounded-2xl"
              >
                <BookOpen className="w-4 h-4" /> View Source
              </Link>
            </motion.div>

            {/* Disclaimer */}
            <p className="text-white/20 text-xs">
              Smart contracts audited · Open source · Non-custodial · Ethereum mainnet
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
