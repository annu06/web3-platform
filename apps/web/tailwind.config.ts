import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a8a",
        },
        accent: {
          purple: "#7c3aed",
          cyan:   "#22d3ee",
          green:  "#10b981",
          orange: "#f97316",
          pink:   "#f472b6",
        },
        surface: {
          DEFAULT: "#050810",
          card:    "#0c1018",
          elevated:"#111827",
          border:  "#1a2236",
          hover:   "#1c2440",
        },
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:  ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero":    "linear-gradient(135deg, #050810 0%, #0c1018 50%, #050810 100%)",
        "gradient-brand":   "linear-gradient(135deg, #3b82f6, #7c3aed)",
        "gradient-brand-r": "linear-gradient(135deg, #7c3aed, #3b82f6)",
        "gradient-card":    "linear-gradient(145deg, rgba(12,16,24,0.9), rgba(5,8,16,0.7))",
        "gradient-cyan":    "linear-gradient(135deg, #22d3ee, #3b82f6)",
        "dot-grid":         "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 0)",
      },
      backgroundSize: {
        "dot-grid": "30px 30px",
      },
      boxShadow: {
        "glow-blue":   "0 0 30px rgba(59,130,246,0.35), 0 0 60px rgba(59,130,246,0.12)",
        "glow-purple": "0 0 30px rgba(124,58,237,0.35), 0 0 60px rgba(124,58,237,0.12)",
        "glow-cyan":   "0 0 30px rgba(34,211,238,0.3)",
        "glow-green":  "0 0 30px rgba(16,185,129,0.3)",
        "card":        "0 4px 24px rgba(0,0,0,0.5)",
        "card-hover":  "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
        "glass":       "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "inner-glow":  "inset 0 0 20px rgba(59,130,246,0.08)",
        "feature":     "0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)",
      },
      backdropBlur: { xs: "2px" },
      animation: {
        "fade-in":       "fadeIn 0.5s ease-out",
        "slide-up":      "slideUp 0.4s ease-out",
        "pulse-slow":    "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "float":         "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow":    "float 9s ease-in-out 1s infinite",
        "shimmer":       "shimmer 2s linear infinite",
        "gradient-x":    "gradientX 8s ease infinite",
        "spin-slow":     "spin 12s linear infinite",
        "marquee":       "marquee 40s linear infinite",
        "marquee-rev":   "marqueeReverse 40s linear infinite",
        "glow-pulse":    "glowPulse 3s ease-in-out infinite",
        "blob":          "blob 10s infinite",
        "blob-delayed":  "blob 12s infinite 3s",
        "border-pulse":  "borderPulse 2s ease-in-out infinite",
        "count-up":      "countUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn:    { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp:   { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        float:     { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-14px)" } },
        shimmer:   { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%":      { opacity: "0.7", transform: "scale(1.08)" },
        },
        blob: {
          "0%":   { transform: "translate(0px, 0px) scale(1)" },
          "33%":  { transform: "translate(40px, -60px) scale(1.12)" },
          "66%":  { transform: "translate(-30px, 30px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        borderPulse: {
          "0%, 100%": { borderColor: "rgba(59,130,246,0.3)" },
          "50%":      { borderColor: "rgba(124,58,237,0.6)" },
        },
        countUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
