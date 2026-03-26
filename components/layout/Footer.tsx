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
      <footer className="border-t border-border/50 bg-card/30">
      <div className='container'>
        <div className='flex gap-10 mt-10'>
          <div className='flex'>
            <div>
              <img src={footer?.featuredImage} alt="" />
            </div>
            <div className='p-10'>
              <h1>{footer?.title}</h1>
              <p className='max-w-xl'>{footer?.description}</p>
              {footer?.linkColumns.map((column) => (
                <div className='flex gap-2'>
                  <h1>{column.title}</h1>
                  {column.links.map((link) => (
                    <a href={link.url}>{link.label}</a>
                  ))}
                  <FaArrowRight />
                </div>
              ))}
              
            </div>
          </div>

          <div className=''>
            <h1>{footer?.newsletter.title}</h1>
            <p>{footer?.newsletter.emailLabel}</p>
            <Input type="email" placeholder={footer?.newsletter.placeholder} />
            <span className='flex gap-5'>
            <input type="checkbox" />
            <p>{footer?.newsletter.checkboxText}</p>
            </span>
            <Button variant={"default"}>{footer?.newsletter.buttonText}</Button>
          </div>

        </div>
        <div className='flex justify-between'>
          <div><p>{footer?.copyright}</p></div>
          <div className='flex justify-between gap-10'>
          {footer?.socialIcons.map((socialLink) => (
            <div>
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