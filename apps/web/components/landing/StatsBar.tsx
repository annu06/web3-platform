"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, Image, Vote, DollarSign } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const STATS = [
  {
    icon: DollarSign,
    label: "Total Value Locked",
    prefix: "$",
    suffix: "M",
    value: 48.2,
    integerOnly: false,
    decimals: 1,
    change: "+12.4%",
    positive: true,
    color: "text-brand-400",
    iconBg: "bg-brand-500/15",
  },
  {
    icon: Image,
    label: "NFTs Minted",
    prefix: "",
    suffix: "",
    value: 24800,
    integerOnly: true,
    decimals: 0,
    change: "3 collections",
    positive: null,
    color: "text-violet-400",
    iconBg: "bg-violet-500/15",
  },
  {
    icon: Users,
    label: "Active Stakers",
    prefix: "",
    suffix: "",
    value: 6420,
    integerOnly: true,
    decimals: 0,
    change: "+891 this week",
    positive: true,
    color: "text-accent-cyan",
    iconBg: "bg-cyan-500/15",
  },
  {
    icon: Vote,
    label: "DAO Proposals",
    prefix: "",
    suffix: "",
    value: 142,
    integerOnly: true,
    decimals: 0,
    change: "91% participation",
    positive: true,
    color: "text-accent-green",
    iconBg: "bg-green-500/15",
  },
  {
    icon: TrendingUp,
    label: "PLT Token Price",
    prefix: "$",
    suffix: "",
    value: 2.84,
    integerOnly: false,
    decimals: 2,
    change: "+8.3% 24h",
    positive: true,
    color: "text-orange-400",
    iconBg: "bg-orange-500/15",
  },
];

function StatCard({
  stat,
  index,
}: {
  stat: typeof STATS[0];
  index: number;
}) {
  const { value, ref } = useCountUp(
    stat.integerOnly ? stat.value : Math.round(stat.value * Math.pow(10, stat.decimals)),
    1800
  );

  const displayValue = stat.integerOnly
    ? value.toLocaleString()
    : (value / Math.pow(10, stat.decimals)).toFixed(stat.decimals);

  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.09, duration: 0.45 }}
      className="relative group"
    >
      {/* Gradient top border */}
      <div
        className="absolute top-0 left-4 right-4 h-px rounded-full"
        style={{
          background:
            index % 2 === 0
              ? "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)"
              : "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)",
        }}
      />

      <div className="flex items-center gap-4 px-2 py-5">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-5 h-5 ${stat.color}`} />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-1 mb-0.5">
            <span className={`text-2xl font-bold ${stat.color} leading-none`}>
              {stat.prefix}{displayValue}{stat.suffix}
            </span>
          </div>
          <p className="text-white/60 text-xs font-medium truncate">{stat.label}</p>
          <p
            className={`text-[11px] font-medium mt-0.5 ${
              stat.positive === true
                ? "text-accent-green"
                : stat.positive === false
                ? "text-red-400"
                : "text-white/30"
            }`}
          >
            {stat.positive === true && "↑ "}
            {stat.change}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative border-y section-divider overflow-hidden"
      style={{ background: "rgba(255,255,255,0.015)" }}
    >
      {/* Subtle gradient bands */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 20% 50%, rgba(59,130,246,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 100% at 80% 50%, rgba(124,58,237,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Live indicator */}
        <div className="flex items-center justify-center pt-4 mb-1">
          <div className="flex items-center gap-1.5 text-[11px] text-white/30 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            Live Platform Metrics
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-white/[0.05]">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
