import React from "react";
import { getVideoPage, getAllVideos } from "@/lib/getBlogs";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { VideoList } from "@/components/sections/VideoList";

export default async function VideosPage() {
    const [videoPageData, allVideos] = await Promise.all([
        getVideoPage(),
        getAllVideos(),
    ]);

    if (!videoPageData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl font-semibold">Loading video content...</p>
            </div>
        );
    }

    const { title, description, featuredVideo } = videoPageData;

    return (
        <div className="bg-white text-gray-900 min-h-screen">
            <div className="container mx-auto px-6 py-16 md:py-24">
                {/* Header Section */}
                <header className="mb-5 flex flex-col gap-6 pb-10">
                    <div className="mt-10 flex flex-col gap-15">
                    <h1 className="text-4xl uppercase tracking-tighter leading-none">
                        {title}
                    </h1>
                    <p className="text-gray-400 max-w-4xl">
                        {description}
                    </p>
                    </div>
                </header>

                {/* Main Featured Video */}
                {featuredVideo && (
                    <div className="mb-24 md:mb-40 group">
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-black ring-1 ring-gray-100">
                            <VideoPlayer
                                videoUrl={featuredVideo.videoUrl}
                                thumbnail={featuredVideo.thumbnail}
                                title={title}
                                isFeatured={true}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                )}

                {/* Video List with Search/Filter */}
                <section>
                    <div className="flex flex-col mt-10">
                    <VideoList videos={allVideos} />
                     </div>
                </section>
            </div>
        </div>
    );
}
