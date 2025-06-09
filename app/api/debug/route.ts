import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("✅ Debug route HIT");

  return NextResponse.json({ message: "Hello from debug route" });
}
