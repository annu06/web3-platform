import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/landing/Footer";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "About — DevCommand",
  description: "Learn about Anuraag Chetia — full-stack & Web3 engineer.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0d14", color: "#e2e8f0" }}>
      <Navbar />
      <main className="pt-24">
        <AboutClient />
      </main>
      <Footer />
    </div>
  );
}
