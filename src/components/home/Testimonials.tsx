import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Tunde Adeyemi",
    role: "Homeowner",
    image: "/about/tunde.png",
    quote: "From the first site inspection to getting the keys, the entire process was smooth and transparent. Ownage Group truly delivers on its promise of quality and value.",
  },
  {
    name: "Funmi Akinola",
    role: "Property Investor",
    image: "/about/funmi.png",
    quote: "The team explained every stage clearly and helped me choose a property that matched my long-term goals. I always felt informed and confident in my decision.",
  },
  {
    name: "Kunle Babatunde",
    role: "Landowner",
    image: "/about/kunle.png",
    quote: "What stood out was the attention to detail and honest communication. The documentation was straightforward, and every commitment was handled professionally.",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="bg-[url('/service-bg.png')] bg-cover bg-center py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-[90%] max-w-7xl">
        <h2 className="text-center text-[30px] font-semibold sm:text-[40px] lg:text-[50px]">
          What some of our happy{" "}
          <span className="text-purple-20">clients say</span>
        </h2>
        <p className="py-3 text-[#0E2824] lg:text-[16px] text-center">
          Trusted by people, chosen for a reason
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-between gap-8 lg:mt-12 lg:flex-row lg:gap-10">
          <div className="relative flex w-full flex-col items-center lg:w-[70%] lg:flex-row">
            <img
              key={`portrait-${activeIndex}`}
              src={activeTestimonial.image}
              alt={`${activeTestimonial.name}, ${activeTestimonial.role}`}
              className="carousel-focus-enter aspect-square w-[220px] shrink-0 rounded-full object-cover object-top shadow-xl sm:w-[270px] lg:w-[300px]"
            />
            <div key={activeIndex} className="carousel-focus-enter -mt-3 w-[92%] space-y-3 rounded-2xl bg-white p-6 shadow-xl sm:-mt-5 sm:p-8 lg:absolute lg:right-0 lg:mt-0 lg:w-[55%]">
              <p className="text-sm font-semibold uppercase tracking-wider text-purple-20">{activeTestimonial.role}</p>
              <h3 className="text-[24px] font-semibold lg:text-[30px]">{activeTestimonial.name}</h3>
              <blockquote className="text-[16px] leading-7 lg:text-[20px] lg:leading-8">“{activeTestimonial.quote}”</blockquote>

              <div className="flex items-center gap-2 pt-3" role="group" aria-label="Choose testimonial">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    aria-label={`Show testimonial from ${testimonial.name}`}
                    aria-current={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${index === activeIndex ? "w-8 bg-purple-20" : "w-2.5 bg-purple-20/30 hover:bg-purple-20/60"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full max-w-[260px] lg:w-[30%] lg:max-w-none">
            <img src="/people-grouped.png" alt="Ownage client community" className="w-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
