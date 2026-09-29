import { findCmsSection, useCmsPage } from "../../context/SiteContentContext";
import ImageReveal from "../defaults/ImageReveal";
import MotionIn from "../defaults/MotionIn";

const TheWhy = () => {
  const section = findCmsSection(useCmsPage("home"), "whyOwnage");
  const fallbackReasons = [
    {
      id: 1,
      title: "Good Space",
      description:
        "We create spaces with intention, blending functionality, aesthetics, and comfort for better living.",
    },
    {
      id: 2,
      title: "Trusted Expertise",
      description:
        "Our teams brings deep industry knowledge and years of experience you can rely on.",
    },
    {
      id: 3,
      title: "Built to Last",
      description:
        "We use quality materials and proven methods to ensure durability and long-term value.",
    },
    {
      id: 4,
      title: "Client Focused",
      description:
        "Your goals are our priority. We listen, communicate and deliver beyond expectations.",
    },
  ];
  const reasons = section?.items?.length
    ? section.items.map((item, index) => ({
        id: index + 1,
        title: item.title || "Reason",
        description: item.text || "",
      }))
    : fallbackReasons;
  const images = section?.images || [];
  return (
    <div className="bg-[#F6F1FD] lg:py-20 py-10">
      <div className="mx-auto flex w-[90%] max-w-7xl flex-col justify-between lg:flex-row lg:space-x-10">
        <div className="lg:w-[40%]">
          <MotionIn effect="zoom">
            <h2 className="lg:text-[56px] text-[30px] lexend font-semibold">
              {section?.title || "Why Ownage?"}
            </h2>
          </MotionIn>
          <MotionIn effect="up" delay={0.12}>
            <p className="lg:text-[22px] text-[16px] font-semibold">
              {section?.subtitle ||
                "We go beyond buildings, we deliver trust experiences, quality, and lasting value in every project we undertake."}
            </p>
          </MotionIn>

          <div className="flex space-x-2 mt-8">
            <ImageReveal direction="left" className="space-y-2 w-[240px]">
              <img
                src={images[0]?.url || "/residence.jpg"}
                alt={images[0]?.alt || "Ownage residence"}
                className="w-full h-[208px] object-cover rounded-xl"
              />
              <img
                src={images[1]?.url || "/landmark.png"}
                alt={images[1]?.alt || "Ownage development"}
                className="w-full h-[136px] object-cover rounded-xl"
              />
            </ImageReveal>
            <ImageReveal direction="right" delay={0.1} className="space-y-2 w-[240px]">
              <img
                src={images[2]?.url || "/court.jpg"}
                alt={images[2]?.alt || "Ownage court"}
                className="w-full h-[136px] object-cover rounded-xl"
              />
              <img
                src={images[3]?.url || "/estate-2.png"}
                alt={images[3]?.alt || "Ownage estate"}
                className="w-full h-[208px] object-cover rounded-xl"
              />
            </ImageReveal>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 lg:mt-0 lg:w-[50%] lg:gap-10">
          {reasons.map((reason, index) => (
            <MotionIn className="space-y-4" key={reason.id} effect={index % 2 === 0 ? "up" : "down"} delay={index * 0.1}>
              <MotionIn effect="zoom" delay={0.08}>
                <div className="lg:w-[82px] lg:h-[80px] w-[60px] h-[60px] flex justify-center items-center text-[26px] font-semibold font-sans text-purple-20 bg-white rounded-br-xl">
                  0{reason.id}
                </div>
              </MotionIn>
              <MotionIn effect="down" delay={0.14}>
                <h2 className="lg:text-[26px] text-[18px] font-semibold">
                  {reason.title}
                </h2>
              </MotionIn>
              <MotionIn effect="up" delay={0.2}>
                <p className="lg:text-[16px] text-[14px] font-semibold">
                  {reason.description}
                </p>
              </MotionIn>
            </MotionIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheWhy;
