"use client";

import { useEffect, useState } from "react";

type NetworkStatusResponse =
  | { connected: true; blockNumber: string; chainId: string; timestamp: string }
  | { connected: false; error: string };

export function NetworkStatus() {
  const [status, setStatus] = useState<NetworkStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function checkStatus() {
    setLoading(true);
    try {
      const response = await fetch("/api/arc/status", { cache: "no-store" });
      const data = (await response.json()) as NetworkStatusResponse;
      setStatus(data);
    } catch {
      setStatus({ connected: false, error: "Could not reach the status endpoint." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void checkStatus(); }, []);

  const connected = status?.connected === true;
  const label = loading ? "Checking..." : connected ? "Connected" : "Offline";

  return <div className="flex items-center gap-2 text-xs font-medium text-muted" title={!connected && status && "error" in status ? status.error : undefined}>
    <span className={`h-2 w-2 rounded-full ${loading ? "animate-pulse bg-yellow-400" : connected ? "bg-accent" : "bg-red-400"}`} />
    <span>Arc</span>
    <span className={`rounded bg-white/5 px-2 py-0.5 text-[10px] ${connected ? "text-accent" : loading ? "text-yellow-300" : "text-red-300"}`}>{label}</span>
    {connected && <span className="hidden text-[10px] text-muted sm:inline">Block {status.blockNumber}</span>}
    {!connected && !loading && <span className="rounded bg-orange-400/10 px-2 py-0.5 text-[10px] text-orange-300">MOCK DATA</span>}
    <button type="button" onClick={() => void checkStatus()} className="ml-1 text-muted hover:text-white" aria-label="Refresh Arc network status">↻</button>
  </div>;
}
