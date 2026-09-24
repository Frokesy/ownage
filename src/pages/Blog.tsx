import { useState } from "react";
import TopNav from "../components/defaults/TopNav";
import Footer from "../components/defaults/Footer";
import { CalendarIcon, SmallAvatarIcon } from "../components/icons";

const categories = [
  "All Categories",
  "User Stories",
  "Updates",
  "Feature Spotlights",
  "Tips",
];

const blogItems = [
  {
    id: 1,
    img: "/blog-img-1.png",
    title: "5 Things to Consider Before Investing in Real Estate",
    category: "Tips",
    excerpt:
      "Learn the essential checks every buyer should make before committing to a property investment.",
  },
  {
    id: 2,
    img: "/blog-img-2.png",
    title: "Why Location Still Determines Property Value",
    category: "Feature Spotlights",
    excerpt:
      "See how infrastructure, access, and neighbourhood growth influence a property's long-term value.",
  },
  {
    id: 3,
    img: "/blog-img-3.png",
    title: "Designing Spaces People Love to Live In",
    category: "Updates",
    excerpt:
      "Thoughtful layouts and human-centred details can turn a building into a comfortable home.",
  },
  {
    id: 4,
    img: "/blog-img-1.png",
    title: "How One Family Found Their Perfect First Home",
    category: "User Stories",
    excerpt:
      "Follow one buyer's journey from their first inspection to receiving the keys to a new home.",
  },
  {
    id: 5,
    img: "/blog-img-2.png",
    title: "What to Know About Our Latest Development",
    category: "Updates",
    excerpt:
      "Discover the latest milestones, amenities, and availability from one of our growing communities.",
  },
  {
    id: 6,
    img: "/blog-img-3.png",
    title: "A Smarter Guide to Choosing Residential Land",
    category: "Tips",
    excerpt:
      "Practical questions to ask about title, access, utilities, and future development before buying.",
  },
];

const SiteBlog = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const visibleItems =
    activeCategory === categories[0]
      ? blogItems
      : blogItems.filter((item) => item.category === activeCategory);

  const selectCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-center px-4 py-6">
        <TopNav />
      </header>

      <div className="flex flex-col items-center justify-center space-y-3 px-5 py-10 text-center sm:py-14 lg:py-20">
        <h1 className="text-[38px] font-bold leading-tight sm:text-[50px]">
          Blog Articles
        </h1>
        <p className="max-w-xl text-[16px] leading-7 text-[#0E2824] sm:text-[18px] lg:text-[22px]">
          Perspectives and practical insights on real estate
        </p>
      </div>

      <main className="mx-auto my-6 flex w-[90%] max-w-7xl flex-col gap-8 sm:my-12 lg:my-10 lg:gap-12">
        <div className="md:hidden">
          <label
            htmlFor="blog-category"
            className="mb-2 block text-sm font-semibold text-purple-20"
          >
            Browse category
          </label>
          <select
            id="blog-category"
            value={activeCategory}
            onChange={(event) => selectCategory(event.target.value)}
            className="w-full rounded-xl border border-[#ccc] bg-white px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-purple-20"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        <div
          className="mx-auto hidden w-[70%] items-end justify-center md:flex"
          role="tablist"
          aria-label="Blog categories"
        >
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectCategory(category)}
                className={`min-h-14 flex-1 border-b px-2 pb-3 text-center text-[13px] font-semibold transition-[color,border-color,border-width] duration-300 lg:text-[14px] ${isActive ? "border-b-4 border-purple-20 text-black" : "border-[#ccc] text-[#808080] hover:border-purple-20/50 hover:text-purple-20"}`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p className="text-sm text-[#606060]" aria-live="polite">
          Showing {visibleItems.length}{" "}
          {visibleItems.length === 1 ? "article" : "articles"}
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {visibleItems.map((item) => {
            return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#ccc] bg-white p-3 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none"
              >
                <img
                  src={item.img}
                  alt=""
                  className="h-[210px] w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.02] sm:h-[232px]"
                />
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <div className="flex items-center gap-2">
                    <SmallAvatarIcon />
                    <span className="text-[12px] text-[#1E1E2F]">
                      Adam Olabode
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon />
                    <time
                      dateTime="2025-07-06"
                      className="text-[12px] text-[#1E1E2F]"
                    >
                      06 Jul, 2025
                    </time>
                  </div>
                </div>
                <h2 className="mt-2 text-[19px] font-semibold leading-7 sm:text-[20px]">
                  {item.title}
                </h2>
                <button
                  type="button"
                  className="mt-auto self-start pt-6 font-semibold text-purple-20 underline decoration-2 underline-offset-4 transition-colors hover:text-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-20"
                >
                  <span>Read Article</span>
                </button>
              </article>
            );
          })}
        </div>
      </main>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default SiteBlog;
