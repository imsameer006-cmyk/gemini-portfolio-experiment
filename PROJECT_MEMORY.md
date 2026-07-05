# Project Memory Index

This file is the project handoff index for future sessions. Assume a future agent has no conversation history and should start here, then open the linked source-of-truth files.

## Source-of-Truth Files

- [Design System Reference](DESIGN_SYSTEM.md) - canonical visual, UX, content, component, and governance manual.
- [Portfolio Refinement Strategy & Key Decisions](DECISIONS.md) - decision log with rationale, alternatives, and tradeoffs.
- [CollabNetworkArt Artwork Logic](PROJECT_LOGIC.md) - current radial-art geometry and behavior notes.
- [Next Steps](NEXT_STEPS.md) - prioritized work queue.
- [Visual QA Checklist](VISUAL_QA_CHECKLIST.md) - production visual review support.
- [Thumbnail Guidelines](THUMBNAIL_GUIDELINES.md) - thumbnail-specific conventions.

## Current Portfolio Direction

Sameer Gautam's portfolio is positioned as a mature product-design portfolio for enterprise UX, workflow design, systems thinking, research, facilitation, and product strategy. The core proposition remains: building clarity out of complexity.

The intended feeling is calm, editorial, warm, precise, evidence-led, and systems-oriented. It should read closer to Apple editorial, Aesop, Monocle, Linear, and Notion than to a loud portfolio template, generic SaaS page, or personal lifestyle site.

## Current Implementation State

Implemented:

- Next.js app-router portfolio with homepage, work detail routes, internal demo surfaces, a standalone Token Atlas reference page, shared layout, nav, and footer.
- Homepage sequence: `Hero`, `Work`, `About`, `ExperienceMoments`, `Philosophy`, `Process`, `Testimonials`, `Contact`. Work grid now shows 3 projects (Gemini, PLM Collabspace, design-system).
- Structured case-study renderer driven by project and case-study data, now with 26 typed `Block` variants (21 original + 5 added 2026-07-05 for the design-system case study).
- Gemini project hero uses ordered 24-by-14 reactive mesh workflow art.
- Collabspace (`plm-collabspace`, renamed from `design-system` 2026-07-05) in-progress hero uses radial network art and atmospheric-river interaction language.
- Project 3 is "The System Behind the Site" (slug `design-system`) — a real case study auditing this portfolio's own design-token architecture, replacing the permanently-removed `mobile-checkout` placeholder. Has its own hero branch in `CaseStudy.tsx` (matches the Gemini/Collabspace hero shell exactly) and its own thumbnail (`DesignSystemThumbnail.tsx`).
- Token Atlas lives at `/system` (`app/system/page.tsx` + `layout.tsx`), a full reference of every token/component/governance rule, generated from a real 2026-07-05 audit. Linked from the design-system case study's hero and footer.
- In Practice / Selected Moments section is implemented with editorial documentary image cards, desktop four-card horizontal snap carousel, and mobile/tablet horizontal snap carousel.
- Editorial gallery treatment script exists at `scripts/apply-editorial-gallery-treatment.mjs`; treated images live in `public/Gallery/editorial`.
- Social sharing metadata is explicit in `app/layout.tsx`: `metadataBase` is `https://www.withsameer.design`, `og:url` is the canonical homepage, and Open Graph/Twitter image tags point to the static versioned PNG `public/og-image-v2.png`.
- `DESIGN_SYSTEM.md` is the canonical design-system document.
- Page-level eyebrow/section labels sitewide use copper (`--color-text-accent` light sections, `--color-accent` dark sections) as of 2026-07-05 — see `DECISIONS.md` #17 for exact scope.
- Nav wordmark is a solid band (white-on-muted-gray, square corners) as of 2026-07-05 — **currently fails WCAG AA contrast (~2.92:1) by deliberate, flagged user choice**. See `DECISIONS.md` #18 before touching it.

Partially implemented or still needing review:

- Case-study content completeness varies by project status.
- Collabspace remains an in-progress case study and should preserve the in-progress treatment until content is production-ready.
- Visual QA should still be run after major layout/content changes across desktop, tablet, and mobile.
- Some design values are documented conventions rather than fully tokenized implementation.
- LinkedIn may keep showing an older preview image until its crawler cache is refreshed. The live site has already been verified to serve exactly one `og:image` value, `https://www.withsameer.design/og-image-v2.png`, and the deployed PNG hash matches the local committed file.

