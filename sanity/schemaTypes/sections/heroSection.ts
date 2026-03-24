import { defineType, defineField } from "sanity";

// Category schema for organizing blog posts
export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
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
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
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
     defineField({
      name: "blogs",
      title: "Select Blogs",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "blog" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
