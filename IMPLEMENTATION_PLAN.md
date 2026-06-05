# Implementation Plan: Portfolio Refinement

This plan outlines the phased approach for cleaning up the Gemini Portfolio foundation and ensuring a professional, enterprise-grade finish.

## Branch and Delivery Workflow

- `main` is the approved production branch.
- `claude` is the active experimentation branch.
- Future work should happen on `claude`, then be reviewed, approved, merged into `main`, pushed, and deployed.
- See `PROJECT_MEMORY.md` for the current source of truth.

## Phase 1: Tokens and Documentation (COMPLETED)
- [x] Audit existing project structure and styling.
- [x] Document the design system (`DESIGN_SYSTEM.md`).
- [x] Create a Senior UX Visual QA checklist (`VISUAL_QA_CHECKLIST.md`).
- [x] Draft the implementation roadmap (`IMPLEMENTATION_PLAN.md`).

## Phase 2A: Gemini Case Study and Hero Foundation (COMPLETED)
- [x] Reframe Gemini as a workflow-system/governance case study.
- [x] Improve enterprise UX positioning around ownership, permissions, review states, and next actions.
- [x] Promote finalized Gemini hero from lab exploration into the Gemini project page.
- [x] Keep `/hero-lab` as isolated preview space.
- [x] Align the three major flow diagrams around one visual language.
- [x] Correct Gemini project year to `2025-2026`.

## Phase 2B: Typography Cleanup
- [ ] **Standardize Font Vars:** Ensure all components use the CSS variables defined in `@theme` instead of hardcoded font-family strings.
- [ ] **Establish Scale:** Replace arbitrary hex values and sizes with standardized Tailwind utility classes or theme tokens.
- [ ] **Narrative vs. UI:** Audit all pages to ensure `Instrument Serif Italic` is strictly reserved for storytelling/display, and `Geist Sans` handles all functional UI.

## Phase 3: Spacing & Layout Cleanup
- [ ] **Grid Unification:** Ensure the 900px case study grid is consistently applied across all rich content blocks.
- [ ] **Vertical Consistency:** Standardize section gaps and block spacing (`space-y-X`) to match the vertical rhythm defined in the design system.
- [ ] **Structural Borders:** Replace inconsistent border colors with the standard `--color-border` (`#E6E3DD`).

## Phase 4: Component Consistency
- [ ] **Refactor Hardcoded Hexes:** Scan all components (`Hero`, `Work`, `CaseStudy`, etc.) and replace hardcoded hex colors (e.g., `#9C9A95`) with Tailwind color tokens (e.g., `text-muted`).
- [ ] **Standardize Cards:** Ensure `ProjectCard` and `ColCard` share the same border-radius, border-color, and hover-shadow behavior.
- [ ] **Pill & Label Sync:** Unify the "Role Pill" and "Standard Pill" styling logic for better visual coherence.

## Phase 5: Mobile Responsiveness
- [ ] **Breakpoint Audit:** Test all sections on mobile (375px), tablet (768px), and small desktop (1024px).
- [ ] **Stage Component Refinement:** Ensure the transition between vertical and horizontal "Stages" is seamless and visually polished.
- [ ] **Mobile Navigation:** Verify the sticky behavior and touch targets of the `JumpToNav` component.

## Phase 6: Visual QA & Polish
- [ ] **Animation Audit:** Fine-tune Framer Motion durations and easings for a "snappy yet professional" feel.
- [ ] **Asset Check:** Verify all image captions, alt text, and video loop behaviors.
- [ ] **Contrast & Accessibility:** Run an accessibility audit to ensure high contrast and proper ARIA labeling throughout the site.

## Phase 7: Final Portfolio Polish
- [ ] **Storytelling Flow:** Read through the Gemini case study to ensure the "Short Flow" business logic is crystal clear and visually supported.
- [ ] **Enterprise Credibility Check:** Review the overall aesthetic to ensure it projects the seniority and rigor expected for a high-level product design role.
- [ ] **Final Deployment Prep:** Clean up any remaining console logs or debug styles.