Known documentation / artifact decisions:

- The external HTML visual design-system file from Downloads was reviewed and intentionally not adopted as canonical.
- If a visual companion is created later, it should be regenerated from `DESIGN_SYSTEM.md`, use correct fonts/UTF-8, avoid invented content, and cover the full system.

## Do Not Change Without Review

- Do not replace `DESIGN_SYSTEM.md` as the source of truth with an HTML artifact or visual sample.
- Do not shift the portfolio toward loud gradients, generic SaaS visuals, Dribbble-style decoration, or personal-album storytelling.
- Do not casually introduce new colors, typefaces, card radii, motion languages, or one-off page structures.
- Do not move project pages away from structured data/block rendering unless there is a documented architecture decision.
- Do not change the In Practice card caption rule casually: one title row plus one metadata row, with ellipsis instead of taller cards.
- Do not use project-specific accent colors in core hero/thumbnail systems unless the design-system direction is reviewed.
- Do not reuse Gemini's ordered workflow mesh for Collabspace; Collabspace uses radial network semantics.
- Do not reuse Collabspace's radial atmospheric river for Gemini; Gemini uses ordered workflow progression.
- Do not restore dynamic `app/opengraph-image.tsx` without review. The current social-share direction intentionally uses a static, versioned file because LinkedIn was holding onto the About portrait preview.
- Do not use the About portrait or documentary photos as the homepage social preview image unless the portfolio's metadata strategy is explicitly revisited.
- Do not resume `mobile-checkout`; it was permanently removed (not hidden) 2026-07-05 in favor of the design-system case study. See `DECISIONS.md` #13.
- Do not reintroduce slug `design-system` for PLM Collabspace; it is permanently `plm-collabspace` now. See `DECISIONS.md` #14.
- Do not revert the 2026-07-05 token remediation values (`color.text.muted`, `color.dark.muted`, the new `color.text.body`/`color.text.accent`/`color.focus.ring` tokens) without re-running the contrast math — the old values were real, measured WCAG AA failures. See `DECISIONS.md` #15.
- Do not use `color.text.muted` for a new page-level eyebrow/section label — that role now belongs to `color.text.accent` (light sections) / `color.accent` (dark sections). See `DECISIONS.md` #17.
- Do not silently "fix" the nav wordmark's contrast failure — it is a deliberate, flagged, user-approved choice. Loop the user in first. See `DECISIONS.md` #18.

## Recent Session Outcomes - 2026-07-05

A large session covering a full project pivot, a real accessibility audit, new content, and several rounds of nav/hero refinement. Full rationale for every decision below lives in `DECISIONS.md` #13–#18.

