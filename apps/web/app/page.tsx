import React from "react";
import type { Metadata } from "next";
import { HeroSection }      from "@/components/landing/Hero";
import { StatsBar }         from "@/components/landing/StatsBar";
import { FeaturesGrid }     from "@/components/landing/FeaturesGrid";
import { HowItWorks }       from "@/components/landing/HowItWorks";
import { SecuritySection }  from "@/components/landing/SecuritySection";
import { CTASection }       from "@/components/landing/CTASection";
import { Footer }           from "@/components/landing/Footer";
import { Navbar }           from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Web3 Platform — DeFi · NFTs · DAO",
  description:
    "Production-ready DeFi, NFT marketplace, and DAO governance on Ethereum. Stake PLT, mint NFTs, vote on proposals — no sign-up, no KYC, no custody.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturesGrid />
        <HowItWorks />
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
