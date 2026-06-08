import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Web3Provider } from "@/components/providers/Web3Provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title:       { default: "Web3 Platform", template: "%s | Web3 Platform" },
  description: "Enterprise-grade DeFi, NFT, and DAO platform powered by Ethereum.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://web3platform.xyz"),
  openGraph: {
    type:        "website",
    locale:      "en_US",
    siteName:    "Web3 Platform",
    title:       "Web3 Platform — DeFi · NFTs · DAO",
    description: "Enterprise-grade DeFi, NFT, and DAO platform powered by Ethereum.",
  },
  twitter: {
    card:    "summary_large_image",
    creator: "@web3platform",
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#0f1117" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
