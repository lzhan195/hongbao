import { NextResponse } from "next/server";
import { getAllPackets } from "@/lib/hongbao-store";

export async function GET() {
  return NextResponse.json(getAllPackets());
}
