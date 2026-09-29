import type { Metadata } from "next";
import { PublicCandidateProfile } from "../public-candidate-profile";

export const metadata: Metadata = {
  title: "Neil Lyons | Public-source profile | Anmore Votes 2026",
  description: "Staging-only direct excerpts from public information about Neil Lyons, compiled from Facebook and other public sources.",
  alternates: { canonical: "https://anmore.me/Neil/" },
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Neil Lyons | Public-source profile | Anmore Votes 2026",
    description: "Direct public-source excerpts with article links; not candidate-supplied or candidate-approved.",
    url: "https://anmore.me/Neil/",
    images: ["https://anmore.me/og.png"],
  },
};

export default function NeilPage() {
  return <PublicCandidateProfile candidateName="Neil Lyons" />;
}
