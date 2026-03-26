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
      <div className='flex justify-center gap-30  bg-[rgb(37,115,218)]'>
        {social?.socialIcons?.map((item: any, index: number) => (
          <div
            key={index}
            className=''
          >
            <div className='flex flex-row'>
              <img
                src={item?.iconUrl}
                alt={item?.title}
                className='object-contain p-5'
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