"use client";

import React from "react";
import { motion } from "framer-motion";

const STATS = [
  { label: "Total Value Locked",   value: "$48.2M",  sub: "+12.4% this month" },
  { label: "NFTs Minted",          value: "24,800",  sub: "Across 3 collections" },
  { label: "Active Stakers",       value: "6,420",   sub: "Earning PLT rewards" },
  { label: "DAO Proposals",        value: "142",      sub: "91% participation rate" },
  { label: "Platform Token (PLT)", value: "$2.84",   sub: "+8.3% 24h" },
];

export function StatsBar() {
  return (
    <section className="relative border-y border-white/5 bg-white/2 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-white/80 text-sm font-medium mt-1">{stat.label}</p>
              <p className="text-white/30 text-xs mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
