"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types";

const items: NavItem[] = [
  { label: "Radar", href: "/", icon: "⌁" },
  { label: "Tokens", href: "/tokens", icon: "◈" },
  { label: "Rug Check", href: "/rug-check", icon: "◉" },
  { label: "Whales", href: "/whales", icon: "◒" },
  { label: "Wallet", href: "/wallet", icon: "◇" },
  { label: "Alerts", href: "/alerts", icon: "♢" }
];

export function Sidebar() {
  const pathname = usePathname();
  return <aside className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-[#0b1018]/95 backdrop-blur lg:inset-y-0 lg:right-auto lg:w-64 lg:border-r lg:border-t-0">
    <div className="hidden h-full flex-col px-5 py-7 lg:flex">
      <Link href="/" className="mb-12 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-xl font-black text-ink">R</span><span className="text-lg font-bold tracking-tight">RyoArc<span className="text-accent">Radar</span></span></Link>
      <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Workspace</p>
      <nav className="space-y-1">{items.map((item) => <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${pathname === item.href ? "bg-accent/10 font-semibold text-accent" : "text-muted hover:bg-white/5 hover:text-white"}`}><span className="w-5 text-center text-lg">{item.icon}</span>{item.label}</Link>)}</nav>
      <div className="mt-auto rounded-2xl border border-accent/20 bg-accent/5 p-4"><p className="text-xs font-semibold text-accent">VERSION 0.1 BETA</p><p className="mt-2 text-xs leading-5 text-muted">Some values are mock data while the Arc connection is being built.</p></div>
    </div>
    <nav className="flex h-16 items-center justify-around lg:hidden">{items.slice(0, 5).map((item) => <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-1 text-[10px] ${pathname === item.href ? "text-accent" : "text-muted"}`}><span className="text-lg">{item.icon}</span>{item.label}</Link>)}</nav>
  </aside>;
}
