import React from "react";
import { BlogContent } from "@/components/blog/BlogContent";
import { getAboutPage } from "@/lib/getBlogs";
import Image from "next/image";

export default async function AboutPage() {
  const [aboutData] = await Promise.all([
    getAboutPage()
  ]);

  console.log('aboutData', aboutData)

  return (
    <div className=" bg-background text-foreground">
      {aboutData?.map((item) => (
        <main key={item._id} className=" bg-white px-6 py-10 text-gray-800 sm:py-12">
          <div className="mx-auto flex max-w-5xl flex-col justify-between gap-8 lg:flex-row lg:gap-12">
            <div>
              {/* Heading */}
              <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
                {item?.title}
              </h1>

              {/* Main Content (Rich Text) */}
              {item?.content && (
                <section className="prose prose-blue mt-8 max-w-none lg:max-w-sm">
                  <BlogContent content={item.content} />
                </section>
              )}
            </div>
            <div>
              {/* Featured Image */}
              {item?.featuredImage && (
                <div className="relative mb-8 mt-4 w-full overflow-hidden shadow-lg lg:mt-20">
                  <Image
                    src={typeof item.featuredImage === 'string' ? item.featuredImage : ""}
                    alt={item.title}
                    className="h-auto w-full object-cover"
                    priority
                    height={500}
                    width={500}
                  />
                </div>
              )}
            </div>
            </div>
            {/* Mission / Description */}
            {item?.description && (
              <section className="mt-8 mb-12">
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