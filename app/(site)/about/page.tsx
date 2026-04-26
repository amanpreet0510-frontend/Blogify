import React from "react";
import { BlogContent } from "@/components/blog/BlogContent";
import { getAboutPage } from "@/lib/getBlogs";
import Image from "next/image";

export default async function AboutPage() {
  const [aboutData] = await Promise.all([
    getAboutPage()
  ]);

  return (
    <div className=" bg-background text-foreground">
      {aboutData?.map((item) => (
        <main key={item._id} className="bg-white px-6 py-10 text-gray-800 sm:py-12">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:gap-12">
            <div className="min-w-0">
              {/* Heading */}
              <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
                {item?.title}
              </h1>

              {/* Main Content (Rich Text) */}
              {item?.content && (
                <section className="prose prose-blue mt-8 max-w-none">
                  <BlogContent content={item.content} />
                </section>
              )}
            </div>
            <div className="w-full lg:sticky lg:top-24">
              {/* Featured Image */}
              {item?.featuredImage && (
                <div className="relative mb-8 mt-4 w-full overflow-hidden rounded-xl bg-muted shadow-lg">
                  <Image
                    src={typeof item.featuredImage === "string" ? item.featuredImage : ""}
                    alt={item.title}
                    className="h-auto max-h-[70vh] w-full object-contain"
                    priority
                    height={1200}
                    width={1200}
                  />
                </div>
              )}
            </div>
          </div>
            {/* Mission / Description */}
            {item?.description && (
              <section className="mx-auto mt-8 mb-12 max-w-5xl">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </section>
            )}
        </main>
      ))}
    </div>
  );
}