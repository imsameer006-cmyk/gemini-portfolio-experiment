# Key Decisions: Portfolio Refinement

## 1. Unified Hero Color Strategy ("Brand-Aligned Unity")
- **Decision:** All project hero art must strictly follow a shared "Neutral Taupe + Brand Copper" palette.
- **Rationale:** Previous use of project-specific accents (Teal/Green) created visual dissonance. Unifying ensures the portfolio feels like a coherent ecosystem.
- **Principle:** Neutral Taupe (`#9E7E6B`) for inactive structure; Brand Copper (`#C07B50`/`#BFA391`) for active interaction and system flow.

## 2. Animation Logic ("Atmospheric River")
- **Decision:** Replace mechanical "pulsing" or "train" animations with continuous, overlapping staggered shimmer loops.
- **Rationale:** Staggered paths ensure light is always present and flowing, removing the "dead space" that made previous animations feel mechanical and start-stop.
- **Trade-off:** Slightly more complex SVG layering (multiple paths), but higher visual fidelity.
- **Scope note:** This radial atmospheric-river language is reserved for Collabspace/network art. Gemini now uses a linear completion sweep and reactive mesh illumination.

## 3. Typographic Prominence
- **Decision:** Reverted headline typography changes.
- **Rationale:** While increased size was impressive, the risk of layout shifting and breaking the two-line constraint was too high. The original typographic hierarchy is the safe, established design.

## 4. UI/Thumbnail Interaction
- **Decision:** Static stroke widths for thumbnail animations.
- **Rationale:** Maintains "blueprint" precision. Animation intensity is achieved through gradient motion and opacity shifts rather than scaling/stroke changes.

## 5. Gemini Hero Art Evolution
- **Initial production direction:** The Gemini hero used a fixed-path workflow network with hardcoded routes, decorative micro-lines, hover halos, frozen halos, and route shimmer layers.
- **Problem:** The art felt expressive but was harder to keep mathematically precise across viewports. Paths and nodes were authored separately, which made alignment and progression logic more fragile.
- **Sandbox direction:** The art was reengineered into a 24-column by 14-row SVG matrix. Interactive nodes, mesh dots, mesh segments, labels, and hit targets share the same viewBox and grid coordinate system.
- **Final production decision:** Gemini now uses the reactive mesh architecture:
  - Nodes are locked to grid intersections.
  - Background mesh lines are split into per-cell segments.
  - Hover/activation lights only the local mesh neighborhood.
  - Workflow progression follows numbered left-to-right steps.
  - Stepped connectors travel only along orthogonal mesh paths.
  - Earlier active nodes settle while the newest node carries emphasis.
  - Completion resolves with a soft linear sweep and platinum/copper settling.
- **Rationale:** This better matches the Gemini case study narrative: visible ownership, ordered workflow state, and clarity emerging from governance complexity.

## 6. Collabspace Art Direction Placeholder
- **Decision:** Keep radial atmospheric-river logic for Collabspace, not Gemini.
- **Rationale:** Collabspace is about connected domains, knowledge flow, and collaboration networks, so radial hub-and-spoke motion is a better semantic fit than linear workflow progression.
- **Next pass:** Revisit Collabspace hero art using radial network grammar, atmospheric-river shimmer, and the shared Neutral Taupe + Brand Copper palette.

## 7. `DESIGN_SYSTEM.md` as Canonical Source of Truth
- **Decision:** `DESIGN_SYSTEM.md` is the canonical design-system source of truth for the portfolio.
- **Rationale:** The Markdown file can preserve design principles, rationale, implementation notes, governance, component rules, and future-agent context in one editable place. It is easier to maintain alongside code than a standalone static visual artifact.
- **Alternative considered:** A generated HTML visual design-system file was reviewed as a possible companion.
- **Trade-off:** The HTML version is easier to browse visually, but it omitted major sections, used incorrect font assumptions, contained encoding artifacts, and risked becoming a second, conflicting source of truth.
- **Final direction:** Do not use the HTML file as canonical. If a visual companion is needed later, regenerate it from `DESIGN_SYSTEM.md`, fix UTF-8, load the correct fonts, remove invented claims, and cover the full system.

