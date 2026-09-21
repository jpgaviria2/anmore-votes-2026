import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Online submissions are closed. Email election@anmore.me." },
    { status: 410 },
  );
}
