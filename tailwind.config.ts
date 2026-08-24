import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          deep: "#0d3b3e",
          DEFAULT: "#134548",
          light: "#1c5a5d",
        },
        cream: {
          DEFAULT: "#f7f0e3",
          light: "#fbf6ec",
          dark: "#efe4cd",
        },
        burgundy: {
          DEFAULT: "#8a1538",
          light: "#a52142",
          dark: "#6e0f2b",
          pale: "#c68a9b",
        },
        gold: {
          DEFAULT: "#c9a24b",
          light: "#e0c37a",
          dark: "#a9822f",
        },
        ink: "#26221c",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Helvetica", "Arial", "sans-serif"],
        latinka: ["var(--font-latinka)", "Georgia", "serif"],
        canela: ["var(--font-canela)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1400px",
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(13, 59, 62, 0.35)",
        form: "0 20px 60px -15px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
