import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SocialWrapper from '@/components/sections/SocialWrapper';
import { Analytics } from '@vercel/analytics/next';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <SocialWrapper />
      <Footer />
      <Analytics />
    </>
  );
}
