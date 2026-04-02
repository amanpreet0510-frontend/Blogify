export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://justblogify.in/</loc>
    <lastmod>2026-04-02T07:00:13.000Z</lastmod>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://justblogify.in/about</loc>
    <lastmod>2026-04-02T07:00:13.000Z</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://justblogify.in/travel</loc>
    <lastmod>2026-04-02T07:00:13.000Z</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://justblogify.in/eat</loc>
    <lastmod>2026-04-02T07:00:13.000Z</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://justblogify.in/videos</loc>
    <lastmod>2026-04-02T07:00:13.000Z</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://justblogify.in/blog/new-blog-post</loc>
    <lastmod>2026-04-02T07:00:13.000Z</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://justblogify.in/blog/the-blog-post</loc>
    <lastmod>2026-04-02T07:00:13.000Z</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://justblogify.in/blog/second-blog</loc>
    <lastmod>2026-04-02T07:00:13.000Z</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}