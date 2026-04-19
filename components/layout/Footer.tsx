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
      <footer className="border-t border-white/10 bg-gradient-to-b from-card/80 to-background py-12 text-foreground">
      <div className='container'>
        <div className='flex flex-col justify-between gap-10 lg:flex-row'>
          <div className='flex flex-col gap-8 sm:flex-row sm:gap-10'>
            <div>
              <img src={footer?.featuredImage} alt="" className="max-w-full h-auto"/>
            </div>
            <div className='min-w-0'>
              <h1 className='text-2xl'>{footer?.title}</h1>
              <p className='max-w-sm py-5'>{footer?.description}</p>
              {footer?.linkColumns.map((column, colIdx) => (
                <div key={colIdx} className='flex flex-wrap items-center gap-3'>
                  <h1>{column.title}</h1>
                  {column.links.map((link, linkIdx) => (
                    <a key={linkIdx} href={link.url}>{link.label}</a>
                  ))}
                  <FaArrowRight/>
                </div>
              ))}
              
            </div>
          </div>

          <div className='flex w-full max-w-md flex-col gap-5'>
            <h1>{footer?.newsletter.title}</h1>
            <p>{footer?.newsletter.emailLabel}</p>
            <Input type="email" placeholder={footer?.newsletter.placeholder} />
            <span className='flex gap-5'>
            <input type="checkbox" />
            <p>{footer?.newsletter.checkboxText}</p>
            </span>
            <button
              type="button"
              className="my-5 border border-primary/30 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--epic-glow)] transition hover:border-primary/50 hover:brightness-110"
            >
              {footer?.newsletter.buttonText}
            </button>
          </div>

        </div>
        <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div><p>{footer?.copyright}</p></div>
          <div className='flex flex-wrap items-center gap-4'>
          {footer?.socialIcons.map((socialLink, index) => (
            <div key={index}>
              <img src={socialLink.iconUrl} alt="" className="h-5 w-5 object-contain" />
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