import React from "react";
import { Link } from "react-router-dom";
import TopNav from "./TopNav";
import { HeroImgAttachmentOne, HeroImgAttachmentTwo } from "../icons";
import { useCmsPage } from "../../context/SiteContentContext";

const Hero = () => {
  const hero = useCmsPage("home")?.hero;
  const heroImages = hero?.images || [];
  return (
    <div className="theme-static-light bg-cover bg-center min-h-screen lg:pb-20 pb-10" style={{ backgroundImage: `url(${hero?.image?.url || "/hero.png"})` }}>
      <div className="flex justify-center items-center pt-6">
        <TopNav />
      </div>

      <div className="flex w-full max-w-[684px] flex-col items-center justify-center px-4 text-center mx-auto lg:mt-20 mt-10">
        <h2 className="text-[40px] font-semibold leading-[1.12] sm:text-[48px] lg:text-[60px]">
          {hero?.title || <>Ready to <span className="text-purple-20 kaushan">Own Your</span>{" "}First Piece of <span className="text-orange-20 kaushan">Land?</span></>}
        </h2>
        <p className="lg:text-[22px] mt-3 font-semibold">
          {hero?.subtitle || "Find the right land, secure your ownership, and take the first step toward building something that lasts."}
        </p>
        <div className="flex items-center space-x-3 mt-4">
          <img src="/people.png" alt="people" />
          <p className="lg:text-[14px] text-[12px] font-semibold">
            200+ people and maybe you
          </p>
        </div>

        <div className="flex lg:flex-row flex-col lg:space-x-3 lg:space-y-0 space-y-4 mt-4">
          <Link to={hero?.primaryHref || "/project"} className="micro-button bg-orange-20 py-2 px-6 rounded-full text-[14px] font-semibold hover:bg-orange-20/90">
            {hero?.primaryLabel || "Explore Our Listing"} {"->"}
          </Link>
          <Link to={hero?.secondaryHref || "/about"} className="micro-button text-purple-20 bg-white py-2 px-6 rounded-full text-[14px] font-semibold hover:bg-purple-20/90 hover:text-white">
            {hero?.secondaryLabel || "About Ownage Group"}
          </Link>
        </div>

        <div className="my-6 flex lg:gap-10 gap-4 flex-row">
          <div className="relative">
            <img
              src={heroImages[0]?.url || "/hero-img-2.png"}
              alt={heroImages[0]?.alt || "A completed residential development"}
              className="micro-image lg:w-[324px] lg:h-[358px] w-[174px] h-[280px]"
            />
            <div className="absolute hidden lg:block right-10 top-0 z-10">
              <HeroImgAttachmentOne />
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImages[1]?.url || "/hero-img-1.png"}
              alt={heroImages[1]?.alt || "A residential estate property"}
              className="micro-image lg:w-[324px] lg:h-[358px] w-[174px] h-[280px]"
            />
            <div className="absolute hidden lg:block bottom-0 top-[20vh] left-0 z-10">
              <HeroImgAttachmentTwo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
