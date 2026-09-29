import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ImageRevealProps = {
  children: ReactNode;
  direction?: "left" | "right";
  className?: string;
  delay?: number;
};

const ImageReveal = ({
  children,
  direction = "left",
  className,
  delay = 0,
}: ImageRevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, x: direction === "left" ? -70 : 70, scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {children}
    </motion.div>
  );
};

export default ImageReveal;
