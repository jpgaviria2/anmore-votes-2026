import type { Metadata } from "next";
import { PublicCandidateProfile } from "../public-candidate-profile";

export const metadata: Metadata = {
  title: "Neil Lyons | Public-source profile | Anmore Votes 2026",
  description: "Public Facebook profile information for Neil Lyons. Not candidate-supplied to Anmore Votes.",
  alternates: { canonical: "https://anmore.me/Neil/" },
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Neil Lyons | Public-source profile | Anmore Votes 2026",
    description: "Public Facebook post embedded or linked; not candidate-supplied or candidate-approved.",
    url: "https://anmore.me/Neil/",
    images: ["https://anmore.me/og.png"],
  },
};

export default function NeilPage() {
  return <PublicCandidateProfile candidateName="Neil Lyons" />;
}
