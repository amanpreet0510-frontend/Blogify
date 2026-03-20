import { type SchemaTypeDefinition } from 'sanity'
import { blog } from './blog'
import { category } from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, category],
}
