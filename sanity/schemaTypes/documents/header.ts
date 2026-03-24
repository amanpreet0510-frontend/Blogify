import { defineType, defineField } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
     defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "navigation",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
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

    defineField({
      name: "cta",
      title: "CTA Button",
      type: "object",
      fields: [
        {
          name: "label",
          title: "Button Text",
          type: "string",
        },
        {
          name: "link",
          title: "Button Link",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "socialIcons",
      title: "Social Icons",
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