import TopNav from "../components/defaults/TopNav";
import Footer from "../components/defaults/Footer";
import {
  BookIcon,
  CheckIcon,
  ClientsIcon,
  SalesIcon,
  Suitcase,
} from "../components/icons";
import AutoplayCarousel from "../components/careers/AutoplayCarousel";
import { findCmsSection, useCmsPage } from "../context/SiteContentContext";
import ImageReveal from "../components/defaults/ImageReveal";
import MotionIn from "../components/defaults/MotionIn";
import { motion, useReducedMotion } from "framer-motion";

const fallbackPropertyImages = [
  { src: "/court.jpg", alt: "Ownage Court development" },
  { src: "/residence.jpg", alt: "Ownage residential property" },
  { src: "/estate.jpg", alt: "Ownage estate development" },
];

const fallbackJourneyImages = [
  { src: "/careers/img-one.png", alt: "Ownage realtors learning together" },
  { src: "/careers/img-two.png", alt: "Ownage team member at work" },
  { src: "/careers/img-three.png", alt: "Ownage real estate team" },
];

const Careers = () => {
  const prefersReducedMotion = useReducedMotion();
  const page = useCmsPage("careers");
  const skills = findCmsSection(page, "skills");
  const propertyGallery = findCmsSection(page, "propertyGallery");
  const journeyGallery = findCmsSection(page, "journeyGallery");
  const opportunity = findCmsSection(page, "opportunity");
  const start = findCmsSection(page, "startJourney");
  const skillIcons = [<BookIcon />, <SalesIcon />, <ClientsIcon />, <Suitcase />];
  const fallbackItems = [
    {
      id: 1,
      icon: <BookIcon />,
      title: "Real Estate Knowledge",
      subtext:
        "Learn the fundamentals of property, the market and the real estate business.",
    },
    {
      id: 2,
      icon: <SalesIcon />,
      title: "Sales & Marketing",
      subtext:
        "Develop practical skills for presenting properties and connecting with potential clients.",
    },
    {
      id: 3,
      icon: <ClientsIcon />,
      title: "Client Relations",
      subtext:
        "Learn how to communicate professionally and build lasting relationships.",
    },
    {
      id: 4,
      icon: <Suitcase />,
      title: "Professional Growth",
      subtext:
        "Keep learning, build your network and grow your opportunities in real estate.",
    },
  ];
  const items = skills?.items?.length
    ? skills.items.map((item, index) => ({ id: item._key || index, icon: skillIcons[index % skillIcons.length], title: item.title || "", subtext: item.text || "" }))
    : fallbackItems;
  const propertyImages = propertyGallery?.images?.length ? propertyGallery.images.map((image) => ({ src: image.url || "/court.jpg", alt: image.alt || "Ownage property" })) : fallbackPropertyImages;
  const journeyImages = journeyGallery?.images?.length ? journeyGallery.images.map((image) => ({ src: image.url || "/careers/img-one.png", alt: image.alt || "Ownage realtor journey" })) : fallbackJourneyImages;

  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-center px-4 py-6">
        <TopNav />
      </header>

      <div className="flex flex-col items-center justify-center space-y-3 px-5 py-10 text-center sm:py-14 lg:py-20">
        <MotionIn effect="zoom">
          <h1 className="lexend text-[38px] font-bold leading-tight sm:text-[50px]">
            {page?.hero?.title || <>Build Your Future In <span className="text-purple-20">Real Estate</span></>}
          </h1>
        </MotionIn>
        <MotionIn effect="up" delay={0.12}>
          <p className="max-w-xl text-[16px] leading-7 text-[#0E2824] sm:text-[18px] lg:text-[22px]">
            {page?.hero?.subtitle || "Learn the business. Build the skills, Grow your opportunities with Ownage Group."}
          </p>
        </MotionIn>
        <MotionIn effect="down" delay={0.2}>
          <a
            href="#opportunity"
            className="micro-button inline-block rounded-xl bg-purple-20 px-8 py-3 text-[16px] font-semibold text-white hover:bg-purple-20/90 sm:px-10 sm:text-[18px]"
          >
            {page?.hero?.primaryLabel || "Become a realtor"}
          </a>
        </MotionIn>
      </div>

      <AutoplayCarousel
        images={propertyImages}
        label="Featured Ownage properties"
      />

      <div className="flex flex-col items-center justify-center space-y-3 px-5 py-10 text-center sm:py-14 lg:py-20">
        <MotionIn effect="zoom">
          <h1 className="lexend text-[38px] font-bold leading-tight sm:text-[50px]">
            {skills?.title || "Your Real Estate Journey Starts Here"}
          </h1>
        </MotionIn>
        <MotionIn effect="up" delay={0.1}>
          <p className="max-w-xl text-[16px] leading-7 text-[#0E2824] sm:text-[18px] lg:text-[22px]">
            {skills?.subtitle || "Discover an opportunity to learn the real estate business, develop practical skills and build the confidence to take your next step in property."}
          </p>
        </MotionIn>
      </div>

      <section
        aria-label="Real Estate Knowledge, Sales & Marketing, Client Relations and Professional Growth"
        className="scrollbar-hide mx-auto my-14 flex w-[90%] max-w-7xl snap-x snap-mandatory items-stretch gap-5 overflow-x-auto pb-5 sm:my-16 lg:my-20 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0"
      >
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: index % 2 === 0 ? 30 : -24, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.015 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
            className="w-[84vw] max-w-[340px] shrink-0 snap-start space-y-4 rounded-xl bg-white p-5 shadow-md transition-shadow duration-300 hover:shadow-2xl sm:w-[320px] lg:w-auto lg:max-w-none"
          >
            <div aria-hidden="true">{item.icon}</div>
            <h2 className="lexend text-[18px] font-semibold lg:text-[22px]">
              {item.title}
            </h2>
            <p className="text-[14px] leading-6 text-[#383838]">
              {item.subtext}
            </p>
          </motion.article>
        ))}
      </section>

      <div className="flex flex-col items-center justify-center space-y-3 px-5 py-10 text-center sm:py-14 lg:py-20">
        <div className="flex items-center space-x-3">
          <div className="h-0.5 w-10 bg-orange-20"></div>
          <p className="text-[#1E1E2F] lg:text-[16px] text-[14px]">
            {journeyGallery?.eyebrow || "The Real Estate Journey"}
          </p>
        </div>
        <MotionIn effect="zoom">
          <h1 className="lexend text-[38px] font-bold leading-tight sm:text-[50px]">
            {journeyGallery?.title || "Learn. Connect. Grow"}
          </h1>
        </MotionIn>
      </div>

      <AutoplayCarousel
        images={journeyImages}
        label="The Ownage realtor journey"
      />

      <section
        id="opportunity"
        className="mx-auto mt-14 flex w-[90%] max-w-7xl flex-col items-center justify-between gap-8 lg:mt-24 lg:flex-row lg:gap-12"
      >
        <div className="w-full lg:w-[50%]">
          <ImageReveal direction="left">
            <img
              src={opportunity?.image?.url || "/careers/img-four.png"}
              alt={opportunity?.image?.alt || "Ownage realtor training session"}
              className="micro-image w-full rounded-2xl object-cover"
            />
          </ImageReveal>
        </div>
        <div className="w-full lg:w-[50%]">
          <MotionIn effect="zoom">
            <h2 className="lexend text-[28px] font-semibold sm:text-[32px]">
              {opportunity?.title || "Your Opportunity to Grow"}
            </h2>
          </MotionIn>
          <MotionIn effect="up" delay={0.1}>
            <p className="my-4 text-[16px] leading-7 sm:text-[18px] sm:leading-8">
              {opportunity?.subtitle || "At Ownage Group, we believe real estate is more than property. It is an opportunity to learn, build relationships, and create lasting value. Our realtor opportunity is designed for people who are ready to understand the business and grow within the property industry."}
            </p>
          </MotionIn>
          <ul className="space-y-3">
            {(opportunity?.items?.map((item) => item.title || "") || [
              "Real Estate Knowledge",
              "Practical Sales Skills",
              "Property Marketing",
              "Client Relations",
              "Industry Networking",
              "Professional Growth",
            ]).map((item) => (
            <motion.li key={item} initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.04 }} className="flex items-center gap-2">
                <span className="shrink-0">
                  <CheckIcon />
                </span>
                <span>{item}</span>
            </motion.li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto my-14 flex w-[90%] max-w-7xl flex-col-reverse items-center justify-between gap-8 lg:my-24 lg:flex-row lg:gap-12">
        <div className="w-full lg:w-[50%]">
          <h2 className="lexend text-[28px] font-semibold sm:text-[32px]">
            {start?.title || "Start Your Real Estate Journey"}
          </h2>
          <p className="my-4 text-[16px] leading-7 sm:text-[18px] sm:leading-8">
            {start?.subtitle || "Whether you are new to real estate or looking to develop your skills, Ownage gives you an opportunity to learn, connect, and explore the property business."}
          </p>
        </div>
        <div className="w-full lg:w-[50%]">
          <ImageReveal direction="right">
            <img
              src={start?.image?.url || "/careers/img-five.png"}
              alt={start?.image?.alt || "Ownage real estate professionals"}
              className="micro-image w-full rounded-2xl object-cover"
            />
          </ImageReveal>
        </div>
      </section>

      <div className="lg:mt-20 mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Careers;
