import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { blogPosts as fallbackPosts } from "../data/blog";
import type { BlogPost } from "../data/blog";
import { fetchBlogPosts, isSanityConfigured } from "../lib/sanity";

type BlogContextValue = {
  posts: BlogPost[];
  isLoading: boolean;
  isUsingFallback: boolean;
};

const BlogContext = createContext<BlogContextValue | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState(fallbackPosts);
  const [isLoading, setIsLoading] = useState(isSanityConfigured);
  const [isUsingFallback, setIsUsingFallback] = useState(!isSanityConfigured);

  useEffect(() => {
    if (!isSanityConfigured) return;

    let active = true;

    fetchBlogPosts()
      .then((cmsPosts) => {
        if (!active) return;
        if (cmsPosts.length > 0) {
          setPosts(cmsPosts);
          setIsUsingFallback(false);
        } else {
          setIsUsingFallback(true);
        }
      })
      .catch((error) => {
        console.error("Could not load Sanity blog posts; using local posts.", error);
        if (active) setIsUsingFallback(true);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({ posts, isLoading, isUsingFallback }),
    [posts, isLoading, isUsingFallback],
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

// This colocated hook is the public API for the provider above.
// eslint-disable-next-line react-refresh/only-export-components
export const useBlogPosts = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlogPosts must be used inside BlogProvider");
  return context;
};
