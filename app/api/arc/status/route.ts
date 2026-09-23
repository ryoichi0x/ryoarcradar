import { NextResponse } from "next/server";
import { getArcBlockNumber, getArcChainId } from "@/lib/arc-client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const blockNumber = await getArcBlockNumber();
    return NextResponse.json({
      connected: true,
      blockNumber: blockNumber.toString(),
      chainId: getArcChainId().toString(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to connect to Arc RPC.";
    return NextResponse.json(
      { connected: false, error: message },
      { status: 503 },
    );
  }
}
