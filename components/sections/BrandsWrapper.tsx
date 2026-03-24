import React from 'react'
import { getPage } from '@/lib/getBlogs';
import Brands from './Brands';


const BrandsWrapper = async () => {

  const page = await getPage();
  if (!page) return null;

  const brands = page.sections.find(
    (section) => section._type === "brands"
  );

  return (
    <>
      <Brands brands={brands} />
    </>
  )
}

export default BrandsWrapper;