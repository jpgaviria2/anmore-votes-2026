import type { Metadata } from "next";
import { AllCandidatesMeetingTranscript } from "./transcript-page";

export const metadata: Metadata = {
  title: "All Candidates Meeting transcript | Anmore Votes 2026",
  description: "Verbatim questions and candidate answers from the October 6, 2026 Anmore Village All Candidates Meeting.",
  alternates: { canonical: "https://anmore.me/all-candidates-meeting/" },
  openGraph: {
    title: "All Candidates Meeting transcript | Anmore Votes 2026",
    description: "Thirteen audience questions and candidate answers from the October 6, 2026 meeting.",
    url: "https://anmore.me/all-candidates-meeting/",
    type: "article",
  },
};

export default function AllCandidatesMeetingPage() {
  return <AllCandidatesMeetingTranscript />;
}
