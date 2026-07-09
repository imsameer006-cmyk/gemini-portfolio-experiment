# Portfolio audit — browser review, code verification, and fixes

**Dates:** 2026-07-08 to 2026-07-09
**Scope:** Homepage + case study pages (`localhost:3000`)

Raw material for a future case-study write-up. Kept technically accurate rather than polished.

---

## 1. Original browser-based audit

A browser-driven audit (3-persona review) of the running dev server produced 8 numbered findings. Important caveat disclosed by the audit itself: **its browser viewport was stuck at ~894px for most of the session** — between the `md` (768px) and `lg` (1024px) Tailwind breakpoints — which turned out to produce two false positives (see Finding 1 and 7b below).

| # | Claim | Severity |
|---|---|---|
| 1 | Homepage "Selected Work" grid: 2-column layout orphans the 3rd project card with a large empty gap | CRITICAL |
| 2 | React hydration error on the PLM Collabspace case study: SVG floating-point mismatch (`cx={795.3646502020695}` vs `"795.3646502020696"`) in the `CollabNetworkArt` hero animation | — |
| 3 | Sections flash blank when scrolling at normal-to-fast speed, before fade-in animations trigger | MAJOR |
| 4 | Framer Motion console warning: `motion()` is deprecated, use `motion.create()` | — |
| 5 | Next.js console warning: missing `data-scroll-behavior="smooth"` | — |
| 6 | 404 page has no in-body "back to home" link (only header nav) | — |
| 7 | Mobile: (a) image lightbox cramped at ~419px with unclear scroll/zoom; (b) footer dot-matrix wordmark clips at narrow widths | — |
| 8 | (Open) independent sweep for anything the audit missed | — |

---

## 2. Code-verification results

Every finding was checked directly against source before any fix — not just re-run in a browser.

