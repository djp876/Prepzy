import type { Metadata } from "next";
import { Poppins, Fraunces } from "next/font/google";
import "../prepzy-kit/styles/tokens.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

// Display serif for the "Warm Editorial" headline direction (v14 A/B).
// Tokenised via --font-fraunces so it can be swapped back to Poppins-only
// without touching components. font-display: swap keeps mobile LCP safe.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prepzy | Your Smart Learning Companion",
  description:
    "Video lessons, 24x7 doubt-solving and personalised practice with instant feedback for CBSE Classes 6-12 and NEET-UG, at an Indian price.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${fraunces.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
