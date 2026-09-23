const Experts = () => {
  return (
    <section className="mx-auto my-14 w-[90%] max-w-7xl lg:my-24">
      <div className="relative isolate flex min-h-[620px] flex-col justify-end overflow-hidden rounded-[28px] bg-purple-500 px-6 pb-10 pt-[78vw] sm:min-h-[680px] sm:px-10 sm:pt-[520px] lg:min-h-[570px] lg:justify-center lg:overflow-visible lg:rounded-none lg:bg-transparent lg:py-16 lg:pl-[48%] lg:pr-[6%]">
        <img
          src="/experts-purple-bg.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 hidden h-full w-full lg:block"
        />

        <img
          src="/experts-bg.png"
          alt="The Ownage property experts"
          className="absolute left-1/2 top-8 -z-10 w-[88%] max-w-[584px] -translate-x-1/2 object-contain drop-shadow-2xl sm:w-[560px] lg:left-[-1.5%] lg:top-1/2 lg:w-[50%] lg:-translate-x-0 lg:-translate-y-1/2 lg:-rotate-2"
        />

        <div className="relative max-w-xl space-y-6 px-10">
          <h2 className="mt-3 text-[34px] font-semibold leading-tight sm:text-[44px] lg:text-[52px]">
            We Are Experts in Building Dreams.
          </h2>
          <p className="text-[18px]">
            From our humble beginnings to the growing communities we've built
            today. Our journey is driven by a simple brief, that everyone
            deserve a place they are proud to call their own.
          </p>
          <button className="bg-purple-20 text-white py-2 px-6 rounded-lg">
            Join the Tribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experts;
