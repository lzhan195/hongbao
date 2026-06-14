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
