import { isAddress, type Address } from "viem";
import { NextResponse } from "next/server";
import { getArcChainId } from "@/lib/arc-client";
import { getTokenMetadata } from "@/lib/token-client";

export const dynamic = "force-dynamic";

type RouteContext = { params: { address: string } };

export async function GET(_request: Request, { params }: RouteContext) {
  const address = params.address;
  if (!isAddress(address)) {
    return NextResponse.json({ success: false, error: "Please provide a valid Ethereum contract address." }, { status: 400 });
  }

  try {
    const token = await getTokenMetadata(address as Address);
    return NextResponse.json({
      success: true,
      network: "Arc Testnet",
      chainId: getArcChainId().toString(),
      address,
      token: { ...token, totalSupply: token.totalSupply.toString() },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Token metadata could not be read.";
    const rpcUnavailable = message.includes("NEXT_PUBLIC_ARC_RPC_URL") || message.includes("fetch") || message.includes("connect");
    return NextResponse.json(
      { success: false, error: rpcUnavailable ? "Arc RPC is unavailable. Check NEXT_PUBLIC_ARC_RPC_URL and try again." : "This contract does not expose the expected ERC-20 metadata methods, or the call reverted." },
      { status: rpcUnavailable ? 503 : 422 },
    );
  }
}
