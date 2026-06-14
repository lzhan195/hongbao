import { NextRequest, NextResponse } from "next/server";
import { getPacket } from "@/lib/hongbao-store";

export async function GET(request: NextRequest) {
  const packetId = request.nextUrl.searchParams.get("packetId");
  const packet = packetId ? getPacket(packetId) : undefined;

  return NextResponse.json({
    packetId,
    funded: Boolean(packet?.funded),
    settlementRail: "Circle Gateway on Arc",
    depositAddress: packet?.depositAddress ?? null,
  });
}