| # | Verdict | Notes |
|---|---|---|
| 1 | **REFUTED — viewport artifact** | `components/sections/Work.tsx` grid is `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with exactly 3 featured projects. At 894px only `md:grid-cols-2` is active (below the 1024px `lg` breakpoint), producing exactly the reported "2-column, 3rd card orphaned" symptom. At ≥1024px, `lg:grid-cols-3` renders all 3 cards in one row — no orphan, no gap. |
| 2 | **CONFIRMED**, plus a second live location the audit missed | `components/sections/CollabNetworkArt.tsx` computes SVG node coordinates via `Math.cos`/`Math.sin` inside a `useMemo`, rendered unconditionally into `<motion.circle cx cy>`. `Math.sin`/`cos` aren't guaranteed bit-identical across JS engines (Node SSR vs browser V8) — legitimate source of last-digit float drift → hydration mismatch. See §3 for the second file. |
| 3 | **CONFIRMED, plausible** | Every section used Framer Motion `whileInView` with `initial={{opacity:0, ...}}` and no (or a late, negative) viewport margin. The `initial` state is genuinely invisible at first paint; `IntersectionObserver` fires asynchronously, so on a fast scroll content can be already in view but still at `opacity:0`. Not a viewport artifact — reproducible at any width. |
| 4 | **CONFIRMED** | `const MotionLink = motion(Link);` — exactly one occurrence, `components/sections/CaseStudy.tsx`. |
| 5 | **CONFIRMED** | `app/globals.css` sets `html { scroll-behavior: smooth }` but `app/layout.tsx`'s `<html>` tag had no `data-scroll-behavior` attribute. |
| 6 | **CONFIRMED, and worse than described** | There was no custom `app/not-found.tsx` in the project **at all** — the site fell back entirely to Next.js's bare built-in 404 boundary (no branding, no body content, hence no link). |
| 7a | **CONFIRMED, by design — UX polish gap** | For `mobileDetail` images below the `sm:` (640px) breakpoint, `CaseStudy.tsx`'s `Lightbox` renders the image at `w-[220vw]` inside an `overflow-auto` container — a deliberate "pan the full-res screenshot" pattern that works via plain touch-scroll but had zero visual affordance telling the user they could drag. (The audit's own stuck-at-894px viewport is *above* the 640px cutoff, so this specific finding must have come from separate, genuine narrow-width testing, not the stuck-viewport issue.) |
| 7b | **REFUTED** | Footer wordmark (`components/ui/PixelBand.tsx`, `variant="hero"`) is fully fluid: `width:100%` + CSS `aspect-ratio` + SVG `preserveAspectRatio="xMidYMid meet"`, `overflow:visible`, no clipping ancestor. Scales down at narrow widths, does not clip. |
| 8 | Nothing found in the initial sweep | No `console.log`, no legacy React/Next APIs, no other `typeof window` risks. Three more issues surfaced later during implementation — see §3. |

---

## 3. Bonus findings (code review caught, browser audit missed)

**1. Second hydration-risk file.** `app/hero-lab/_sandbox/CollabHeroSandbox.tsx` has the identical `Math.cos`/`Math.sin` pattern as Finding 2, and its own header comment claimed "not imported by any production page" — false: `app/hero-lab/page.tsx:3` imports it directly, and `/hero-lab` is a real, built, publicly-reachable route (just `robots: noindex`). Root cause: identical to Finding 2 — trig-derived SVG coordinates rendered during SSR with no rounding.

**2. Dead `status === "in-progress"` branch.** `app/work/[slug]/page.tsx` had a full-page-template-swap branch gated on `project.status === "in-progress"`, but zero projects in `lib/data/projects.ts` ever set `status` — 100% unreachable. The actual, working mechanism for a custom project hero is `CaseStudy.tsx`'s own `isGemini`/`isCollabspace`/`isDesignSystem` slug checks. Adding the `status` field (the "obvious" fix) would have been actively wrong — it would have swapped `plm-collabspace`'s real, complete case-study content for the `CaseStudyInProgress` "coming soon" placeholder.

**3. Reduced-motion WAAPI gap (treated as "Finding 9").** The site documents reduced-motion support on `/system`, but only case-study pages honored it (via a local `<MotionConfig reducedMotion="user">` in `CaseStudy.tsx`) — homepage sections had no reduced-motion awareness at all.
  - First attempt: wrap the whole app once in `MotionConfig reducedMotion="user"` (new `components/providers/MotionProvider.tsx`). Insufficient.
  - **Root cause:** `MotionConfig`'s `reducedMotion="user"` works exactly as Framer Motion documents it — it kills the transform/y-offset animation entirely, but *deliberately preserves the opacity crossfade at full duration* ("preserving the animation of other values like opacity," per Framer's own docs). Initial testing misread this as 21 of 42 elements "not reduced," which was actually a measurement artifact: elements can get two separate WAAPI `Animation` objects (transform + opacity) in non-guaranteed array order, and checking only `getAnimations()[0]` non-deterministically sampled whichever one landed first. The partial-preservation behavior is real, though — and it's inconsistent with this site's own established reduced-motion convention (the global CSS override in `globals.css` snaps every transition to ~0.01ms, an instant-snap standard, not "kill movement, keep gentle fades").
  - **Fix:** `lib/motion.ts`'s `reveal()`/`revealFade()` became `useReveal()`/`useRevealFade()` hooks that call `useReducedMotion()` directly and zero out duration/y/delay themselves, rather than depending on `MotionConfig`'s partial default. `MotionProvider` was kept as a belt-and-suspenders wrap for hover animations and anything outside `lib/motion.ts`.
  - **Verification:** rebuilt the test harness to check the *max* duration across *every* `Animation` object per element (not just index 0), via a real `IntersectionObserver` matching the production `rootMargin`, over a realistic continuous scroll. Confirmed 42/42 homepage elements fully instant under reduced motion; normal-motion durations/delays unchanged; hover animations unaffected.

---

## 4. Resolution table

| Finding | Fix | Commit |
|---|---|---|
| 1 (grid) | None — false positive | — |
| 2 (hydration, primary) | Round `Math.cos`/`Math.sin` output to 4 decimal places in `CollabNetworkArt.tsx` | [`741af3e`](../../commit/741af3edb42bfb3690d11cd6605ca8f31e68cb56) |
| 2-bonus (hydration, `/hero-lab`) | Same rounding fix in `CollabHeroSandbox.tsx`; corrected its stale "not in production" comment | [`741af3e`](../../commit/741af3edb42bfb3690d11cd6605ca8f31e68cb56) |
| 3 (blank flash) | New `lib/motion.ts` shared reveal system: positive pre-trigger viewport margin, capped stagger, standardized durations/offsets across all 9 section files + `ProjectCard` + 3 thumbnails | [`2daf9ca`](../../commit/2daf9ca8b129995270d3e5501256b95739b291a1) |
| 4 (`motion()` deprecation) | `motion(Link)` → `motion.create(Link)` | [`816d05a`](../../commit/816d05ac02f5ca6477ffaff199b3f181baf6a124) |
| 5 (`data-scroll-behavior`) | Added attribute to `<html>` in `app/layout.tsx` | [`909f416`](../../commit/909f416f98c812dcd9f657d93e796d4fbcf60926) |
| 6 (404 page) | New `app/not-found.tsx`, reusing existing tokens/patterns, inherits nav/footer from root layout | [`60dfc8e`](../../commit/60dfc8ebe8098ee42b8c3b9df374249c3819fb24) |
| 7a (mobile lightbox) | "Drag to explore" pill affordance, dismisses on first scroll/touch, hidden ≥`sm:` | [`816d05a`](../../commit/816d05ac02f5ca6477ffaff199b3f181baf6a124) |
| 7b (footer wordmark) | None — false positive | — |
| 8 (initial sweep) | Nothing found at the time | — |
| Bonus: dead `status` branch | Removed branch, `ProjectInProgress` default export, `CaseStudyInProgress`, `status` field; updated `/system` component inventory count | [`9c58e57`](../../commit/9c58e57a8908863c9eab69b2fa894983b2b02922) |
| Bonus: reduced-motion gap ("Finding 9") | `useReveal`/`useRevealFade` hooks compute reduced-motion state directly; `MotionProvider` kept as a secondary safety net | [`4e38b18`](../../commit/4e38b18a28214fd136513e4e266cd94b16275bd3) |

---

## 5. Open items (deferred, not yet done)

- **`/system` page epilogue update** — the design-token audit page should get a short note referencing this cycle (viewport-artifact lesson, hydration-determinism rule, the reduced-motion fix) once a case-study-style write-up exists to link to.
- **Token Atlas addition** — `/system`'s "Motion" chapter (durations/easing table) predates `lib/motion.ts` and doesn't yet document `REVEAL_VIEWPORT` / `REVEAL_DURATION` / `REVEAL_Y` / `staggerDelay` as first-class tokens. Should be added alongside the existing untokenized-duration callout.
