import { NextResponse } from "next/server";
import { getDb } from "../../../db";
import { candidateSubmissions } from "../../../db/schema";
import { candidates } from "../../data";

export async function POST(request: Request) {
  try {
    const data = await request.json() as Record<string, string>;
    const candidateName = String(data.candidateName || "").trim();
    const email = String(data.verificationEmail || "").trim();
    const biography = String(data.biography || "").trim();

    if (
      data.website_confirm ||
      data.consent !== "yes" ||
      !candidates.some((candidate) => candidate.name === candidateName) ||
      biography.length < 40 ||
      biography.length > 1500 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const answers = Array.from({ length: 12 }, (_, index) => String(data[`answer${index + 1}`] || "").trim().slice(0, 2500));
    await getDb().insert(candidateSubmissions).values({
      candidateName,
      verificationEmail: email.slice(0, 200),
      phone: String(data.phone || "").trim().slice(0, 60) || null,
      biography,
      occupation: String(data.occupation || "").trim().slice(0, 200) || null,
      communityService: String(data.communityService || "").trim().slice(0, 1600) || null,
      website: String(data.website || "").trim().slice(0, 500) || null,
      linkedIn: String(data.linkedIn || "").trim().slice(0, 500) || null,
      portraitUrl: String(data.portraitUrl || "").trim().slice(0, 500) || null,
      answers,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to save candidate information" }, { status: 500 });
  }
}
