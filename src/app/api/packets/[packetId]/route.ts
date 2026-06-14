import { NextRequest, NextResponse } from "next/server";
import { getPacket } from "@/lib/hongbao-store";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ packetId: string }> }) {
  const { packetId } = await params;
  const packet = getPacket(packetId);

  if (!packet) {
    return NextResponse.json({ error: "Packet not found" }, { status: 404 });
  }

  return NextResponse.json(packet);
}
