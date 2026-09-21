import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anmore.me"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  title: "Anmore Votes 2026 | A neutral community voter guide",
  description:
    "A neutral, community-run guide to Anmore's 2026 local election, with voluntary candidate biographies and answers.",
  openGraph: {
    title: "Anmore Votes 2026",
    description: "Know your ballot. Hear directly from every candidate who chooses to respond.",
    url: "https://anmore.me",
    siteName: "Anmore Votes 2026",
    locale: "en_CA",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Anmore Votes 2026 — Know your ballot. Hear from candidates." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anmore Votes 2026",
    description: "A neutral community voter guide for Anmore's 2026 local election.",
    images: ["/og.png"],
  },
  themeColor: "#173f31",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
