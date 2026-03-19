import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { BlogContent } from "@/components/BlogContent";
import { RelatedPosts } from "@/components/RelatedPosts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, User, Clock } from "lucide-react";
import { getBlogBySlug, getAllBlogSlugs, getRelatedPosts } from "@/lib/getBlogs";
import { urlFor } from "@/lib/sanityClient";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | DevBlog`,
    description: blog.excerpt || `Read ${blog.title} on DevBlog`,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || `Read ${blog.title} on DevBlog`,
      type: "article",
      publishedTime: blog.publishedAt,
      authors: [blog.author],
    },
  };
}

// Calculate reading time
function calculateReadingTime(content: unknown[]): number {
  const wordsPerMinute = 200;
  let wordCount = 0;

  content.forEach((block: unknown) => {
    const typedBlock = block as { children?: { text?: string }[] };
    if (typedBlock.children) {
      typedBlock.children.forEach((child) => {
        if (child.text) {
          wordCount += child.text.split(/\s+/).length;
        }
      });
    }
  });

  return Math.ceil(wordCount / wordsPerMinute);
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const formattedDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readingTime = blog.content ? calculateReadingTime(blog.content) : 5;

  // Get related posts
  const categoryIds = blog.categories?.map((cat) => cat._id) || [];
  const relatedPosts = await getRelatedPosts(blog._id, categoryIds);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8 -ml-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          {/* Categories */}
          {blog.categories && blog.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {blog.categories.map((category) => (
                <Badge
                  key={category._id}
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {category.title}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="mb-6 text-pretty text-lg text-muted-foreground">
              {blog.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="relative mb-10 aspect-video overflow-hidden rounded-xl">
            <Image
              src={urlFor(blog.featuredImage).width(1200).height(675).url()}
              alt={blog.featuredImage.alt || blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose-container">
          {blog.content ? (
            <BlogContent content={blog.content} />
          ) : (
            <p className="text-muted-foreground">
              This article content is not available.
            </p>
          )}
        </div>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
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
