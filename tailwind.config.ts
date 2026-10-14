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
        obsidian: {
          DEFAULT: "#0A0A0A",
          900: "#121212",
          800: "#1C1C1C",
          700: "#282828",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E6C762",
          dark: "#AA861E",
          muted: "#F4ECD3",
        },
        stonebg: {
          DEFAULT: "#E8E6DF",
          light: "#F5F4F0",
          card: "#F3F2EE",
        },
      },
      fontFamily: {
        sans: ["Inter", "Hind Siliguri", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        gold: "0 4px 20px -2px rgba(212, 175, 55, 0.25)",
        tile: "0 10px 25px -5px rgba(0, 0, 0, 0.14), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
