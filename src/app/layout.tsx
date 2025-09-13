import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "Mr.JM Humanizer - Make AI Content 100% Undetectable",
  description: "Advanced AI content humanizer that bypasses GPTZero, Originality.AI, Turnitin, and all AI detection tools. Transform AI-generated text into undetectable human-like content.",
  keywords: "AI humanizer, undetectable AI content, bypass AI detection, GPTZero bypass, Originality.AI bypass, Turnitin bypass, AI content rewriter",
  authors: [{ name: "Mr.JM Team" }],
  openGraph: {
    title: "Mr.JM Humanizer - Make AI Content 100% Undetectable",
    description: "Advanced AI content humanizer that bypasses all AI detection tools. Transform AI-generated text into undetectable human-like content.",
    type: "website",
    url: "https://mrjm-humanizer.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr.JM Humanizer",
    description: "Make AI content 100% undetectable with advanced humanization algorithms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 font-inter antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}