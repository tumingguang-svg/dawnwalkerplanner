import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dusk: {
          50: "#f4f1eb",
          100: "#e6dfd2",
          200: "#cfc2a8",
          300: "#b5a07c",
          400: "#9d845c",
          500: "#886c4a",
          600: "#6f563c",
          700: "#574431",
          800: "#48392b",
          900: "#3d3126",
          950: "#211910",
        },
        ember: {
          400: "#f0a060",
          500: "#e07830",
          600: "#c45a1a",
        },
        blood: {
          400: "#d4545c",
          500: "#b82e38",
          600: "#961f2a",
        },
        night: {
          800: "#14121a",
          900: "#0c0b10",
          950: "#07060a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(224, 120, 48, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
