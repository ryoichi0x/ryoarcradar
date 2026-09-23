import type { Address } from "viem";
import { getArcPublicClient } from "@/lib/arc-client";

export const erc20Abi = [
  { name: "name", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "string" }] },
  { name: "symbol", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "string" }] },
  { name: "decimals", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint8" }] },
  { name: "totalSupply", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
] as const;

export type TokenMetadata = {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
};

/** Read standard ERC-20 metadata from Arc. This function never writes to a contract. */
export async function getTokenMetadata(address: Address): Promise<TokenMetadata> {
  const client = getArcPublicClient();
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    client.readContract({ address, abi: erc20Abi, functionName: "name" }),
    client.readContract({ address, abi: erc20Abi, functionName: "symbol" }),
    client.readContract({ address, abi: erc20Abi, functionName: "decimals" }),
    client.readContract({ address, abi: erc20Abi, functionName: "totalSupply" }),
  ]);

  return { name, symbol, decimals: Number(decimals), totalSupply };
}
