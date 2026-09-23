import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { ink: "#080b12", panel: "#10151f", line: "#202938", muted: "#8490a5", accent: "#a8ff63" },
      boxShadow: { glow: "0 0 32px rgba(168, 255, 99, 0.12)" }
    }
  },
  plugins: []
};
export default config;
