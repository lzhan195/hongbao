import { NextResponse } from "next/server";
import { getDemoPackets } from "@/lib/hongbao-data";

export async function GET() {
  const packets = getDemoPackets();
  return NextResponse.json(packets);
}
