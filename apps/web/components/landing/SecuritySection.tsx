"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Code2, Bug, CheckCircle2, FileCheck } from "lucide-react";

const SECURITY_METRICS = [
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Test Coverage",
    sub: "All critical paths covered",
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/12",
    iconBorder: "border-emerald-500/20",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: Bug,
    value: "0",
    label: "Critical Vulnerabilities",
    sub: "Post-audit clean bill of health",
    color: "text-brand-400",
    iconBg: "bg-brand-500/12",
    iconBorder: "border-brand-500/20",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: Code2,
    value: "4,200+",
    label: "Lines of Solidity",
    sub: "Across 6 production contracts",
    color: "text-violet-400",
    iconBg: "bg-violet-500/12",
    iconBorder: "border-violet-500/20",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    icon: Lock,
    value: "2-Day",
    label: "TimeLock Delay",
    sub: "Protects against flash-loan attacks",
    color: "text-cyan-400",
    iconBg: "bg-cyan-500/12",
    iconBorder: "border-cyan-500/20",
    glow: "rgba(34,211,238,0.15)",
  },
];

const AUDIT_FEATURES = [
  "Re-entrancy protection on all state-changing functions",
  "OpenZeppelin battle-tested contract standards",
  "Overflow/underflow protected via Solidity 0.8+",
  "Multi-sig treasury requiring N-of-M keyholders",
  "TimeLock governor — 48-hour governance delay",
  "SIWE JWT with rolling refresh token rotation",
];

const AUDITOR_BADGES = [
  { name: "CertiK", color: "#FFD700", icon: "🛡" },
  { name: "OpenZeppelin", color: "#4F46E5", icon: "🔒" },
  { name: "Quantstamp", color: "#10B981", icon: "✓" },
];

export function SecuritySection() {
  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden section-divider">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(255,255,255,0.015)" }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(16,185,129,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="badge-green mb-4 inline-block">Security First</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
            Audited, Tested &{" "}
            <span className="gradient-text-cyan">Battle-Hardened</span>
          </h2>
          <p className="text-white/45 mt-5 max-w-2xl mx-auto text-lg">
            Every smart contract is audited, every function is tested, and every vulnerability
            is patched before a single wei touches the protocol.
          </p>
        </motion.div>

        {/* Security metrics grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {SECURITY_METRICS.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl p-6 overflow-hidden cursor-default"
                style={{
                  background: "linear-gradient(145deg, rgba(12,16,24,0.95), rgba(8,11,20,0.8))",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                whileHover={{
                  y: -2,
                  borderColor: "rgba(255,255,255,0.12)",
                  boxShadow: `0 16px 40px rgba(0,0,0,0.4), 0 0 20px ${metric.glow}`,
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-30 pointer-events-none"
                  style={{ background: metric.glow }}
                />

                <div className={`w-11 h-11 rounded-xl ${metric.iconBg} border ${metric.iconBorder} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>

                <p className={`text-3xl font-bold ${metric.color} mb-1`}>{metric.value}</p>
                <p className="text-white font-semibold text-sm mb-1">{metric.label}</p>
                <p className="text-white/35 text-xs leading-relaxed">{metric.sub}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Two columns: features list + auditors */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Audit features checklist */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-7"
            style={{
              background: "linear-gradient(145deg, rgba(12,16,24,0.95), rgba(8,11,20,0.8))",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/12 border border-emerald-500/20 flex items-center justify-center">
                <FileCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold text-base">Security Guarantees</h3>
            </div>
            <div className="space-y-3">
              {AUDIT_FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-white/60 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Audit partners + bug bounty */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Auditor badges */}
            <div
              className="rounded-2xl p-7 flex-1"
              style={{
                background: "linear-gradient(145deg, rgba(12,16,24,0.95), rgba(8,11,20,0.8))",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h3 className="text-white font-semibold text-base mb-6">Audit Partners</h3>
              <div className="flex flex-wrap gap-3">
                {AUDITOR_BADGES.map((auditor) => (
                  <div
                    key={auditor.name}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                    }}
                  >
                    <span className="text-lg">{auditor.icon}</span>
                    <span className="text-white/80 text-sm font-medium">{auditor.name}</span>
                    <span className="badge-green text-[10px]">Passed</span>
                  </div>
                ))}
              </div>

              <p className="text-white/30 text-xs mt-5 leading-relaxed">
                All contracts audited prior to mainnet deployment. Audit reports are publicly
                available in the GitHub repository.
              </p>
            </div>

            {/* Bug bounty */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(124,58,237,0.06))",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Bug Bounty Program</p>
                  <p className="text-white/45 text-xs">Responsible disclosure earns up to</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold gradient-text">$50K</p>
                  <p className="text-white/30 text-xs">max payout</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
