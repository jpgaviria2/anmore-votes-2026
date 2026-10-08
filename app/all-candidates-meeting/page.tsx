import type { Metadata } from "next";
import { AllCandidatesMeetingTranscript } from "./transcript-page";

export const metadata: Metadata = {
  title: "All Candidates Meeting transcript | Anmore Votes 2026",
  description: "Verbatim opening statements, audience questions and answers, and closing remarks from the October 6, 2026 Anmore Village All Candidates Meeting.",
  alternates: { canonical: "https://anmore.me/all-candidates-meeting/" },
  openGraph: {
    title: "All Candidates Meeting transcript | Anmore Votes 2026",
    description: "Opening statements, thirteen audience questions and answers, and closing remarks from the October 6, 2026 meeting.",
    url: "https://anmore.me/all-candidates-meeting/",
    type: "article",
  },
};

export default function AllCandidatesMeetingPage() {
  return <AllCandidatesMeetingTranscript />;
}
