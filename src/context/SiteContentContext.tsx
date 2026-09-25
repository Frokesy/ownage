import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { fetchSiteContent, isSanityConfigured } from "../lib/sanity";
import type { CmsPage, CmsSection, SiteSettings } from "../lib/sanity";

type SiteContentValue = {
  pages: Record<string, CmsPage>;
  settings?: SiteSettings;
  isLoading: boolean;
};

const SiteContentContext = createContext<SiteContentValue | undefined>(undefined);

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState<Record<string, CmsPage>>({});
  const [settings, setSettings] = useState<SiteSettings>();
  const [isLoading, setIsLoading] = useState(isSanityConfigured);

  useEffect(() => {
    if (!isSanityConfigured) return;
    let active = true;
    fetchSiteContent()
      .then((result) => {
        if (!active) return;
        setPages(Object.fromEntries(result.pages.map((page) => [page.pageKey, page])));
        setSettings(result.settings);
      })
      .catch((error) => console.error("Could not load website content from Sanity.", error))
      .finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, []);

  const value = useMemo(() => ({ pages, settings, isLoading }), [pages, settings, isLoading]);
  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) throw new Error("useSiteContent must be used inside SiteContentProvider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCmsPage = (pageKey: string) => useSiteContent().pages[pageKey];

// eslint-disable-next-line react-refresh/only-export-components
export const findCmsSection = (page: CmsPage | undefined, key: string): CmsSection | undefined =>
  page?.sections?.find((section) => section.key === key);