## 8. In Practice / Selected Moments Section
- **Decision:** Add an `ExperienceMoments` section after About to show documentary work-context images under the heading `In Practice.`
- **Rationale:** The portfolio needed evidence of facilitation, collaboration, workshops, systems mapping, and product-design practice beyond final UI artifacts. This section adds human credibility without turning the homepage into a resume.
- **Alternative considered:** Treating the images as a generic gallery or personal album.
- **Trade-off:** Documentary photos add warmth and proof, but they must remain tightly curated and work-centered so they do not dilute the enterprise/product positioning.
- **Final direction:** Keep this as a small, editorial proof section: six curated work-context cards, concise captions, mobile/tablet horizontal snap carousel, and desktop horizontal snap carousel with four cards visible at a time.

## 9. In Practice Two-Row Caption Rule
- **Decision:** Each In Practice image card uses one title row and one company/location metadata row. Overflow uses ellipsis.
- **Rationale:** A previous two-line title treatment could visually become three rows once the metadata row was included, which made card captions spill and disrupted the grid rhythm. The current rule preserves a stable card height and a calmer scan pattern.
- **Alternative considered:** Increasing vertical space between title and content or allowing the title to wrap to two lines.
- **Trade-off:** Ellipsis can hide part of a long label, but the captions are intentionally short and the stable two-row structure matters more for this section.
- **Final direction:** Do not casually increase caption height. Rename long labels before changing the component structure.

## 10. Editorial Gallery Treatment
- **Decision:** Treat In Practice photos with a quiet editorial WebP process and use the treated outputs from `public/Gallery/editorial`.
- **Rationale:** The source photos need to feel like a coherent portfolio section, not mixed raw event images. The current treatment reduces saturation and harsh contrast, warms neutrals, softens whites/highlights, lifts shadows, subdues greens/reds, and adds subtle deterministic grain.
- **Alternative considered:** Use raw images directly.
- **Trade-off:** Treatment reduces literal rawness, but creates stronger brand consistency and visual calm.
- **Final direction:** New work-context photos should receive the same editorial treatment unless there is a documented reason to deviate.

## 11. Documentation-First Handoff Practice
- **Decision:** End-of-session memory consolidation should update `PROJECT_MEMORY.md`, `DESIGN_SYSTEM.md`, `DECISIONS.md`, `PROJECT_LOGIC.md`, and `NEXT_STEPS.md` when relevant.
- **Rationale:** The portfolio has many design and interaction decisions that are easy to accidentally overwrite if future agents only inspect current code. The docs must preserve the reasoning and not just the implementation.
- **Alternative considered:** Leave context in chat history or commit messages only.
- **Trade-off:** Documentation maintenance takes time, but prevents repeated debate and design drift.
- **Final direction:** Meaningful visual, UX, architectural, or positioning changes should ship with matching memory updates.

## 12. Static Versioned Social Share Image
- **Decision:** Use a static, versioned social share image at `public/og-image-v2.png`, referenced explicitly from `app/layout.tsx` through Open Graph and Twitter metadata.
- **Rationale:** LinkedIn continued showing the About portrait even after the custom-domain metadata was corrected. The live source had correct generated OG metadata, but LinkedIn can cache older previews aggressively and can be less predictable with generated image endpoints. A static, versioned PNG gives crawlers a stable, inspectable asset and makes cache busting clearer.
- **Alternatives considered:**
  - Keep `app/opengraph-image.tsx` as the single generated source. This worked technically, but produced a generated `/opengraph-image?...` URL that was less transparent during LinkedIn debugging.
  - Use the About portrait or another photo as the share image. This was rejected because the portfolio's social preview should reinforce the black favicon-style asterisk mark rather than personal photography.
  - Rename again to `og-linkedin-v3.png`. This remains available if LinkedIn continues to cache `og-image-v2.png`, but it is not needed while the live static asset is serving correctly.
- **Trade-off:** A static image is less flexible than a generated route, but the social-share image is currently brand-level, not page-specific. Predictability matters more than dynamic generation.
- **Final direction:** Keep `og-image-v2.png` as the homepage social preview unless a future metadata review decides to create route-specific share images. When LinkedIn cache issues appear, verify the live image URL directly, verify there is only one `og:image`, use LinkedIn Post Inspector, and share a cache-busted page URL such as `https://www.withsameer.design/?v=3`.

