# Hongbao architecture

```text
Creator UI
  └─> POST /api/create-packet
         └─> in-memory packet store
               ├─> packet record with ENS identity
               ├─> deposit address for Arc funding
               └─> claim state and claim history

Funding UI
  └─> GET /api/check-deposit?packetId=...
         └─> marks packet funded in the store

Claim UI
  ├─> GET /api/packets/[packetId]
  ├─> POST /api/verify-world-id
  └─> POST /api/claim
         ├─> validates World ID nullifier
         ├─> checks funding and remaining claims
         ├─> stores receipt data
         └─> updates remaining claims

Display layer
  └─> dashboard and claim page render live packet state
```

## Integration intent

- ENS is the identity layer for creators and claimers.
- World ID is the anti-sybil gate for claims.
- Arc is the settlement rail for the funded packet and claim receipts.

## Demo sequence

1. Create a packet from the dashboard.
2. Watch the packet appear in the active list.
3. Mark the packet as funded.
4. Open the claim page.
5. Verify World ID and submit the claim.
6. Observe the receipt and remaining claim count update.
