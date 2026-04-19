import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SocialWrapper from '@/components/sections/SocialWrapper';
import { Analytics } from '@vercel/analytics/next';
import { getHeader } from "@/lib/getBlogs";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const header = await getHeader();

  return (
    <>
      <Header header={header} />
      <main className="relative min-h-[50vh] pt-16">
        {children}
      </main>
      <SocialWrapper />
      <Footer />
      <Analytics />
    </>
  );
}
