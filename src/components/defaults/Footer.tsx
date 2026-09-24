import { useState } from "react";
import { FacebookIcon, InstagramIcon, TikTokIcon, XIcon } from "../icons";

const footerGroups = [
  {
    id: "explore",
    title: "Explore",
    items: [
      { label: "Home", href: "/" },
      { label: "Project", href: "/project" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers 1", href: "/careers" },
      { label: "Careers 2", href: "/careers-2" },
    ],
  },
  {
    id: "properties",
    title: "Our Properties",
    items: [
      { label: "Ownage Court", href: "/project" },
      { label: "Ownage Estate", href: "/project" },
      { label: "Ownage Residences", href: "/project" },
      { label: "View All Projects", href: "/project", accent: true },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    items: [
      { label: "12 Freedom Way, Ajibode, UI Ibadan", href: "https://maps.google.com/?q=12+Freedom+Way+Ajibode+UI+Ibadan" },
      { label: "+234 801 234 5678", href: "tel:+2348012345678" },
      { label: "hello@ownagegroup.com", href: "mailto:hello@ownagegroup.com" },
    ],
  },
];

const Footer = () => {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <footer className="bg-[#E6D7E9] py-10 sm:py-12">
      <div className="mx-auto w-[90%] max-w-7xl lg:grid lg:grid-cols-4 lg:gap-10">
        <div className="max-w-md space-y-4 pb-8 lg:pb-0">
          <img src="/logo.svg" alt="Ownage Group" className="h-auto w-32 sm:w-auto" />
          <p className="text-[14px] leading-6 text-[#282828] sm:text-[16px] sm:leading-7">
            Ownage Group is a real estate development company committed to
            creating exceptional spaces.
          </p>
        </div>

        {footerGroups.map((group) => {
          const isOpen = openGroup === group.id;
          return (
            <div key={group.id} className="border-b border-[#B388BE66] lg:border-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`footer-${group.id}`}
                onClick={() => setOpenGroup(isOpen ? null : group.id)}
                className="flex w-full items-center justify-between py-5 text-left font-semibold text-purple-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-20 lg:hidden"
              >
                <span>{group.title}</span>
                <span aria-hidden="true" className={`text-3xl font-light leading-none transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}>›</span>
              </button>

              <div
                id={`footer-${group.id}`}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:block lg:opacity-100 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <h2 className="hidden font-semibold text-purple-20 lg:block">{group.title}</h2>
                  <ul className="space-y-3 pb-5 lg:mt-4 lg:space-y-4 lg:pb-0">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <a href={item.href} className={`text-[14px] leading-6 transition-colors hover:text-purple-20 lg:text-[16px] ${item.accent ? "font-semibold text-purple-20 underline underline-offset-4" : "text-[#282828]"}`}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-9 flex w-[90%] max-w-7xl flex-col items-center gap-5 border-t-2 border-[#B388BE66] pt-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4" aria-label="Social media links">
          <a href="#" aria-label="Facebook" className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-20"><FacebookIcon /></a>
          <a href="#" aria-label="Instagram" className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-20"><InstagramIcon /></a>
          <a href="#" aria-label="X" className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-20"><XIcon /></a>
          <a href="#" aria-label="TikTok" className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-20"><TikTokIcon /></a>
        </div>

        <p className="text-center text-[12px] text-[#282828] sm:text-right lg:text-[16px]">
          Ownage Group 2026 © All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
