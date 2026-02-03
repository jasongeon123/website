import type { Metadata } from "next";
import { Poppins, Ubuntu } from "next/font/google";
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
  title: "Geon Yoo | Software Engineer Portfolio",
  description:
    "Software Engineer portfolio showcasing projects, experience, and skills in full-stack development, machine learning, and more.",
  icons: {
    icon: "/images/headshots.jpg",
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
      </body>
    </html>
  );
}
