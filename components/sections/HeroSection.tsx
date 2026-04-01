import React from 'react'
import Image from 'next/image';
import { BlogCard } from '../blog/BlogCard';
import type { Herosection } from "@/lib/types";

interface HeroSectionProps {
    herosection: Herosection;
}

const HeroSection = ({ herosection }: HeroSectionProps) => {
    if (!herosection) return null;

    return (
        <>
            <div className="relative h-[280px] w-full sm:h-[360px] md:h-[420px]">
                {herosection?.backgroundImage && (
                    <Image
                        src={typeof herosection.backgroundImage === "string" ? herosection.backgroundImage : ""}
                        alt={herosection?.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center text-white">
                    <h1 className="text-2xl font-bold text-gray-100 sm:text-3xl md:text-4xl">{herosection?.title}</h1>
                    <p className="mt-2 max-w-2xl text-sm text-gray-300 sm:text-base">{herosection?.excerpt}</p>
                </div>
            </div>
            
            {herosection?.description && (
                <p className='m-auto flex max-w-2xl items-center justify-evenly p-6 text-center text-gray-500 sm:p-10'>
                    {herosection.description}
                </p>
            )}

            <div className="my-10 sm:my-12 md:my-16">
                <div className='container grid grid-cols-1 md:grid-cols-3 gap-6 '>
                {herosection?.blogs?.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
            </div>
        </>
    )
}

export default HeroSection