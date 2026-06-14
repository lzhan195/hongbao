import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const action = typeof body.action === "string" ? body.action : "claim";

  return NextResponse.json({
    success: true,
    action,
    nullifier: "demo-nullifier",
    isHuman: true,
  });
}
