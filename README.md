# Hongbao

Hongbao is a premium web3 lucky-money experience for verified humans. Creators fund a packet, share a claim link, and claimers use World ID, ENS, and chain-abstracted USDC flows to redeem their share on testnets.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- RainbowKit, wagmi, viem
- World ID IDKit
- Circle Gateway testnet flows

## Getting started

1. Install dependencies
2. Copy `.env.example` to `.env.local`
3. Run the app with `npm run dev`

## Notes

- This starter includes the core home and claim experiences described in the PRD.
- API routes currently return stubbed responses and are ready to be wired to live gateway, ENS, and World ID services.
