import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const creatorEns = typeof body.creatorEns === "string" ? body.creatorEns : "sakura.eth";
  const totalValue = typeof body.totalValue === "number" ? body.totalValue : 10;
  const claimCount = typeof body.claimCount === "number" ? body.claimCount : 5;
  const chain = typeof body.chain === "string" ? body.chain : "Arc testnet";

  return NextResponse.json({
    packetId: `hb_${Math.random().toString(36).slice(2, 6)}`,
    creatorEns,
    chain,
    depositAddress: "0x000000000000000000000000000000000000aRc",
    totalValue,
    claimCount,
    perClaimAmount: Number((totalValue / claimCount).toFixed(2)),
    worldGate: "World ID required",
  });
}
