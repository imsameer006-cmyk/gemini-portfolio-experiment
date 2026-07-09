@AGENTS.md

# Project Conventions

Durable rules established during the 2026-07 audit/fix cycle (see `docs/audits/2026-07-portfolio-audit.md` for full context). Follow these automatically in future sessions.

## Motion

- All scroll-reveal animations MUST use the hooks in `lib/motion.ts` — `useReveal()` / `useRevealFade()` + `staggerDelay()`. Never hand-write `whileInView`/`initial`/`viewport`/`transition` props on a `motion.*` element for a scroll reveal.
- Call the hook once at the top of the component (`const reveal = useReveal();`), then spread `{...reveal(delay)}` per element — including inside `.map()` loops (the hook itself isn't called in the loop, only the function it returns).
- Reduced motion is handled *inside* these hooks via `useReducedMotion()`, computing `duration`/`y`/`delay` down to `0` directly. Do not rely on an ambient `MotionConfig` or the global CSS `transition-duration` override to shorten Framer-driven (`whileInView`/`animate`) animations — `MotionConfig reducedMotion="user"` only kills transform/movement and deliberately preserves opacity crossfades at full duration (this is Framer's documented behavior, not a bug), which doesn't match this site's snap-instantly convention.
- For `whileInView` animations that aren't a simple opacity+y fade (an x-slide, a `scaleX` divider, etc.), don't force them through `useReveal`/`useRevealFade` — keep the distinct animated property, but call `useReducedMotion()` directly and zero the duration/offset under reduced motion, same as everywhere else.
- `REVEAL_VIEWPORT` uses a fixed-pixel positive bottom margin (`"0px 0px 200px 0px"`), not a percentage — percentage rootMargins behave inconsistently across browsers in Framer's inView implementation.

## SSR determinism

- Never use `Math.random()`, `Date.now()`, or `Math.sin`/`Math.cos`-derived coordinates in anything that renders during SSR (i.e. not gated behind a client-only effect) — these are not guaranteed bit-identical between Node's SSR pass and the browser, and cause React hydration mismatches.
- If you need generative/pseudo-random SVG art that renders on the server, use either:
  - The `roundCoord` pattern (round trig output to a fixed precision, e.g. `Math.round(v * 1e4) / 1e4`) — see `components/sections/CollabNetworkArt.tsx`.
  - An integer-hash PRNG instead of trig entirely — see the documented pattern in `app/hero-lab/_sandbox/GeminiHeroSandbox.tsx`.
- `Math.sqrt` and plain arithmetic (`+`, `-`, `*`, `/`) are NOT a hydration risk — they're IEEE-754 exact/correctly-rounded. The risk is specifically transcendental functions (`sin`, `cos`, `tan`, `pow` with non-integer exponents) and non-deterministic sources.

## Design tokens

- Never introduce new hex color values, font families, or spacing/sizing values. Reuse the existing tokens documented at `/system` (the Token Atlas / design-system audit page).
- Any new component or UI element must reuse an existing pattern (pill/badge, card, primary/secondary button, section header) rather than inventing a new one-off style. Check `/system` and existing sibling components first.

## Custom project heroes

- A project gets a custom hero treatment via a hardcoded slug check in `CaseStudy.tsx` (`isGemini` / `isCollabspace` / `isDesignSystem`), not a data field. There is no `status` field on `Project` and no alternate full-page template mechanism — that existed once (`ProjectInProgress`'s default export, `CaseStudyInProgress`, `status?: "published" | "in-progress"`) and was removed as dead code (nothing ever set `status`). If a project genuinely needs a different hero, add another `isX` check following the same pattern.

## Accessibility floor

These are documented, load-bearing claims on `/system` — keep them true whenever you touch a component:
- Descriptive `alt` text on all images.
- Visible `:focus-visible` states on every interactive element (global rule in `globals.css` — don't override it away).
- Touch targets ≥ 44px (`min-h-[44px]` convention already used on buttons/links).
- Genuine reduced-motion support (see Motion section above) — not just a CSS override that happens to work for hover states.

## Verification habit

After any change:
1. Run `tsc --noEmit`.
2. Load the affected page(s) with the browser console open and check for hydration errors/warnings, not just a visual glance.
3. Test at both a real desktop width (≥1280px) and a narrow mobile width (<640px) — don't trust a single stuck viewport size (a prior audit's browser got stuck at ~894px and produced two false-positive findings as a result).
