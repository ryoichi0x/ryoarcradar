export type NavItem = { label: string; href: string; icon: string };
export type Token = { name: string; symbol: string; price: string; change: string; volume: string; color: string };
export type Activity = { time: string; title: string; detail: string; tone: "green" | "blue" | "orange" };

export type TokenMetadata = { name: string; symbol: string; decimals: number; totalSupply: string };
export type TokenScanResponse =
  | { success: true; network: string; chainId: string; address: string; token: TokenMetadata }
  | { success: false; error: string };
