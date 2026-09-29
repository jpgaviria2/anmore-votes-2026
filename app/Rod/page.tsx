import type { Metadata } from "next";
import { PublicCandidateProfile } from "../public-candidate-profile";

export const metadata: Metadata = {
  title: "Rod Rempel | Public-source profile | Anmore Votes 2026",
  description: "Staging-only display of the complete Google Drive research document for Rod Rempel, compiled from Facebook and other public sources.",
  alternates: { canonical: "https://anmore.me/Rod/" },
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Rod Rempel | Public-source profile | Anmore Votes 2026",
    description: "Complete Google Drive research document embedded; not candidate-supplied or candidate-approved.",
    url: "https://anmore.me/Rod/",
    images: ["https://anmore.me/og.png"],
  },
};

export default function RodPage() {
  return <PublicCandidateProfile candidateName="Rod Rempel" />;
}
