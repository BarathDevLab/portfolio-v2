import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CursorTrail from "@/components/ui/CursorTrail";
import Navbar from "@/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bharath G | Full-Stack Developer & Automation Enthusiast",
  description:
    "Portfolio of Bharath G - React, Next.js, Flutter developer specializing in scalable web & mobile applications, Firebase, and DevOps automation.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Flutter",
    "Firebase",
    "DevOps",
    "Portfolio",
  ],
  authors: [{ name: "Bharath G" }],
  openGraph: {
    title: "Bharath G | Full-Stack Developer",
    description: "Building scalable web & mobile applications",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-white selection:bg-blue-500/30`}
      >
        <SmoothScrollProvider>
          <CursorTrail />
          {children}
          <Navbar />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
