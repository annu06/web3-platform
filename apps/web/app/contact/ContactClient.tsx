"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Github, Linkedin, CheckCircle2 } from "lucide-react";

const BUDGET_OPTIONS = ["< $1k", "$1k – $5k", "$5k – $15k", "$15k+", "Not sure"];
const PROJECT_TYPES = ["Web App", "Web3 / DeFi", "Mobile App", "API / Backend", "Consulting", "Other"];

export function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", projectType: "", budget: "", message: "",
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <div className="section-label mb-3">Get in touch</div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
                Start a <span className="gradient-text">project</span>
                <br />
                <span className="gradient-text-pink">with me.</span>
              </h1>
              <p className="mt-5 text-slate-400 leading-relaxed max-w-md">
                Fill in the form and I&apos;ll get back to you within 24 hours to discuss
                your project and how we can work together.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {[
                { icon: Mail, label: "Email", value: "anuragpolasa06@gmail.com", href: "mailto:anuragpolasa06@gmail.com", color: "text-emerald-400" },
                { icon: Github, label: "GitHub", value: "AnuraagChetia", href: "https://github.com/AnuraagChetia", color: "text-slate-100" },
                { icon: Linkedin, label: "LinkedIn", value: "Connect with me", href: "#", color: "text-sky-400" },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#1e293b] bg-[#0f172a] hover:border-[#334155] transition-all group"
                >
                  <div className={`w-9 h-9 rounded-lg bg-[#1e293b] flex items-center justify-center ${color}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-mono">{label}</div>
                    <div className="text-sm text-slate-200 group-hover:text-emerald-400 transition-colors">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 p-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-sm text-emerald-400 font-mono">Currently available for new projects · Typically responds in &lt; 24h</span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 space-y-4">
                <CheckCircle2 size={48} className="text-emerald-400" />
                <h3 className="text-xl font-bold text-slate-100">Message sent!</h3>
                <p className="text-slate-400 text-sm">Thanks for reaching out. I&apos;ll reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl border border-[#1e293b] bg-[#0f172a]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Anuraag Chetia"
                      className="w-full bg-[#0a0d14] border border-[#1e293b] rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-400/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@company.com"
                      className="w-full bg-[#0a0d14] border border-[#1e293b] rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-400/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1.5">Project Type</label>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, projectType: t }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                          form.projectType === t
                            ? "bg-emerald-400/10 border-emerald-400/40 text-emerald-400"
                            : "border-[#1e293b] text-slate-500 hover:border-[#334155]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1.5">Budget Range</label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, budget: b }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                          form.budget === b
                            ? "bg-violet-400/10 border-violet-400/40 text-violet-400"
                            : "border-[#1e293b] text-slate-500 hover:border-[#334155]"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell me about your project — what are you building, what's the timeline, and what kind of help do you need?"
                    className="w-full bg-[#0a0d14] border border-[#1e293b] rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-400/40 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                  {loading ? "Sending…" : "Send Message"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
