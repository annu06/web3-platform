"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const SKILLS = [
  { label: "TypeScript / JavaScript", pct: 95, cls: "bg-sky-400" },
  { label: "React / Next.js", pct: 93, cls: "bg-emerald-400" },
  { label: "NestJS / Node.js", pct: 90, cls: "bg-violet-400" },
  { label: "Solidity / EVM", pct: 82, cls: "bg-orange-400" },
  { label: "PostgreSQL / Prisma", pct: 88, cls: "bg-teal-400" },
  { label: "Docker / DevOps", pct: 78, cls: "bg-pink-400" },
];

const INTERESTS = [
  "Distributed systems",
  "Zero-knowledge proofs",
  "Compiler design",
  "AI/ML at the edge",
  "Open-source tooling",
  "Procedural generation",
];

export function AboutClient() {
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label mb-3">About me</div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
            The engineer <span className="gradient-text">behind</span>
            <br />
            the <span className="gradient-text-pink">code.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Avatar placeholder */}
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 border border-[#1e293b] flex items-center justify-center text-5xl font-black gradient-text">
              AC
            </div>

            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Hey, I&apos;m <span className="text-slate-100 font-semibold">Anuraag Chetia</span> — a full-stack
                engineer with 5+ years of experience building production-grade applications across Web2 and Web3.
              </p>
              <p>
                My journey started in frontend development, crafting pixel-perfect interfaces for marketing and
                e-commerce clients. Over time I grew into backend systems, microservices architecture, and eventually
                the world of blockchain development.
              </p>
              <p>
                Today I specialise in the intersection of <span className="text-emerald-400">Next.js</span>,{" "}
                <span className="text-violet-400">NestJS</span>, and{" "}
                <span className="text-orange-400">Solidity</span> — building ambitious platforms that run at scale.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me reading about distributed systems, contributing to
                open-source projects, or experimenting with generative art.
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/AnuraagChetia", cls: "hover:text-slate-100 hover:border-slate-500" },
                { icon: Linkedin, label: "LinkedIn", href: "#", cls: "hover:text-sky-400 hover:border-sky-500/40" },
                { icon: Mail, label: "Email", href: "mailto:anuragpolasa06@gmail.com", cls: "hover:text-emerald-400 hover:border-emerald-500/40" },
              ].map(({ icon: Icon, label, href, cls }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1e293b] text-slate-500 text-sm transition-all ${cls}`}
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-sm hover:bg-emerald-400/20 transition-all">
                <Download size={14} />
                Download CV
              </button>
            </div>

            {/* Interests */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">Interests</div>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <span key={i} className="chip chip-blue">{i}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">Skill Proficiency</div>
              <div className="space-y-5">
                {SKILLS.map((skill, i) => (
                  <div key={skill.label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-slate-300">{skill.label}</span>
                      <span className="text-xs font-mono text-slate-500">{skill.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${skill.cls}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "5+", label: "Years experience", color: "text-emerald-400" },
                { n: "30+", label: "Projects shipped", color: "text-sky-400" },
                { n: "20+", label: "Happy clients", color: "text-violet-400" },
                { n: "8+", label: "Countries served", color: "text-pink-400" },
              ].map(({ n, label, color }) => (
                <div key={label} className="p-5 rounded-2xl border border-[#1e293b] bg-[#0f172a]">
                  <div className={`text-2xl font-black ${color}`}>{n}</div>
                  <div className="text-sm text-slate-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
