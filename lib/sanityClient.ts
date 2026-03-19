import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Lazy-initialized Sanity client to avoid errors when env vars are not set

// Check if Sanity is properly configured
export function isSanityConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
}

// Sanity client configuration - only create if configured
let sanityClientInstance: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) {
    return null;
  }
  
  if (!sanityClientInstance) {
    sanityClientInstance = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: process.env.NODE_ENV === "production",
    });
  }
  
  return sanityClientInstance;
}

// Image URL builder for Sanity images
export function urlFor(source: SanityImageSource): string | null {
  const client = getSanityClient();
  if (!client) return null;
  
  const builder = imageUrlBuilder(client);
  return builder.image(source).url();
}
