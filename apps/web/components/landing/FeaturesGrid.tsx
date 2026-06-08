"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Monitor, Server, Cloud, Cpu } from "lucide-react";

const CATEGORIES = [
  {
    icon: Monitor,
    title: "Frontend",
    counter: "01",
    colorClass: "text-sky-400",
    borderHover: "hover:border-sky-400/40",
    iconBg: "bg-sky-400/10",
    iconHover: "group-hover:bg-sky-400 group-hover:text-sky-950",
    spotlight: "rgba(56, 189, 248, 0.06)",
    chips: [
      { label: "React / Next.js", cls: "chip-blue" },
      { label: "TypeScript", cls: "chip-blue" },
      { label: "Tailwind CSS", cls: "chip-cyan" },
      { label: "Framer Motion", cls: "chip-cyan" },
      { label: "RainbowKit", cls: "chip-blue" },
      { label: "Recharts", cls: "chip-blue" },
    ],
    desc: "Pixel-perfect UIs with silky animations and zero compromise on performance.",
  },
  {
    icon: Server,
    title: "Backend",
    counter: "02",
    colorClass: "text-emerald-400",
    borderHover: "hover:border-emerald-400/40",
    iconBg: "bg-emerald-400/10",
    iconHover: "group-hover:bg-emerald-400 group-hover:text-emerald-950",
    spotlight: "rgba(78, 222, 163, 0.06)",
    chips: [
      { label: "NestJS", cls: "chip-emerald" },
      { label: "Node.js", cls: "chip-emerald" },
      { label: "PostgreSQL", cls: "chip-teal" },
      { label: "Prisma ORM", cls: "chip-teal" },
      { label: "Redis", cls: "chip-emerald" },
      { label: "REST / GraphQL", cls: "chip-teal" },
    ],
    desc: "Scalable microservices and APIs built for reliability under heavy load.",
  },
  {
    icon: Cpu,
    title: "Web3 / Blockchain",
    counter: "03",
    colorClass: "text-orange-400",
    borderHover: "hover:border-orange-400/40",
    iconBg: "bg-orange-400/10",
    iconHover: "group-hover:bg-orange-400 group-hover:text-orange-950",
    spotlight: "rgba(251, 146, 60, 0.06)",
    chips: [
      { label: "Solidity", cls: "chip-orange" },
      { label: "Hardhat", cls: "chip-amber" },
      { label: "Ethers.js", cls: "chip-orange" },
      { label: "Wagmi v2", cls: "chip-amber" },
      { label: "ERC-20 / ERC-721", cls: "chip-orange" },
      { label: "OpenZeppelin", cls: "chip-amber" },
    ],
    desc: "Production-grade smart contracts, DeFi protocols, and NFT marketplaces.",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    counter: "04",
    colorClass: "text-violet-400",
    borderHover: "hover:border-violet-400/40",
    iconBg: "bg-violet-400/10",
    iconHover: "group-hover:bg-violet-400 group-hover:text-violet-950",
    spotlight: "rgba(167, 139, 250, 0.06)",
    chips: [
      { label: "Docker", cls: "chip-violet" },
      { label: "Vercel", cls: "chip-violet" },
      { label: "Railway", cls: "chip-violet" },
      { label: "GitHub Actions", cls: "chip-pink" },
      { label: "PostgreSQL (PG)", cls: "chip-violet" },
      { label: "Turbo Repo", cls: "chip-pink" },
    ],
    desc: "Zero-downtime deployments, CI/CD pipelines, and cloud-native architecture.",
  },
];

function CategoryCard({ cat, index }: { cat: typeof CATEGORIES[number]; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBg = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${cat.spotlight}, transparent 75%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className={`group relative p-7 rounded-2xl bg-[#0f172a] border border-[#1e293b] transition-all duration-300 ${cat.borderHover} overflow-hidden`}
    >
      {/* Mouse spotlight */}
      <motion.div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: spotlightBg }} />

      {/* Counter */}
      <div className="absolute top-5 right-5 font-mono text-xs text-slate-700">{cat.counter}</div>

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${cat.iconBg} ${cat.colorClass} transition-all duration-300 ${cat.iconHover}`}>
        <cat.icon size={22} />
      </div>

      {/* Title */}
      <h3 className={`text-lg font-bold mb-2 ${cat.colorClass}`}>{cat.title}</h3>
      <p className="text-sm text-slate-500 mb-5 leading-relaxed">{cat.desc}</p>

      {/* Chips */}
      <div className="flex flex-wrap gap-1.5">
        {cat.chips.map(({ label, cls }) => (
          <span key={label} className={`chip ${cls}`}>{label}</span>
        ))}
      </div>
    </motion.div>
  );
}

export function FeaturesGrid() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-label mb-3">01 / Stack</div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
              Technical <span className="gradient-text">Arsenal</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl leading-relaxed">
              Four pillars of my engineering practice — the tools I reach for when building
              production systems from scratch.
            </p>
          </div>
          <a href="/about" className="text-sm font-mono text-emerald-400 hover:underline whitespace-nowrap">
            View full skill set →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CATEGORIES.map((cat, i) => <CategoryCard key={cat.title} cat={cat} index={i} />)}
        </div>
      </div>
    </section>
  );
}
