import React from 'react'
import { getFooter } from '@/lib/getBlogs'
import { Button } from '../ui/button';
import { Input } from '../ui/input'; 
import { FaArrowRight } from "react-icons/fa6";

const Footer = async () => {

  const footer = await getFooter();
  if (!footer) return null;


  return (
    <>
      <footer className="py-10 bg-[#696969] text-[#eeee]">
      <div className='container'>
        <div className='flex justify-between gap-10'>
          <div className='flex gap-10'>
            <div>
              <img src={footer?.featuredImage} alt=""/>
            </div>
            <div className=''>
              <h1 className='text-2xl'>{footer?.title}</h1>
              <p className='max-w-sm py-5'>{footer?.description}</p>
              {footer?.linkColumns.map((column, colIdx) => (
                <div key={colIdx} className='flex left-0 '>
                  <h1>{column.title}</h1>
                  {column.links.map((link, linkIdx) => (
                    <a key={linkIdx} href={link.url}>{link.label}</a>
                  ))}
                  <FaArrowRight/>
                </div>
              ))}
              
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <h1>{footer?.newsletter.title}</h1>
            <p>{footer?.newsletter.emailLabel}</p>
            <Input type="email" placeholder={footer?.newsletter.placeholder} />
            <span className='flex gap-5'>
            <input type="checkbox" />
            <p>{footer?.newsletter.checkboxText}</p>
            </span>
            <button className='bg-[#2573DA] p-2 my-5'>{footer?.newsletter.buttonText}</button>
          </div>

        </div>
        <div className='flex justify-between'>
          <div><p>{footer?.copyright}</p></div>
          <div className='flex gap-17'>
          {footer?.socialIcons.map((socialLink, index) => (
            <div key={index}>
              <img src={socialLink.iconUrl} alt="" />
            </div>
          ))}
          </div>
          
        </div>
      </div>
      </footer>
    </>
  )
}

export default Footer;