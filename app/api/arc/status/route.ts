import { NextResponse } from "next/server";
import { getArcBlockNumber, getArcChainId } from "@/lib/arc-client";

export const dynamic = "force-dynamic";

const EXPECTED_ARC_CHAIN_ID = 5042002;

type ArcDiagnostic =
  | "configuration missing"
  | "invalid URL"
  | "connection failed"
  | "RPC error"
  | "chain ID mismatch"
  | "connected";

function logArcDiagnostic(category: ArcDiagnostic) {
  if (process.env.NODE_ENV === "development") {
    console.error(`[Arc RPC] ${category}`);
  }
}

function isConnectionError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;

  const value = `${error.name} ${error.message}`.toLowerCase();

  return (
    value.includes("fetch failed") ||
    value.includes("network") ||
    value.includes("timeout") ||
    value.includes("timed out") ||
    value.includes("econn") ||
    value.includes("enotfound")
  );
}

export async function GET() {
  const rpcUrl = process.env.NEXT_PUBLIC_ARC_RPC_URL?.trim();

  if (!rpcUrl) {
    logArcDiagnostic("configuration missing");

    return NextResponse.json(
      { connected: false, error: "Arc RPC configuration missing" },
      { status: 503 },
    );
  }

  try {
    const parsedUrl = new URL(rpcUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error("Unsupported URL protocol");
    }
  } catch {
    logArcDiagnostic("invalid URL");

    return NextResponse.json(
      { connected: false, error: "Invalid Arc RPC URL configuration" },
      { status: 503 },
    );
  }

  try {
    const [blockNumber, chainId] = await Promise.all([
      getArcBlockNumber(),
      getArcChainId(),
    ]);

    if (chainId !== EXPECTED_ARC_CHAIN_ID) {
      logArcDiagnostic("chain ID mismatch");

      return NextResponse.json(
        { connected: false, error: "RPC chain ID mismatch" },
        { status: 503 },
      );
    }

    logArcDiagnostic("connected");

    return NextResponse.json({
      connected: true,
      blockNumber: blockNumber.toString(),
      chainId: chainId.toString(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logArcDiagnostic(isConnectionError(error) ? "connection failed" : "RPC error");

    return NextResponse.json(
      { connected: false, error: "Unable to connect to Arc RPC" },
      { status: 503 },
    );
  }
}
