import { defineType, defineField } from "sanity";

export const video = defineType({
  name: 'video',
  title: 'Videos',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ 
      name: 'thumbnail', 
      title: 'Thumbnail Image', 
      type: 'image',
      options: { hotspot: true } 
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or Mux link'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Travel', value: 'travel' },
          { title: 'Lifestyle', value: 'lifestyle' },
          { title: 'Nature', value: 'nature' },
        ],
      },
    }),
  ],
});