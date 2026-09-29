import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BlogPageSkeleton from "./components/blog/BlogPageSkeleton";
import PageLoader from "./components/defaults/PageLoader";
import { useSiteContent } from "./context/SiteContentContext";
import ThemeToggle from "./components/defaults/ThemeToggle";
import { motion, useReducedMotion } from "framer-motion";

const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const SiteBlog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Project = lazy(() => import("./pages/Project"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Careers = lazy(() => import("./pages/Careers"));
const CareersTwo = lazy(() => import("./pages/CareersTwo"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const location = useLocation();
  const { pages } = useSiteContent();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const pageKey = location.pathname === "/" ? "home" : location.pathname === "/careers-2" ? "careersTwo" : location.pathname.split("/")[1];
    const seo = pages[pageKey]?.seo;
    if (seo?.title) document.title = seo.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description && seo?.description) description.content = seo.description;
    const socialImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (socialImage && seo?.image?.url) socialImage.content = seo.image.url;
  }, [location.pathname, pages]);

  const fallback = location.pathname.startsWith("/blog") ? <BlogPageSkeleton /> : <PageLoader />;

  return (
  <>
  <Suspense fallback={fallback}>
    <motion.div
      key={location.pathname}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
    <Routes location={location}>
    <Route path="/" element={<Home />} />
    <Route path="/project" element={<Project />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/blog" element={<SiteBlog />} />
    <Route path="/blog/:slug" element={<BlogArticle />} />
    <Route path="/careers" element={<Careers />} />
    <Route path="/careers-2" element={<CareersTwo />} />
    <Route path="/contact" element={<Contact />} />

    <Route path="*" element={<NotFound />} />
    </Routes>
    </motion.div>
  </Suspense>
  <ThemeToggle />
  </>
  );
};

export default App;
