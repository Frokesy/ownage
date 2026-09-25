import React from "react";

const Cta = () => {
  return (
    <div className="mx-auto my-10 w-[90%] max-w-7xl rounded-xl bg-gradient-to-tl from-[#FCCB07] to-[#BAD131] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto flex w-[90%] flex-col items-center justify-between gap-8 lg:w-[80%] lg:flex-row lg:gap-10">
        <div className="lg:w-[45%] space-y-4">
          <h2 className="lg:text-[30px] font-bold">
            Looking for Your Next Home or a smart Investment. 😍
          </h2>
          <p className="">Join more than 200+ happy customers</p>
          <img src="/people.png" alt="people" />
        </div>
        <div className="flex w-full flex-col items-center gap-4 lg:w-[60%] lg:flex-row lg:gap-10">
          <button className="micro-button bg-purple-20 lg:w-[40%] w-full text-white py-3 px-10 font-semibold rounded-xl lg:text-[18px]">
            See Properties
          </button>
          <button className="micro-button text-purple-20 bg-white w-full lg:w-[40%] py-3 px-10 font-semibold rounded-xl lg:text-[18px]">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cta;
