import React from "react";
import { findCmsSection, useCmsPage } from "../../context/SiteContentContext";

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
    ? section.items.map((item, index) => ({ id: index + 1, title: item.title || "Reason", description: item.text || "" }))
    : fallbackReasons;
  const images = section?.images || [];
  return (
    <div className="bg-[#F6F1FD] lg:py-20 py-10">
      <div className="mx-auto flex w-[90%] max-w-7xl flex-col justify-between lg:flex-row lg:space-x-10">
        <div className="lg:w-[40%]">
          <h2 className="lg:text-[56px] text-[30px] font-semibold">
            {section?.title || "Why Ownage?"}
          </h2>
          <p className="lg:text-[18px] text-[14px] font-semibold">
            {section?.subtitle || "We go beyond buildings, we deliver trust experiences, quality, and lasting value in every project we undertake."}
          </p>

          <div className="flex space-x-2 mt-8">
            <div className="space-y-2 w-[240px]">
              <img
                src={images[0]?.url || "/residence.jpg"}
                alt={images[0]?.alt || "Ownage residence"}
                className="w-full h-[208px] object-cover"
              />
              <img
                src={images[1]?.url || "/hero-img-2.png"}
                alt={images[1]?.alt || "Ownage development"}
                className="w-full h-[136px] object-cover"
              />
            </div>
            <div className="space-y-2 w-[240px]">
              <img src={images[2]?.url || "/court.jpg"} alt={images[2]?.alt || "Ownage court"} className="w-full h-[136px] object-cover" />
              <img
                src={images[3]?.url || "/estate.jpg"}
                alt={images[3]?.alt || "Ownage estate"}
                className="w-full h-[208px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 lg:mt-0 lg:w-[50%] lg:gap-10">
          {reasons.map((reason) => (
            <div className="space-y-4" key={reason.id}>
              <div className="lg:w-[82px] lg:h-[80px] w-[60px] h-[60px] flex justify-center items-center text-[26px] font-semibold font-sans text-purple-20 bg-white rounded-br-xl">
                0{reason.id}
              </div>
              <h2 className="lg:text-[24px] text-[18px] font-semibold">
                {reason.title}
              </h2>
              <p className="lg:text-[16px] text-[14px] font-semibold">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheWhy;
