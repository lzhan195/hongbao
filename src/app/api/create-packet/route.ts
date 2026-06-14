import { NextRequest, NextResponse } from "next/server";
import { createPacket } from "@/lib/hongbao-store";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const creatorEns = typeof body.creatorEns === "string" ? body.creatorEns : "sakura.eth";
  const totalValue = typeof body.totalValue === "number" ? body.totalValue : 10;
  const claimCount = typeof body.claimCount === "number" ? body.claimCount : 5;
  const chain = typeof body.chain === "string" ? body.chain : "Arc testnet";

  const packet = createPacket({ creatorEns, totalValue, claimCount, chain });

  return NextResponse.json(packet);
}
