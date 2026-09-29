import type { Metadata } from "next";
import { PublicCandidateProfile } from "../public-candidate-profile";

export const metadata: Metadata = {
  title: "Will Crocker | Public-source profile | Anmore Votes 2026",
  description: "Public Facebook profile information for Will Crocker. Not candidate-supplied to Anmore Votes.",
  alternates: { canonical: "https://anmore.me/Will/" },
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Will Crocker | Public-source profile | Anmore Votes 2026",
    description: "Public Facebook post embedded or linked; not candidate-supplied or candidate-approved.",
    url: "https://anmore.me/Will/",
    images: ["https://anmore.me/og.png"],
  },
};

export default function WillPage() {
  return <PublicCandidateProfile candidateName="Will Crocker" />;
}
