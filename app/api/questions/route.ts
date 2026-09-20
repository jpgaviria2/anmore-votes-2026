import { NextResponse } from "next/server";
import { getDb } from "../../../db";
import { communityQuestions } from "../../../db/schema";

export async function POST(request: Request) {
  try {
    const data = await request.json() as Record<string, string>;
    const question = String(data.question || "").trim();
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();

    if (data.website_confirm || data.consent !== "yes" || question.length < 12 || question.length > 600) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await getDb().insert(communityQuestions).values({
      question,
      name: name.slice(0, 100) || null,
      email: email.slice(0, 200) || null,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to save question" }, { status: 500 });
  }
}
