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
           
                <main key={travelData._id} className=" bg-white text-gray-800 px-6 py-12">
                    <div className="m-15 mx-auto  flex justify-between gap-15">
                        <div className="container">
                            {/* Heading */}
                            <h1 className="text-4xl font-bold mb-6">
                                {travelData.title}
                            </h1>
                            <p className="max-w-4xl">
                                {travelData.excerpt}
                            </p>
                        </div>
                        </div>
                        <BlogList blogs={blogs} categories={categories} showSearch={blogs[0]?.showSearch} />
                </main>
        </div>
    );
}