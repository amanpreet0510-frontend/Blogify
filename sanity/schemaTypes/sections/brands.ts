import { defineType, defineField } from "sanity";

export const brands = defineType({
  name: "brands",
  title: "Brands",
  type: "object",
  fields: [
     defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brandLogos",
      title: "Brand Logos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "image",
              options: {
                hotspot: true,
              },
            },      
            {
              name: "link",
              title: "Link",
              type: "string",
            },
            {
              name: "openInNewTab",
              title: "Open in New Tab",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
    }),
  ],
});