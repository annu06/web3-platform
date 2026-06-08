import React from "react";
import type { Metadata } from "next";
import { HeroSection }    from "@/components/landing/Hero";
import { StatsBar }       from "@/components/landing/StatsBar";
import { FeaturesGrid }   from "@/components/landing/FeaturesGrid";
import { HowItWorks }     from "@/components/landing/HowItWorks";
import { CTASection }     from "@/components/landing/CTASection";
import { Footer }         from "@/components/landing/Footer";
import { Navbar }         from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Web3 Platform — DeFi · NFTs · DAO",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59,130,246,0.08) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(124,58,237,0.08) 0%, transparent 50%)`,
        }}
      />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <StatsBar />
        <FeaturesGrid />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
