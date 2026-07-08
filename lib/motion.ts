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

// Standard fade-up — used for the large majority of whileInView content.
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: REVEAL_Y },
  whileInView: { opacity: 1, y: 0 },
  viewport: REVEAL_VIEWPORT,
  transition: { duration: REVEAL_DURATION, delay, ease: REVEAL_EASE },
});

// Opacity-only variant, for elements that don't move (no y-offset).
export const revealFade = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: REVEAL_VIEWPORT,
  transition: { duration: REVEAL_DURATION, delay, ease: REVEAL_EASE },
});
