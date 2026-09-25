import { defineArrayMember, defineField, defineType } from "sanity";

const linkFields = [
  defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
  defineField({ name: "href", title: "Destination", type: "string", validation: (rule) => rule.required() }),
];

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Company name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "footerDescription", title: "Footer description", type: "text", rows: 3 }),
    defineField({ name: "copyright", title: "Copyright text", type: "string" }),
    defineField({ name: "navigation", title: "Navigation", type: "array", of: [defineArrayMember({ type: "object", fields: linkFields })] }),
    defineField({
      name: "footerGroups",
      title: "Footer columns",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", title: "Heading", type: "string" }), defineField({ name: "links", title: "Links", type: "array", of: [defineArrayMember({ type: "object", fields: [...linkFields, defineField({ name: "accent", title: "Accent link", type: "boolean" })] })] })] })],
    }),
    defineField({ name: "socialLinks", title: "Social links", type: "array", of: [defineArrayMember({ type: "object", fields: linkFields })] }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "contactPhone", title: "Contact phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
