import { defineArrayMember, defineField, defineType } from "sanity";

const requiredText = (name: string, title: string) =>
  defineField({ name, title, type: "string", validation: (rule) => rule.required() });

export const pageContentType = defineType({
  name: "pageContent",
  title: "Website page",
  type: "document",
  fields: [
    defineField({
      name: "pageKey",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
          { title: "Projects", value: "projects" },
          { title: "Blog listing", value: "blog" },
          { title: "Careers", value: "careers" },
          { title: "Realtor application", value: "careersTwo" },
          { title: "Contact", value: "contact" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Page introduction",
      type: "object",
      fields: [
        requiredText("title", "Heading"),
        defineField({ name: "accent", title: "Highlighted words", type: "string" }),
        defineField({ name: "subtitle", title: "Supporting text", type: "text", rows: 3 }),
        defineField({ name: "eyebrow", title: "Small heading", type: "string" }),
        defineField({ name: "primaryLabel", title: "Primary button label", type: "string" }),
        defineField({ name: "primaryHref", title: "Primary button destination", type: "string" }),
        defineField({ name: "secondaryLabel", title: "Secondary button label", type: "string" }),
        defineField({ name: "secondaryHref", title: "Secondary button destination", type: "string" }),
        defineField({ name: "image", title: "Main image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })] }),
        defineField({ name: "images", title: "Additional images", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })] })] }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      description: "Section keys connect content to the existing website layout. Keep the supplied keys unchanged.",
      type: "array",
      of: [
        defineArrayMember({
          name: "contentSection",
          title: "Content section",
          type: "object",
          fields: [
            requiredText("key", "Section key"),
            defineField({ name: "eyebrow", title: "Small heading", type: "string" }),
            defineField({ name: "title", title: "Heading", type: "string" }),
            defineField({ name: "accent", title: "Highlighted words", type: "string" }),
            defineField({ name: "subtitle", title: "Supporting text", type: "text", rows: 3 }),
            defineField({ name: "body", title: "Paragraphs", type: "array", of: [defineArrayMember({ type: "text", rows: 3 })] }),
            defineField({ name: "buttonLabel", title: "Button label", type: "string" }),
            defineField({ name: "buttonHref", title: "Button destination", type: "string" }),
            defineField({ name: "image", title: "Main image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })] }),
            defineField({ name: "images", title: "Gallery", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })] })] }),
            defineField({
              name: "items",
              title: "Cards / entries / options",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "Title", type: "string" }),
                    defineField({ name: "subtitle", title: "Subtitle / role / type", type: "string" }),
                    defineField({ name: "text", title: "Description", type: "text", rows: 3 }),
                    defineField({ name: "label", title: "Label / category", type: "string" }),
                    defineField({ name: "location", title: "Location", type: "string" }),
                    defineField({ name: "price", title: "Price", type: "string" }),
                    defineField({ name: "status", title: "Status", type: "string" }),
                    defineField({ name: "value", title: "Value", type: "string" }),
                    defineField({ name: "href", title: "Link", type: "string" }),
                    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })] }),
                    defineField({ name: "details", title: "Details / features", type: "array", of: [defineArrayMember({ type: "string" })] }),
                    defineField({
                      name: "options",
                      title: "Purchase or select options",
                      type: "array",
                      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", title: "Label", type: "string" }), defineField({ name: "value", title: "Value", type: "string" })] })],
                    }),
                  ],
                  preview: { select: { title: "title", subtitle: "subtitle", media: "image" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "title", subtitle: "key", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Search preview",
      type: "object",
      fields: [
        defineField({ name: "title", title: "SEO title", type: "string", validation: (rule) => rule.max(60) }),
        defineField({ name: "description", title: "SEO description", type: "text", rows: 3, validation: (rule) => rule.max(160) }),
        defineField({ name: "image", title: "Social sharing image", type: "image" }),
      ],
    }),
  ],
  preview: { select: { title: "hero.title", subtitle: "pageKey", media: "hero.image" } },
});
