import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    txHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    ensRecordTxHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  });
}
