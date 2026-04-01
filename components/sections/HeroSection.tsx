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
            <div className="relative w-full h-[400px]">
                {herosection?.backgroundImage && (
                    <Image
                        src={typeof herosection.backgroundImage === "string" ? herosection.backgroundImage : ""}
                        alt={herosection?.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40">
                    <h1 className="text-4xl font-bold text-gray-100">{herosection?.title}</h1>
                    <p className="mt-2 text-gray-300">{herosection?.excerpt}</p>
                </div>
            </div>
            
            {herosection?.description && (
                <p className='m-auto text-gray-500 items-center flex justify-evenly max-w-2xl p-10 text-center'>
                    {herosection.description}
                </p>
            )}

            <div className="m-15">
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