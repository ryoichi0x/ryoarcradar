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

export function getArcChainId(): number {
  return arc.id;
}
