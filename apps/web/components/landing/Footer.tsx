"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Code2, Mail } from "lucide-react";

const NAV_COLS = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Tech Stack",
    links: [
      { label: "Next.js 15", href: "#" },
      { label: "NestJS", href: "#" },
      { label: "Solidity / EVM", href: "#" },
      { label: "PostgreSQL", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/AnuraagChetia", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "mailto:anuragpolasa06@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#1e293b]/60 bg-[#0a0d14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                <Code2 size={14} className="text-slate-900 font-bold" />
              </div>
              <span className="font-black text-slate-100 text-lg">DevCommand</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[220px]">
              Full-stack engineer specialising in Web3, Next.js, and high-performance APIs.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">Open to work</span>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.title} className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Connect</div>
            <div className="flex flex-col gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#1e293b]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 font-mono">
            © {new Date().getFullYear()} Anuraag Chetia. Built with Next.js 15 + Tailwind CSS.
          </p>
          <p className="text-xs text-slate-700 font-mono">
            Deployed on Vercel · API on Railway
          </p>
        </div>
      </div>
    </footer>
  );
}
