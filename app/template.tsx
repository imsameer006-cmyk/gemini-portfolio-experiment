"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const pageTransition = {
  duration: 1.64,
  delay: 0.4,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isProjectPage = pathname.startsWith("/work/");
  const initial = shouldReduceMotion
    ? false
    : isProjectPage
      ? { opacity: 0, y: 16 }
      : { opacity: 0 };
  const animate = { opacity: 1, y: 0 };

  return (
    <motion.div
      key={pathname}
      initial={initial}
      animate={animate}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
