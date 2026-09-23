import { NetworkStatus } from "@/components/NetworkStatus";

export function Header() {
  return <header className="flex flex-col gap-5 border-b border-line px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"><div><NetworkStatus /><h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Good morning, trader <span className="text-accent">✦</span></h1><p className="mt-1 text-sm text-muted">Here is what is happening across Arc today.</p></div><div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-xs text-muted">Network status</p><p className="text-sm font-semibold text-accent">Read-only mode</p></div><div className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/5 text-sm font-bold">RY</div></div></header>;
}
