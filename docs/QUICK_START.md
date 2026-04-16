# Quick Start: On-Demand Revalidation

## What Was Implemented

Your blog now has **instant content updates** without rebuilding! Here's how:

### Before
```
Edit in Sanity → Wait up to 1 hour → Changes live
```

### After  
```
Edit in Sanity → Changes live in 1-5 seconds ⚡
```

## Setup (5 Minutes)

### 1. Verify Environment Variable

Check `.env` has webhook secret:
```env
SANITY_WEBHOOK_SECRET=53cd85f85d6684ac29ade365484427548fd99339764ccd0320354294b39c160e
```

### 2. Create Sanity Webhook

Go to **Sanity Dashboard** → **API** → **Webhooks** → **Create**

Fill in:
- **Name**: "Production Revalidation"
- **Events**: Select "Publish"
- **Types**: Check `blog`, `category`, `travel`, `eat`, `about`, `header`, `footer`, `page`
- **URL**: `https://justblogify.in/api/revalidate`
- **Add Header**:
  - Key: `x-sanity-webhook-secret`
  - Value: `53cd85f85d6684ac29ade365484427548fd99339764ccd0320354294b39c160e` (from your .env)

**Save** ✅

### 3. Test It

Publish a blog post in Sanity Studio and check:
1. **Server logs** should show:
   ```
   ✓ Revalidated path: /blog/post-slug
   ✓ Revalidated path: /
   ✓ Revalidated tag: blogs
   ```

2. **Live site** should update in 1-5 seconds

That's it! 🎉

## Verify It's Working

### Check Webhook Delivery

In Sanity Dashboard → API → Webhooks → Click your webhook:
- Go to **"Recent Events"** tab
- Publish a blog post
- You should see HTTP 200 responses

### Test Cache Status

```bash
# Check if page is cached
curl -I https://yourblogdomain.com/blog/any-post

# Look for header:
# x-nextjs-cache: HIT (cached) ✅
# x-nextjs-cache: STALE (being revalidated) ✅
# x-nextjs-cache: MISS (cache expired)
```

### Manual Webhook Test

```bash
curl -X POST https://yourblogdomain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: mySecret123" \
  -d '{
    "_type": "blog",
    "_id": "test-id",
    "slug": { "current": "test-post" },
    "isPublished": true
  }'
```

Should return:
```json
{
  "revalidated": true,
  "now": 1234567890,
  "paths": ["/blog/test-post", "/", "/blog"],
  "tags": ["blogs", "blog-test-id"]
}
```

## What Gets Revalidated

| When You Update... | What Updates |
|---|---|
| Blog post | `/blog/[slug]`, homepage, blog listing |
| Category | Homepage, all blog listings |
| Header/Footer | All pages |
| Travel page | Travel page, homepage |
| Eat page | Eat page, homepage |

## If It's Not Working

### Webhook Returns 401
❌ **Cause**: Wrong secret
✅ **Fix**: 
- Check webhook header value matches `SANITY_WEBHOOK_SECRET`
- Verify `.env` secret in production deployment

### Site Still Shows Old Content
❌ **Cause**: ISR timer didn't expire yet, or webhook failed
✅ **Fix**:
- Wait 1-2 minutes (ISR fallback: every 60-3600 seconds)
- Check Sanity webhook logs for errors
- Manual refresh: Ctrl+Shift+R in browser

### Webhook Never Triggered
❌ **Cause**: Webhook not created or wrong URL
✅ **Fix**:
- Open Sanity webhooks settings
- Verify webhook URL is `https://YOUR-DOMAIN.com/api/revalidate`
- Verify document types are selected
- Verify "Publish" event is selected

## How Long Until Changes Show?

| Scenario | Time |
|---|---|
| **Normal**: Webhook works | 1-5 seconds ⚡ |
| **Fallback**: Webhook failed | 60 seconds (ISR timer) |
| **Blog listing page** | 1-5 seconds (tagged invalidation) |
| **Homepage** | 1-5 seconds (path invalidation) |

## Files Modified

- ✅ `app/api/revalidate/route.ts` - Webhook handler
- ✅ `lib/getBlogs.ts` - Cache configuration  
- ✅ `app/blog/[slug]/page.tsx` - ISR settings
- ✅ `docs/WEBHOOK_SETUP.md` - Full setup guide
- ✅ `docs/CACHE_STRATEGY.md` - Architecture overview

## SEO Bonus 🎁

Your blog posts now have **optimized meta tags** for search engines:
- Unique titles for each post
- Unique descriptions
- Open Graph tags for social sharing
- Twitter Card tags

See [docs/SEO_META_TAGS.md](./SEO_META_TAGS.md) for details.

## Performance Summary

✅ **Updates**: 1-5 seconds (was 60+ minutes)
✅ **No rebuilds**: Pure cache invalidation
✅ **Automatic fallback**: ISR still works if webhook fails
✅ **Same cost**: On-demand revalidation ≈ ISR cost
✅ **Zero downtime**: Stale-while-revalidate pattern

## Support

See detailed guides:
- [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md) - Complete setup walkthrough
- [CACHE_STRATEGY.md](./CACHE_STRATEGY.md) - Architecture & troubleshooting
- [SEO_META_TAGS.md](./SEO_META_TAGS.md) - SEO configuration

---

**Questions?** Check the troubleshooting section in WEBHOOK_SETUP.md
