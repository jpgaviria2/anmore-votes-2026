import type { Metadata } from "next";
import { PublicCandidateProfile } from "../public-candidate-profile";

export const metadata: Metadata = {
  title: "Carl Schmidt | Public-source profile | Anmore Votes 2026",
  description: "Staging-only display of the complete Google Drive research document for Carl Schmidt, compiled from Facebook and other public sources.",
  alternates: { canonical: "https://anmore.me/Carl/" },
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Carl Schmidt | Public-source profile | Anmore Votes 2026",
    description: "Complete Google Drive research document embedded; not candidate-supplied or candidate-approved.",
    url: "https://anmore.me/Carl/",
    images: ["https://anmore.me/og.png"],
  },
};

export default function CarlPage() {
  return <PublicCandidateProfile candidateName="Carl Schmidt" />;
}
