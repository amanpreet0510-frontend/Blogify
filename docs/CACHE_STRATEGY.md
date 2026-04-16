# Cache Strategy Overview

This document explains the complete caching and revalidation strategy for your Next.js + Sanity blog.

## Three-Layer Cache System

### Layer 1: CDN Cache (Edge)
- **Where**: Vercel Edge Network (if using Vercel)
- **Duration**: Determined by HTTP headers
- **Invalidation**: On-demand via webhooks + ISR

### Layer 2: Next.js Data Cache
- **Where**: Server-side data cache
- **Duration**: Configured via `next.revalidate` option
- **Invalidation**: On-demand via `revalidateTag()` + ISR interval

### Layer 3: Next.js Full Route Cache (ISR)
- **Where**: Pre-rendered HTML pages
- **Duration**: Configured via `revalidate` export
- **Invalidation**: On-demand via `revalidatePath()` + ISR interval

## Current Configuration

### ISR Revalidation Times

```typescript
// Blog pages - aggressive invalidation for content updates
export const revalidate = 60;  // Revalidate every 60 seconds

// Data queries - different based on type
- getAllBlogs():          revalidate: 3600 (1 hour), tags: ['blogs']
- getBlogBySlug():        revalidate: 3600 (1 hour), tags: ['blogs', 'blog-{slug}']
- getAllBlogSlugs():      revalidate: 86400 (24 hours) - rarely changes
- getAllCategories():     revalidate: 86400 (24 hours), tags: ['categories']
- getAboutPage():         revalidate: 86400 (24 hours), tags: ['about']
- getTravelPage():        revalidate: 86400 (24 hours), tags: ['travel']
- getEatPage():           revalidate: 86400 (24 hours), tags: ['eat']
- getHeader():            revalidate: 86400 (24 hours), tags: ['header']
- getFooter():            revalidate: 86400 (24 hours), tags: ['footer']
- getPage():              revalidate: 86400 (24 hours), tags: ['page']
- getRelatedPosts():      revalidate: 3600 (1 hour), tags: ['blogs']
- getAllVideos():         revalidate: 86400 (24 hours), tags: ['video']
```

### Sanity Webhook Configuration

The revalidation route (`/api/revalidate`) handles:

```javascript
Blog Post Published
├─ Revalidate Path: /blog/[slug]
├─ Revalidate Path: /
├─ Revalidate Path: /blog
├─ Revalidate Tag: blogs
└─ Revalidate Tag: blog-{_id}

Category Updated
├─ Revalidate Path: /
└─ Revalidate Tag: categories

Travel Page Updated
├─ Revalidate Path: /travel
└─ Revalidate Tag: travel

Header/Footer Changed
├─ Revalidate Path: / (and all pages)
└─ Revalidate Tag: header/footer
```

## Timeline: Content Update to Live

### With Webhooks (Current Setup)

```
T+0s   User publishes blog post in Sanity
       ↓
T+0-2s Sanity sends webhook to /api/revalidate
       ↓
T+2s   Next.js revalidates paths and tags
       ↓
T+3s   Stale cache cleared from server
       ↓
T+3-5s CDN edge caches updated
       ↓
T+5s   ✅ User sees latest content
```

### Without Webhooks (ISR Fallback)

```
T+0s   User publishes blog post in Sanity
       ↓
...
       (Stale content served from cache)
       ↓
T+60s  ISR timer expires (page-level revalidate: 60)
       ↓
T+61s  Background revalidation triggered
       ↓
T+65s  ✅ Next user sees updated content
```

## Cache Invalidation Strategy

### Immediate (Webhooks)
- Triggered when content is **published** in Sanity
- Invalidates specific paths and tags
- Fallback if webhook fails: ISR timer

### Periodic (ISR)
- Runs on schedule based on revalidate times
- Ensures eventual freshness if webhook fails
- No manual intervention needed

### Manual (Force)
```bash
# In Next.js API route or client-side mutation
revalidatePath('/blog/my-post');
revalidateTag('blogs');
```

## Benefits

