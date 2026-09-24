import React from "react";
import TopNav from "../components/defaults/TopNav";
import Footer from "../components/defaults/Footer";
import { LocationIcon } from "../components/icons";

const Project = () => {
  const properties = [
    {
      id: 1,
      img: "/project-dummy.png",
      category: "Real Estate",
      title: "Ownage Court",
      desc: "Premium residential plots, designed for modern living and lasting value",
      location: "Moniya, Ibadan",
    },
    {
      id: 2,
      img: "/project-dummy.png",
      category: "Real Estate",
      title: "Ownage Court",
      desc: "Premium residential plots, designed for modern living and lasting value",
      location: "Moniya, Ibadan",
    },
    {
      id: 3,
      img: "/project-dummy.png",
      category: "Real Estate",
      title: "Ownage Court",
      desc: "Premium residential plots, designed for modern living and lasting value",
      location: "Moniya, Ibadan",
    },
    {
      id: 4,
      img: "/project-dummy.png",
      category: "Real Estate",
      title: "Ownage Court",
      desc: "Premium residential plots, designed for modern living and lasting value",
      location: "Moniya, Ibadan",
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-center px-4 py-6">
        <TopNav />
      </header>

      <div className="flex flex-col items-center justify-center space-y-3 px-5 py-10 text-center sm:py-14 lg:py-20">
        <h1 className="text-[38px] font-bold leading-tight sm:text-[50px]">
          Our <span className="text-purple-20">Projects</span>
        </h1>
        <p className="max-w-xl text-[16px] leading-7 text-[#0E2824] sm:text-[18px] lg:text-[22px]">
          See all of our properties
        </p>
      </div>

      <div className="flex flex-col space-y-16 w-[90%] mx-auto">
        {properties.map((property) => (
          <div
            key={property.id}
            className={`flex items-center ${property.id % 2 ? 'lg:flex-row flex-col' : 'lg:flex-row-reverse flex-col' } justify-between lg:space-y-0 space-y-10 lg:space-x-10`}
          >
            <div className="lg:w-[50%]">
              <img
                src={property.img}
                alt="property-img"
                className="w-full object-cover"
              />
            </div>
            <div className="lg:space-y-4 space-y-3 lg:w-[50%]">
              <div className="flex items-center space-x-3">
                <div className="h-0.5 w-10 bg-orange-20"></div>
                <p className="text-[#1E1E2F] lg:text-[16px] text-[14px]">{property.category}</p>
              </div>
              <h2 className="text-[#1E1E2F] lg:text-[36px] text-[20px] font-semibold">
                {property.title}
              </h2>
              <p className="border-l-2 border-orange-20 pl-3 lg:text-[16px] text-[14px]">{property.desc}</p>
              <div className="flex items-center space-x-3">
                <LocationIcon />
                <span className="lg:text-[16px] text-[12px]">{property.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:mt-20 mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Project;
