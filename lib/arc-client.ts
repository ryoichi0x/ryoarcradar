import { createPublicClient, http } from "viem";
import { arc, getArcRpcUrl } from "@/lib/arc";

/** Create a server-side, read-only client for Arc. */
export function getArcPublicClient() {
  return createPublicClient({ chain: arc, transport: http(getArcRpcUrl()) });
}

/** Read the latest block number from Arc without signing or sending anything. */
export async function getArcBlockNumber(): Promise<bigint> {
  return getArcPublicClient().getBlockNumber();
}

/** Read the actual chain ID returned by the configured Arc RPC endpoint. */
export async function getArcChainId(): Promise<number> {
  return getArcPublicClient().getChainId();
}
