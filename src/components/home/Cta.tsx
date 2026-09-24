import React from "react";

const Cta = () => {
  return (
    <div className="my-10 w-[90%] rounded-xl py-20 mx-auto from-[#FCCB07] bg-gradient-to-tl to-[#BAD131]">
      <div className="lg:w-[80%] w-[90%] mx-auto flex lg:flex-row flex-col items-center justify-between lg:space-x-10 lg:space-y-0 space-y-6">
        <div className="lg:w-[45%] space-y-4">
          <h2 className="lg:text-[30px] font-bold">
            Looking for Your Next Home or a smart Investment. 😍
          </h2>
          <p className="">Join more than 200+ happy customers</p>
          <img src="/people.png" alt="people" />
        </div>
        <div className="lg:w-[60%] w-full flex lg:flex-row flex-col lg:mt-0 mt-10 items-center lg:space-x-10 lg:space-y-0 space-y-4">
          <button className="bg-purple-20 lg:w-[40%] w-full text-white py-3 px-10 font-semibold rounded-xl lg:text-[18px]">
            See Properties
          </button>
          <button className="text-purple-20 bg-white w-full lg:w-[40%] py-3 px-10 font-semibold rounded-xl lg:text-[18px]">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cta;
