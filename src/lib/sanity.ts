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
      useCdn: true,
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
