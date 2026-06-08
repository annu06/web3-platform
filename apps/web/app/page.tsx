import type { Metadata } from "next";
import { Navbar }          from "@/components/ui/Navbar";
import { HeroSection }     from "@/components/landing/Hero";
import { StatsBar }        from "@/components/landing/StatsBar";
import { FeaturesGrid }    from "@/components/landing/FeaturesGrid";
import { HowItWorks }      from "@/components/landing/HowItWorks";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { CTASection }      from "@/components/landing/CTASection";
import { Footer }          from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "DevCommand — Full-Stack & Web3 Engineer",
  description:
    "Full-stack developer specializing in Next.js, NestJS, Solidity and high-performance Web3 platforms. Available for freelance and contract work.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0d14", color: "#e2e8f0" }}>
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
