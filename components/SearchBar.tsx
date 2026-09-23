"use client";

import { useState } from "react";
import { isAddress } from "viem";
import type { TokenScanResponse } from "@/types";

export function SearchBar() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<TokenScanResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function scanToken() {
    const trimmedAddress = address.trim();
    setError("");
    setResult(null);
    if (!trimmedAddress) { setError("Please enter a token contract address."); return; }
    if (!isAddress(trimmedAddress)) { setError("That is not a valid Ethereum address. It should start with 0x and contain 40 hexadecimal characters."); return; }

    setLoading(true);
    try {
      const response = await fetch(`/api/tokens/${trimmedAddress}`, { cache: "no-store" });
      const data = (await response.json()) as TokenScanResponse;
      if (!response.ok || !data.success) { setError(data.success ? "The token scan failed." : data.error); return; }
      setResult(data);
    } catch { setError("Unexpected error while scanning. Please try again."); }
    finally { setLoading(false); }
  }

  return <div className="space-y-3"><div className="panel flex flex-col gap-3 p-3 sm:flex-row"><div className="flex flex-1 items-center gap-3 rounded-xl bg-white/[0.03] px-4"><span className="text-muted">⌕</span><input aria-label="Token contract address" value={address} onChange={(event) => setAddress(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void scanToken(); }} placeholder="Paste token contract address..." className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted/70" /></div><button type="button" onClick={() => void scanToken()} disabled={loading} className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-ink transition hover:bg-[#c2ff91] disabled:cursor-wait disabled:opacity-60">{loading ? "Scanning..." : "Scan token ↗"}</button></div>
    {error && <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-200">{error}</p>}
    {result?.success && <div className="panel border-accent/30 bg-accent/[0.03] p-5"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">LIVE ON-CHAIN DATA</p><h2 className="mt-2 text-xl font-bold">{result.token.name} <span className="text-muted">({result.token.symbol})</span></h2></div><span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{result.network}</span></div><div className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-xs text-muted">Token Name</p><p className="mt-1 font-semibold">{result.token.name}</p></div><div><p className="text-xs text-muted">Symbol</p><p className="mt-1 font-semibold">{result.token.symbol}</p></div><div><p className="text-xs text-muted">Decimals</p><p className="mt-1 font-semibold">{result.token.decimals}</p></div><div><p className="text-xs text-muted">Total Supply</p><p className="mt-1 break-all font-semibold">{result.token.totalSupply}</p></div></div><p className="mt-5 break-all text-xs text-muted">Contract: {result.address} · Chain ID: {result.chainId}</p></div>}
  </div>;
}
