"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const ALL_PROJECTS = [
  {
    num: "01",
    title: "Web3 Platform",
    subtitle: "DeFi · NFT Marketplace · DAO",
    category: "Web3",
    tags: [
      { label: "Next.js 15", cls: "chip-emerald" },
      { label: "Solidity", cls: "chip-orange" },
      { label: "NestJS", cls: "chip-violet" },
      { label: "Wagmi", cls: "chip-blue" },
      { label: "Prisma", cls: "chip-teal" },
    ],
    desc: "Production-grade Web3 platform with ERC-20 staking (PLT token), ERC-721 NFT marketplace, and on-chain DAO governance. Full monorepo with NestJS API and Next.js 15 frontend deployed on Railway + Vercel.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://web-green-ten-88.vercel.app",
    githubUrl: "https://github.com/AnuraagChetia",
    gradient: "from-emerald-500/10 to-cyan-500/10",
    glow: "rgba(78,222,163,0.1)",
    border: "hover:border-emerald-400/40",
  },
  {
    num: "02",
    title: "DevCommand CRM",
    subtitle: "Portfolio · Lead CRM · Admin",
    category: "SaaS",
    tags: [
      { label: "Next.js", cls: "chip-blue" },
      { label: "PostgreSQL", cls: "chip-cyan" },
      { label: "Prisma", cls: "chip-teal" },
      { label: "NextAuth", cls: "chip-violet" },
    ],
    desc: "Full-stack developer portfolio with integrated CRM. Admin dashboard for managing leads, projects, blog posts, and skills. Server-side rendering for SEO.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    liveUrl: "#",
    githubUrl: "https://github.com/AnuraagChetia",
    gradient: "from-sky-500/10 to-indigo-500/10",
    glow: "rgba(56,189,248,0.1)",
    border: "hover:border-sky-400/40",
  },
  {
    num: "03",
    title: "Quantum Ledger",
    subtitle: "Fintech · Real-time · Institutional",
    category: "Fintech",
    tags: [
      { label: "TypeScript", cls: "chip-blue" },
      { label: "WebSockets", cls: "chip-emerald" },
      { label: "D3.js", cls: "chip-orange" },
      { label: "GraphQL", cls: "chip-pink" },
    ],
    desc: "High-performance fintech dashboard for institutional traders. Custom Canvas charting engine, WebSocket message batching, and sub-millisecond latency data streams.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
    liveUrl: "#",
    githubUrl: "https://github.com/AnuraagChetia",
    gradient: "from-violet-500/10 to-pink-500/10",
    glow: "rgba(167,139,250,0.1)",
    border: "hover:border-violet-400/40",
  },
  {
    num: "04",
    title: "ChainDAO",
    subtitle: "Governance · On-chain · DAO",
    category: "Web3",
    tags: [
      { label: "Solidity", cls: "chip-orange" },
      { label: "Hardhat", cls: "chip-amber" },
      { label: "OpenZeppelin", cls: "chip-orange" },
      { label: "Ethers.js", cls: "chip-blue" },
    ],
    desc: "On-chain DAO governance protocol with proposal creation, token-weighted voting, and time-locked execution. Fully audited smart contracts with 100% test coverage.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
    liveUrl: "#",
    githubUrl: "https://github.com/AnuraagChetia",
    gradient: "from-orange-500/10 to-amber-500/10",
    glow: "rgba(251,146,60,0.1)",
    border: "hover:border-orange-400/40",
  },
  {
    num: "05",
    title: "NestFlow API",
    subtitle: "Backend · REST · Microservices",
    category: "Backend",
    tags: [
      { label: "NestJS", cls: "chip-violet" },
      { label: "PostgreSQL", cls: "chip-teal" },
      { label: "Redis", cls: "chip-emerald" },
      { label: "Docker", cls: "chip-blue" },
    ],
    desc: "Production NestJS microservices architecture with Redis caching, Bull queues, JWT auth, and Swagger docs. Handles 50k+ requests/day with 99.9% uptime.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    liveUrl: "#",
    githubUrl: "https://github.com/AnuraagChetia",
    gradient: "from-teal-500/10 to-emerald-500/10",
    glow: "rgba(20,184,166,0.1)",
    border: "hover:border-teal-400/40",
  },
  {
    num: "06",
    title: "E-Commerce Suite",
    subtitle: "Shopping · Payments · Inventory",
    category: "SaaS",
    tags: [
      { label: "Next.js", cls: "chip-blue" },
      { label: "Stripe", cls: "chip-violet" },
      { label: "Tailwind", cls: "chip-cyan" },
      { label: "Prisma", cls: "chip-teal" },
    ],
    desc: "Full-featured e-commerce platform with Stripe Checkout, real-time inventory management, multi-vendor support, and automated email workflows.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
    liveUrl: "#",
    githubUrl: "https://github.com/AnuraagChetia",
    gradient: "from-pink-500/10 to-rose-500/10",
    glow: "rgba(244,114,182,0.1)",
    border: "hover:border-pink-400/40",
  },
];

const FILTERS = ["All", "Web3", "SaaS", "Fintech", "Backend"];

export function ProjectsClient() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.category === active);

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <div className="section-label mb-3">Portfolio</div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
            All <span className="gradient-text">Projects</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-xl leading-relaxed">
            From smart contracts to full-stack SaaS — a complete showcase of engineering work.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-mono border transition-all ${
                active === f
                  ? "bg-emerald-400/10 border-emerald-400/40 text-emerald-400"
                  : "border-[#1e293b] text-slate-500 hover:border-[#334155] hover:text-slate-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.num}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group relative bg-gradient-to-br ${project.gradient} rounded-2xl border border-[#1e293b] ${project.border} transition-all duration-300 overflow-hidden flex flex-col`}
                style={{ boxShadow: `0 0 40px ${project.glow}` }}
                whileHover={{ y: -4 }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/20 to-transparent" />
                  <div className="absolute top-3 left-3 font-mono text-xs text-slate-500 bg-[#0a0d14]/70 px-2 py-1 rounded">{project.num}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-100">{project.title}</h3>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#1e293b] text-slate-500 hover:text-slate-100 transition-all">
                        <Github size={12} />
                      </a>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#1e293b] text-slate-500 hover:text-emerald-400 transition-all">
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-slate-500 mb-3">{project.subtitle}</p>
                  <p className="text-sm text-slate-400 leading-relaxed flex-grow">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[#1e293b]/60">
                    {project.tags.map(({ label, cls }) => (
                      <span key={label} className={`chip ${cls}`}>{label}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
