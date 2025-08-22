import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "auth-day": "url('/assets/background-day.webp')",
        "auth-night": "url('/assets/background-night.webp')",
      },
      fontFamily: {
        outfit: "Outfit, sans-serif",
      },
      gridTemplateColumns: {
        cards: "repeat(auto-fit, minmax(16rem,1fr))",
      },
      colors: {
        gopher: {
          50: "#f4f7fa",
          100: "#e6ecf3",
          200: "#d4dde9",
          300: "#a7bcd3",
          400: "#92aac8",
          500: "#7891b9",
          600: "#667baa",
          700: "#5a6b9b",
          800: "#4d5980",
          900: "#414b67",
          950: "#2b3040",
        },
        smoke: {
          0: "#f9f9f9",
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#1b1b1b",
          1000: "#0a0a0a",
        },
        success: {
          50: "#f3faf4",
          100: "#e4f4e7",
          200: "#cae8d0",
          300: "#a0d5aa",
          400: "#6fb97d",
          500: "#499858",
          600: "#398046",
          700: "#30653b",
          800: "#2a5132",
          900: "#24432a",
          950: "#0f2414",
        },

        danger: {
          50: "#ffeef0",
          100: "#fedbda",
          200: "#fbaeba",
          300: "#f78686",
          400: "#e73838",
          500: "#d12323",
          600: "#ae1616",
          700: "#881616",
          800: "#6b1818",
          900: "#581616",
          950: "#310707",
        },

        warning: {
          50: "#fffaeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
