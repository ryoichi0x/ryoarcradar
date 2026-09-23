import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = { title: "RyoArcRadar", description: "Arc blockchain trading intelligence dashboard" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="min-h-screen bg-ink text-white"><Sidebar /><main className="min-h-screen lg:pl-64">{children}</main></div></body></html>;
}
