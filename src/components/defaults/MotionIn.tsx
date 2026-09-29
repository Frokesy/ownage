import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionInProps = {
  children: ReactNode;
  className?: string;
  effect?: "up" | "down" | "zoom" | "left" | "right";
  delay?: number;
  duration?: number;
  ariaHidden?: boolean;
};

const MotionIn = ({
  children,
  className,
  effect = "up",
  delay = 0,
  duration = 0.65,
  ariaHidden,
}: MotionInProps) => {
  const prefersReducedMotion = useReducedMotion();
  const initial = {
    up: { opacity: 0, y: 32 },
    down: { opacity: 0, y: -28 },
    zoom: { opacity: 0, scale: 0.84 },
    left: { opacity: 0, x: -54 },
    right: { opacity: 0, x: 54 },
  }[effect];

  return (
    <motion.div
      className={className}
      aria-hidden={ariaHidden}
      initial={prefersReducedMotion ? false : initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {children}
    </motion.div>
  );
};

export default MotionIn;
