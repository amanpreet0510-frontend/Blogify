import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Sanity Webhook Handler for On-Demand Revalidation
 * 
 * This route revalidates pages when content is published in Sanity CMS.
 * Webhook Setup: In Sanity, create a webhook pointing to:
 * https://yourdomain.com/api/revalidate
 * 
 * Headers:
 * - Content-Type: application/json
 * - x-sanity-webhook-secret: {SANITY_WEBHOOK_SECRET}
 */

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook secret for security
    const secret = request.headers.get('x-sanity-webhook-secret');
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      console.warn('Webhook rejected: invalid secret');
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const body = await request.json();
    const { _type, _id, slug, isPublished } = body;

    // Only revalidate published content
    if (!isPublished) {
      return NextResponse.json({ message: 'Draft content ignored', revalidated: false });
    }

    const paths = new Set<string>();
    const tags = new Set<string>();

    // Handle blog posts
    if (_type === 'blog') {
      // Revalidate specific blog page
      if (slug?.current) {
        paths.add(`/blog/${slug.current}`);
      }

      // Revalidate related pages
      paths.add('/');
      paths.add('/blog');
      
      // Tag for targeted revalidation
      tags.add('blogs');
      if (slug?.current) {
        tags.add(`blog-${slug.current}`);
      }
    }

    // Handle categories
    if (_type === 'category') {
      paths.add('/');
      tags.add('categories');
    }

    // Handle travel page
    if (_type === 'travel') {
      paths.add('/travel');
      tags.add('travel');
    }

    // Handle eat page
    if (_type === 'eat') {
      paths.add('/eat');
      tags.add('eat');
    }

    // Handle about page
    if (_type === 'about') {
      paths.add('/about');
      tags.add('about');
    }

    // Handle header
    if (_type === 'header') {
      paths.add('/');
      paths.add('/blog');
      tags.add('header');
    }

    // Handle footer
    if (_type === 'footer') {
      paths.add('/');
      tags.add('footer');
    }

    // Handle page
    if (_type === 'page') {
      paths.add('/');
      tags.add('page');
    }

    // Revalidate all paths
    for (const path of paths) {
      revalidatePath(path);
      console.log(`✓ Revalidated path: ${path}`);
    }

    // Revalidate all tags (for more granular control)
    for (const tag of tags) {
      revalidateTag(tag);
      console.log(`✓ Revalidated tag: ${tag}`);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths: Array.from(paths),
      tags: Array.from(tags),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}