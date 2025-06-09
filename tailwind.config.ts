import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        auracastlight: {
          primary: "#6D28D9",
          secondary: "#9333EA",
          accent: "#4F46E5",
          neutral: "#e5e7eb",
          "base-100": "#f4f4f5",
          "base-200": "#e5e7eb",
          "base-content": "#1f2937",
        },
      },
      {
        auracastdark: {
          primary: "#8b5cf6",
          secondary: "#c084fc",
          accent: "#6366f1",
          neutral: "#1f2937",
          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-content": "#f3f4f6",
        },
      },
    ],
    darkTheme: "auracastdark",
  },
};

export default config;
