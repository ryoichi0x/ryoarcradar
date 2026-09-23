# RyoArcRadar

RyoArcRadar is a dark trading dashboard for the Arc blockchain. It will help traders discover tokens, check risk, follow whales, and understand wallet activity.

## Version 0.2 Phase 1

This phase adds a **read-only connection** to Arc Testnet. The dashboard asks the configured RPC endpoint for the latest block number and shows whether the connection is working.

The rest of the dashboard still uses clearly labeled **MOCK DATA**. It is not connected to real token, whale, liquidity, or wallet data yet.

## Run it on your computer

1. Install [Node.js](https://nodejs.org/) (version 18 or newer).
2. Open a terminal in this project folder.
3. Install the packages:

```bash
npm install
```

4. Create a local environment file:

```bash
cp .env.example .env.local
```

5. Open `.env.local` and set the Arc RPC endpoint:

```env
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.io
```

Use the RPC URL provided by your Arc network provider if you have a different endpoint. Never put private keys or seed phrases in this file, and never commit `.env.local`.

6. Start the development website:

```bash
npm run dev
```

7. Open http://localhost:3000 in your browser.

## Test the Arc status endpoint

With the app running, open this URL in a browser:

```text
http://localhost:3000/api/arc/status
```

A successful response looks like this:

```json
{
  "connected": true,
  "blockNumber": "12345",
  "chainId": "5042002",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

If the RPC is missing or unavailable, the endpoint returns HTTP `503` and `{ "connected": false, "error": "..." }`. The dashboard remains usable and marks its other values as **MOCK DATA**.

## What the files do

- `app/page.tsx` — the main Radar dashboard screen.
- `app/layout.tsx` — shared page layout and metadata.
- `app/globals.css` — global colors and Tailwind styles.
- `app/api/arc/status/route.ts` — server API route that checks the latest Arc block.
- `app/tokens`, `app/rug-check`, `app/whales`, `app/wallet` — starter pages for navigation.
- `components/` — reusable UI parts, including `NetworkStatus.tsx`.
- `lib/arc.ts` — Arc Testnet chain configuration and RPC environment lookup.
- `lib/arc-client.ts` — read-only viem client logic.
- `lib/mock-data.ts` — sample data used by the dashboard. This is not real blockchain data.
- `types/` — TypeScript shapes that describe our data.
- `.env.example` — the environment variable template.
- `package.json` — project packages and commands.

## Read-only safety notes

This phase only calls the public RPC `getBlockNumber` method. It does not create wallets, use private keys, sign messages, or send transactions. `viem` is used only for read-only blockchain access. `NEXT_PUBLIC_ARC_RPC_URL` is an endpoint URL, not a private credential.

To create a production build, use `npm run build`, then `npm start`.

## What we will build next

1. Replace mock dashboard values with safe, public blockchain data.
2. Make the token contract search work.
3. Add token analytics and Rug Check results.
4. Add whale and wallet tracking, then alerts.
5. Add X/Twitter automation with secure server-side credentials only if needed.
