import { getSanityClient } from "./sanityClient";
import {
  allBlogsQuery,
  blogBySlugQuery,
  allBlogSlugsQuery,
  allCategoriesQuery,
  relatedPostsQuery,
  allAboutQuery,
  headerQuery,
  pageQuery,
  travelQuery,
  footerQuery,
  eatQuery,
  videoQuery,
  videoListQuery
} from "./queries";
import type { BlogPost, BlogPostFull, BlogSlug, Category,About,Header,Herosection,Brands,Page,Footer,Travel,Eat,Video,VideoPage } from "./types";
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

//Get about page
export async function getAboutPage(): Promise<About[]> {
  const client = getSanityClient();
  if (!client) {
    return [] ;
  }

  try {
    const about = await client.fetch<About[]>(allAboutQuery);
    return about;
  } catch (error) {
    console.error("Error fetching aboutPage from Sanity:", error);
    return [];
  }
}

//Get travel page
export async function getTravelPage(): Promise<Travel | null> {
  const client = getSanityClient();
  if (!client) {
    return null ;
  }

  try {
    const travel = await client.fetch<Travel>(travelQuery);
    return travel;
  } catch (error) {
    console.error("Error fetching travelPage from Sanity:", error);
    return null;
  }
}

//Get eat page
export async function getEatPage(): Promise<Eat | null> {
  const client = getSanityClient();
  if (!client) {
    return null ;
  }

  try {
    const eat = await client.fetch<Eat>(eatQuery);
    return eat;
  } catch (error) {
    console.error("Error fetching eatPage from Sanity:", error);
    return null;
  }
}

//Get header
export async function getHeader(): Promise<Header | null> {
  const client = getSanityClient();
  if (!client) {
    return null;
  }

  try {
    const header = await client.fetch<Header>(headerQuery);
    return header;
  } catch (error) {
    console.error("Error fetching header from Sanity:", error);
    return null;
  }
}

//page query
export async function getPage(): Promise<Page | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const page = await client.fetch<Page>(pageQuery);
    return page;
  } catch (error) { 
    console.error("Error fetching page:", error);
    return null;
  }
}

//get footer
export async function getFooter(): Promise<Footer | null> {
  const client = getSanityClient();
  if (!client) {
    return null;
  }

  try {
    const footer = await client.fetch<Footer>(footerQuery);
    return footer;
  } catch (error) {
    console.error("Error fetching footer from Sanity:", error);
    return null;
  }
}

//Get video page
export async function getVideoPage(): Promise<VideoPage | null> {
  const client = getSanityClient();
  if (!client) {
    return null;
  }

  try {
    const videoPage = await client.fetch<VideoPage>(videoQuery);
    return videoPage;
  } catch (error) {
    console.error("Error fetching videoPage from Sanity:", error);
    return null;
  }
}

//Get all videos
export async function getAllVideos(): Promise<Video[]> {
  const client = getSanityClient();
  if (!client) {
    return [];
  }

  try {
    const videos = await client.fetch<Video[]>(videoListQuery);
    return videos;
  } catch (error) {
    console.error("Error fetching videos from Sanity:", error);
    return [];
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
