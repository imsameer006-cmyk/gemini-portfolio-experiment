"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
};

const pageTransition = {
  duration: 1.64,
  delay: 0.4,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [hasNativeViewTransitions, setHasNativeViewTransitions] = useState(false);

  useEffect(() => {
    setHasNativeViewTransitions(
      typeof (document as ViewTransitionDocument).startViewTransition === "function",
    );
  }, []);

  if (shouldReduceMotion || hasNativeViewTransitions) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={pathname.startsWith("/work/") ? { opacity: 0, y: 16 } : { opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
