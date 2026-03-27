"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { BlogCard } from "./BlogCard";
import type { BlogPost, Category } from "@/lib/types";

interface BlogListProps {
  blogs: BlogPost[];
  categories: Category[];
  showSearch?: boolean;
}

export function BlogList({ blogs, categories, showSearch = true }: BlogListProps) {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === null ||
        blog.categories?.some((cat) => cat.slug === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== null;

  return (
    <div className="container">
      {/* Search and Filter Section */}
      {showSearch !== false && <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-secondary/50 pl-10 placeholder:text-muted-foreground/60"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : ""
            }
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category._id}
              variant={selectedCategory === category.slug ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.slug)}
              className={
                selectedCategory === category.slug
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              {category.title}
            </Button>
          ))}
        </div>

        {/* Active Filters & Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredBlogs.length} of {blogs.length} articles
          </p>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="mr-1 h-3 w-3" />
              Clear filters
            </Button>
          )}
        </div>
      </div>}

      {/* Blog Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} height={100} width={100} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-full bg-secondary p-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">No articles found</h3>
          <p className="mb-4 text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
