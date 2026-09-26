import type { StructureResolver } from "sanity/structure";

const pages = [
  ["Home", "page-home"],
  ["About", "page-about"],
  ["Projects", "page-projects"],
  ["Blog listing", "page-blog"],
  ["Careers", "page-careers"],
  ["Realtor application", "page-careers-two"],
  ["Contact", "page-contact"],
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Ownage website")
    .items([
      S.listItem().title("Site settings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(S.list().title("Pages").items(pages.map(([title, id]) => S.listItem().title(title).child(S.document().schemaType("pageContent").documentId(id))))),
      S.divider(),
      S.documentTypeListItem("post").title("Blog posts"),
      S.documentTypeListItem("author").title("Authors"),
    ]);
