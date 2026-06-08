import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ProjectsClient } from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects — DevCommand",
  description: "Full-stack, Web3, and fintech projects by Anuraag Chetia.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0d14", color: "#e2e8f0" }}>
      <Navbar />
      <main className="pt-24">
        <ProjectsClient />
      </main>
      <Footer />
    </div>
  );
}