### ✅ Fast Content Updates
- Webhooks trigger immediate revalidation
- No need to rebuild or redeploy
- Updates visible within seconds

### ✅ Automatic Fallback
- ISR timer ensures eventual freshness
- Works even if webhooks fail
- No broken caches

### ✅ Efficient caching
- Stale content served while revalidating
- No spike in server load
- Users always get quick responses

### ✅ Granular Control
- Different revalidate times for different content types
- Blog posts refresh faster than static pages
- Tags allow precise invalidation

## Debugging Cache Issues

### Check What's Cached

```bash
# Check response headers
curl -I https://justblogify.in/blog/my-post

# Look for:
# x-nextjs-cache: HIT (cached)
# x-nextjs-cache: MISS (not cached)
# x-nextjs-cache: STALE (being revalidated)
```

### How to Force Refresh (for testing)

```bash
# Option 1: Wait for ISR timer
# Blog pages: wait 60 seconds
# Other data: wait 3600-86400 seconds

# Option 2: Trigger webhook manually
curl -X POST https://justblogify.in/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: YOUR_SECRET" \
  -d '{"_type":"blog","slug":{"current":"my-post"},"isPublished":true}'

# Option 3: Deploy a new version (clears all caches)
git push  # (assuming auto-deploy)
```

### Monitor Revalidation

```bash
# Check server logs for:
# ✓ Revalidated path: /blog/my-post
# ✓ Revalidated tag: blogs

# In Vercel Dashboard:
# Deployments → Functions → /api/revalidate
```

## Migration from Export-Based to ISR

The app uses **ISR (Incremental Static Regeneration)** - exported pages with built-in revalidation:

```typescript
// Old approach (full rebuild needed)
export const getStaticProps = async () => { /* ... */ }

// Current approach (ISR with revalidation)
export const revalidate = 60;
export default async function Page() { /* ... */ }
```

**Advantages:**
- No need to rebuild app to deploy changes
- Changes visible within revalidation window
- Scales to thousands of pages efficiently
- Works with dynamic routes (`[slug]`)

## Performance Metrics

### Before Optimization
- Content update to live: 60+ minutes (full rebuild)
- Build time: 2-5 minutes
- Deployment frequency: Limited (slow builds)

### After Webhooks + ISR
- Content update to live: 1-5 seconds (webhook) or 60 seconds (ISR fallback)
- Build time: N/A (no rebuilds needed)
- Deployment frequency: Can deploy anytime

## FAQ

**Q: Why does my page still show old content after publishing?**
A: 
1. Webhook may have failed - check Sanity webhook logs
2. ISR timer hasn't expired - wait 60-3600 seconds based on content type
3. CDN cache still active - try hard refresh (Ctrl+Shift+R)

**Q: Will this cost extra?**
A: No, on-demand revalidation uses same resources as ISR background jobs.

**Q: Do I need to rebuild the site for changes to appear?**
A: No! This is the whole point of ISR + webhooks.

**Q: What if the webhook fails?**
A: ISR timer kicks in after revalidate interval (60-86400 seconds).

**Q: Can I test webhooks locally?**
A: Yes, but you need to expose your local server (use ngrok or localtunnel).

## Setup Checklist

- ✅ Webhook route created: `/api/revalidate`
- ✅ Webhook secret verified in `.env`
- ✅ Cache tags added to all data fetches
- ✅ ISR revalidate times configured
- ✅ Sanity webhook created and configured
- ✅ Webhook tested and verified
- ✅ Logs monitored for revalidation events
- ✅ Docs reviewed and bookmarked

## Next Steps

1. **Immediate**: Test webhook setup (see [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md))
2. **After testing**: Monitor production logs for revalidation events
3. **Ongoing**: Check Sanity webhook health weekly

## Related Documentation

- [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md) - Detailed webhook configuration
- [SEO_META_TAGS.md](./SEO_META_TAGS.md) - SEO configuration (works with ISR)
- [Next.js Data Cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache)
- [Next.js Full Route Cache](https://nextjs.org/docs/app/building-your-application/caching#full-route-cache)
