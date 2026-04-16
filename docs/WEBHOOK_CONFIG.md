# Optimal Sanity Webhook Configuration

## Recommended Settings for Your Blog

### Basic Settings
```
Name: Production Revalidation
Description: Triggers on-demand cache revalidation for live site updates
Dataset: production
URL: https://justblogify.in/api/revalidate
```

### Trigger Settings
```
Trigger on: Create, Update, Delete
```

### Filter Documents (GROQ)
```
_type in ["blog", "category", "travel", "eat", "about", "header", "footer", "page"]
```

### Projection (GROQ)
```
{
  _type,
  _id,
  slug,
  isPublished,
  title
}
```

### Advanced Settings
```
HTTP method: POST
HTTP headers:
  Name: x-sanity-webhook-secret
  Value: 53cd85f85d6684ac29ade365484427548fd99339764ccd0320354294b39c160e

API version: v2021-03-25

Drafts: ❌ Unchecked (Only trigger on published content)
Versions: ❌ Unchecked (Only trigger on main version)
```

## Why These Settings?

### Filter Documents
- **Only triggers on content types that affect your site**
- **Ignores internal Sanity documents** (like user preferences, etc.)
- **Reduces webhook spam** from irrelevant changes

### Projection
- **`_type`**: Tells your handler what kind of content changed
- **`_id`**: Unique identifier for targeted revalidation
- **`slug`**: For blog posts, to know which page to revalidate
- **`isPublished`**: Ensures you only revalidate published content
- **`title`**: Optional, for logging/debugging

### Drafts Setting
- **❌ Unchecked**: Only trigger when content is published
- **Why?** Draft changes happen frequently during editing and shouldn't trigger live site updates
- **Benefit**: Reduces webhook traffic by ~80%

### Versions Setting
- **❌ Unchecked**: Only trigger on main document version
- **Why?** Versioned documents are typically for content history, not live updates

## Alternative Configurations

### Option 1: Minimal Payload (Faster)
```
Projection: {
  _type,
  _id,
  slug,
  isPublished
}
```

### Option 2: Include More Data (Debugging)
```
Projection: {
  _type,
  _id,
  slug,
  isPublished,
  title,
  _updatedAt,
  author
}
```

### Option 3: All Blog Changes (Including Drafts)
```
Drafts: ✅ Checked
Filter: _type == "blog"
```
*Use this if you want to preview draft changes on staging*

## Testing Your Configuration

### 1. Create Webhook with Above Settings

### 2. Test with Manual Payload
```bash
curl -X POST https://justblogify.in/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-webhook-secret: 53cd85f85d6684ac29ade365484427548fd99339764ccd0320354294b39c160e" \
  -d '{
    "_type": "blog",
    "_id": "blog-post-123",
    "slug": { "current": "my-awesome-post" },
    "isPublished": true,
    "title": "My Awesome Post"
  }'
```

### 3. Check Response
Should return:
```json
{
  "revalidated": true,
  "now": 1234567890,
  "paths": ["/blog/my-awesome-post", "/", "/blog"],
  "tags": ["blogs", "blog-blog-post-123"]
}
```

### 4. Verify in Sanity Dashboard
- Go to **API → Webhooks**
- Click your webhook
- Check **"Recent Events"** tab
- Should show HTTP 200 responses

## Troubleshooting

### Webhook Not Triggering
1. **Check dataset**: Make sure it's set to "production"
2. **Check filter**: Test your GROQ filter in Sanity Vision
3. **Check triggers**: Ensure "Update" is selected (most common trigger)

### Wrong Payload Structure
1. **Test projection**: Use Sanity Vision to see what your projection returns
2. **Check field names**: Ensure `slug.current` exists for blog posts

### Too Many Webhooks
1. **Uncheck drafts**: Reduces traffic by ~80%
2. **Refine filter**: Only include document types you care about

## GROQ Filter Examples

### Test Your Filter in Sanity Vision
```groq
*[_type in ["blog", "category", "travel", "eat", "about", "header", "footer", "page"]] {
  _type,
  _id,
  slug,
  isPublished,
  title
}
```

### Alternative Filters

**Only published content:**
```groq
*[_type in ["blog", "category"] && !(_id in path("drafts.**"))]
```

**Only specific blog categories:**
```groq
*[_type == "blog" && category._ref in ["cat1", "cat2"]]
```

**Exclude certain documents:**
```groq
*[_type in ["blog", "page"] && slug.current != "homepage"]
```

## Performance Notes

- **With drafts unchecked**: ~1-2 webhooks per published change
- **With drafts checked**: ~10-20 webhooks per published change
- **Response time**: Webhooks should respond within 5 seconds
- **Retry logic**: Sanity retries failed webhooks automatically

## Security Best Practices

1. **Use strong secret**: Generate random 32+ character string
2. **HTTPS only**: Webhook URLs must be HTTPS
3. **Validate secret**: Always check the webhook secret in your handler
4. **Rate limiting**: Consider adding rate limiting to your webhook endpoint

## Monitoring

### Check Webhook Health
- **Sanity Dashboard**: API → Webhooks → Recent Events
- **Server logs**: Look for revalidation messages
- **Uptime monitoring**: Set up alerts for webhook failures

### Common Issues
- **401 errors**: Secret mismatch
- **500 errors**: Server-side handler issues
- **Timeout**: Handler taking too long (>5 seconds)
- **No events**: Filter too restrictive or wrong dataset