import type { Metadata } from "next";
import { PublicCandidateProfile } from "../public-candidate-profile";

export const metadata: Metadata = {
  title: "Georgia Lyons | Public-source profile | Anmore Votes 2026",
  description: "Public Facebook profile information for Georgia Lyons. Not candidate-supplied to Anmore Votes.",
  alternates: { canonical: "https://anmore.me/Georgia/" },
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Georgia Lyons | Public-source profile | Anmore Votes 2026",
    description: "Public Facebook post embedded or linked; not candidate-supplied or candidate-approved.",
    url: "https://anmore.me/Georgia/",
    images: ["https://anmore.me/og.png"],
  },
};

export default function GeorgiaPage() {
  return <PublicCandidateProfile candidateName="Georgia Lyons" />;
}
