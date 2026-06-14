import { NextRequest, NextResponse } from "next/server";
import { markPacketFunded } from "@/lib/hongbao-store";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const packetId = typeof body.packetId === "string" ? body.packetId : null;

  if (!packetId) {
    return NextResponse.json({ success: false, error: "packetId is required" }, { status: 400 });
  }

  const packet = markPacketFunded(packetId);
  if (!packet) {
    return NextResponse.json({ success: false, error: "Packet not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    packetId,
    funded: packet.funded,
    depositAddress: packet.depositAddress,
    settlementRail: "Circle Gateway on Arc",
  });
}
