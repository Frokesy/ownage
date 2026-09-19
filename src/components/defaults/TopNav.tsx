import { HamburgerIcon } from "../icons";

const TopNav = () => {
  return (
    <div className="bg-[#ffffff] p-2 rounded-full shadow-sm lg:min-w-[70vw] min-w-[90vw] flex justify-between items-center">
      <div className="lg:hidden flex space-x-2 items-center">
        <div className="lg:hidden block">
          <HamburgerIcon />
        </div>
        <img src="/logo.svg" alt="logo" />
      </div>
      <img src="/logo.svg" alt="logo" className="lg:block hidden" />
      <ul className="lg:flex hidden space-x-10 text-[14px]">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/project">Project</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/blog">Blog</a>
        </li>
        <li>
          <a href="/Careers">Careers</a>
        </li>
        <li>
          <a href="/careers-2">Careers 2</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>

      <button className="bg-orange-20 hover:bg-orange-20/90 text-[14px] font-bold py-2 px-4 rounded-full">
        Let&apos;s Talk
      </button>
    </div>
  );
};

export default TopNav;
