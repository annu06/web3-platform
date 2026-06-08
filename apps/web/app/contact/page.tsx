import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — DevCommand",
  description: "Get in touch with Anuraag Chetia to start a project.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0d14", color: "#e2e8f0" }}>
      <Navbar />
      <main className="pt-24">
        <ContactClient />
      </main>
      <Footer />
    </div>
  );
}
