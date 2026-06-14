# Hongbao

Hongbao is a hackathon demo for bot-proof, identity-aware red packet distribution.

## What it does

- Creates ENS-branded Hongbao packets
- Gates claims with World ID-style human verification
- Tracks packet funding and settlement on Arc-style flows
- Simulates claim receipts and ENS record updates

## Core flow

1. Creator enters an ENS name, packet size, and claim count.
2. The app generates a deposit address and packet record.
3. Funding is checked before claims are enabled.
4. A claimer submits an ENS name and World ID nullifier.
5. The claim settles and the UI shows receipt-style transaction data.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- World ID UI dependency (`@worldcoin/idkit`)
- Wallet tooling (`wagmi`, `viem`, `RainbowKit`) available for onchain extensions

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Notes

- The current demo uses an in-memory store for packet state.
- This keeps the hackathon build simple and fast to present.
- For production, the store should be replaced with persistent storage and real onchain settlement.
