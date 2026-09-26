import { createClient } from "@sanity/client";
import type { PortableTextBlock } from "@portabletext/types";
import type { BlogPost } from "../data/blog";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || "production";

export const isSanityConfigured = Boolean(projectId);

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-09-01",
      useCdn: false,
    })
  : null;

type SanityPost = {
  id: string;
  slug: string;
  img?: string;
  imageAlt?: string;
  title: string;
  category: BlogPost["category"];
  excerpt: string;
  author?: string;
  publishedAt: string;
  body?: PortableTextBlock[];
};

const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  "img": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  category,
  excerpt,
  "author": author->name,
  publishedAt,
  body[]{
    ...,
    _type == "image" => {"url": asset->url}
  }
}`;

const formatDisplayDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  if (!client) return [];

  const posts = await client.fetch<SanityPost[]>(postsQuery);

  return posts.map((post) => ({
    ...post,
    img: post.img || "/blog-img-1.png",
    author: post.author || "Ownage",
    displayDate: formatDisplayDate(post.publishedAt),
    content: [],
  }));
};

export type CmsImage = { url?: string; alt?: string };
export type CmsItem = {
  _key?: string;
  title?: string;
  subtitle?: string;
  text?: string;
  label?: string;
  location?: string;
  price?: string;
  status?: string;
  value?: string;
  href?: string;
  image?: CmsImage;
  details?: string[];
  options?: { label?: string; value?: string }[];
};
export type CmsSection = {
  _key?: string;
  key: string;
  eyebrow?: string;
  title?: string;
  accent?: string;
  subtitle?: string;
  body?: string[];
  buttonLabel?: string;
  buttonHref?: string;
  image?: CmsImage;
  images?: CmsImage[];
  items?: CmsItem[];
};
export type CmsPage = {
  pageKey: string;
  hero?: {
    title?: string;
    accent?: string;
    subtitle?: string;
    eyebrow?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    image?: CmsImage;
    images?: CmsImage[];
  };
  sections?: CmsSection[];
  seo?: { title?: string; description?: string; image?: CmsImage };
};
export type SiteSettings = {
  companyName?: string;
  logo?: CmsImage;
  footerDescription?: string;
  copyright?: string;
  navigation?: { label: string; href: string }[];
  footerGroups?: { _key?: string; title?: string; links?: { label: string; href: string; accent?: boolean }[] }[];
  socialLinks?: { label: string; href: string }[];
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
};

const siteContentQuery = `{
  "pages": *[_type == "pageContent"] {
    pageKey,
    hero {..., image {..., "url": asset->url}, images[]{..., "url": asset->url}},
    sections[]{
      ...,
      image {..., "url": asset->url},
      images[]{..., "url": asset->url},
      items[]{..., image {..., "url": asset->url}}
    },
    seo {..., image {..., "url": asset->url}}
  },
  "settings": *[_type == "siteSettings"][0] {
    ...,
    logo {..., "url": asset->url}
  }
}`;

export const fetchSiteContent = async (): Promise<{ pages: CmsPage[]; settings?: SiteSettings }> => {
  if (!client) return { pages: [] };
  return client.fetch(siteContentQuery);
};
