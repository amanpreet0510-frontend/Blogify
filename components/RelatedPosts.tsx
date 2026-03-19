import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/types";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="mb-8 text-2xl font-bold tracking-tight">Related Articles</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`}>
            <Card className="group h-full border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <CardContent className="p-5">
                <h3 className="mb-2 line-clamp-2 font-semibold transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-1 text-sm font-medium text-primary">
                  <span>Read more</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
