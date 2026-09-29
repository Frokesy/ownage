import { useState } from "react";
import { Link } from "react-router-dom";
import BlogImage from "../blog/BlogImage";
import { useBlogPosts } from "../../context/BlogContext";
import { findCmsSection, useCmsPage } from "../../context/SiteContentContext";
import ImageReveal from "../defaults/ImageReveal";
import MotionIn from "../defaults/MotionIn";
import { motion, useReducedMotion } from "framer-motion";

const Blog = () => {
  const { posts } = useBlogPosts();
  const section = findCmsSection(useCmsPage("home"), "latestNews");
  const prefersReducedMotion = useReducedMotion();
  const featuredPosts = posts.slice(0, 3);
  const [activeId, setActiveId] = useState<number | string | null>(null);
  const resolvedActiveId = featuredPosts.some((post) => post.id === activeId)
    ? activeId
    : featuredPosts[0]?.id;

  return (
    <section className="mx-auto w-[90%] max-w-7xl py-14 lg:py-24">
      <div className="flex items-center justify-center">
        <MotionIn effect="zoom">
          <h2 className="bg-[url('/purple-text-bg.svg')] lexend bg-contain bg-center bg-no-repeat px-3 py-2 text-[36px] font-semibold text-white sm:text-[48px] lg:text-[62px]">
            {section?.accent || "Latest"}
          </h2>
        </MotionIn>
        <MotionIn effect="down" delay={0.12}>
          <h2 className="ml-2 text-[36px] font-semibold lexend sm:text-[48px] lg:ml-3 lg:text-[62px]">
            {section?.title || "News"}
          </h2>
        </MotionIn>
      </div>

      <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-start">
        {featuredPosts.map((item, index) => {
          const isActive = item.id === resolvedActiveId;

          return (
            <motion.article
              key={item.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: index % 2 === 0 ? 36 : -28, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={prefersReducedMotion ? undefined : { y: -7, scale: 1.015 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
              className={`group min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm transition-[flex-basis,box-shadow] duration-500 ease-out motion-reduce:transition-none md:shrink md:grow-0 ${
                isActive
                  ? "md:basis-1/2 md:shadow-xl"
                  : "md:basis-1/4 md:hover:shadow-lg"
              }`}
            >
              <ImageReveal direction={index % 2 === 0 ? "left" : "right"}>
                <BlogImage
                  src={item.img}
                  alt={item.imageAlt || ""}
                  className={`w-full object-cover transition-[height,filter,transform] duration-500 ease-out motion-reduce:transition-none ${
                    isActive
                      ? "h-[260px] sm:h-[330px] md:h-[360px]"
                      : "h-[180px] sm:h-[220px] md:h-[260px] md:grayscale-[20%] group-hover:grayscale-0"
                  }`}
                />
              </ImageReveal>
              <div className="p-5 sm:p-6">
                <MotionIn effect="zoom">
                  <h3
                    className={`font-bold lexend transition-[font-size] duration-500 ${isActive ? "text-[22px] lg:text-[24px]" : "text-[18px] lg:text-[20px]"}`}
                  >
                    {item.title}
                  </h3>
                </MotionIn>

                <div
                  aria-hidden={!isActive}
                  className={`grid transition-[grid-template-rows,opacity,transform,margin] duration-500 ease-out motion-reduce:transition-none ${
                    isActive
                      ? "mt-3 grid-rows-[1fr] translate-y-0 opacity-100"
                      : "mt-0 grid-rows-[0fr] translate-y-2 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <MotionIn effect="up" delay={0.08}>
                      <p className="text-[16px] leading-7 text-[#282828] lg:text-[18px]">
                        {item.excerpt}
                      </p>
                    </MotionIn>
                  </div>
                </div>

                {isActive ? (
                  <MotionIn effect="down" delay={0.16}><Link to={`/blog/${item.slug}`} className="micro-nav-link mt-4 inline-block font-semibold text-purple-20 hover:text-purple-800">Read article</Link></MotionIn>
                ) : (
                  <button type="button" onClick={() => setActiveId(item.id)} aria-expanded={false} className="mt-4 font-semibold text-purple-20 underline decoration-2 underline-offset-4 hover:text-purple-800">Expand</button>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="flex items-center lg:my-20 my-10 justify-center">
        <MotionIn effect="zoom">
          <Link to={section?.buttonHref || "/blog"} className="micro-button lg:text-[22px] text-[18px] font-semibold text-white bg-purple-20 py-3 px-10 rounded-xl">
            {section?.buttonLabel || "Explore more"}
          </Link>
        </MotionIn>
      </div>
    </section>
  );
};

export default Blog;
