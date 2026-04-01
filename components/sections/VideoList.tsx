"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { Search, ChevronDown } from "lucide-react";
import type { Video } from "@/lib/types";

interface VideoListProps {
  videos: Video[];
}

export function VideoList({ videos }: VideoListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(videos.map((v) => v.category).filter(Boolean)));
    return ["all", ...cats];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesSearch =
        searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [videos, searchQuery, selectedCategory]);

  return (
    <div className="w-full">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
        <div className="relative w-full md:w-1/2 lg:w-1/3 group">
          <Search color="gray" className="absolute w-5 h-5 top-0" />
          <input
            type="text"
            placeholder="      Search video..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none outline-none"
          />
        </div>

        <div className="relative w-full md:w-64 group">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full appearance-none text-[#808080]"
          >
            <option value="all" className="text-gray-400">All Categories</option>
            {categories.filter(c => c !== "all").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-16">
          {filteredVideos.map((video) => (
            <div key={video._id} className="group flex flex-col">
              <div className="relative aspect-video mb-8">
                <VideoPlayer
                  videoUrl={video.videoUrl}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  className="rounded-3xl shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
                />
                {video.category && (
                  <div className="absolute top-4 left-4 pointer-events-none z-10">
                    <span className="bg-black text-white text-[9px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {video.category}
                    </span>
                  </div>
                )}
              </div>

              <div className="px-1">
                <h3 className="text-2xl font-black mb-3 group-hover:text-gray-500 transition-colors line-clamp-2 uppercase tracking-tight leading-none">
                  {video.title}
                </h3>
                <div className="h-1 w-12 bg-black opacity-0 group-hover:opacity-100 transition-all transform origin-left scale-x-0 group-hover:scale-x-100 duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="mb-6 inline-flex p-6 bg-white rounded-full shadow-lg">
            <Search className="w-10 h-10 text-gray-300" />
          </div>
          <p className="text-xl font-black text-gray-400 uppercase tracking-widest">No matching videos found</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
            className="mt-6 text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
