import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  Bebas_Neue,
  Barlow,
  Barlow_Condensed,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-SMMXVJGLNE";

/** Tall display / poster style — common on Wix “Epic” gaming landing heroes */
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

/** Condensed UI (nav, buttons, card titles) */
const barlowCondensed = Barlow_Condensed({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

/** Body copy */
const barlow = Barlow({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevBlog - Explore Ideas & Insights",
  description:
    "Discover articles about technology, design, development, and productivity. Written by developers, for developers.",
  generator: "v0.app",
  verification: {
    google: "yv2PNJogAqp492Xyyz2c6QXpI_EveYjBCF0JVuMrq04",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
        className={`${bebasNeue.variable} ${barlowCondensed.variable} ${barlow.variable} ${geistMono.variable} font-sans antialiased text-foreground bg-background`}
      >
        {children}
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