## 13. Project 3 Pivot: Design-System Case Study Replaces mobile-checkout
- **Decision:** `mobile-checkout` is permanently removed from `lib/data/projects.ts` (not just hidden). Project 3's slot is now occupied by a new, real case study: "The System Behind the Site" (slug `design-system`) — a self-referential piece documenting an AI-native design-token audit of this portfolio itself.
- **Rationale:** mobile-checkout was placeholder content that never had real client details or a case study written. The user chose to pivot the slot to a meta case study about the portfolio's own design system instead of continuing to wait on mobile-checkout content.
- **Alternative considered:** Keep mobile-checkout hidden and add the design-system case study as a 5th project.
- **Trade-off:** Removing mobile-checkout entirely means any future desire to revive it starts from scratch (no salvageable placeholder). Accepted because the placeholder had no real content to preserve.
- **Final direction:** Do not resume mobile-checkout without explicit user request. Treat `design-system` as project 3 going forward.

## 14. PLM Collabspace Slug Renamed (`design-system` → `plm-collabspace`)
- **Decision:** Project 2 (Rohde & Schwarz PLM Collabspace) changed slug from `design-system` to `plm-collabspace`.
- **Rationale:** The old slug was a known mismatch (flagged in a prior audit as "URL doesn't match project"). It also collided with the new design-system case study, which needed that exact slug.
- **Trade-off:** Any external link to `/work/design-system` predating 2026-07-05 (résumé, LinkedIn, email signatures) now 404s. Not remediated with a redirect as of this writing.
- **Final direction:** `plm-collabspace` is the permanent slug for that case study. Do not reintroduce `design-system` for it.

