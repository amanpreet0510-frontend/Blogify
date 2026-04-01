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
    <div className='my-5 flex flex-col gap-4 bg-[#F2F2F2] px-4 py-5 sm:flex-row sm:items-center sm:gap-8'>
      <div className='flex items-center justify-center text-center font-bold text-black sm:justify-start'>As featured in</div>
      <hr className='hidden h-10 w-px bg-gray-300 sm:block'/>
      <div ref={sliderRef} className="keen-slider min-w-0 flex-1">
        {brands?.brandLogos?.map((brand, index) => (
          <div key={index} className="keen-slider__slide flex justify-center items-center">
            <Image src={brand.iconUrl} alt={brand.link || `Brand ${index + 1}`} width={150} height={100} className='h-auto max-w-full object-contain p-1'/>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Brands;