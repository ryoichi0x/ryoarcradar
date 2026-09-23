import type { Activity, Token } from "@/types";

export const trendingTokens: Token[] = [
  { name: "Arcade Protocol", symbol: "ARCD", price: "$0.842", change: "+18.42%", volume: "$842K", color: "#a8ff63" },
  { name: "Neon Cat", symbol: "NCAT", price: "$0.019", change: "+11.08%", volume: "$416K", color: "#63d9ff" },
  { name: "Arc Yield", symbol: "AYLD", price: "$2.14", change: "+7.64%", volume: "$298K", color: "#c084fc" },
  { name: "Moonbird", symbol: "MBRD", price: "$0.064", change: "+5.91%", volume: "$191K", color: "#ffb86b" }
];

export const activities: Activity[] = [
  { time: "12 sec ago", title: "New liquidity pool detected", detail: "ARCD / USDC · $182K liquidity", tone: "green" },
  { time: "46 sec ago", title: "Large buy spotted", detail: "0x71...a92f bought 18,400 NCAT", tone: "blue" },
  { time: "2 min ago", title: "Risk signal updated", detail: "AYLD ownership is not renounced", tone: "orange" },
  { time: "4 min ago", title: "Wallet entered top 100", detail: "0x3b...88c1 · Smart money score 87", tone: "green" }
];
