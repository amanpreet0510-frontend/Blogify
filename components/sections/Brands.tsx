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
    <div className='bg-white rounded-2xl flex justify-between gap-20 p-5 m-10'>
      <div className='text-black text-center items-center flex justify-center ps-10 font-bold'>As featured in</div>
      <hr className='w-1 h-10'/>
      <div ref={sliderRef} className="keen-slider">
        {brands?.brandLogos?.map((brand, index) => (
          <div key={index} className="keen-slider__slide flex justify-center items-center">
            <Image src={brand.iconUrl} alt={brand.link || `Brand ${index + 1}`} width={150} height={100} className='object-contain p-1'/>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Brands;