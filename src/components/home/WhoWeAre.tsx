import React from "react";
import { DiagArrow } from "../icons";

const WhoWeAre = () => {
  return (
    <div className="bg-[#F6F1FD]">
      <div className="w-[90vw] lg:py-20 py-10 mx-auto flex lg:flex-row flex-col justify-between lg:space-x-4">
        <div className="lg:w-[35%] mt-10 lg:mt-0">
          <h2 className="uppercase text-purple-20 font-semibold">Who We Are</h2>
          <h2 className="lg:text-[36px] text-[30px] mt-3 mb-4 font-semibold">
            We Create places Designed for the way People wants to live
          </h2>
          <button className="micro-button bg-purple-20 px-6 rounded-lg space-x-3 flex items-center py-2">
            <span className="text-white text-[14px] font-semibold">
              Learn More
            </span>
            <DiagArrow />
          </button>
        </div>
        <div className="lg:w-[65%] flex lg:flex-row flex-col lg:mt-0 mt-10 items-center lg:space-x-6">
          <div className="space-y-4">
            <p className="lg:text-[18px] text-[14px] font-semibold">
              Ownage Group is a real estate development company committed to
              creating exceptional spaces that inspire, connect and grow in
              value overtime.{" "}
            </p>
            <p className="lg:text-[18px] text-[14px] font-semibold">
              From strategic locations to quality construction, we build more
              than properties, we build lifestyles and secure futures.{" "}
            </p>
          </div>
          <img src="/img-one.png" alt="Who We Are" className="micro-image lg:mt-0 mt-10" />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