## 15. Real Sitewide Color/Contrast Audit (not the reference file's numbers)
- **Decision:** Before writing the design-system case study's copy, a real audit was run against the actual production codebase (not the drafted reference HTML the user supplied, which turned out to be partly fabricated/exaggerated). Findings and fixes, applied to `app/globals.css` and consuming components:
  - **Real near-black drift**: `#18171A` (canonical, kept as `--color-text`) vs `#1C1A16` (used in Nav/GeminiProjectHero/ProjectInProgress) — consolidated to `#18171A`.
  - **New token `--color-text-body: #3A3836`** — tokenizes an existing, already-correct-contrast body-copy ink (About/CaseStudy/Testimonials) that had never been named.
  - **Real WCAG AA failure, fixed**: `--color-text-muted` changed `#9C9A95` (2.47–2.81:1, fail) → `#6E6D69` (4.55–5.18:1, pass). This also unified a second, undocumented muted-gray (`#74716D`, used only in `CaseStudy.tsx`, which had accidentally already half-fixed the same problem).
  - **Real WCAG AA failure, fixed**: copper (`#C07B50`) used as body/label-size text (role-pill, inline emphasis) measured 2.98–3.19:1. New token **`--color-text-accent: #96552F`** introduced — passes 4.7–5.9:1 on every light surface it's used on. `--color-accent` (#C07B50) is now reserved for display sizes, decoration, and dark surfaces only — never body/label text.
  - **Real WCAG AA failure, fixed**: `:focus-visible` outlined with `var(--color-accent)`, which only measured 2.98:1 on tinted surfaces (fails the 3:1 non-text minimum). New token **`--color-focus-ring: var(--color-accent-hover)`** (#A8643C) fixes it to 4.05–4.61:1 and is now what the base `:focus-visible` rule uses.
  - **Real WCAG AA failure, fixed (contradicted a stale assumption)**: `--color-dark-muted` was assumed to only ever render at large sizes, but Footer/Contact/Philosophy actually use it at 12–16px regular weight (3.33:1, fail). Changed `#6A6860` → `#847F76` (4.67:1, pass).
  - **Dead token found and put to work**: `--color-accent-hover` (#A8643C) was defined in `globals.css` but never consumed anywhere in the codebase until this audit — the actual hover-state color used elsewhere was a separate hardcoded `#A0622E`. The dead token is now the live source for `--color-focus-ring`, and the stray `#A0622E` was removed.
- **Rationale:** The whole point of the design-system case study is that its claims are independently verifiable; using the reference file's numbers as-is (some of which cited values from an internal, unshipped sandbox route, `app/hero-lab/page.tsx`, as if they were production drift) would have undermined that premise.
- **Final direction:** Do not casually change any of the token values above back. If a future contrast issue is found, re-run a real grep/contrast-ratio audit rather than eyeballing it, consistent with the case study's own "Governance Gate G3: Contrast is arithmetic."

## 16. Token Atlas as a Standalone Route (`/system`)
- **Decision:** A companion reference page — the full color/typography/spacing/motion/component/governance catalogue — ships as a real standalone route at `/system` (own `page.tsx` + `layout.tsx` for metadata, since the page is a client component and can't export `metadata` itself).
- **Rationale:** Routing precedent already existed for standalone informational pages outside `/work/[slug]` (`/demo`, `/hero-lab`). Nesting it under the case study's dynamic slug would have required inventing new routing patterns.
- **Alternative considered:** Fold the Atlas content into the case study itself, or skip building it (it was initially deferred, then built in a follow-up).
- **Final direction:** `/system` is linked from two places on the design-system case study: a small text link in the hero ("Browse the full Token Atlas") and a filled pill CTA after the case-study content, before the next-project footer. The Atlas links back to the case study too. Both links are gated on `project.slug === "design-system"` inside `CaseStudy.tsx`, not rendered for any other project.

## 17. Eyebrow / Section-Label Color Changed to Copper Accent, Sitewide
- **Decision:** Every page-level "eyebrow" label (small uppercase text sitting above a heading) sitewide now uses copper instead of neutral gray: `var(--color-text-accent)` (#96552F) on light sections, `var(--color-accent)` (#C07B50) on dark sections (Philosophy, Contact — `--color-text-accent` measures only 3.22:1 on the dark background and would fail AA there).
- **Rationale:** User preference, after noticing the Token Atlas page's own eyebrow treatment (originally a one-off, undocumented 4th label style) and asking for it applied globally.
- **Scope — changed:** homepage section labels (About "About", Work "Selected Work", Process "Process as a design tool.", Testimonials "Testimonials", ExperienceMoments "Selected Moments"), project-hero category labels (Gemini, Collabspace/InProgress, both branches of the design-system/generic hero in `CaseStudy.tsx`), every case-study section label (`section.label`, e.g. "Overview", "Challenge"), the case-study "Go deeper" label, and the adjacent-project footer label ("Next Project"/"Previous Project").
- **Scope — deliberately NOT changed:** metadata-grid field labels (Year/Role/Stack/Scope — these are a denser, different tier, `type.label.micro`), table headers and in-block micro-labels (Strength/Limitation/Challenge/Decision/Outcome), Philosophy's per-card "01/02/03" numbering, and `JumpToNav`'s "Jump to" UI-control label. These remain the muted-gray `color.text.muted` token.
- **Final direction:** New section-level eyebrows should use `var(--color-text-accent)` on light backgrounds and `var(--color-accent)` on dark backgrounds. Do not use `color.text.muted` for a new page-level eyebrow — that convention is retired for this specific role (it's still correct for dense/metadata-tier labels).

## 18. Nav Wordmark Redesigned as a Solid Band — Known, Deliberate WCAG Failure
- **Decision:** The nav wordmark changed from plain text "Sameer Gautam - Product Designer" to a solid rectangular band (`border-radius: 0`, no pill), background `var(--color-text-muted)` at **70% opacity**, containing just "Sameer Gautam" in white, `font-weight: 350` (30% down from medium/500). Vertically centered with the rest of the nav (both sit at the nav's exact vertical center, `h-16` → 32px).
- **Rationale:** User-directed visual redesign, iterated in several explicit steps: (1) drop "- Product Designer", (2) style as a solid band using the design system's muted-gray token with white text, (3) square off the corners and reduce the type weight 30%, (4) reduce the band's background opacity by 30%.
- **Known issue, flagged and shipped anyway on explicit request:** At 70% opacity, the band's effective rendered color blends with the cream page background to roughly `#989793`. White text on that measures **2.92:1** — a real WCAG AA failure (needs 4.5:1 at this size/weight). This was computed and explicitly flagged to the user before implementing; the user chose to proceed. **This is the one place on the site that currently fails the project's own accessibility bar on every page**, since `Nav` renders globally.
- **Final direction:** Do not "fix" this contrast issue by silently reverting the opacity — it was a deliberate, informed choice. If revisited, the fix is to either raise the opacity back toward 90–100% or pick a darker base token; loop the user in before changing it either way.
