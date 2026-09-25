import { useEffect, useRef, useState } from "react";
import { DownloadIcon, LocationIcon } from "../icons";

export type PropertyDetails = {
  id: number | string;
  img: string;
  category: string;
  title: string;
  desc: string;
  location: string;
  price: string;
  plotSize: string;
  status: string;
  overview: string;
  features: string[];
  options?: { plotSize: string; price: string }[];
  brochure?: string;
};

type PropertyModalProps = {
  property: PropertyDetails | null;
  onClose: () => void;
};

const PropertyModal = ({ property, onClose }: PropertyModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    if (!property) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [property, onClose]);

  if (!property) return null;

  const purchaseOptions = property.options ?? [
    { plotSize: "300 sqm", price: property.price },
    { plotSize: property.plotSize, price: property.price },
    { plotSize: "600 sqm", price: property.price },
  ];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close property details"
        onClick={onClose}
        className="modal-backdrop-enter absolute inset-0 bg-black/65 backdrop-blur-sm"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-modal-title"
        className="modal-panel-enter relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-5xl sm:rounded-3xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close property details"
          className="micro-button absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-white text-2xl shadow-lg"
        >
          ×
        </button>

        <div className="flex flex-col lg:min-h-[680px] lg:flex-row">
          <div className="bg-[#E6D7E9] px-6 py-10 sm:px-9 sm:py-12 lg:w-[38%] lg:px-10 lg:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-purple-20">{property.category}</p>
            <h2 className="mt-3 text-[30px] font-semibold leading-tight lg:text-[36px]">{property.title}</h2>
            <p className="mt-5 border-l-2 border-orange-20 pl-4 leading-7">
              {property.desc}
            </p>
            <div className="flex items-center gap-3 py-5">
              <LocationIcon />
              <p>{property.location}</p>
            </div>
            <img
              src={property.img}
              alt={property.title}
              className="h-[220px] w-full rounded-2xl object-cover"
            />
            <div className="mt-6 space-y-2 rounded-2xl bg-purple-20 p-5 text-white shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider">Starting from</p>
              <p className="text-2xl font-semibold">{purchaseOptions[selectedOption].price}</p>
            </div>

            <fieldset className="mt-7 space-y-3">
              <legend className="mb-3 font-semibold">Available purchase options</legend>
              {purchaseOptions.map((option, index) => (
                <label key={`${option.plotSize}-${index}`} className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 transition-colors ${selectedOption === index ? "border-purple-20 bg-white" : "border-purple-20/15 bg-white/45 hover:bg-white/75"}`}>
                  <span>
                    <span className="block text-xs uppercase text-[#606060]">Selling now</span>
                    <span className="font-semibold">{option.plotSize}</span>
                  </span>
                  <span className="text-right text-sm font-semibold">{option.price}</span>
                  <input type="radio" name="purchaseOption" value={index} checked={selectedOption === index} onChange={() => setSelectedOption(index)} className="sr-only" />
                </label>
              ))}
            </fieldset>
          </div>

          <div className="flex flex-col bg-white px-6 py-10 sm:px-10 sm:py-12 lg:w-[62%] lg:px-14 lg:py-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-purple-20">Property overview</p>
              <h3 className="mt-3 text-[26px] font-semibold sm:text-[32px]">A place designed for lasting value</h3>
              <p className="mt-6 text-[16px] leading-8 text-[#484848] sm:text-[18px]">{property.overview}</p>
            </div>

            <div className="mt-10 border-t border-black/10 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-purple-20">Features</h3>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">{property.status}</span>
              </div>
              <p className="mt-4 text-[15px] font-medium leading-7 text-[#484848] sm:text-[16px]">
                {property.features.join("  |  ")}
              </p>
            </div>

            <div className=" mt-10">
              <a href={property.brochure ?? property.img} download={`${property.title}-brochure`} className="micro-button inline-flex items-center justify-center gap-3 rounded-xl bg-orange-20 px-6 py-3.5 font-semibold text-black hover:bg-orange-20/90">
                Download brochure

                <DownloadIcon />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyModal;
