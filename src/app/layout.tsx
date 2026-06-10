import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../prepzy-kit/styles/tokens.css";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
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
    <html lang="en" className={poppins.variable}>
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
