# On-Demand Revalidation with Sanity Webhooks

This guide explains how to set up automatic cache revalidation when content is published in Sanity CMS, ensuring your production site updates immediately without requiring a redeploy.

## How It Works

### Before (Without Webhooks)
```
Update content in Sanity → Wait up to 1 hour → ISR revalidates → Changes visible
```

### After (With Webhooks)
```
Update content in Sanity → Webhook triggered instantly → On-demand revalidation → Changes visible immediately
```

## Architecture Overview

```
┌─────────────────┐
│   Sanity CMS    │
│  (Edit Content) │
└────────┬────────┘
         │
         │ Publish Blog Post
         │
         ▼
┌─────────────────────────────────┐
│  Sanity Webhooks Trigger        │
│  POST /api/revalidate           │
│  with secret verification       │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  Next.js Revalidation Handler    │
│  - Verifies webhook secret       │
│  - Determines content type       │
│  - Revalidates relevant paths    │
│  - Uses cache tags for precision │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Next.js Cache System        │
│  - revalidatePath()          │
│  - revalidateTag()           │
│  - ISR revalidation interval │
└──────────────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Live Site Updated           │
│  Users see latest content    │
└──────────────────────────────┘
```

## Setup Instructions

### Step 1: Configure Environment Variables

Ensure your `.env.local` has the webhook secret:

```env
SANITY_WEBHOOK_SECRET=53cd85f85d6684ac29ade365484427548fd99339764ccd0320354294b39c160e
```

This is already in your `.env` file. For production, use a strong random secret:

```bash
# Generate a secure random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 2: Create Sanity Webhook

#### Via Sanity CLI

```bash
pnpm sanity hook create
```

When prompted:
- **Hook name**: `Production Revalidation` (or any name)
- **Event**: `Publish`
- **Trigger**: Document type(s) - select: `blog`, `category`, `travel`, `eat`, `about`, `header`, `footer`, `page`
- **URL**: `https://justblogify.in/api/revalidate`
- **HTTP Headers**: Add custom header:
  - **Key**: `x-sanity-webhook-secret`
  - **Value**: Your webhook secret (from `.env`)

### Step 3: Verify Webhook in Sanity Console

1. Go to Sanity project settings: https://manage.sanity.io/
2. Navigate to **API → Webhooks**
3. You should see your webhook listed
4. Click to view details and test webhook delivery

### Step 4: Test the Setup

#### Option A: Manual Test via CLI

```bash
# Get your project ID and dataset
pnpm sanity hook test

# Or use curl to manually test
curl -X POST https://justblogify.in/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: 53cd85f85d6684ac29ade365484427548fd99339764ccd0320354294b39c160e" \
  -d '{
    "_type": "blog",
    "_id": "test-blog-id",
    "slug": { "current": "test-slug" },
    "isPublished": true
  }'
```

#### Option B: Test in Sanity Studio

1. Open any blog post in Sanity Studio
2. Make a minor change (e.g., add a space to the title)
3. Publish the change
4. Check your server logs for revalidation confirmation

#### Option C: Check Webhook Logs

In Sanity Project Settings → API → Webhooks:
- Click on your webhook
- View **"Recent Events"** tab
- Check for successful deliveries (HTTP 200)

### Step 5: Verify Server Logs

When a webhook is triggered, you should see logs like:

```
✓ Revalidated path: /blog/advanced-react-patterns
✓ Revalidated path: /
✓ Revalidated path: /blog
✓ Revalidated tag: blogs
✓ Revalidated tag: blog-abc123def456
```

## Cache Revalidation Strategies

### 1. Path-Based Revalidation (via `revalidatePath`)

Revalidates all cached content at a specific path:

```typescript
revalidatePath('/blog/[slug]')    // Revalidates all blog posts
revalidatePath('/blog/my-post')   // Revalidates specific post
revalidatePath('/')               // Revalidates homepage
```

**When Used:**
- Blog published → Revalidates `/blog/[slug]`, `/`, `/blog`
- Category updated → Revalidates `/`
- Header changed → Revalidates all pages (via `/`)

### 2. Tag-Based Revalidation (via `revalidateTag`)

Revalidates all cached content tagged with a specific tag:

```typescript
revalidateTag('blogs')           // All blog-related data
revalidateTag('blog-abc123')     // Specific blog post data
revalidateTag('categories')      // All categories
```

**Benefits:**
- More granular control than paths
- Perfect for shared data (e.g., sidebar categories)
- Faster than full path revalidation

### 3. Time-Based Revalidation (ISR Interval)

Automatically revalidates after a specified interval:

```typescript
// In fetch options
next: { revalidate: 60 }  // Revalidate every 60 seconds

// Or page-level
export const revalidate = 60;  // Revalidate every 60 seconds
```

**Current Settings:**
- Blog pages: `revalidate: 60` → Revalidates every 60 seconds
- All data queries: `next: { revalidate: 3600 or 86400 }`
- Fallback for missed webhooks

## Revalidation Mapping

