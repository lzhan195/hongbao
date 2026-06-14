import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    packetId: "hb_demo_packet",
    depositAddress: "0x0000000000000000000000000000000000000000",
    perClaimAmount: 0,
  });
}
