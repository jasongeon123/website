import type { Metadata } from "next";
import { Poppins, Ubuntu } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://geonyoo.com"),
  title: "Geon Yoo | Software Engineer Portfolio",
  description:
    "Software Engineer portfolio showcasing projects, experience, and skills in full-stack development, machine learning, and more.",
  icons: { icon: "/favicon.svg" },
  manifest: "/manifest.json",
  other: { "theme-color": "#556DC8" },
  keywords: [
    "software engineer", "full stack developer", "machine learning",
    "React", "Next.js", "TypeScript", "Python", "TensorFlow",
    "portfolio", "Geon Yoo", "UCSD",
  ],
  authors: [{ name: "Geon Yoo" }],
  robots: "index, follow",
  openGraph: {
    title: "Geon Yoo | Software Engineer Portfolio",
    description: "Full-stack developer & ML engineer. UCSD grad building software for 100K+ users at UPS.",
    url: "https://geonyoo.com",
    siteName: "Geon Yoo Portfolio",
    images: [{ url: "/images/headshots.jpg", width: 800, height: 800, alt: "Geon Yoo" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geon Yoo | Software Engineer Portfolio",
    description: "Full-stack developer & ML engineer. UCSD grad building software for 100K+ users at UPS.",
    images: ["/images/headshots.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${poppins.variable} ${ubuntu.variable} antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
