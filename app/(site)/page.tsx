import { BlogList } from "@/components/blog/BlogList";
import {
  getAllBlogs,
  getAllCategories,
  getPage,
  getHeader,
} from "@/lib/getBlogs";
import HeroSection from "@/components/sections/HeroSection";
import Brands from "@/components/sections/Brands";
import type { Header } from "@/lib/types";

// Enable ISR for the home page
export const revalidate = 3600;

/** Second hero button reuses another CMS nav link when it differs from the primary CTA. */
function pickHeroSecondary(header: Header | null) {
  if (!header?.navigation?.length) return null;
  const ctaLink = header.cta?.link;
  const differentLink = header.navigation.find(
    (n) => n.link && ctaLink && n.link !== ctaLink
  );
  if (differentLink) {
    return { label: differentLink.label, link: differentLink.link };
  }
  if (header.navigation.length > 1) {
    const second = header.navigation[1];
    if (second.link && second.link !== ctaLink) {
      return { label: second.label, link: second.link };
    }
  }
  const differentLabel = header.navigation.find(
    (n) => n.label !== header.cta?.label && n.link && n.link !== ctaLink
  );
  if (differentLabel?.link) {
    return { label: differentLabel.label, link: differentLabel.link };
  }
  return null;
}

// Homepage - displays blog listing with search and category filtering
export default async function HomePage() {
  const [blogs, categories, pageData, header] = await Promise.all([
    getAllBlogs(),
    getAllCategories(),
    getPage(),
    getHeader(),
  ]);

  const heroSecondary = pickHeroSecondary(header);
  const heroCta = header?.cta
    ? { label: header.cta.label, link: header.cta.link }
    : null;

  return (
    <div className="">
      <main className="">
        {/* Dynamic Sections from Sanity */}
        {pageData?.sections?.map((section, index) => {
          switch (section._type) {
            case "heroSection":
              return (
                <HeroSection
                  key={index}
                  herosection={section}
                  heroCta={heroCta}
                  heroSecondary={heroSecondary}
                />
              );
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
