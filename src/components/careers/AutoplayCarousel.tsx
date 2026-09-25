import { useEffect, useState } from "react";
type CarouselImage = { src: string; alt: string };

const AutoplayCarousel = ({
  images,
  label,
}: {
  images: CarouselImage[];
  label: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [images.length]);

  const previous = (activeIndex - 1 + images.length) % images.length;
  const next = (activeIndex + 1) % images.length;

  return (
    <section
      aria-label={label}
      aria-roledescription="carousel"
      className="mx-auto w-[90%] max-w-6xl"
    >
      <div className="flex items-center justify-center gap-4 overflow-hidden sm:gap-6">
        <img
          key={`previous-${images[previous].src}`}
          src={images[previous].src}
          alt={images[previous].alt}
          className="carousel-side-enter hidden h-[350px] min-w-0 flex-1 rounded-2xl object-cover opacity-75 md:block"
        />
        <img
          key={`active-${images[activeIndex].src}`}
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          className="carousel-focus-enter h-[330px] w-full rounded-2xl object-cover shadow-xl sm:h-[400px] md:h-[450px] md:max-w-[370px]"
        />
        <img
          key={`next-${images[next].src}`}
          src={images[next].src}
          alt={images[next].alt}
          className="carousel-side-enter hidden h-[350px] min-w-0 flex-1 rounded-2xl object-cover opacity-75 md:block"
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Choose slide"
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${index === activeIndex ? "w-8 bg-purple-20" : "w-2.5 bg-purple-20/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutoplayCarousel;
