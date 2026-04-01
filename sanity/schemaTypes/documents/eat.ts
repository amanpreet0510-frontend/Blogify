import { defineType, defineField } from "sanity";

// Category schema for organizing blog posts
export const eat = defineType({
    name: "eat",
    title: "Eat",
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
            name: "blogs",
            title: "Select Blogs",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "blog" }],
                },
            ],
        }),],
    preview: {
        select: {
            title: "title",
        },
    },
});
