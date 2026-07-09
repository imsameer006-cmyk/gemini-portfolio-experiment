"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Framer Motion doesn't automatically shorten whileInView/animate
// transitions for prefers-reduced-motion -- it drives them via the Web
// Animations API directly, which the global CSS transition-duration
// override in globals.css cannot reach. reducedMotion="user" makes every
// descendant motion component check the OS preference itself.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
