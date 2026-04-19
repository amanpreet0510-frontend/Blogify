'use client'
import React from 'react'
import Image from 'next/image';
import type { Brands } from '@/lib/types';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"


const animation = { duration: 30000, easing: (t) => t }




const Brands = ({ brands }: { brands: Brands }) => {

  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: {
      perView: 3,
      spacing: 0,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3, spacing: 0 },
      },
      "(min-width: 768px)": {
        slides: { perView: 4, spacing: 0 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 5, spacing: 0 },
      },
    },
    created(s) {
      s.moveToIdx(5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
  })


  return (
    <>
    <div className="relative left-1/2 my-10 w-screen max-w-[100vw] -translate-x-1/2">
    <div className="mx-auto flex max-w-[1280px] flex-col gap-4 border-y border-white/10 bg-card/70 px-4 py-8 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-8 sm:px-6">
      <div className="font-condensed flex items-center justify-center text-center text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground sm:justify-start">
        As featured in
      </div>
      <hr className="hidden h-10 w-px bg-white/15 sm:block" />
      <div ref={sliderRef} className="keen-slider min-w-0 flex-1">
        {brands?.brandLogos?.map((brand, index) => (
          <div key={index} className="keen-slider__slide flex justify-center items-center">
            <Image src={brand.iconUrl} alt={brand.link || `Brand ${index + 1}`} width={150} height={100} className='h-auto max-w-full object-contain p-1'/>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  )
}

export default Brands;