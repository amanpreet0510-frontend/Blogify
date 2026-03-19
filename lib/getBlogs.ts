import { getSanityClient } from "./sanityClient";
import {
  allBlogsQuery,
  blogBySlugQuery,
  allBlogSlugsQuery,
  allCategoriesQuery,
  relatedPostsQuery,
} from "./queries";
import type { BlogPost, BlogPostFull, BlogSlug, Category } from "./types";
import fallbackBlogs from "@/data/blogs.json";

// Get all blogs with CMS fallback
export async function getAllBlogs(): Promise<BlogPost[]> {
  const client = getSanityClient();
  if (!client) {
    return fallbackBlogs.blogs as BlogPost[];
  }

  try {
    const blogs = await client.fetch<BlogPost[]>(allBlogsQuery);
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs from Sanity:", error);
    return fallbackBlogs.blogs as BlogPost[];
  }
}

// Get a single blog by slug with CMS fallback
export async function getBlogBySlug(
  slug: string
): Promise<BlogPostFull | null> {
  const client = getSanityClient();
  if (!client) {
    const blog = fallbackBlogs.blogs.find((b) => b.slug.current === slug);
    return blog ? (blog as unknown as BlogPostFull) : null;
  }

  try {
    const blog = await client.fetch<BlogPostFull>(blogBySlugQuery, {
      slug,
    });
    return blog;
  } catch (error) {
    console.error("Error fetching blog from Sanity:", error);
    const blog = fallbackBlogs.blogs.find((b) => b.slug.current === slug);
    return blog ? (blog as unknown as BlogPostFull) : null;
  }
}

// Get all blog slugs for static generation
export async function getAllBlogSlugs(): Promise<BlogSlug[]> {
  const client = getSanityClient();
  if (!client) {
    return fallbackBlogs.blogs.map((b) => ({ slug: b.slug.current }));
  }

  try {
    const slugs = await client.fetch<BlogSlug[]>(allBlogSlugsQuery);
    return slugs;
  } catch (error) {
    console.error("Error fetching blog slugs from Sanity:", error);
    return fallbackBlogs.blogs.map((b) => ({ slug: b.slug.current }));
  }
}

// Get all categories
export async function getAllCategories(): Promise<Category[]> {
  const client = getSanityClient();
  if (!client) {
    return fallbackBlogs.categories as Category[];
  }

  try {
    const categories = await client.fetch<Category[]>(allCategoriesQuery);
    return categories;
  } catch (error) {
    console.error("Error fetching categories from Sanity:", error);
    return fallbackBlogs.categories as Category[];
  }
}

// Get related posts
export async function getRelatedPosts(
  currentId: string,
  categoryIds: string[]
): Promise<BlogPost[]> {
  const client = getSanityClient();
  if (!client || categoryIds.length === 0) {
    // Return random posts from fallback as related
    return fallbackBlogs.blogs
      .filter((b) => b._id !== currentId)
      .slice(0, 3) as BlogPost[];
  }

  try {
    const posts = await client.fetch<BlogPost[]>(relatedPostsQuery, {
      currentId,
      categoryIds,
    });
    return posts;
  } catch (error) {
    console.error("Error fetching related posts from Sanity:", error);
    return fallbackBlogs.blogs
      .filter((b) => b._id !== currentId)
      .slice(0, 3) as BlogPost[];
  }
}
