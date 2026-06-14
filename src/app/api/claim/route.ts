import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const packetId = typeof body.packetId === "string" ? body.packetId : "hb_demo_packet";
  const claimerEns = typeof body.claimerEns === "string" ? body.claimerEns : "lina.eth";

  return NextResponse.json({
    success: true,
    packetId,
    claimerEns,
    txHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    ensRecordTxHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    worldIdNullifier: "demo-nullifier",
    settlementRail: "Arc",
  });
}
