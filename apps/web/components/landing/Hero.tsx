"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, Sparkles } from "lucide-react";

const roles = ["Full-Stack Developer", "Web3 Engineer", "TypeScript Expert", "System Architect"];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 dot-grid-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(78,222,163,0.07)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(129,140,248,0.07)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_80%,rgba(244,114,182,0.05)_0%,transparent_50%)]" />

      {/* Animated blobs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-emerald-500/6 blur-[120px] animate-blob" />
      <div className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/6 blur-[100px] animate-blob-delayed" />
      <div className="absolute top-1/2 right-0 w-[350px] h-[350px] rounded-full bg-pink-500/4 blur-[90px] animate-float-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Left column ── */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase font-medium">
                Available for new projects
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="text-5xl lg:text-6xl xl:text-[4.5rem] font-black leading-[1.05] tracking-tight">
                Engineering{" "}
                <span className="gradient-text">Scalable</span>
                <br />
                Solutions for the{" "}
                <span className="gradient-text-pink">Modern Web.</span>
              </h1>
            </motion.div>

            {/* Role rotator */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 text-lg">
              <span className="text-slate-500">I&apos;m a</span>
              <div className="h-8 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                    className="font-bold gradient-text"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg text-slate-400 max-w-xl leading-relaxed">
              I build high-performance full-stack apps and Web3 platforms — from smart contracts on Ethereum to scalable NestJS APIs and polished Next.js frontends. Currently open to exciting opportunities.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-4">
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="btn-primary flex items-center gap-2 group">
                  <Sparkles size={15} />
                  Start a Project
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="btn-secondary flex items-center gap-2">
                  View My Work
                </motion.button>
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="flex items-center gap-4 pt-2">
              <span className="text-sm text-slate-600 font-mono">// find me on</span>
              {[
                { icon: Github, href: "https://github.com/AnuraagChetia", label: "GitHub", color: "hover:text-slate-100 hover:border-slate-500" },
                { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-sky-400 hover:border-sky-500/40" },
                { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400 hover:border-sky-500/40" },
              ].map(({ icon: Icon, href, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className={`w-9 h-9 flex items-center justify-center rounded-lg border border-[#1e293b] text-slate-500 transition-all ${color}`}>
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — Code terminal ── */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="hidden lg:block">
            <div className="glass-card rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 80px rgba(78,222,163,0.08), 0 0 0 1px rgba(255,255,255,0.05)" }}>
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#1e293b]/60 bg-[#0f172a]/80">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="text-xs font-mono text-slate-500 bg-[#1e293b]/40 px-3 py-0.5 rounded">~/developer.ts</span>
                </div>
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-sm leading-7">
                <div><span className="text-violet-400">const</span> <span className="text-emerald-400">engineer</span> <span className="text-slate-400">= {"{"}</span></div>
                <div className="pl-5"><span className="text-sky-400">name</span><span className="text-slate-400">: </span><span className="text-amber-300">&quot;Anuraag Chetia&quot;</span><span className="text-slate-400">,</span></div>
                <div className="pl-5"><span className="text-sky-400">role</span><span className="text-slate-400">: </span><span className="text-amber-300">&quot;Full-Stack &amp; Web3 Dev&quot;</span><span className="text-slate-400">,</span></div>
                <div className="pl-5"><span className="text-sky-400">stack</span><span className="text-slate-400">: [</span></div>
                <div className="pl-10"><span className="text-amber-300">&quot;Next.js 15&quot;</span><span className="text-slate-400">, </span><span className="text-amber-300">&quot;NestJS&quot;</span><span className="text-slate-400">,</span></div>
                <div className="pl-10"><span className="text-amber-300">&quot;TypeScript&quot;</span><span className="text-slate-400">, </span><span className="text-amber-300">&quot;Solidity&quot;</span><span className="text-slate-400">,</span></div>
                <div className="pl-5"><span className="text-slate-400">],</span></div>
                <div className="pl-5"><span className="text-sky-400">available</span><span className="text-slate-400">: </span><span className="text-emerald-400">true</span><span className="text-slate-400">,</span></div>
                <div className="pl-5">
                  <span className="text-sky-400">build</span><span className="text-slate-400">: </span>
                  <span className="text-violet-400">async </span><span className="text-slate-400">(idea) =&gt;</span>
                </div>
                <div className="pl-10">
                  <span className="text-violet-400">await </span>
                  <span className="text-emerald-400">ship</span><span className="text-slate-400">(idea.</span><span className="text-pink-400">toProduction</span><span className="text-slate-400">()),</span>
                </div>
                <div><span className="text-slate-400">{"}"}</span><span className="text-slate-500">;</span></div>

                {/* Status line */}
                <div className="mt-5 pt-4 border-t border-[#1e293b]/60 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-xs">Ready to ship your idea to production</span>
                  <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-0.5" />
                </div>
              </div>
            </div>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-2 mt-5 justify-end">
              {[
                { label: "Next.js 15", cls: "chip-emerald" }, { label: "TypeScript", cls: "chip-blue" },
                { label: "NestJS", cls: "chip-violet" }, { label: "Solidity", cls: "chip-orange" },
                { label: "Prisma", cls: "chip-cyan" }, { label: "Tailwind", cls: "chip-teal" },
              ].map(({ label, cls }) => (
                <motion.span key={label} whileHover={{ scale: 1.05 }} className={`chip ${cls}`}>{label}</motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
