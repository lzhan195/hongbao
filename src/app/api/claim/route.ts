import { NextRequest, NextResponse } from "next/server";
import { claimPacket } from "@/lib/hongbao-store";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const packetId = typeof body.packetId === "string" ? body.packetId : "hb_demo_packet";
  const claimerEns = typeof body.claimerEns === "string" ? body.claimerEns : "lina.eth";
  const worldIdNullifier = typeof body.worldIdNullifier === "string" ? body.worldIdNullifier : "demo-nullifier";

  const result = claimPacket({ packetId, claimerEns, worldIdNullifier });
  if ("error" in result) {
    return NextResponse.json({ success: false, error: result.error }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    packetId,
    claimerEns,
    txHash: result.record.txHash,
    ensRecordTxHash: result.record.ensRecordTxHash,
    worldIdNullifier,
    settlementRail: "Arc",
    remainingClaims: result.packet.remainingClaims,
  });
}
