'use client';
import React from 'react';
import { Socials } from '@/lib/types'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"



const Social = ({ social }: { social: Socials }) => {

  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: { origin: "center", perView: 2.5, spacing: 10 },
    range: {
      min: -5,
      max: 5,
    },
  })

  const colors = [
    "number-slide1",
    "number-slide2",
    "number-slide3",
    "number-slide4",
    "number-slide5",
    "number-slide6",
  ];

  return (
    <>
      <div className='flex flex-wrap items-center justify-center gap-6 bg-[rgb(37,115,218)] px-4 py-4 sm:gap-10'>
        {social?.socialIcons?.map((item: any, index: number) => (
          <div
            key={index}
            className='text-center'
          >
            <div className='flex flex-row justify-center'>
              <img
                src={item?.iconUrl}
                alt={item?.title}
                className='h-12 w-12 object-contain p-2 sm:h-14 sm:w-14'
              />

            </div>
            <p className='text-white'>{item?.title}</p>
          </div>
        ))}</div>
      <div ref={ref} className="keen-slider">


        {social?.featuredImages?.map((item: any, index: number) => (
          <div
            key={`img-${index}`}
            className={`keen-slider__slide ${colors[(social?.socialIcons?.length + index) % colors.length]
              }`}
          >
            <img
              src={item?.imageUrl}
              alt="featured"
              className='object-cover'
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ))}

      </div>
    </>
  )
}

export default Social;