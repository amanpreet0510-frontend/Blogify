import { type SchemaTypeDefinition } from 'sanity'
import { blog } from './blog'
import { category } from './category'
import { about } from './about';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, category,about],
}
