"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

export default function PageTransitionShell({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="min-h-screen"
      style={shouldReduceMotion ? undefined : { viewTransitionName: "page-body" }}
    >
      {children}
    </div>
  );
}
