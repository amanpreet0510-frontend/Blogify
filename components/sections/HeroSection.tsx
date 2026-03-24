
import React from 'react'
import Image from 'next/image';
import { urlFor } from '@/lib/sanityClient';
import { getPage } from "@/lib/getBlogs";
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import { BlogCard } from '../blog/BlogCard';
import type { BlogPost, Category } from "@/lib/types";


interface BlogListProps {
    blogs: BlogPost[];
    categories: Category[];
}

const HeroSection = async ({ blogs, categories }: BlogListProps) => {

    const PageData = await getPage();
    if (!PageData) return null;

    const herosection = PageData.sections.find(
        (section) => section._type === "heroSection"
    );

    if (!herosection) return null;

    return (
        <>



            <div className="relative w-full h-[400px]">
                <Image
                    src={herosection?.backgroundImage}
                    alt={herosection?.title}
                    fill
                    className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40">
                    <h1 className="text-4xl font-bold text-gray-100">{herosection?.title}</h1>
                    <p className="mt-2 text-gray-300">{herosection?.excerpt}</p>
                </div>
            </div>
            <p className='m-auto text-gray-500  items-center flex justify-evenly max-w-2xl p-10'>{herosection?.description}</p>
            <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {herosection?.blogs?.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>



        </>
    )
}

export default HeroSection