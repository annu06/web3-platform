"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Mail, MessageSquare } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0d14] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(78,222,163,0.08)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(129,140,248,0.07)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(244,114,182,0.06)_0%,transparent_55%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="section-label justify-center">04 / Contact</div>

          <h2 className="text-4xl lg:text-6xl font-black tracking-tight">
            Have an idea?{" "}
            <span className="gradient-text">Let&apos;s build</span>
            <br />
            it <span className="gradient-text-pink">together.</span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Whether it&apos;s a complex Web3 protocol, a polished SaaS product, or a rapid MVP —
            I&apos;m open to new collaborations. Typically respond within 24 hours.
          </p>

          {/* Availability badge */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-mono text-emerald-400">Currently available for new projects</span>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary flex items-center gap-2 group"
              >
                <Sparkles size={15} />
                Start a Project
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </Link>
            <a href="mailto:anuragpolasa06@gmail.com">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary flex items-center gap-2"
              >
                <Mail size={15} />
                Send an Email
              </motion.button>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-[#1e293b]/60 mt-8"
          >
            {[
              { label: "Fast response", sub: "< 24h reply time" },
              { label: "NDA ready", sub: "Full confidentiality" },
              { label: "Fixed or hourly", sub: "Flexible pricing" },
            ].map(({ label, sub }) => (
              <div key={label} className="text-center">
                <div className="text-sm font-semibold text-slate-200">{label}</div>
                <div className="text-xs text-slate-500 font-mono">{sub}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
