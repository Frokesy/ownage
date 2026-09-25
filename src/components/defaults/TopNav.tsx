import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "../icons";
import { useSiteContent } from "../../context/SiteContentContext";

const fallbackNavItems = [
  { label: "Home", href: "/" },
  { label: "Project", href: "/project" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Careers 2", href: "/careers-2" },
  { label: "Contact", href: "/contact" },
];

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useSiteContent();
  const navItems = settings?.navigation?.length ? settings.navigation : fallbackNavItems;
  const logo = settings?.logo?.url || "/logo.svg";
  const companyName = settings?.companyName || "Ownage Group";

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="theme-nav flex min-w-[90vw] items-center justify-between rounded-full bg-white p-2 shadow-sm lg:min-w-[70vw]" aria-label="Primary navigation">
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen(true)}
            className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-20"
          >
          <HamburgerIcon />
          </button>
          <Link to="/" aria-label={`${companyName} home`}><img src={logo} alt="" className="w-24" /></Link>
        </div>

        <Link to="/" aria-label={`${companyName} home`} className="hidden lg:block"><img src={logo} alt="" /></Link>
        <ul className="hidden items-center gap-8 text-[14px] lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link className="micro-nav-link font-medium transition-colors hover:text-purple-20" to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <Link to="/contact" className="micro-button rounded-full bg-orange-20 px-4 py-2 text-[14px] font-bold hover:bg-orange-20/90">
          Let&apos;s Talk
        </Link>
      </nav>

      <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isOpen}>
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={`theme-nav absolute inset-y-0 left-0 flex w-[84%] max-w-sm flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b border-black/10 pb-5">
            <Link to="/" onClick={() => setIsOpen(false)} aria-label={`${companyName} home`}><img src={logo} alt="" className="w-32" /></Link>
            <button type="button" aria-label="Close navigation menu" onClick={() => setIsOpen(false)} className="micro-button grid h-10 w-10 place-items-center rounded-full bg-purple-20 text-2xl text-white">×</button>
          </div>
          <ul className="mt-8 flex flex-col">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-black/10">
                <Link to={item.href} onClick={() => setIsOpen(false)} className="flex items-center justify-between py-4 text-lg font-semibold transition-colors hover:text-purple-20">
                  {item.label}<span aria-hidden="true" className="text-2xl font-normal">›</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="micro-button mt-auto rounded-xl bg-orange-20 px-6 py-3 text-center font-bold">Talk to our team</Link>
        </aside>
      </div>
    </>
  );
};

export default TopNav;
