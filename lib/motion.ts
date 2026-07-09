"use client";

import { useReducedMotion } from "framer-motion";

export const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

// Fixed-pixel bottom margin (not a percentage) so the pre-trigger distance is
// deterministic across browsers/contexts — percentage rootMargins can behave
// inconsistently in Framer's inView implementation. The observer fires while
// the element is still ~200px below the fold, so content is already
// animating in — never blank — by the time it's actually visible, even on a
// fast scroll.
export const REVEAL_VIEWPORT = { once: true, margin: "0px 0px 200px 0px" } as const;

export const REVEAL_DURATION = 0.45;
export const REVEAL_Y = 16;

export const REVEAL_STAGGER_STEP = 0.08;
export const REVEAL_STAGGER_MAX = 0.3; // last child's delay never exceeds this

export const staggerDelay = (index: number) =>
  Math.min(index * REVEAL_STAGGER_STEP, REVEAL_STAGGER_MAX);

// MotionConfig's reducedMotion="user" only kills the transform/y-offset half
// of a whileInView transition — it deliberately keeps the opacity crossfade
// running at full duration (that's Framer's own documented behavior, not a
// bug). This site's existing reduced-motion convention is more absolute: the
// global CSS override snaps every transition to ~0ms with no lingering fade.
// To match that, these hooks compute duration/y/delay themselves rather than
// leaning on MotionConfig's partial default.

// Standard fade-up — used for the large majority of whileInView content.
// Called once at component top level; the returned function is what each
// motion element (including .map()-generated list items) spreads.
export function useReveal() {
  const prefersReducedMotion = useReducedMotion();

  return (delay = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : REVEAL_Y },
    whileInView: { opacity: 1, y: 0 },
    viewport: REVEAL_VIEWPORT,
    transition: {
      duration: prefersReducedMotion ? 0 : REVEAL_DURATION,
      delay: prefersReducedMotion ? 0 : delay,
      ease: REVEAL_EASE,
    },
  });
}

// Opacity-only variant, for elements that don't move (no y-offset).
export function useRevealFade() {
  const prefersReducedMotion = useReducedMotion();

  return (delay = 0) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: REVEAL_VIEWPORT,
    transition: {
      duration: prefersReducedMotion ? 0 : REVEAL_DURATION,
      delay: prefersReducedMotion ? 0 : delay,
      ease: REVEAL_EASE,
    },
  });
}
