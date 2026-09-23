import React from "react";

const Testimonials = () => {
  return (
    <section className="min-h-screen bg-[url('/service-bg.png')] bg-cover bg-center py-12 sm:py-16 lg:py-20">
      <div className="w-[90%] mx-auto">
        <h2 className="font-semibold lg:text-[50px] text-[30px] text-center">
          What some of our happy{" "}
          <span className="text-purple-20">client say</span>
        </h2>
        <p className="py-3 text-[#0E2824] lg:text-[16px] text-center">
          Trusted by people, chosen for a reason
        </p>

        <div className="flex lg:flex-row flex-col items-center w-full lg:space-x-10 justify-between">
          <div className="lg:w-[70%] relative lg:mt-0 mt-10 flex lg:flex-row flex-col items-center space-x-3">
            <img src="/client.png" alt="client-avatar" />
            <div className="space-y-3 lg:absolute lg:w-[50%] right-10">
              <h2 className="lg:text-[30px] text-[24px] font-semibold">Tunde Adeyemi</h2>
              <p className="lg:text-[20px]">
                From the first site inspection to getting the keys, to the
                entire process was smooth and transparent. Ownage Group truly
                delivers on there promise of quality and value.
              </p>

              {/* carousel to be added later */}
              <div className=""></div>
            </div>
          </div>

          <div className="lg:w-[30%] lg:mt-0 mt-10">
            <img src="/people-grouped.png" alt="grouped-avatars" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
