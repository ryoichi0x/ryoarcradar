# RyoArcRadar

RyoArcRadar is a dark trading dashboard for the Arc blockchain. It will help traders discover tokens, check risk, follow whales, and understand wallet activity.

## Version 0.2 Phase 2

This phase adds a **real, read-only ERC-20 token scanner** for Arc Testnet. Enter a token contract address on the Radar page and RyoArcRadar reads `name()`, `symbol()`, `decimals()`, and `totalSupply()` directly from the Arc RPC.

The scanner results are labeled **LIVE ON-CHAIN DATA**. Other dashboard cards and activity sections still use clearly labeled **MOCK DATA**.

## Run it on your computer

1. Install [Node.js](https://nodejs.org/) (version 18 or newer).
2. Install packages:

```bash
npm install
```

3. Create a local environment file:

```bash
cp .env.example .env.local
```

4. Set the Arc Testnet RPC URL in `.env.local`:

```env
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.io
```

Never commit `.env.local`. This phase does not need a private key or seed phrase.

5. Start the app:

```bash
npm run dev
```

Then open http://localhost:3000.

## Token scanner API

Example request:

```text
GET http://localhost:3000/api/tokens/0xYourTokenContractAddress
```

Successful response:

```json
{
  "success": true,
  "network": "Arc Testnet",
  "chainId": "5042002",
  "address": "0xYourTokenContractAddress",
  "token": {
    "name": "Example Token",
    "symbol": "EXT",
    "decimals": 18,
    "totalSupply": "1000000000000000000000000"
  }
}
```

The scanner supports only these minimal ERC-20 read methods:

- `name()`
- `symbol()`
- `decimals()`
- `totalSupply()`

Invalid addresses return HTTP `400`. A contract that does not implement the expected methods returns HTTP `422`. An unavailable RPC returns HTTP `503`. Error responses are intentionally human-readable and do not expose server stack traces.

## Arc status API

```text
GET http://localhost:3000/api/arc/status
```

This returns the latest Arc block number and connection status.

## What the files do

- `app/page.tsx` — main Radar dashboard.
- `components/SearchBar.tsx` — token address input, API request, loading state, and scan result.
- `components/NetworkStatus.tsx` — live Arc connection indicator.
- `app/api/tokens/[address]/route.ts` — validates addresses and serves token metadata.
- `lib/token-client.ts` — minimal server-side ERC-20 reads.
- `lib/arc.ts` — Arc Testnet chain configuration.
- `lib/arc-client.ts` — server-side read-only viem client.
- `lib/mock-data.ts` — dashboard sample data, not real blockchain data.
- `types/` — TypeScript data types.

## Read-only safety notes

All blockchain calls in this phase are read-only. There are no private keys, wallet connections, signing operations, transaction sends, or write contract calls. `totalSupply` stays a string in API JSON so large integer values are not rounded by JavaScript.

To create a production build, use `npm run build`, then `npm start`.

## What we will build next

1. Add more safe, public on-chain token data.
2. Add Rug Check analysis.
3. Add whale and wallet tracking.
4. Add alerts.
5. Consider X/Twitter automation with secure server-side credentials only if needed.
