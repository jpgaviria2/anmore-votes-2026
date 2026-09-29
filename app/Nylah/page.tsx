import type { Metadata } from "next";
import { PublicCandidateProfile } from "../public-candidate-profile";

export const metadata: Metadata = {
  title: "Nylah Froese | Public-source profile | Anmore Votes 2026",
  description: "Staging-only direct excerpts from public information about Nylah Froese, compiled from Facebook and other public sources.",
  alternates: { canonical: "https://anmore.me/Nylah/" },
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Nylah Froese | Public-source profile | Anmore Votes 2026",
    description: "Direct public-source excerpts with article links; not candidate-supplied or candidate-approved.",
    url: "https://anmore.me/Nylah/",
    images: ["https://anmore.me/og.png"],
  },
};

export default function NylahPage() {
  return <PublicCandidateProfile candidateName="Nylah Froese" />;
}
