import { useState } from "react";

type BlogImageProps = {
  src: string;
  alt: string;
  className: string;
  eager?: boolean;
};

const BlogImage = ({ src, alt, className, eager = false }: BlogImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden bg-black/10">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-black/5 via-white/50 to-black/5" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export default BlogImage;
