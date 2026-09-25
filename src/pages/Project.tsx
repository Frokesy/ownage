import { useCallback, useState } from "react";
import TopNav from "../components/defaults/TopNav";
import Footer from "../components/defaults/Footer";
import { LocationIcon } from "../components/icons";
import PropertyModal, { type PropertyDetails } from "../components/projects/PropertyModal";
import { findCmsSection, useCmsPage } from "../context/SiteContentContext";

const Project = () => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetails | null>(null);
  const closeModal = useCallback(() => setSelectedProperty(null), []);

  const fallbackProperties: PropertyDetails[] = [
    {
      id: 1,
      img: "/project-dummy.png",
      category: "Real Estate",
      title: "Ownage Court",
      desc: "Premium residential plots, designed for modern living and lasting value",
      location: "Moniya, Ibadan",
      price: "₦8,500,000",
      plotSize: "500 sqm",
      status: "Available",
      overview: "Ownage Court is a thoughtfully planned residential community designed for buyers seeking secure ownership, practical infrastructure, and strong long-term value in a growing location.",
      features: ["Verified documentation", "Accessible road network", "Planned drainage", "Perimeter security", "Flexible payment plan", "Residential zoning"],
    },
    {
      id: 2,
      img: "/project-dummy.png",
      category: "Real Estate",
      title: "Ownage Court",
      desc: "Premium residential plots, designed for modern living and lasting value",
      location: "Moniya, Ibadan",
      price: "₦12,000,000",
      plotSize: "600 sqm",
      status: "Selling fast",
      overview: "This serviced plot option offers additional space for a generous family residence, with access to the same planned community infrastructure and professional documentation process.",
      features: ["Corner-piece options", "Survey documentation", "Estate road access", "Drainage provision", "Community planning", "Development support"],
    },
    {
      id: 3,
      img: "/project-dummy.png",
      category: "Real Estate",
      title: "Ownage Court",
      desc: "Premium residential plots, designed for modern living and lasting value",
      location: "Moniya, Ibadan",
      price: "₦18,500,000",
      plotSize: "450 sqm",
      status: "Available",
      overview: "A premium property opportunity for homeowners and investors who value convenient access, a defined development plan, and a neighbourhood positioned for future growth.",
      features: ["Strategic location", "Secure estate layout", "Power provision", "Green spaces", "Flexible milestones", "Investment potential"],
    },
    {
      id: 4,
      img: "/project-dummy.png",
      category: "Real Estate",
      title: "Ownage Court",
      desc: "Premium residential plots, designed for modern living and lasting value",
      location: "Moniya, Ibadan",
      price: "₦25,000,000",
      plotSize: "750 sqm",
      status: "Limited units",
      overview: "Our largest current plot option provides the freedom to create a spacious private residence while benefiting from the structure and shared amenities of a managed estate.",
      features: ["Generous plot size", "Premium positioning", "Gated community", "Wide internal roads", "Clear title process", "Dedicated support"],
    },
  ];
  const page = useCmsPage("projects");
  const propertySection = findCmsSection(page, "properties");
  const properties: PropertyDetails[] = propertySection?.items?.length
    ? propertySection.items.map((item, index) => ({
        id: item._key || index,
        img: item.image?.url || "/project-dummy.png",
        category: item.label || "Real Estate",
        title: item.title || "Property",
        desc: item.subtitle || "",
        location: item.location || "",
        price: item.price || "Contact us",
        plotSize: item.value || "",
        status: item.status || "Available",
        overview: item.text || "",
        features: item.details || [],
        options: item.options?.map((option) => ({ plotSize: option.label || "", price: option.value || "" })),
      }))
    : fallbackProperties;
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-center px-4 py-6">
        <TopNav />
      </header>

      <div className="flex flex-col items-center justify-center space-y-3 px-5 py-10 text-center sm:py-14 lg:py-20">
        <h1 className="text-[38px] font-bold leading-tight sm:text-[50px]">
          {page?.hero?.title || <>Our <span className="text-purple-20">Projects</span></>}
        </h1>
        <p className="max-w-xl text-[16px] leading-7 text-[#0E2824] sm:text-[18px] lg:text-[22px]">
          {page?.hero?.subtitle || "See all of our properties"}
        </p>
      </div>

      <div className="mx-auto flex w-[90%] max-w-7xl flex-col space-y-10 sm:space-y-14 lg:space-y-16">
        {properties.map((property, index) => (
          <article
            key={property.id}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${property.title}`}
            onClick={() => setSelectedProperty(property)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedProperty(property);
              }
            }}
            className={`group flex cursor-pointer items-center rounded-2xl p-2 transition-[background-color,box-shadow] hover:bg-[#F9F9F9] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-20 ${index % 2 === 0 ? 'lg:flex-row flex-col' : 'lg:flex-row-reverse flex-col' } justify-between lg:space-y-0 space-y-8 lg:gap-10`}
          >
            <div className="lg:w-[50%]">
              <img
                src={property.img}
                alt={property.title}
                className="w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.01]"
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
              <span className="mt-2 inline-flex font-semibold text-purple-20 underline underline-offset-4">View full details</span>
            </div>
          </article>
        ))}
      </div>

      <div className="lg:mt-20 mt-10">
        <Footer />
      </div>
      <PropertyModal property={selectedProperty} onClose={closeModal} />
    </div>
  );
};

export default Project;
