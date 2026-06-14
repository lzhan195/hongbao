export type HongbaoPacket = {
  packetId: string;
  creatorEns: string;
  chain: string;
  depositAddress: string;
  totalValue: number;
  claimCount: number;
  remainingClaims: number;
  perClaimAmount: number;
  worldGate: string;
  funded: boolean;
  claims: Array<{
    claimerEns: string;
    worldIdNullifier: string;
    txHash: string;
    ensRecordTxHash: string;
    claimedAt: string;
  }>;
};

const packetStore = new Map<string, HongbaoPacket>();

function seedPacket(packet: HongbaoPacket) {
  packetStore.set(packet.packetId, packet);
}

seedPacket({
  packetId: "hb_7f3a",
  creatorEns: "sakura.eth",
  chain: "Arc testnet",
  depositAddress: "0x000000000000000000000000000000000000aRc",
  totalValue: 15,
  claimCount: 3,
  remainingClaims: 3,
  perClaimAmount: 5,
  worldGate: "World ID required",
  funded: true,
  claims: [],
});

seedPacket({
  packetId: "hb_91cd",
  creatorEns: "mizu.eth",
  chain: "Arc testnet",
  depositAddress: "0x000000000000000000000000000000000000aRc",
  totalValue: 40,
  claimCount: 8,
  remainingClaims: 8,
  perClaimAmount: 5,
  worldGate: "World ID required",
  funded: true,
  claims: [],
});

export function createPacket(input: {
  creatorEns: string;
  totalValue: number;
  claimCount: number;
  chain: string;
}) {
  const packetId = `hb_${Math.random().toString(36).slice(2, 6)}`;
  const packet: HongbaoPacket = {
    packetId,
    creatorEns: input.creatorEns,
    chain: input.chain,
    depositAddress: "0x000000000000000000000000000000000000aRc",
    totalValue: input.totalValue,
    claimCount: input.claimCount,
    remainingClaims: input.claimCount,
    perClaimAmount: Number((input.totalValue / input.claimCount).toFixed(2)),
    worldGate: "World ID required",
    funded: false,
    claims: [],
  };

  packetStore.set(packetId, packet);
  return packet;
}

export function getPacket(packetId: string) {
  return packetStore.get(packetId);
}

export function markPacketFunded(packetId: string) {
  const packet = packetStore.get(packetId);
  if (!packet) return undefined;
  packet.funded = true;
  packetStore.set(packetId, packet);
  return packet;
}

export function claimPacket(input: {
  packetId: string;
  claimerEns: string;
  worldIdNullifier: string;
}) {
  const packet = packetStore.get(input.packetId);
  if (!packet) return { error: "Packet not found" as const };
  if (!packet.funded) return { error: "Packet is not funded yet" as const };
  if (packet.remainingClaims <= 0) return { error: "No claims remaining" as const };
  if (packet.claims.some((claim) => claim.worldIdNullifier === input.worldIdNullifier)) {
    return { error: "World ID already used" as const };
  }

  const txHash = `0x${Math.random().toString(16).slice(2).padEnd(64, "0")}`;
  const ensRecordTxHash = `0x${Math.random().toString(16).slice(2).padEnd(64, "0")}`;
  packet.remainingClaims -= 1;
  const record = {
    claimerEns: input.claimerEns,
    worldIdNullifier: input.worldIdNullifier,
    txHash,
    ensRecordTxHash,
    claimedAt: new Date().toISOString(),
  };
  packet.claims.push(record);
  packetStore.set(packet.packetId, packet);
  return { packet, record };
}
