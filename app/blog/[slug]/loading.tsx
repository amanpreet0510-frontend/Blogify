import { Header } from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Back Button Skeleton */}
        <Skeleton className="mb-8 h-10 w-40" />

        {/* Article Header Skeleton */}
        <header className="mb-8">
          {/* Categories */}
          <div className="mb-4 flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>

          {/* Title */}
          <Skeleton className="mb-4 h-12 w-full" />
          <Skeleton className="mb-4 h-12 w-3/4" />

          {/* Excerpt */}
          <Skeleton className="mb-6 h-6 w-full" />
          <Skeleton className="mb-6 h-6 w-2/3" />

          {/* Meta Info */}
          <div className="flex gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
        </header>

        {/* Featured Image Skeleton */}
        <Skeleton className="mb-10 aspect-video w-full rounded-xl" />

        {/* Content Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="mt-8 h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="mt-8 h-8 w-2/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </main>
    </div>
  );
}
