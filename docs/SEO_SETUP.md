# SEO Configuration Guide

## Environment Setup

Add this to your `.env.local` file (for development) or your deployment environment:

```env
# Site URL for SEO canonical URLs and Open Graph
NEXT_PUBLIC_SITE_URL=https://yourblogdomain.com
```

## Deployment Checklist

- [ ] Update `NEXT_PUBLIC_SITE_URL` in your hosting environment (Vercel, Netlify, etc.)
- [ ] Deploy Sanity schema changes: `pnpm sanity deploy`
- [ ] Build and deploy Next.js app: `pnpm run build && pnpm start`
- [ ] Test blog posts in Sanity Studio - add SEO meta tags
- [ ] Verify meta tags in browser DevTools
- [ ] Submit sitemap to Google Search Console
- [ ] Test social sharing with [metatags.io](https://metatags.io/)

## Quick Example

**Blog post in Sanity:**
- Title: "How to Build a Next.js Blog with Sanity CMS"
- Excerpt: "Step-by-step guide to setting up a modern blog..."

**Add SEO fields (optional):**
- Meta Title: "Next.js Sanity Blog Tutorial - Complete Guide"
- Meta Description: "Learn to build a modern blog with Next.js and Sanity CMS. Includes authentication, ISR, and SEO optimization."

**Result:** Unique, optimized meta tags for search engines and social sharing! ✨
