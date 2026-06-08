"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const STATS = [
  { value: 5, suffix: "+", label: "Years Experience", sublabel: "Building production apps", gradient: "from-emerald-400/20 to-cyan-400/20", border: "border-t-emerald-400/60", glow: "rgba(78,222,163,0.12)" },
  { value: 30, suffix: "+", label: "Projects Shipped", sublabel: "From idea to production", gradient: "from-sky-400/20 to-blue-400/20", border: "border-t-sky-400/60", glow: "rgba(56,189,248,0.12)" },
  { value: 20, suffix: "+", label: "Happy Clients", sublabel: "Across 8 countries", gradient: "from-violet-400/20 to-purple-400/20", border: "border-t-violet-400/60", glow: "rgba(167,139,250,0.12)" },
  { value: 100, suffix: "%", label: "Delivery Rate", sublabel: "On time, on spec", gradient: "from-pink-400/20 to-rose-400/20", border: "border-t-pink-400/60", glow: "rgba(244,114,182,0.12)" },
];

function StatCard({ stat, index }: { stat: typeof STATS[number]; index: number }) {
  const { value, ref } = useCountUp(stat.value, 1600);
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-[#1e293b] border-t-2 ${stat.border} overflow-hidden group hover:scale-[1.02] transition-all duration-300`}
      style={{ boxShadow: `0 0 30px ${stat.glow}` }}
    >
      <div className="relative z-10">
        <div className="text-4xl font-black text-slate-100 tabular-nums">
          {value}<span className="text-3xl">{stat.suffix}</span>
        </div>
        <div className="mt-2 text-sm font-semibold text-slate-200">{stat.label}</div>
        <div className="text-xs text-slate-500 mt-0.5 font-mono">{stat.sublabel}</div>
      </div>
    </motion.div>
  );
}

export function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 border-y border-[#1e293b]/60 bg-[#0f172a]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
        </div>
      </div>
    </section>
  );
}
