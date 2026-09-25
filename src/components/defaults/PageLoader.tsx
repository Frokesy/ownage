const PageLoader = ({ compact = false }: { compact?: boolean }) => (
  <div className={`grid place-items-center ${compact ? "py-10" : "min-h-screen"}`} role="status" aria-live="polite">
    <div className="flex flex-col items-center gap-4">
      <div className="logo-loader rounded-full bg-white p-5 shadow-xl">
        <img src="/logo.svg" alt="" className="w-28 sm:w-36" />
      </div>
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="loader-dot" /><span className="loader-dot" /><span className="loader-dot" />
      </div>
      <span className="sr-only">Loading page</span>
    </div>
  </div>
);

export default PageLoader;
