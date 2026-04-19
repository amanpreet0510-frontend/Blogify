import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { urlFor } from "@/lib/sanityClient";

interface BlogCardProps {
  blog: BlogPost;
  height?: number;
  width?: number;
}

export function BlogCard({ blog }: BlogCardProps) {
  const formattedDate = new Date(blog.publishedAt)?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

 

  return (
    <Link href={`/blog/${blog.slug.current}`}>
      <Card className="group h-full overflow-hidden border border-white/10 bg-card/70 backdrop-blur-md transition-all duration-500 hover:border-primary/35 hover:shadow-[0_0_40px_-12px_var(--epic-glow)]">
        {/* Featured Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
          {blog.featuredImage ? (
            <Image
              src={urlFor(blog.featuredImage) || ""}
              alt={blog.featuredImage.alt || blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-muted">
              <span className="text-4xl font-bold text-muted-foreground/30">
                {blog.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <CardContent className="p-5">
          {/* Categories */}
          {blog.categories && blog.categories.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {blog.categories.slice(0, 2).map((category) => (
                <Badge
                  key={category._id}
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {category.title}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="font-condensed mb-2 line-clamp-2 text-xl font-bold leading-snug tracking-wide text-foreground transition-colors group-hover:text-primary">
            {blog.title}
          </h2>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {blog.excerpt}
            </p>
          )}
        </CardContent>

        <CardFooter className="border-t border-border/50 px-5 py-4">
          <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
