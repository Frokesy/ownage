import React from "react";
import { Link } from "react-router-dom";
import { DiagArrow } from "../icons";
import { findCmsSection, useCmsPage } from "../../context/SiteContentContext";

const WhoWeAre = () => {
  const section = findCmsSection(useCmsPage("home"), "whoWeAre");
  return (
    <div className="bg-[#F6F1FD]">
      <div className="mx-auto flex w-[90%] max-w-7xl flex-col justify-between py-10 lg:flex-row lg:space-x-4 lg:py-20">
        <div className="lg:w-[35%]">
          <h2 className="uppercase text-purple-20 font-semibold">{section?.eyebrow || "Who We Are"}</h2>
          <h2 className="lg:text-[36px] text-[30px] mt-3 mb-4 font-semibold">
            {section?.title || "We Create places Designed for the way People wants to live"}
          </h2>
          <Link to={section?.buttonHref || "/about"} className="micro-button bg-purple-20 px-6 rounded-lg space-x-3 flex w-fit items-center py-2">
            <span className="text-white text-[14px] font-semibold">
              {section?.buttonLabel || "Learn More"}
            </span>
            <DiagArrow />
          </Link>
        </div>
        <div className="mt-8 flex flex-col items-center lg:mt-0 lg:w-[65%] lg:flex-row lg:space-x-6">
          <div className="space-y-4">
            <p className="lg:text-[18px] text-[14px] font-semibold">
              {section?.body?.[0] || "Ownage Group is a real estate development company committed to creating exceptional spaces that inspire, connect and grow in value overtime."}
            </p>
            <p className="lg:text-[18px] text-[14px] font-semibold">
              {section?.body?.[1] || "From strategic locations to quality construction, we build more than properties, we build lifestyles and secure futures."}
            </p>
          </div>
          <img src={section?.image?.url || "/img-one.png"} alt={section?.image?.alt || "Who We Are"} className="micro-image lg:mt-0 mt-10" />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
