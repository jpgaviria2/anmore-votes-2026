import type { Metadata } from "next";
import { PublicCandidateProfile } from "../public-candidate-profile";

export const metadata: Metadata = {
  title: "Harriette Chang | Public-source profile | Anmore Votes 2026",
  description: "Public Facebook profile information for Harriette Chang. Not candidate-supplied to Anmore Votes.",
  alternates: { canonical: "https://anmore.me/Harriette/" },
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Harriette Chang | Public-source profile | Anmore Votes 2026",
    description: "Public Facebook post embedded or linked; not candidate-supplied or candidate-approved.",
    url: "https://anmore.me/Harriette/",
    images: ["https://anmore.me/og.png"],
  },
};

export default function HarriettePage() {
  return <PublicCandidateProfile candidateName="Harriette Chang" />;
}
