import type { Metadata } from "next";
import { PaulProfile } from "./paul-profile";

export const metadata: Metadata = {
  title: "Paul Weverink | Anmore Votes 2026",
  description: "Candidate-supplied biography and questionnaire responses from Paul Weverink, candidate for Anmore Council.",
  alternates: { canonical: "https://anmore.me/Paul/" },
  openGraph: {
    title: "Paul Weverink | Anmore Votes 2026",
    description: "Candidate-supplied biography and questionnaire responses from Paul Weverink.",
    url: "https://anmore.me/Paul/",
    images: ["https://anmore.me/candidates/paul-weverink.jpg"],
  },
};

export default function PaulPage() {
  return <PaulProfile />;
}
