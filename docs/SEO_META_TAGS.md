# Dynamic SEO Meta Tags for Blog Posts

## Overview
This feature enables dynamic SEO meta tags (title and description) for each blog post. The meta tags are fetched from Sanity CMS and automatically injected into the page head using Next.js's `generateMetadata` function.

## What's New

### 1. Sanity Schema Updates
Two new optional SEO fields have been added to the `blog` document type:

- **Meta Title (metaTitle)**: Custom SEO title tag (max 60 characters)
  - Recommended: 50-60 characters for optimal display in search results
  - Falls back to: `{blog.title} | DevBlog`
  
- **Meta Description (metaDescription)**: Custom SEO meta description (max 160 characters)
  - Recommended: 150-160 characters for optimal display in search results
  - Falls back to: `blog.excerpt` or `Read {blog.title} on DevBlog`

### 2. Updated GROQ Queries
All blog queries now include the SEO fields:
- `blogBySlugQuery` - Fetches metaTitle and metaDescription for individual posts
- `allBlogsQuery` - Includes metaDescription for blog listings
- `blogsByCategoryQuery` - Includes metaDescription for category-filtered posts
- `relatedPostsQuery` - Includes metaDescription for related posts
- `searchBlogsQuery` - Includes metaDescription for search results

### 3. Updated TypeScript Types
The `BlogPost` and `BlogPostFull` interfaces now include optional SEO fields:
```typescript
export interface BlogPost {
  // ... existing fields
  metaTitle?: string;
  metaDescription?: string;
}
```

### 4. Enhanced Metadata Generation
The `generateMetadata` function in [app/blog/[slug]/page.tsx](../app/blog/[slug]/page.tsx) now:

- Uses custom `metaTitle` if provided, otherwise uses default format
- Uses custom `metaDescription` if provided, otherwise uses excerpt
- Includes proper Open Graph tags for social sharing
- Includes Twitter Card tags for better social media preview

**Fallback Strategy:**
```
Meta Title: metaTitle || "{title} | DevBlog"
Meta Description: metaDescription || excerpt || "Read {title} on DevBlog"
```

## How to Use

### In Sanity Studio

1. Navigate to a blog post in Sanity Studio
2. Scroll to the bottom to find the "SEO" section with:
   - **Meta Title (SEO)** field
   - **Meta Description (SEO)** field
3. Fill in your custom SEO values (optional - defaults will be used if left empty)

**Best Practices:**
- Keep meta title between 50-60 characters
- Keep meta description between 150-160 characters
- Include your target keyword naturally
- Make it descriptive and click-worthy for search results

### Example SEO Setup

**Blog Post:**
- Title: "Advanced React Patterns: Mastering Compound Components"
- Excerpt: "Learn how to build powerful, flexible React components using the compound component pattern. Includes best practices and real-world examples."

**SEO Fields (Optional):**
- Meta Title: "Advanced React Patterns: Compound Components Guide"
- Meta Description: "Master React compound components with practical examples and best practices. Learn to build flexible, reusable component patterns."

### Generated HTML

When published, your blog post will automatically include these meta tags:

```html
<title>Advanced React Patterns: Compound Components Guide</title>
<meta name="description" content="Master React compound components with practical examples and best practices...">
<meta property="og:title" content="Advanced React Patterns: Compound Components...">
<meta property="og:description" content="Master React compound components...">
<meta property="og:type" content="article">
<meta property="og:url" content="https://yoursite.com/blog/advanced-react-patterns">
<meta property="article:published_time" content="2024-01-15T10:00:00Z">
<meta property="article:author" content="Author Name">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Advanced React Patterns: Compound Components Guide">
<meta name="twitter:description" content="Master React compound components...">
```

## Configuration

### Setting Your Site URL

Before deploying, update the site URL in the metadata generation. Edit [app/blog/[slug]/page.tsx](../app/blog/[slug]/page.tsx) and replace:

```typescript
url: `https://yoursite.com/blog/${slug}`,
```

With your actual domain:

```typescript
url: `https://justblogify.in/blog/${slug}`,
```

Alternatively, use an environment variable:

```typescript
url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
```

And add to your `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://justblogify.in
```

## Schema Files Modified

1. **[sanity/schemaTypes/documents/blog.ts](../sanity/schemaTypes/documents/blog.ts)**
   - Added `metaTitle` field
   - Added `metaDescription` field

2. **[lib/queries.ts](../lib/queries.ts)**
   - Updated all blog-related queries to include SEO fields

3. **[lib/types.ts](../lib/types.ts)**
   - Added `metaTitle` and `metaDescription` to interfaces

4. **[app/blog/[slug]/page.tsx](../app/blog/[slug]/page.tsx)**
   - Enhanced `generateMetadata` function with SEO field support
   - Added Twitter Card metadata
   - Improved fallback logic

## Benefits

✅ **Better Search Engine Optimization**: Control exactly what appears in search results
✅ **Improved Social Sharing**: Better preview on Twitter, Facebook, LinkedIn, etc.
✅ **Flexible Fallbacks**: Leave SEO fields empty to use auto-generated defaults
✅ **Best Practices Built-in**: Automatic character limits and recommendations
✅ **Type-Safe**: Full TypeScript support throughout

## Testing

To verify your SEO tags are working:

1. **Local Testing**: Use browser DevTools to inspect the `<head>` element
2. **Search Console**: Add your site to Google Search Console
3. **Social Media Debuggers**:
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
4. **Online SEO Tools**: Use https://metatags.io/ to preview your meta tags

## Troubleshooting

### Meta tags not updating in Sanity Studio but showing in preview

Make sure to redeploy your Next.js application:
```bash
pnpm run build
pnpm start
```

### SEO fields not showing in Sanity Studio

Verify that your Sanity schema was deployed properly:
```bash
pnpm sanity deploy
```

### Meta tags still showing old values

- Clear your browser cache
- Check that the `getBlogBySlug` function is fetching the latest data
- Verify ISR (Incremental Static Regeneration) is working: `export const revalidate = 3600;`
