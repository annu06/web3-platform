"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  {
    num: "01",
    title: "Web3 Platform",
    subtitle: "DeFi · NFT Marketplace · DAO Governance",
    desc: "Production-grade Web3 platform with ERC-20 staking (PLT token), ERC-721 NFT marketplace, and on-chain DAO governance. Full-stack monorepo with NestJS API and Next.js 15 frontend.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80",
    tags: [
      { label: "Next.js 15", cls: "chip-emerald" },
      { label: "Solidity", cls: "chip-orange" },
      { label: "NestJS", cls: "chip-violet" },
      { label: "Wagmi", cls: "chip-blue" },
    ],
    liveUrl: "https://web-green-ten-88.vercel.app",
    githubUrl: "https://github.com/AnuraagChetia/web3-platform",
    gradient: "from-emerald-500/10 to-cyan-500/10",
    border: "hover:border-emerald-400/40",
    glow: "rgba(78,222,163,0.08)",
  },
  {
    num: "02",
    title: "DevCommand CRM",
    subtitle: "Portfolio · Lead Management · Admin Dashboard",
    desc: "Full-stack developer portfolio with integrated CRM for managing inbound leads. Features admin dashboard with content management for projects, blog posts, skills, and testimonials.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    tags: [
      { label: "Next.js", cls: "chip-blue" },
      { label: "PostgreSQL", cls: "chip-cyan" },
      { label: "Prisma", cls: "chip-teal" },
      { label: "NextAuth", cls: "chip-violet" },
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/AnuraagChetia",
    gradient: "from-sky-500/10 to-indigo-500/10",
    border: "hover:border-sky-400/40",
    glow: "rgba(56,189,248,0.08)",
  },
  {
    num: "03",
    title: "Quantum Ledger",
    subtitle: "Fintech · Real-time Data · Institutional Grade",
    desc: "High-performance fintech dashboard for institutional traders. Custom HTML5 Canvas engine for charts, WebSocket message batching, and sub-millisecond latency data streams.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
    tags: [
      { label: "TypeScript", cls: "chip-blue" },
      { label: "WebSockets", cls: "chip-emerald" },
      { label: "D3.js", cls: "chip-orange" },
      { label: "GraphQL", cls: "chip-pink" },
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/AnuraagChetia",
    gradient: "from-violet-500/10 to-pink-500/10",
    border: "hover:border-violet-400/40",
    glow: "rgba(167,139,250,0.08)",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0d14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-label mb-3">02 / Portfolio</div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
              Selected <span className="gradient-text-violet">Works</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl leading-relaxed">
              A curated selection of engineering projects that showcase technical depth,
              creative precision, and real-world impact.
            </p>
          </div>
          <Link href="/projects" className="text-sm font-mono text-emerald-400 hover:underline whitespace-nowrap flex items-center gap-1">
            View all projects <ArrowRight size={13} />
          </Link>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12 }}
              className={`group relative bg-gradient-to-br ${project.gradient} rounded-2xl border border-[#1e293b] ${project.border} transition-all duration-300 overflow-hidden flex flex-col`}
              style={{ boxShadow: `0 0 40px ${project.glow}` }}
              whileHover={{ y: -4, boxShadow: `0 20px 60px ${project.glow}` }}
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/20 to-transparent" />
                <div className="absolute top-3 left-3 font-mono text-xs text-slate-500 bg-[#0a0d14]/70 px-2 py-1 rounded">{project.num}</div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:gradient-text transition-all">{project.title}</h3>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#1e293b] text-slate-500 hover:text-slate-100 transition-all">
                      <Github size={12} />
                    </a>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#1e293b] text-slate-500 hover:text-emerald-400 transition-all">
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
        </div>
      </div>
    </section>
  );
}
