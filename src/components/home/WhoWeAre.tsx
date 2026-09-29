import { Link } from "react-router-dom";
import { DiagArrow } from "../icons";
import { findCmsSection, useCmsPage } from "../../context/SiteContentContext";
import MotionIn from "../defaults/MotionIn";
import { motion, useReducedMotion } from "framer-motion";

const MotionImage = motion.img;

const WhoWeAre = () => {
  const section = findCmsSection(useCmsPage("home"), "whoWeAre");
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="bg-[#F6F1FD]">
      <div className="mx-auto flex w-[90%] max-w-7xl flex-col justify-between py-10 lg:flex-row lg:space-x-4 lg:py-20">
        <div className="lg:w-[35%]">
          <MotionIn effect="down">
            <h2 className="uppercase text-purple-20 font-bold">
              {section?.eyebrow || "Who We Are"}
            </h2>
          </MotionIn>
          <MotionIn effect="zoom" delay={0.08}>
            <h2 className="lg:text-[36px] lexend text-[30px] mt-3 mb-4 font-semibold">
              {section?.title ||
                "We Create places Designed for the way People wants to live"}
            </h2>
          </MotionIn>
          <MotionIn effect="up" delay={0.18}>
            <Link
              to={section?.buttonHref || "/about"}
              className="micro-button lg:flex hidden bg-purple-20 px-6 rounded-lg space-x-3 w-fit items-center py-2"
            >
              <span className="text-white text-[14px] font-semibold">
                {section?.buttonLabel || "Learn More"}
              </span>
              <DiagArrow />
            </Link>
          </MotionIn>
        </div>
        <div className="flex flex-col lg:items-center lg:mt-0 lg:w-[65%] lg:flex-row lg:space-x-6">
          <div className="space-y-4">
            <MotionIn effect="up">
              <p className="lg:text-[18px] text-[14px] font-semibold">
                {section?.body?.[0] ||
                  "Ownage Group is a real estate development company committed to creating exceptional spaces that inspire, connect and grow in value overtime."}
              </p>
            </MotionIn>
            <MotionIn effect="down" delay={0.1}>
              <p className="lg:text-[18px] text-[14px] font-semibold">
                {section?.body?.[1] ||
                  "From strategic locations to quality construction, we build more than properties, we build lifestyles and secure futures."}
              </p>
            </MotionIn>
          </div>
          <div className="flex">
            <MotionIn effect="zoom" delay={0.2}>
              <Link
                to={section?.buttonHref || "/about"}
                className="micro-button flex lg:hidden mt-4 bg-purple-20 px-6 rounded-lg space-x-3 items-center py-2"
              >
                <span className="text-white text-[14px] font-semibold">
                  {section?.buttonLabel || "Learn More"}
                </span>
                <DiagArrow />
              </Link>
            </MotionIn>
          </div>
          <MotionImage
            src={section?.image?.url || "/img-one.png"}
            alt={section?.image?.alt || "Who We Are"}
            className="micro-image lg:mt-0 mt-10"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 70, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
          />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
