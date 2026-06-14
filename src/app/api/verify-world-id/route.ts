import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const action = typeof body.action === "string" ? body.action : "claim";
  const worldIdNullifier = typeof body.worldIdNullifier === "string" ? body.worldIdNullifier : "demo-nullifier";

  return NextResponse.json({
    success: true,
    action,
    nullifier: worldIdNullifier,
    isHuman: true,
  });
}
