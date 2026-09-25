import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../../data/blog";
import BlogImage from "../blog/BlogImage";

const featuredPosts = blogPosts.slice(0, 3);

const Blog = () => {
  const [activeId, setActiveId] = useState(featuredPosts[0].id);

  return (
    <section className="mx-auto w-[90%] max-w-7xl py-14 lg:py-24">
      <div className="flex items-center justify-center">
        <h2 className="bg-[url('/purple-text-bg.svg')] bg-contain bg-center bg-no-repeat px-3 py-2 text-[36px] font-semibold text-white sm:text-[48px] lg:text-[62px]">
          Latest
        </h2>
        <h2 className="ml-2 text-[36px] font-semibold sm:text-[48px] lg:ml-3 lg:text-[62px]">
          News
        </h2>
      </div>

      <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-start">
        {featuredPosts.map((item) => {
          const isActive = item.id === activeId;

          return (
            <article
              key={item.id}
              className={`group min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm transition-[flex-basis,box-shadow,transform] duration-500 ease-out motion-reduce:transition-none md:shrink md:grow-0 ${
                isActive
                  ? "md:basis-1/2 md:shadow-xl"
                  : "md:basis-1/4 md:hover:-translate-y-1 md:hover:shadow-lg"
              }`}
            >
              <BlogImage
                src={item.img}
                alt=""
                className={`w-full object-cover transition-[height,filter,transform] duration-500 ease-out motion-reduce:transition-none ${
                  isActive
                    ? "h-[260px] sm:h-[330px] md:h-[360px]"
                    : "h-[180px] sm:h-[220px] md:h-[260px] md:grayscale-[20%] group-hover:grayscale-0"
                }`}
              />
              <div className="p-5 sm:p-6">
                <h3
                  className={`font-bold transition-[font-size] duration-500 ${isActive ? "text-[22px] lg:text-[24px]" : "text-[18px] lg:text-[20px]"}`}
                >
                  {item.title}
                </h3>

                <div
                  aria-hidden={!isActive}
                  className={`grid transition-[grid-template-rows,opacity,transform,margin] duration-500 ease-out motion-reduce:transition-none ${
                    isActive
                      ? "mt-3 grid-rows-[1fr] translate-y-0 opacity-100"
                      : "mt-0 grid-rows-[0fr] translate-y-2 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[16px] leading-7 text-[#282828] lg:text-[18px]">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                {isActive ? (
                  <Link to={`/blog/${item.slug}`} className="mt-4 inline-block font-semibold text-purple-20 underline decoration-2 underline-offset-4 hover:text-purple-800">Read article</Link>
                ) : (
                  <button type="button" onClick={() => setActiveId(item.id)} aria-expanded={false} className="mt-4 font-semibold text-purple-20 underline decoration-2 underline-offset-4 hover:text-purple-800">Expand</button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex items-center lg:my-20 my-10 justify-center">
        <Link to="/blog" className="lg:text-[22px] text-[18px] font-semibold text-white bg-purple-20 py-3 px-10 rounded-xl">
          Explore more
        </Link>
      </div>
    </section>
  );
};

export default Blog;
