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

- Next.js app-router portfolio with homepage, work detail routes, internal demo surfaces, shared layout, nav, and footer.
- Homepage sequence: `Hero`, `Work`, `About`, `ExperienceMoments`, `Philosophy`, `Process`, `Testimonials`, `Contact`.
- Structured case-study renderer driven by project and case-study data.
- Gemini project hero uses ordered 24-by-14 reactive mesh workflow art.
- Collabspace in-progress hero uses radial network art and atmospheric-river interaction language.
- In Practice / Selected Moments section is implemented with editorial documentary image cards, desktop four-card horizontal snap carousel, and mobile/tablet horizontal snap carousel.
- Editorial gallery treatment script exists at `scripts/apply-editorial-gallery-treatment.mjs`; treated images live in `public/Gallery/editorial`.
- `DESIGN_SYSTEM.md` is the canonical design-system document.

Partially implemented or still needing review:

- Case-study content completeness varies by project status.
- Collabspace remains an in-progress case study and should preserve the in-progress treatment until content is production-ready.
- Visual QA should still be run after major layout/content changes across desktop, tablet, and mobile.
- Some design values are documented conventions rather than fully tokenized implementation.

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
