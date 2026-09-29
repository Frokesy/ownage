import { Link } from "react-router-dom";
import TopNav from "./TopNav";
import { HeroImgAttachmentOne, HeroImgAttachmentTwo } from "../icons";
import { useCmsPage } from "../../context/SiteContentContext";
import ImageReveal from "./ImageReveal";
import MotionIn from "./MotionIn";

const Hero = () => {
  const hero = useCmsPage("home")?.hero;
  const heroImages = hero?.images || [];
  return (
    <div className="theme-static-light bg-cover bg-center min-h-screen lg:pb-20 pb-10" style={{ backgroundImage: `url(${hero?.image?.url || "/hero.svg"})` }}>
      <MotionIn effect="down" className="flex justify-center items-center pt-6">
        <TopNav />
      </MotionIn>

      <div className="flex w-full max-w-[684px] flex-col items-center justify-center px-4 text-center mx-auto lg:mt-20 mt-10">
        <MotionIn effect="zoom">
          <h2 className="text-[38px] lg:px-auto px-4 lexend font-semibold leading-[1.12] sm:text-[38px] lg:text-[60px]">
            {hero?.title || <>Ready to <span className="text-purple-20 kaushan">Own Your</span>{" "}First Piece of <span className="text-orange-20 kaushan">Land?</span></>}
          </h2>
        </MotionIn>
        <MotionIn effect="up" delay={0.12}>
          <p className="lg:text-[22px] lg:px-auto px-4 text-center mt-3 nunito-sans font-bold">
            {hero?.subtitle || "Find the right land, secure your ownership, and take the first step toward building something that lasts."}
          </p>
        </MotionIn>
        <MotionIn effect="down" delay={0.2} className="flex items-center space-x-3 mt-4">
          <img src="/people.png" alt="people" />
          <p className="lg:text-[14px] text-[12px] font-semibold">
            200+ people and maybe you
          </p>
        </MotionIn>

        <MotionIn effect="up" delay={0.28} className="flex lg:flex-row flex-col lg:space-x-3 lg:space-y-0 space-y-4 mt-4">
          <Link to={hero?.primaryHref || "/project"} className="micro-button bg-orange-20 py-2 px-6 rounded-full text-[14px] font-semibold hover:bg-orange-20/90">
            {hero?.primaryLabel || "Explore Our Listing"} {"->"}
          </Link>
          <Link to={hero?.secondaryHref || "/about"} className="micro-button text-purple-20 bg-white py-2 px-6 rounded-full text-[14px] font-semibold hover:bg-purple-20/90 hover:text-white">
            {hero?.secondaryLabel || "About Ownage Group"}
          </Link>
        </MotionIn>

        <div className="my-6 flex lg:gap-10 gap-4 flex-row mt-4">
          <ImageReveal direction="left" className="relative">
            <img
              src={heroImages[0]?.url || "/hero-img-2.png"}
              alt={heroImages[0]?.alt || "A completed residential development"}
              className="micro-image lg:w-[324px] lg:h-[358px] h-[280px]"
            />
            <div className="absolute lg:-left-[180px] lg:right-auto -right-[100px] shadow-lg lg:rotate-[10deg] rotate-[-10deg] lg:top-[80px] top-[30px] z-10">
              <div className="bg-white lg:p-3 p-2 rounded-full lg:text-[14px] text-[10px] font-semibold">
                Be a property owner today. 🫵
              </div>
            </div>
          </ImageReveal>
          <ImageReveal direction="right" delay={0.12} className="relative">
            <img
              src={heroImages[1]?.url || "/hero-img-1.png"}
              alt={heroImages[1]?.alt || "A residential estate property"}
              className="micro-image lg:w-[324px] lg:h-[358px] h-[280px] lg:mt-0 mt-20"
            />
            <div className="absolute lg:-right-[180px] lg:left-auto -left-[100px] shadow-lg lg:rotate-[10deg] rotate-[-10deg] lg:bottom-[80px] bottom-[30px] z-10">
            <div className="bg-white lg:p-3 p-2 rounded-full lg:text-[14px] text-[10px] font-semibold">
            Invest Today. Own Tomorrow.🤞
            </div>
            </div>
          </ImageReveal>
        </div>
      </div>
    </div>
  );
};

export default Hero;
