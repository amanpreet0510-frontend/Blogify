import { defineType, defineField } from "sanity";

export const videoPage = defineType({
  name: 'videoPage',
  title: 'Video Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featuredVideo',
      title: 'Featured Video',
      type: 'reference',
      to: [{ type: 'video' }],
      description: 'The large video displayed at the top.'
    })
  ],
});