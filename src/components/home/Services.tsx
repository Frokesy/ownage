import { useRef } from "react";
import { LeftArrow, LocationIcon, RightArrow } from "../icons";

const services = [
  { name: "Ownage Court", type: "Premium residential plots", location: "Lagos, Nigeria", image: "/court.jpg" },
  { name: "Ownage Residence", type: "Contemporary family homes", location: "Lekki, Lagos", image: "/residence.jpg" },
  { name: "The Ownage Estate", type: "Secure serviced plots", location: "Epe, Lagos", image: "/estate.jpg" },
  { name: "Court Gardens", type: "Thoughtfully planned community", location: "Ibeju-Lekki, Lagos", image: "/court.jpg" },
  { name: "Residence Two", type: "Modern urban residences", location: "Ajah, Lagos", image: "/residence.jpg" },
  { name: "Estate Park", type: "Land built for lasting value", location: "Lagos, Nigeria", image: "/estate.jpg" },
];

const Services = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollCards = (direction: -1 | 1) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction * Math.max(container.clientWidth * 0.8, 280),
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-screen bg-[url('/service-bg.png')] bg-cover bg-center py-12 sm:py-16 lg:py-20">
      <div className="mx-auto flex w-[90vw] max-w-7xl flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-[34px] font-semibold leading-tight text-purple-500 sm:text-[44px] lg:text-[56px]">
            Find Your Next Place
          </h2>
          <p className="mt-3 text-base leading-7 sm:text-lg lg:text-[24px] lg:leading-9">
            Good property is more than four walls and a location. We look for
            the right place, the right purpose, and the right potential.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            aria-label="Show previous properties"
            onClick={() => scrollCards(-1)}
            className="rounded-full transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          >
            <LeftArrow />
          </button>
          <button
            type="button"
            aria-label="Show next properties"
            onClick={() => scrollCards(1)}
            className="rounded-full transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          >
            <RightArrow />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        aria-label="Available properties"
        className="scrollbar-hide mx-auto mt-8 flex w-[90vw] max-w-7xl snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4 sm:mt-10 sm:gap-7"
      >
        {services.map((service) => (
          <article key={service.name} className="w-[82vw] max-w-[340px] shrink-0 snap-start sm:w-[320px]">
            <img
              src={service.image}
              alt={`${service.name} property`}
              className="h-[220px] w-full rounded-2xl object-cover sm:h-[226px]"
              loading="lazy"
            />
            <h3 className="mt-4 text-[18px] font-semibold uppercase">{service.name}</h3>
            <p className="mt-1 text-[16px] font-semibold">{service.type}</p>
            <div className="mt-2 flex items-center gap-2">
              <LocationIcon />
              <p className="text-[14px] font-semibold">{service.location}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
