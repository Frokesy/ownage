import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z" />
  </svg>
);

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("ownage-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#120f16" : "#163f36");
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  const toggleTheme = () => {
    document.documentElement.classList.add("theme-transitioning");
    setTheme(nextTheme);
    window.setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 650);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      className="fixed bottom-5 right-5 z-[80] grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white text-purple-20 shadow-xl transition-[transform,background-color,color] duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-20 dark:border-white/15 dark:bg-[#241d29] dark:text-orange-20 sm:bottom-7 sm:right-7"
    >
      <span key={theme} className="theme-icon-enter transition-transform duration-300 hover:rotate-12">
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
};

export default ThemeToggle;
