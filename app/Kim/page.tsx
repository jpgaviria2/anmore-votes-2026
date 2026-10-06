import type { Metadata } from "next";
import { PublicCandidateProfile } from "../public-candidate-profile";

export const metadata: Metadata = {
  title: "Kim Trowbridge | Public-source profile | Anmore Votes 2026",
  description: "Public Facebook profile information for Kim Trowbridge. Not candidate-supplied to Anmore Votes.",
  alternates: { canonical: "https://anmore.me/Kim/" },
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Kim Trowbridge | Public-source profile | Anmore Votes 2026",
    description: "Public Facebook post embedded or linked; not candidate-supplied or candidate-approved.",
    url: "https://anmore.me/Kim/",
    images: ["https://anmore.me/og.png"],
  },
};

export default function KimPage() {
  return <PublicCandidateProfile candidateName="Kim Trowbridge" />;
}
