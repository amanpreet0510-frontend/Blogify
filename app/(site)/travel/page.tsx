import React from "react";
import { BlogContent } from "@/components/blog/BlogContent";
import { getTravelPage } from "@/lib/getBlogs";
import Image from "next/image";
import { BlogList } from "@/components/blog/BlogList";
import { getAllBlogs, getAllCategories, getPage } from "@/lib/getBlogs";

export default async function TravelPage() {
    const [travelData,blogs,categories] = await Promise.all([
        getTravelPage(),
        getAllBlogs(),
        getAllCategories()
    ]);

    console.log('travelData', travelData)

    if (!travelData) {
        return <div>Loading...</div>; 
    }

    return (
        <div className=" bg-background text-foreground">
           
                <main key={travelData._id} className=" bg-white px-6 py-10 text-gray-800 sm:py-12">
                    <div className="mx-auto flex max-w-6xl justify-between">
                        <div className="container">
                            {/* Heading */}
                            <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
                                {travelData.title}
                            </h1>
                            <p className="max-w-4xl text-sm sm:text-base">
                                {travelData.excerpt}
                            </p>
                        </div>
                        </div>
                        <BlogList blogs={blogs} categories={categories} showSearch={blogs[0]?.showSearch} />
                </main>
        </div>
    );
}