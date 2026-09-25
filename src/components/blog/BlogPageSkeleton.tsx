import PageLoader from "../defaults/PageLoader";

const BlogPageSkeleton = () => (
  <div className="min-h-screen bg-white" role="status" aria-label="Loading blog posts">
    <PageLoader compact />
    <div className="mx-auto w-[90%] max-w-7xl animate-pulse">
      <div className="mx-auto h-10 w-56 rounded-lg bg-black/10" />
      <div className="mx-auto mt-4 h-5 w-80 max-w-full rounded bg-black/10" />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="rounded-xl border border-black/10 p-3">
            <div className="h-[220px] rounded-lg bg-black/10" />
            <div className="mt-4 h-3 w-1/2 rounded bg-black/10" />
            <div className="mt-4 h-6 w-full rounded bg-black/10" />
            <div className="mt-2 h-6 w-3/4 rounded bg-black/10" />
            <div className="mt-8 h-4 w-24 rounded bg-purple-20/20" />
          </div>
        ))}
      </div>
    </div>
    <span className="sr-only">Loading blog posts</span>
  </div>
);

export default BlogPageSkeleton;
