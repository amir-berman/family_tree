import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-heebo)", "system-ui", "Segoe UI", "Arial", "sans-serif"],
      },
      colors: {
        ink: {
          0: "#000000",
          50: "#07080B",
          100: "#0C0E14",
          200: "#111525",
          300: "#191F36",
          400: "#242B48",
          500: "#2E3760",
          600: "#3C4680",
        },
        pearl: {
          50: "#F6F7FB",
          100: "#EEF0F7",
          200: "#D6D9E6",
          300: "#B7BDD1",
          400: "#8992B0",
          500: "#667092",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,.06), 0 16px 60px rgba(0,0,0,.55)",
        soft: "0 0 0 1px rgba(255,255,255,.06), 0 20px 80px rgba(0,0,0,.6)",
      },
      backgroundImage: {
        "cinematic-radial":
          "radial-gradient(1200px 600px at 85% 10%, rgba(124,58,237,.18), rgba(0,0,0,0)), radial-gradient(900px 500px at 10% 30%, rgba(14,165,233,.10), rgba(0,0,0,0)), radial-gradient(1000px 600px at 50% 110%, rgba(16,185,129,.10), rgba(0,0,0,0))",
      },
    },
  },
  plugins: [],
} satisfies Config;

