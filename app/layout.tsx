import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getHeader } from "@/lib/getBlogs";
import { getFooter } from "@/lib/getBlogs";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'DevBlog - Explore Ideas & Insights',
  description: 'Discover articles about technology, design, development, and productivity. Written by developers, for developers.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const header = await getHeader();
  const footer = await getFooter();
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {/* <Header data={header} /> */}
        {children}
        <Analytics />
        {/* <Footer data={footer} /> */}
      </body>
    </html>
  )
}
