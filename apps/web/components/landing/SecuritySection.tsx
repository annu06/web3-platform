"use client";

import { motion } from "framer-motion";

const TIMELINE = [
  {
    year: "2024 – Present",
    title: "Senior Full-Stack Engineer",
    org: "Freelance / Remote",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
    desc: "Building Web3 platforms, DeFi protocols, and enterprise SaaS products. Specialising in Next.js 15, NestJS microservices, Solidity smart contracts, and Wagmi v2 integrations.",
    chips: [
      { label: "Web3", cls: "chip-orange" },
      { label: "Next.js 15", cls: "chip-emerald" },
      { label: "NestJS", cls: "chip-violet" },
    ],
  },
  {
    year: "2023 – 2024",
    title: "Full-Stack Developer",
    org: "Startup (Confidential)",
    color: "text-sky-400",
    dot: "bg-sky-400",
    desc: "Led frontend architecture for a B2B fintech dashboard serving 10k+ users. Implemented real-time WebSocket data feeds, custom charting engine in Canvas, and role-based access control.",
    chips: [
      { label: "TypeScript", cls: "chip-blue" },
      { label: "React", cls: "chip-blue" },
      { label: "WebSockets", cls: "chip-cyan" },
    ],
  },
  {
    year: "2022 – 2023",
    title: "Backend Engineer",
    org: "Product Agency",
    color: "text-violet-400",
    dot: "bg-violet-400",
    desc: "Designed and shipped 12+ REST & GraphQL APIs using NestJS and PostgreSQL. Built event-driven microservices with Redis Pub/Sub and established CI/CD pipelines with GitHub Actions.",
    chips: [
      { label: "NestJS", cls: "chip-violet" },
      { label: "PostgreSQL", cls: "chip-teal" },
      { label: "GraphQL", cls: "chip-pink" },
    ],
  },
  {
    year: "2020 – 2022",
    title: "Frontend Developer",
    org: "Digital Studio",
    color: "text-pink-400",
    dot: "bg-pink-400",
    desc: "Crafted pixel-perfect, accessible UIs for e-commerce and marketing clients. Introduced TypeScript and React to the team, cutting average page load times by 40%.",
    chips: [
      { label: "React", cls: "chip-blue" },
      { label: "Tailwind", cls: "chip-cyan" },
      { label: "GSAP", cls: "chip-orange" },
    ],
  },
];

export function SecuritySection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-label mb-3">03 / Experience</div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
              Technical <span className="gradient-text-pink">Journey</span>
            </h2>
            <p className="mt-6 text-slate-400 leading-relaxed max-w-md">
              Five years of deliberate craft — growing from frontend finesse to full-stack
              engineering leadership across Web2 and Web3 domains.
            </p>

            {/* Highlight box */}
            <div className="mt-10 p-6 rounded-2xl border border-[#1e293b] bg-gradient-to-br from-emerald-500/5 to-cyan-500/5">
              <div className="text-2xl font-black gradient-text">5+ Years</div>
              <div className="text-sm text-slate-400 mt-1">of production engineering</div>
              <div className="grid grid-cols-2 gap-4 mt-5">
                {[
                  { n: "30+", label: "Projects shipped" },
                  { n: "20+", label: "Happy clients" },
                  { n: "12+", label: "APIs designed" },
                  { n: "8+", label: "Countries served" },
                ].map(({ n, label }) => (
                  <div key={label}>
                    <div className="text-lg font-bold text-slate-100">{n}</div>
                    <div className="text-xs text-slate-500 font-mono">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Timeline */}
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-0 w-px bg-gradient-to-b from-emerald-400/30 via-violet-400/20 to-transparent" />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8"
                >
                  <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ${item.dot} ring-4 ring-[#0a0d14]`} />
                  <div className={`text-xs font-mono mb-1 ${item.color}`}>{item.year}</div>
                  <h3 className="text-base font-bold text-slate-100">{item.title}</h3>
                  <div className="text-sm text-slate-500 mb-3">{item.org}</div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">{item.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.chips.map(({ label, cls }) => (
                      <span key={label} className={`chip ${cls}`}>{label}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
