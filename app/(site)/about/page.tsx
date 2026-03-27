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
        <main key={item._id} className=" bg-white text-gray-800 px-6 py-12">
          <div className="max-w-4xl mx-auto  flex justify-between gap-15">
            <div>
              {/* Heading */}
              <h1 className="text-4xl font-bold mb-6">
                {item?.title}
              </h1>

              {/* Main Content (Rich Text) */}
              {item?.content && (
                <section className="mt-8 prose prose-blue max-w-sm">
                  <BlogContent content={item.content} />
                </section>
              )}
            </div>
            <div>
              {/* Featured Image */}
              {item?.featuredImage && (
                <div className="relative  w-full mb-8 overflow-hidden shadow-lg mt-20">
                  <Image
                    src={typeof item.featuredImage === 'string' ? item.featuredImage : ""}
                    alt={item.title}
                    className="object-cover"
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