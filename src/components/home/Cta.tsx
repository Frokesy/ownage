import React from "react";
import { Link } from "react-router-dom";
import { findCmsSection, useCmsPage } from "../../context/SiteContentContext";

const Cta = () => {
  const section = findCmsSection(useCmsPage("home"), "cta");
  return (
    <div className="mx-auto my-10 w-[90%] max-w-7xl rounded-xl bg-gradient-to-tl from-[#FCCB07] to-[#BAD131] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto flex w-[90%] flex-col items-center justify-between gap-8 lg:w-[80%] lg:flex-row lg:gap-10">
        <div className="lg:w-[45%] space-y-4">
          <h2 className="lg:text-[30px] font-bold">
            {section?.title || "Looking for Your Next Home or a smart Investment. 😍"}
          </h2>
          <p>{section?.subtitle || "Join more than 200+ happy customers"}</p>
          <img src={section?.image?.url || "/people.png"} alt={section?.image?.alt || "Happy Ownage customers"} />
        </div>
        <div className="flex w-full flex-col items-center gap-4 lg:w-[60%] lg:flex-row lg:gap-10">
          <Link to={section?.buttonHref || "/project"} className="micro-button bg-purple-20 lg:w-[40%] w-full text-center text-white py-3 px-10 font-semibold rounded-xl lg:text-[18px]">
            {section?.buttonLabel || "See Properties"}
          </Link>
          <Link to="/contact" className="micro-button text-purple-20 bg-white w-full text-center lg:w-[40%] py-3 px-10 font-semibold rounded-xl lg:text-[18px]">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cta;
