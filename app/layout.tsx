import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
// import "easymde/dist/easymde.min.css";

export const metadata: Metadata = {
  title: "YC Directory",
  description: "Pitch, Vote and Grow",
};

// Load Work Sans font
const workSans = Work_Sans({
  subsets: ["latin"],
  style: "normal",
  variable: "--font-work-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className}>{children}</body>
    </html>
  );
}