| Content Type | Paths Revalidated | Tags Invalidated |
|---|---|---|
| Blog Post | `/blog/[slug]`, `/`, `/blog` | `blogs`, `blog-{_id}` |
| Category | `/` | `categories` |
| Travel Page | `/travel` | `travel` |
| Eat Page | `/eat` | `eat` |
| About Page | `/about` | `about` |
| Header | `/`, all pages | `header` |
| Footer | `/`, all pages | `footer` |
| Page | `/` | `page` |

## Monitoring & Debugging

### Check Revalidation Logs

#### On Vercel
1. Go to https://vercel.com/dashboards
2. Select your project
3. Go to **Deployments → Functions → Logs**
4. Look for `/api/revalidate` calls

#### On Local Development
```bash
# Terminal shows real-time logs from the API route
# Look for console.log messages:
# ✓ Revalidated path: /blog/...
# ✓ Revalidated tag: blogs
```

### Verify Webhook Delivery

In Sanity Project Settings:
1. Go to **API → Webhooks**
2. Select your webhook
3. Click **"Recent Events"** tab
4. Check HTTP status (200 = success, 401 = invalid secret, 500 = server error)

### Common Issues

#### Issue: Webhook Returns 401 (Unauthorized)
**Cause**: Invalid or missing webhook secret
**Fix**: 
- Verify `SANITY_WEBHOOK_SECRET` in `.env`
- Verify the header value in Sanity webhook settings matches exactly
- Redeploy with updated env vars

#### Issue: Webhook Returns 500 (Server Error)
**Cause**: Error in webhook handler
**Fix**:
- Check server logs for error details
- Verify webhook body contains required fields: `_type`, `_id`, `slug`
- Test with curl command above

#### Issue: Content Not Updating After Publish
**Cause**: 
- Webhook not triggered
- ISR cache still valid
- CDN caching
**Fix**:
```bash
# Force cache clear via API
curl -X POST https://justblogify.in/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: YOUR_SECRET" \
  -d '{"_type":"blog","slug":{"current":"post-slug"},"isPublished":true}'
```

#### Issue: Changes appear slowly (10-60 seconds)
**Expected behavior** - This is normal ISR. 
- Webhooks are fast
- But ISR has a built-in 60-second minimum (for Vercel free tier)
- On paid Vercel plans, you can configure this

## Production Checklist

- [ ] Webhook secret is strong (32+ character random string)
- [ ] Webhook URL is correct: `https://justblogify.in/api/revalidate`
- [ ] Environment variable `SANITY_WEBHOOK_SECRET` is set in production
- [ ] Webhook is created for: blog, category, travel, eat, about, header, footer, page
- [ ] Testing completed: webhook logs show "Recent Events"
- [ ] Content updated: test by publishing a blog post
- [ ] Server logs monitored: revalidation logged successfully
- [ ] ISR fallback working: wait 60+ seconds and verify content updates

## Performance Impact

### Before Webhooks
- Build time: N/A (no rebuilds needed)
- Time to see changes: 60 seconds to 1 hour (ISR interval)
- Server cost: Minimal (only ISR recompiles stale pages)

### After Webhooks
- Build time: N/A (no rebuilds needed)
- Time to see changes: 1-5 seconds (webhook latency)
- Server cost: Same (on-demand revalidation ≈ ISR cost)
- Server load: Slightly higher during publication spikes

## Advanced Configuration

### Custom Webhook Validation

To add additional security, you can implement HMAC signature verification:

```typescript
// In route.ts
import { createHmac } from 'crypto';

const secret = process.env.SANITY_WEBHOOK_SECRET!;
const signature = request.headers.get('x-sanity-webhook-signature');
const body = await request.text();

const hash = createHmac('sha256', secret)
  .update(body)
  .digest('base64');

if (signature !== hash) {
  return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
}
```

### Batch Publishing

When publishing multiple documents:
- Each document triggers a separate webhook
- Webhooks are processed immediately but sequentially
- All related paths/tags are revalidated
- No duplicate revalidations (Next.js deduplicates)

## Troubleshooting Script

Save as `test-webhook.sh`:

```bash
#!/bin/bash

DOMAIN="https://justblogify.in"
SECRET="53cd85f85d6684ac29ade365484427548fd99339764ccd0320354294b39c160e"
SLUG="my-test-post"

echo "Testing webhook revalidation..."

curl -X POST $DOMAIN/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: $SECRET" \
  -d "{
    \"_type\": \"blog\",
    \"_id\": \"test-id-$(date +%s)\",
    \"slug\": { \"current\": \"$SLUG\" },
    \"isPublished\": true
  }" \
  -v

echo ""
echo "Check production logs for revalidation confirmation"
```

Run:
```bash
chmod +x test-webhook.sh
./test-webhook.sh
```

## References

- [Next.js ISR Documentation](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration)
- [Sanity Webhooks Documentation](https://www.sanity.io/docs/webhooks)
- [Vercel ISR on Demand](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)
