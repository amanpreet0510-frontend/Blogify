import React from 'react'
import { getPage } from '@/lib/getBlogs';
import Brands from './Brands';
import Social from './Social';


const SocialWrapper = async () => {

  const PageData = await getPage();
  if (!PageData) return null;

  

 const social = PageData.sections.find(
    (section) => section._type === "socials"
  );



  return (
    <>
      <Social social={social}/>
    </>
  )
}

export default SocialWrapper;