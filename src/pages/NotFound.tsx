import { Link } from "react-router-dom";
import Footer from "../components/defaults/Footer";
import TopNav from "../components/defaults/TopNav";
import MotionIn from "../components/defaults/MotionIn";

const NotFound = () => (
  <div className="min-h-screen bg-white">
    <header className="flex justify-center px-4 py-6">
      <TopNav />
    </header>

    <main className="mx-auto flex w-[90%] max-w-4xl flex-col items-center px-4 py-20 text-center sm:py-28 lg:py-36">
      <MotionIn effect="zoom" className="relative isolate grid h-44 w-44 place-items-center sm:h-56 sm:w-56" ariaHidden>
        <div className="absolute inset-0 -z-10 rotate-6 rounded-[3rem] bg-purple-20/10 dark:bg-purple-20/20" />
        <div className="absolute inset-5 -z-10 -rotate-6 rounded-[2.5rem] bg-orange-20/35" />
        <span className="text-[70px] font-bold leading-none text-purple-20 sm:text-[92px]">404</span>
      </MotionIn>

      <MotionIn effect="down" delay={0.08}><p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-purple-20">Page not found</p></MotionIn>
      <MotionIn effect="zoom" delay={0.14}><h1 className="lexend mt-3 text-[36px] font-bold leading-tight sm:text-[50px]">This property address doesn’t exist.</h1></MotionIn>
      <MotionIn effect="up" delay={0.22}><p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#606060] sm:text-[19px] sm:leading-8">
        The page may have moved, or the link might be incorrect. Let’s get you back somewhere useful.
      </p></MotionIn>

      <MotionIn effect="up" delay={0.3} className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/" className="micro-button rounded-xl bg-purple-20 px-7 py-3 font-semibold text-white">Return home</Link>
        <Link to="/project" className="micro-button rounded-xl border border-purple-20 px-7 py-3 font-semibold text-purple-20">Browse projects</Link>
      </MotionIn>
    </main>

    <Footer />
  </div>
);

export default NotFound;
