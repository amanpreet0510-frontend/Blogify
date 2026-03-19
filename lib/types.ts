import type { PortableTextBlock } from "@portabletext/types";

// Category type
export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

// Blog type for listing
export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  featuredImage?: SanityImage;
  publishedAt: string;
  author: string;
  categories?: Category[];
}

// Full blog type with content
export interface BlogPostFull extends BlogPost {
  content: PortableTextBlock[];
}

// Sanity image type
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

// Blog slug type for static generation
export interface BlogSlug {
  slug: string;
}
