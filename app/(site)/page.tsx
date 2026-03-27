import { BlogList } from "@/components/blog/BlogList";
import { getAllBlogs, getAllCategories, getPage } from "@/lib/getBlogs";
import HeroSection from "@/components/sections/HeroSection";
import Brands from "@/components/sections/Brands";
import Social from "@/components/sections/Social";

// Homepage - displays blog listing with search and category filtering
export default async function HomePage() {
  const [blogs, categories, pageData] = await Promise.all([
    getAllBlogs(),
    getAllCategories(),
    getPage(),
  ]);

  return (
    <div className="">
      <main className="">
        
        {/* Dynamic Sections from Sanity */}
        {pageData?.sections?.map((section, index) => {
          switch (section._type) {
            case "heroSection":
              return <HeroSection key={index} herosection={section} />;
            case "brands":
              return <Brands key={index} brands={section} />;
            default:
              return null;
          }
        })}

        {/* Blog List with Search & Filter */}
        <BlogList blogs={blogs} categories={categories} showSearch={blogs[0]?.showSearch} />
      </main>
    </div>
  );
}
