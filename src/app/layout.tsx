import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import { VenomHeader } from "@/components/VenomHeader";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { EmpireFooterBar } from "@/lib/mohn-empire/components/EmpireFooterBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mohnsters.com"),
  title: {
    default: "MohnSters — Scan Cards. Hatch Creatures. Battle & Earn $MOHN",
    template: "%s | MohnSters",
  },
  description:
    "Scan physical trading cards to generate unique AI-powered MohnSter creatures. Battle, trade, vault your cards, and earn $MOHN tokens. The ultimate collectible game for adults and kids.",
  keywords: [
    "MohnSters",
    "collectibles",
    "trading cards",
    "digital creatures",
    "card scanner",
    "MOHN token",
    "gamified collectibles",
    "card battle game",
    "card vault",
    "MohnMint",
  ],
  openGraph: {
    title: "MohnSters — Scan Cards. Hatch Creatures. Battle & Earn $MOHN",
    description:
      "The ultimate digital collectible ecosystem. Scan physical cards, hatch AI creatures, battle for $MOHN rewards, and vault cards as appreciating assets.",
    url: "https://www.mohnsters.com",
    siteName: "MohnSters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MohnSters — The Ultimate Collectible Game",
    description: "Scan cards. Hatch MohnSters. Battle friends. Earn $MOHN.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${rajdhani.variable}`}>
      <body className="bg-[#050507] text-zinc-100 antialiased font-sans">
        <Providers>
        <VenomHeader />
        <main className="pt-16">{children}</main>
        <Footer />
        <EmpireFooterBar currentPlatform="mohnsters" />
        </Providers>
      </body>
    </html>
  );
}
