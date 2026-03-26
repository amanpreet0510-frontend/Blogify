import { type SchemaTypeDefinition } from 'sanity'
import { blog } from './documents/blog'
import { category } from './documents/category'
import { about } from './documents/about';
import { header } from './documents/header';
import {heroSection} from './sections/heroSection';
import {brands} from './sections/brands'
import {page} from './documents/page'
import {footer} from './documents/footer'
import { socials } from './sections/social';


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, category,about,header,page,brands,heroSection,footer,socials],
}
