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
          cyan:   "#06b6d4",
          green:  "#10b981",
          orange: "#f97316",
        },
        surface: {
          DEFAULT: "#0f1117",
          card:    "#161b27",
          border:  "#1e2533",
          hover:   "#1c2235",
        },
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:  ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-radial":    "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero":      "linear-gradient(135deg, #0f1117 0%, #161b27 50%, #0f1117 100%)",
        "gradient-brand":     "linear-gradient(135deg, #3b82f6, #7c3aed)",
        "gradient-card":      "linear-gradient(145deg, rgba(22,27,39,0.8), rgba(15,17,23,0.6))",
        "grid-pattern":       "url('/grid.svg')",
      },
      boxShadow: {
        "glow-blue":   "0 0 40px rgba(59,130,246,0.15)",
        "glow-purple": "0 0 40px rgba(124,58,237,0.15)",
        "card":        "0 4px 24px rgba(0,0,0,0.4)",
        "glass":       "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      backdropBlur: { xs: "2px" },
      animation: {
        "fade-in":     "fadeIn 0.5s ease-out",
        "slide-up":    "slideUp 0.4s ease-out",
        "pulse-slow":  "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "float":       "float 6s ease-in-out infinite",
        "shimmer":     "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn:  { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        float:   { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
