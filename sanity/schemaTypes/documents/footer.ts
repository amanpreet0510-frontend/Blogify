import { defineType, defineField } from "sanity";

export const footer = defineType({
    name: "footer",
    title: "Footer",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "featuredImage",
            title: "Featured Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),

        defineField({
            name: "linkColumns",
            title: "Link Columns",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Column Title",
                            type: "string",
                        }),
                        defineField({
                            name: "links",
                            title: "Links",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    fields: [
                                        { name: "label", type: "string", title: "Label" },
                                        { name: "url", type: "string", title: "URL" },
                                    ],
                                },
                            ],
                        }),
                    ],
                },
            ],
        }),

        defineField({
            name: "newsletter",
            title: "Newsletter",
            type: "object",
            fields: [
                { name: "title", type: "string" },
                { name: "emailLabel", type: "string" },
                { name: "placeholder", type: "string" },
                { name: "checkboxText", type: "string" },
                { name: "isCheckboxRequired", type: "boolean" },
                { name: "buttonText", type: "string" },
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


        defineField({
            name: "copyright",
            title: "Copyright Text",
            type: "string",
        }),
    ],
});



export const newsletterSection = defineType({
    name: "newsletterSection",
    title: "Newsletter Section",
    type: "object",
    fields: [
        // Heading

    ],
});