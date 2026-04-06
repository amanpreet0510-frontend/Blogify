import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook secret for security
    const secret = request.headers.get('x-sanity-webhook-secret');
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const body = await request.json();
    const { _type, slug } = body;

    if (_type === 'blog') {
      // Revalidate the specific blog page if slug exists
      if (slug?.current) {
        revalidatePath(`/blog/${slug.current}`);
        console.log(`Revalidated blog: /blog/${slug.current}`);
      }

      // Revalidate the home page to update the blog list
      revalidatePath('/');
      console.log('Revalidated home page');

      // Revalidate any blog listing pages
      revalidatePath('/blog');
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}