- **Project 3 pivot:** Permanently removed the `mobile-checkout` placeholder from `lib/data/projects.ts`. Replaced it with a real, shipped case study — "The System Behind the Site" (slug `design-system`) — a meta case study auditing this portfolio's own design-token architecture.
- **PLM Collabspace slug renamed:** `design-system` → `plm-collabspace` (4 files touched: `projects.ts`, `case-studies/index.ts`, `case-studies/plm-collabspace.ts`, `CaseStudy.tsx`'s `isCollabspace` check), freeing the slug for the new project 3.
- **Real sitewide token audit:** Grepped all 50 distinct hex values across 20 production component files (excluding the `hero-lab` sandbox), computed real WCAG contrast ratios. Found and fixed 4 genuine AA failures and 1 dead token; consolidated 3 competing near-blacks to 2 real tokens and 2 competing muted-grays to 1. Full before/after numbers in `DECISIONS.md` #15 and in the shipped case study/Atlas copy itself.
- **5 new case-study block types** added to `lib/types.ts` + `components/sections/CaseStudy.tsx`: `drift-audit`, `token-chain`, `contrast-matrix`, `component-anatomy`, `benchmark-matrix`.
- **New thumbnail:** `components/thumbnails/DesignSystemThumbnail.tsx` (scattered "drift" swatches converging into 3 resolved tokens, last one copper-accented).
- **New hero branch:** `CaseStudy.tsx` gained an `isDesignSystem` branch matching the Gemini/Collabspace hero shell exactly (top-anchored, `md:min-h-screen`, fixed cream background, 1280px width, balanced 6-item metadata grid) — it initially used a shorter/centered fallback hero and had to be corrected after review.
- **Token Atlas shipped at `/system`:** `app/system/page.tsx` (client component) + `app/system/layout.tsx` (server component, holds `metadata` export). 9 chapters built from the same real audit numbers. Chapter navigation reuses the existing `JumpToNav` component (left sidebar desktop / bottom drawer mobile) rather than a new one-off nav — had to fix a sidebar/content collision (missing `lg:pl-[150px] xl:pl-10` reserve) and a scroll-visibility-timing mismatch (header was too short relative to project heroes, fixed by matching `md:min-h-screen`).
- **Eyebrow/label color changed sitewide:** every page-level eyebrow now uses copper (`--color-text-accent` on light sections, `--color-accent` on dark sections) instead of muted gray. Exact scope (what changed vs. what deliberately didn't) is in `DECISIONS.md` #17.
- **Nav wordmark redesigned:** dropped "- Product Designer", now a solid band — white text on `--color-text-muted`, iterated down to square corners (`rounded-none`), `font-weight: 350`, and finally 70% background opacity. The 70%-opacity end state **fails WCAG AA (~2.92:1)** — this was computed and explicitly flagged before shipping; the user chose to proceed anyway. Treat as a known, deliberate exception, not a bug to silently fix.
- All changes verified via `tsc --noEmit`, `npm run build`, and Playwright-driven visual QA (including catching one QA-script false-positive: a fast-scroll fullPage screenshot appeared to show blank sections that were actually fine — confirmed by scrolling slower / spot-checking computed styles directly).
- Nothing in this session was committed mid-session; it was committed and pushed as a single batch at the end (see git log for the actual commit(s)).

## Recent Session Outcomes - 2026-06-19

- Added a custom-domain metadata base in `app/layout.tsx` so generated metadata resolves against `https://www.withsameer.design`.
- Replaced the dynamic Next.js Open Graph image route with a static, versioned share image:
  - Added `public/og-image-v2.png`.
  - Removed `app/opengraph-image.tsx`.
  - Added explicit Open Graph and Twitter metadata in `app/layout.tsx`.
  - Added `og:url` and `og:site_name`.
- Verified the live homepage source serves one correct Open Graph image tag:
  - `https://www.withsameer.design/og-image-v2.png`
  - Width `1200`, height `630`, PNG, public `200` response.
- Verified the live image hash matches the local committed image.
- Confirmed that continued display of the About portrait in LinkedIn is a LinkedIn cache issue, not a Vercel/custom-domain metadata issue.
- Recommended LinkedIn refresh workflow:
  - Inspect `https://www.withsameer.design/?v=3` in LinkedIn Post Inspector.
  - Use the `?v=3` share URL once if LinkedIn keeps using the old cached preview.
- Committed and pushed:
  - `f02d15c Add favicon-style sharing image`
  - `d6d87b9 Use custom domain for metadata base`
  - `700bf91 Use static versioned social share image`

## Recent Session Outcomes - 2026-06-17

- Added and shipped the In Practice / Selected Moments section after About.
- Added editorial WebP gallery treatment for six work-context photos.
- Updated the fourth In Practice card to `Systems Mapping`.
- Implemented mobile/tablet horizontal snap scrolling with dot navigation, later extended to a desktop four-card carousel for additional moments.
- Re-tightened In Practice cards to exactly two visual rows after a spacing experiment caused caption spill.
- Documented the current design system in `DESIGN_SYSTEM.md`.
- Reviewed a generated HTML visual design-system artifact and decided not to use it as the source of truth.
- Committed and pushed:
  - `3e4794d Add editorial experience moments section`
  - `41cba8f Tighten experience card captions`

## Working Tree Notes

At the time of this handoff, `.claude/settings.local.json` and `debug.log` have local modifications unrelated to the memory consolidation. Do not revert them without explicit user approval.
