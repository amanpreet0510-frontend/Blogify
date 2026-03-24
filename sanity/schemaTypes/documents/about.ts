import { defineType, defineField } from "sanity";

// Category schema for organizing blog posts
export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "A short description of the blog post (max 200 characters)",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief description of the category",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
