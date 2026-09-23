import { defineChain } from "viem";

/**
 * Arc Testnet chain metadata.
 * The RPC endpoint is intentionally read from the environment so it can be
 * changed without changing application code.
 */
export const arc = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  nativeCurrency: { name: "USD Coin", symbol: "USDC", decimals: 18 },
  rpcUrls: { default: { http: [] } },
  blockExplorers: { default: { name: "ArcScan", url: "https://testnet.arcscan.app" } },
  testnet: true,
});

export function getArcRpcUrl(): string {
  const rpcUrl = process.env.NEXT_PUBLIC_ARC_RPC_URL?.trim();
  if (!rpcUrl) {
    throw new Error("NEXT_PUBLIC_ARC_RPC_URL is not configured.");
  }
  return rpcUrl;
}
