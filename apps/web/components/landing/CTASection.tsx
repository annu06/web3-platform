"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowRight, BookOpen } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 sm:p-16 relative overflow-hidden"
        >
          {/* Background orbs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-brand-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-accent-purple/20 blur-3xl pointer-events-none" />

          <div className="relative">
            <span className="badge-green mb-6 inline-block">Open Beta</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Start Earning in the{" "}
              <span className="gradient-text">Decentralized Economy</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Connect your wallet, stake PLT, mint NFTs, and vote on platform governance —
              all in one place. No sign-up. No KYC. No custody.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <button
                    onClick={openConnectModal}
                    className="btn-primary flex items-center gap-2 text-base px-8 py-3.5"
                  >
                    Launch App <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </ConnectButton.Custom>

              <Link
                href="https://github.com/yourorg/web3-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 text-base px-8 py-3.5"
              >
                <BookOpen className="w-4 h-4" /> View Docs
              </Link>
            </div>

            <p className="text-white/20 text-xs mt-8">
              Smart contracts audited · Open source · Ethereum mainnet
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
