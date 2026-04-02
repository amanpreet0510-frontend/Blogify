import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://justblogify.in/',
      lastModified: new Date('2026-04-02T07:00:13+00:00'),
      priority: 1.00,
    },
    {
      url: 'https://justblogify.in/about',
      lastModified: new Date('2026-04-02T07:00:13+00:00'),
      priority: 0.80,
    },
    {
      url: 'https://justblogify.in/travel',
      lastModified: new Date('2026-04-02T07:00:13+00:00'),
      priority: 0.80,
    },
    {
      url: 'https://justblogify.in/eat',
      lastModified: new Date('2026-04-02T07:00:13+00:00'),
      priority: 0.80,
    },
    {
      url: 'https://justblogify.in/videos',
      lastModified: new Date('2026-04-02T07:00:13+00:00'),
      priority: 0.80,
    },
    {
      url: 'https://justblogify.in/blog/new-blog-post',
      lastModified: new Date('2026-04-02T07:00:13+00:00'),
      priority: 0.80,
    },
    {
      url: 'https://justblogify.in/blog/the-blog-post',
      lastModified: new Date('2026-04-02T07:00:13+00:00'),
      priority: 0.80,
    },
    {
      url: 'https://justblogify.in/blog/second-blog',
      lastModified: new Date('2026-04-02T07:00:13+00:00'),
      priority: 0.80,
    },
  ]
}