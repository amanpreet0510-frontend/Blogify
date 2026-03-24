import { Header } from "@/components/layout/Header";
import { BlogList } from "@/components/blog/BlogList";
import { getAllBlogs, getAllCategories } from "@/lib/getBlogs";
import HeroSection from "@/components/sections/HeroSection";
import BrandsWrapper from "@/components/sections/BrandsWrapper";
import Footer from "@/components/layout/Footer";
import SocialWrapper from "@/components/sections/SocialWrapper";


// Homepage - displays blog listing with search and category filtering

export default async function HomePage() {
  const [blogs, categories] = await Promise.all([
    getAllBlogs(),
    getAllCategories(),
  ]);

  return (
    <div className="min-h-screen">
      <main className="mx-auto  px-4 py-12 sm:px-6">
        {/* Hero Section */}
        <HeroSection blogs={blogs} />
        <BrandsWrapper />
        {/* Blog List with Search & Filter */}
        <BlogList blogs={blogs} categories={categories} />
        
         <SocialWrapper/>
      </main>
    </div>
  );
}
