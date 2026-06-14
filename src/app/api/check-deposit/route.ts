import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const packetId = request.nextUrl.searchParams.get("packetId");

  return NextResponse.json({
    packetId,
    funded: Boolean(packetId),
    settlementRail: "Circle Gateway on Arc",
  });
}
