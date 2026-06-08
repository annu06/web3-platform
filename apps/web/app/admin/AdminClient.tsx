"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, FileText, Wrench,
  Users, Mail, LogOut, Code2, TrendingUp, Eye, MessageSquare, Star,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: FolderKanban, label: "Projects", id: "projects" },
  { icon: FileText, label: "Blog", id: "blog" },
  { icon: Wrench, label: "Skills", id: "skills" },
  { icon: Users, label: "Leads", id: "leads" },
  { icon: Mail, label: "Messages", id: "messages" },
];

const LEADS = [
  { name: "Alex Turner", email: "alex@startup.io", type: "Web3 / DeFi", budget: "$15k+", status: "New", statusCls: "chip-emerald", date: "Today" },
  { name: "Sarah Chen", email: "sarah@fintech.co", type: "Backend API", budget: "$5k – $15k", status: "Replied", statusCls: "chip-blue", date: "Yesterday" },
  { name: "Marco Polo", email: "marco@agency.com", type: "Web App", budget: "$1k – $5k", status: "In progress", statusCls: "chip-violet", date: "3 days ago" },
  { name: "Priya Singh", email: "priya@corp.in", type: "Consulting", budget: "$15k+", status: "Closed", statusCls: "chip-pink", date: "1 week ago" },
  { name: "James Wilson", email: "james@startup.us", type: "Mobile App", budget: "Not sure", status: "New", statusCls: "chip-emerald", date: "1 week ago" },
];

const METRICS = [
  { icon: Eye, label: "Page Views", value: "4,821", delta: "+12%", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { icon: MessageSquare, label: "New Leads", value: "12", delta: "+3 this week", color: "text-sky-400", bg: "bg-sky-400/10" },
  { icon: TrendingUp, label: "Conversion", value: "3.4%", delta: "+0.8%", color: "text-violet-400", bg: "bg-violet-400/10" },
  { icon: Star, label: "Avg Rating", value: "4.9/5", delta: "20 reviews", color: "text-pink-400", bg: "bg-pink-400/10" },
];

function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-100 mb-1">Dashboard</h2>
        <p className="text-sm text-slate-500 font-mono">Last updated: just now</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map(({ icon: Icon, label, value, delta, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="p-5 rounded-2xl border border-[#1e293b] bg-[#0f172a]"
          >
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center ${color} mb-3`}>
              <Icon size={16} />
            </div>
            <div className="text-2xl font-black text-slate-100">{value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{label}</div>
            <div className={`text-xs font-mono mt-1 ${color}`}>{delta}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent leads */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-200">Recent Leads</h3>
          <span className="text-xs font-mono text-emerald-400">{LEADS.length} total</span>
        </div>
        <LeadsTable />
      </div>
    </div>
  );
}

function LeadsTable() {
  return (
    <div className="rounded-2xl border border-[#1e293b] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#1e293b] bg-[#0f172a]">
            {["Name", "Type", "Budget", "Status", "Date"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-mono text-slate-500 uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {LEADS.map((lead, i) => (
            <motion.tr
              key={lead.email}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-[#1e293b]/50 hover:bg-[#0f172a]/60 transition-colors"
            >
              <td className="px-4 py-3.5">
                <div className="font-medium text-slate-100">{lead.name}</div>
                <div className="text-xs text-slate-500 font-mono">{lead.email}</div>
              </td>
              <td className="px-4 py-3.5 text-slate-400">{lead.type}</td>
              <td className="px-4 py-3.5 text-slate-400">{lead.budget}</td>
              <td className="px-4 py-3.5">
                <span className={`chip ${lead.statusCls}`}>{lead.status}</span>
              </td>
              <td className="px-4 py-3.5 text-xs text-slate-500 font-mono">{lead.date}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4 text-center">
      <div className="text-4xl font-black gradient-text">{label}</div>
      <p className="text-slate-500 text-sm">This section is under construction.</p>
    </div>
  );
}

export function AdminClient() {
  const [active, setActive] = useState("overview");

  const renderContent = () => {
    if (active === "overview") return <Overview />;
    if (active === "leads") return (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-100">Leads CRM</h2>
        <LeadsTable />
      </div>
    );
    return <ComingSoon label={NAV_ITEMS.find((n) => n.id === active)?.label ?? active} />;
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0a0d14", color: "#e2e8f0" }}>
      {/* Sidebar */}
      <aside className="w-60 border-r border-[#1e293b] bg-[#0f172a] flex flex-col shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-[#1e293b]">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
            <Code2 size={14} className="text-slate-900" />
          </div>
          <span className="font-black text-slate-100">DevCommand</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active === id
                  ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                  : "text-slate-500 hover:text-slate-200 hover:bg-[#1e293b]/60"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-[#1e293b]">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 transition-all">
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
}
