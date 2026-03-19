import { Header } from "@/components/Header";
import { BlogList } from "@/components/BlogList";
import { getAllBlogs, getAllCategories } from "@/lib/getBlogs";

// Homepage - displays blog listing with search and category filtering

export default async function HomePage() {
  const [blogs, categories] = await Promise.all([
    getAllBlogs(),
    getAllCategories(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Explore Ideas & Insights
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Discover articles about technology, design, development, and productivity. 
            Written by developers, for developers.
          </p>
        </section>

        {/* Blog List with Search & Filter */}
        <BlogList blogs={blogs} categories={categories} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              DevBlog - Built with Next.js and Sanity CMS
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">
                Twitter
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                GitHub
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                RSS
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
