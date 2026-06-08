"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Github } from "lucide-react";

const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "About",    href: "/about" },
  { label: "Blog",     href: "/blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0d14]/85 backdrop-blur-xl border-b border-[#1e293b]/60"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.06, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-glow-emerald"
            >
              <Code2 size={15} className="text-emerald-950 font-black" />
            </motion.div>
            <span className="text-base font-black tracking-tight text-slate-100">
              DevCommand
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative px-4 py-2">
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-emerald-400/10 border border-emerald-400/20"
                    />
                  )}
                  <span className={`relative text-sm font-medium transition-colors ${active ? "text-emerald-400" : "text-slate-400 hover:text-slate-100"}`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://github.com/AnuraagChetia" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#1e293b] text-slate-400 hover:text-slate-100 hover:border-emerald-500/40 transition-all">
              <Github size={16} />
            </a>
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="btn-primary text-sm py-2 px-5">
                Contact Me
              </motion.button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#1e293b] text-slate-400">
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-[#1e293b] md:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20" : "text-slate-400 hover:bg-[#1c2028] hover:text-slate-100"
                  }`}>
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#1e293b]">
                <Link href="/contact"><button className="btn-primary w-full justify-center">Contact Me</button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
