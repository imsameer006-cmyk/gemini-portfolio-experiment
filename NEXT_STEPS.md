# Next Steps: Gemini Portfolio

## Immediate Next Priority

- [ ] **Resolve the nav wordmark's WCAG contrast failure.** `components/Nav.tsx`'s wordmark band (white text on `--color-text-muted` at 70% opacity) measures ~2.92:1, failing AA (needs 4.5:1). This was a deliberate, flagged, user-approved choice (see `DECISIONS.md` #18) — surface it for a conscious decision, don't silently "fix" or silently leave it either.
- [ ] Decide whether `/work/design-system` (and the general muted-gray→copper eyebrow change) needs a matching update to `THUMBNAIL_GUIDELINES.md` or `VISUAL_QA_CHECKLIST.md` — neither was reviewed in the 2026-07-05 session.
- [ ] If the old `/work/design-system` URL for PLM Collabspace was ever shared externally (résumé, LinkedIn, email), it now 404s post-rename to `/work/plm-collabspace`. Consider a redirect if this surfaces as a real problem.
- [ ] Refresh LinkedIn's cached homepage preview:
  - Inspect `https://www.withsameer.design/?v=3` in LinkedIn Post Inspector.
  - Confirm the preview uses `https://www.withsameer.design/og-image-v2.png`.
  - If LinkedIn still shows the About portrait, wait for crawler refresh or repeat with a new page query string. Do not change site metadata unless the live source regresses.
- [ ] Review the latest `DESIGN_SYSTEM.md` as the canonical source of truth before making future visual or UX changes.

## Secondary Priority

- [ ] Perform production visual QA on the homepage and all case-study pages after the 2026-07-05 sitewide token remediation and eyebrow color change (see `DECISIONS.md` #15, #17) — spot-checked in dev, not yet re-verified on production after deploy.
- [ ] Continue the Collabspace case-study content pass when final narrative/media are ready.
- [ ] Audit all case-study pages for content completeness, captions, alt text, jump-nav labels, and responsive media behavior.
- [ ] Validate accessibility across interactive surfaces: nav (see contrast issue above), hero art, In Practice carousel, media lightboxes, jump nav, focus states, and reduced motion.
- [ ] Review final image assets for compression, aspect ratio consistency, meaningful alt text, and editorial treatment alignment.

## Blocked Items

- [ ] No active blocker.
- [ ] The generated HTML visual design-system file is intentionally not being used. It should not be treated as a blocker or a source of truth.
- [ ] LinkedIn preview freshness is externally cached. The site metadata is correct; LinkedIn may need Post Inspector or a cache-busted share URL.

## Future Improvements

- [ ] Icon system and a dedicated data-visualization color ramp are documented gaps (see `/system` chapter 09 "Governance" roadmap table) — no tokens or conventions exist for either yet.
- [ ] Motion durations (200/300/500ms, used consistently in code) are still not tokenized in `app/globals.css` — only the easing curves are. Two of the three defined easing tokens (`--ease-in-out-soft`, `--ease-spring`) remain entirely unused in code.
- [ ] If future case-study pages need tailored social previews, add route-specific static or generated OG images intentionally and document the metadata precedence.
- [ ] Add future projects through the established project data and case-study block architecture.
- [ ] Consider a resume or experience page only if it follows the design-system rules and avoids LinkedIn-style density.
- [ ] Gradually consolidate repeated colors, spacing, and typography into semantic conventions only when repetition creates maintenance risk.

## Completed 2026-07-05 (see `DECISIONS.md` #13–#18 for full rationale)

- [x] Renamed PLM Collabspace slug `design-system` → `plm-collabspace`.
- [x] Ran a real sitewide color/contrast audit (50 hex values, 20 production files) and remediated 4 genuine WCAG AA failures plus 1 dead token, in `app/globals.css` and consuming components.
- [x] Built 5 new case-study block types (`drift-audit`, `token-chain`, `contrast-matrix`, `component-anatomy`, `benchmark-matrix`) in `lib/types.ts` + `components/sections/CaseStudy.tsx`.
- [x] Wrote and shipped the new project 3 case study, "The System Behind the Site" (slug `design-system`), replacing the permanently-removed `mobile-checkout` placeholder. New thumbnail: `components/thumbnails/DesignSystemThumbnail.tsx`.
- [x] Built the Token Atlas as a standalone route at `/system` (`app/system/page.tsx` + `layout.tsx`), linked from the design-system case study's hero and footer.
- [x] Changed every page-level eyebrow/section-label sitewide from muted gray to copper accent (light sections: `--color-text-accent`; dark sections: `--color-accent`).
- [x] Redesigned the nav wordmark into a solid band (white-on-muted-gray, square corners, reduced weight and opacity) — see the flagged contrast issue above.
