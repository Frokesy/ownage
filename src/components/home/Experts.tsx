import { Link } from "react-router-dom";
import { findCmsSection, useCmsPage } from "../../context/SiteContentContext";
import ImageReveal from "../defaults/ImageReveal";
import MotionIn from "../defaults/MotionIn";

const Experts = () => {
  const section = findCmsSection(useCmsPage("home"), "experts");
  const expertCopy = (
    <div className="relative max-w-xl space-y-6 lg:px-10">
      <MotionIn effect="zoom">
        <h2 className="text-[34px] font-semibold leading-tight sm:text-[44px] lg:text-[52px]">
          {section?.title || "We Are Experts in Building Dreams."}
        </h2>
      </MotionIn>
      <MotionIn effect="up" delay={0.12}>
        <p className="text-base leading-7 sm:text-[18px] sm:leading-8">
          {section?.subtitle || "From our humble beginnings to the growing communities we've built today. Our journey is driven by a simple belief: everyone deserves a place they are proud to call their own."}
        </p>
      </MotionIn>
      <MotionIn effect="down" delay={0.22}>
        <Link to={section?.buttonHref || "/careers-2"} className="micro-button inline-flex rounded-lg text-white px-6 py-2 font-semibold bg-purple-20 hover:bg-purple-600">
          {section?.buttonLabel || "Join the Tribe"}
        </Link>
      </MotionIn>
    </div>
  );

  return (
    <section className="mx-auto my-14 w-[90%] max-w-7xl lg:my-24">
      <div className="flex flex-col gap-8 lg:hidden">
        <div className="relative isolate flex min-h-[410px] items-center px-8 py-14 sm:min-h-[430px] sm:px-14">
          <img
            src={section?.images?.[0]?.url || "/experts-purple-bg.png"}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          />
          {expertCopy}
        </div>

        <ImageReveal direction="left" className="-mt-6">
        <img
            src={section?.image?.url || "/experts-bg.png"}
            alt={section?.image?.alt || "The Ownage property experts"}
          className="w-full object-contain drop-shadow-2xl"
        />
        </ImageReveal>
      </div>

      <div className="relative isolate hidden min-h-[570px] items-center overflow-visible py-16 pl-[48%] pr-[6%] lg:flex">
        <img
          src={section?.images?.[0]?.url || "/experts-purple-bg.png"}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full"
        />

        <ImageReveal
          direction="left"
          className="absolute bottom-0 left-[-1.5%] top-0 -z-10 flex w-[50%] max-w-[584px] items-center"
        >
          <img
            src={section?.image?.url || "/experts-bg.png"}
            alt={section?.image?.alt || "The Ownage property experts"}
            className="w-full -rotate-2 object-contain drop-shadow-2xl"
          />
        </ImageReveal>

        {expertCopy}
      </div>
    </section>
  );
};

export default Experts;
