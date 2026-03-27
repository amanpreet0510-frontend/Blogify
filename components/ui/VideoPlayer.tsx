"use client";

import React, { useState } from "react";
import Image from "next/image";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail: string;
  title: string;
  description?: string;
  aspectRatio?: string;
  className?: string;
  isFeatured?: boolean;
}

export const VideoPlayer = ({ 
  videoUrl, 
  thumbnail, 
  title, 
  description,
  aspectRatio = "aspect-video", 
  className = "",
  isFeatured = false 
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const id = url.includes('youtu.be') ? url.split('/').pop() : new URL(url).searchParams.get('v');
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
      }
      if (url.includes('vimeo.com')) {
        const id = url.split('/').pop();
        return `https://player.vimeo.com/video/${id}?autoplay=1`;
      }
    } catch (e) {
      console.error("Invalid video URL", url);
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  if (isPlaying) {
    return (
      <div className={`relative w-full h-full bg-black overflow-hidden ${className}`}>
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        ></iframe>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full h-full cursor-pointer group overflow-hidden ${className}`}
      onClick={() => setIsPlaying(true)}
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        className={`object-cover transition-all duration-700 ${isFeatured ? "opacity-70 group-hover:scale-105" : "grayscale-30 group-hover:grayscale-0 group-hover:scale-110"}`}
        priority={isFeatured}
      />
      
      {!isFeatured && <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60"></div>}
      
      <div className="absolute inset-0 flex items-center justify-center">
        {isFeatured ? (
          <div className="flex flex-col items-center justify-center w-full h-full bg-black/20">
            <div className="inline-flex items-center px-10 py-5 bg-white text-black font-black rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] group-active:scale-95 cursor-pointer">
              <svg className="w-8 h-8 mr-4 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              WATCH FEATURED
            </div>
          </div>
        ) : (
          <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 border border-white/30">
            <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
