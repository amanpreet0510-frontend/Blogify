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
    },
    showSearch,
    metaDescription
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
    },
    showSearch,
    metaTitle,
    metaDescription
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
    },
    showSearch,
    metaDescription
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
    author,
    metaDescription
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
    },
    showSearch,
    metaDescription
  }
`;

//About page query 
export const allAboutQuery = `
  *[_type == "about"] | order(title asc) {
    _id,
    title,
    excerpt,
    "slug": slug.current,
    description,
    "featuredImage": featuredImage.asset->url,
    content
  }
`;

//Header query
export const headerQuery = `
  *[_type == "header"][0]{
    "logoUrl": logo.asset->url,
    title,
    navigation[]{
      label,
      link,
      openInNewTab
    },
    cta{
      label,
      link
    },
    socialIcons[]{
      "iconUrl": icon.asset->url,
      link,
      openInNewTab
    }
  }
`;

//Hero Section query
export const heroSectionQuery = `
  *[_type == "heroSection"] | order(title asc) {
    _id,
    title,
    excerpt,
    "slug": slug.current,
    description,
    "backgroundImage": backgroundImage.asset->url,
    blogs[]->{
      _id,
      title,
      slug,
      excerpt,
      "featuredImage": featuredImage.asset->url,
      publishedAt,
      author,
      showSearch
    }
  }
`;

//Brands query
export const brandsQuery = `
  *[_type == "brands"][0]{
    title,
    brandLogos[]{
      "iconUrl": icon.asset->url,
      link,
      openInNewTab
    }
  }
`;

//page query
export const pageQuery = `
  *[_type == "page" && (slug.current == "/" || slug.current == "home")][0]{
    title,

    sections[]{
      _type,

      // Hero Section
      _type == "heroSection" => {
        title,
        excerpt,
        "backgroundImage": backgroundImage.asset->url,
        blogs[]->{
          _id,
          title,
          slug,
          excerpt,
          "featuredImage": featuredImage.asset->url,
          publishedAt,
          author,
          showSearch
        }
      },
      //brand section
      _type == "brands" => {
  title,
  brandLogos[]{
    "iconUrl": icon.asset->url,
    link,
    openInNewTab
  }
},

//socials query
_type == "socials" => {
  title,

  socialIcons[]{
     title,
    "iconUrl": icon.asset->url,
    link,
    openInNewTab
  },

  featuredImages[]{
    "imageUrl": image.asset->url,
    link,
    openInNewTab
  }
}
    }
  }
`;

//footer query
export const footerQuery = `
  *[_type == "footer"][0]{
    title,
    "featuredImage": featuredImage.asset->url,
    description,

    linkColumns[]{
      title,
      links[]{
        label,
        url
      }
    },
    newsletter{
      title,
      emailLabel,
      placeholder,
      checkboxText,
      isCheckboxRequired,
      buttonText
    },
   socialIcons[]{
      "iconUrl": icon.asset->url,
      link,
      openInNewTab
    },
    copyright
  }
`;

//travel query
export const travelQuery = `
  *[_type == "travel"][0]{
    _id,
    title,
    excerpt,
    "slug": slug.current,
    blogs[]->{
      _id,
      title,
      slug,
      excerpt,
      "featuredImage": featuredImage.asset->url,
      publishedAt,
      author,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      showSearch
    }
  }
`;

//eat query
export const eatQuery = `
  *[_type == "eat"][0]{
    _id,
    title,
    excerpt,
    "slug": slug.current,
    blogs[]->{
      _id,
      title,
      slug,
      excerpt,
      "featuredImage": featuredImage.asset->url,
      publishedAt,
      author,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      showSearch
    }
  }
`;

//video query
export const videoQuery = `
  *[_type == "videoPage"][0]{
    _id,
    title,
    description,
    featuredVideo->{
      _id,
      title,
      "slug": slug.current,
      "thumbnail": thumbnail.asset->url,
      videoUrl,
      category
    }
  }
`;

//video list query
export const videoListQuery = `
  *[_type == "video"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url,
    videoUrl,
    category
  }
`;

