// GROQ queries for fetching blog data from Sanity

// Get all blogs with essential fields
export const allBlogsQuery = `
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    author,
    categories[]-> {
      _id,
      title,
      slug
    }
  }
`;

// Get a single blog by slug with full content
export const blogBySlugQuery = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    excerpt,
    featuredImage,
    publishedAt,
    author,
    categories[]-> {
      _id,
      title,
      slug
    }
  }
`;

// Get all blog slugs for static generation
export const allBlogSlugsQuery = `
  *[_type == "blog"] {
    "slug": slug.current
  }
`;

// Get blogs by category
export const blogsByCategoryQuery = `
  *[_type == "blog" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    author,
    categories[]-> {
      _id,
      title,
      slug
    }
  }
`;

// Get all categories
export const allCategoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;

// Get related posts (same category, excluding current post)
export const relatedPostsQuery = `
  *[_type == "blog" && _id != $currentId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    author
  }
`;

// Search blogs by title or excerpt
export const searchBlogsQuery = `
  *[_type == "blog" && (title match $searchTerm || excerpt match $searchTerm)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    author,
    categories[]-> {
      _id,
      title,
      slug
    }
  }
`;
