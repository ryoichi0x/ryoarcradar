# RyoArcRadar

RyoArcRadar is a dark trading dashboard for the Arc blockchain. It will help traders discover tokens, check risk, follow whales, and understand wallet activity.

## Version 0.1

This first version is only the **dashboard foundation**. It includes a responsive UI, reusable React components, navigation, and clearly marked mock data. It is not connected to live blockchain data yet.

## Run it on your computer

1. Install [Node.js](https://nodejs.org/) (version 18 or newer).
2. Open a terminal in this project folder.
3. Install the packages:

```bash
npm install
```

4. Start the development website:

```bash
npm run dev
```

5. Open http://localhost:3000 in your browser.

To create a production build, use `npm run build`, then `npm start`.

## What the files do

- `app/page.tsx` — the main Radar dashboard screen.
- `app/layout.tsx` — shared page layout and metadata.
- `app/globals.css` — global colors and Tailwind styles.
- `app/tokens`, `app/rug-check`, `app/whales`, `app/wallet` — starter pages for navigation.
- `components/` — small reusable UI parts such as the sidebar, header, cards, and activity lists.
- `lib/mock-data.ts` — sample data used by the dashboard. This is not real blockchain data.
- `types/` — TypeScript shapes that describe our data.
- `package.json` — project packages and commands.

## Safety notes

No private keys or API secrets are used in this version. When we connect Arc, secrets must stay in server-side environment variables (for example, `.env.local`, which should never be committed). `viem` is included and ready for the future blockchain integration.

## What we will build next

1. Confirm the Arc network configuration and connect a read-only `viem` client.
2. Replace the mock dashboard values with safe, public blockchain data.
3. Make the token contract search work.
4. Add token analytics and Rug Check results.
5. Add whale and wallet tracking, then alerts.
