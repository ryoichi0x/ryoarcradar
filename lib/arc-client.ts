import { createPublicClient, http } from "viem";
import { arc, getArcRpcUrl } from "@/lib/arc";

function createArcPublicClient() {
  return createPublicClient({ chain: arc, transport: http(getArcRpcUrl()) });
}

/** Read the latest block number from Arc without signing or sending anything. */
export async function getArcBlockNumber(): Promise<bigint> {
  const client = createArcPublicClient();
  return client.getBlockNumber();
}

export function getArcChainId(): number {
  return arc.id;
}
