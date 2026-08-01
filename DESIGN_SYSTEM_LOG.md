# Design System Decision Log

This log tracks color and design-system decisions from this point forward: what changed, why it changed, which tokens were created or modified, and any questions or conflicts raised during implementation.

Implementation and verification happen freely, but log entries and commits require explicit user approval after the live result has been reviewed. Never log or commit a change before it has been confirmed correct on the actual rendered page.

Use this entry format for future decisions:

```md
## [Date/session] - [Section/component name]
**Decision:** What was chosen.
**Reasoning:** Why it was chosen, including contrast requirements, mood, source references, or implementation constraints.
**Tokens created/modified:** Token names, grouped by tier: primitive, semantic, component.
**Questions raised / conflicts found:** Any ambiguity discovered, and how it was resolved.
```

## Umbrella Structure

Design-system decisions and Tier 3 component tokens are organized under three umbrellas:

- **Homepage:** Hero, Selected Work, About, Selected Moments/In Practice, Philosophy, Process, Testimonials, Contact.
- **Projects:** Gemini, Collabspace, and Design System case-study pages.
- **Auth:** `/enter` password page.

Runtime token names may remain short when they are already scoped by selector or component, but documentation must group each token and decision under its umbrella so future work does not flatten unrelated roles into one list.

## Homepage Umbrella

## 2026-07-26 - Three-tier color tokens and homepage Hero

**Decision:** Restructured the color system into three tiers: raw primitives, semantic role tokens, and component-specific tokens. Added a homepage Hero color treatment using lime background `#D2E823` and green text `#254F1A`. The nav uses the Hero green only in its transparent/resting state, then returns to its existing ink/copper treatment in the scrolled floating state.

**Reasoning:** The base palette already had useful semantic names, but several semantic tokens still owned raw hex values directly. Moving raw values into primitive tokens makes later palette work safer while preserving the current semantic API. The Hero color pairing is intentionally scoped so it does not recolor case studies, other homepage sections, or shared global text/background tokens.

**Tokens created/modified:**

Primitive:
`--primitive-cream-50`, `--primitive-white`, `--primitive-cream-100`, `--primitive-sand-200`, `--primitive-sand-300`, `--primitive-ink-900`, `--primitive-ink-700`, `--primitive-taupe-600`, `--primitive-gray-600`, `--primitive-copper-800`, `--primitive-copper-500`, `--primitive-copper-100`, `--primitive-copper-600`, `--primitive-charcoal-900`, `--primitive-charcoal-850`, `--primitive-charcoal-800`, `--primitive-cream-200`, `--primitive-stone-500`, `--primitive-taupe-700`, `--primitive-lime-500`, `--primitive-green-800`.

Semantic:
Existing `--color-*` tokens now reference primitives. Added `--color-bg-hero` and `--color-text-hero`.

Component:
Added `--hero-background-color`, `--hero-heading-color`, `--hero-body-color`, `--hero-scrim-color`, `--nav-wordmark-color-at-rest`, `--nav-link-color-at-rest`, `--nav-link-indicator-color-at-rest`, `--nav-wordmark-color-scrolled`, `--nav-link-color-scrolled`, and `--nav-link-indicator-color-scrolled`.

**Questions raised / conflicts found:** `DESIGN_SYSTEM.md` already existed, so the new living color-system log was named `DESIGN_SYSTEM_LOG.md` after confirmation. Hero art remains explicitly excluded and unmodified; its color system needs a separate decision pass.

**Known future pass:** The current Tier 2 semantic tokens are a first-pass migration, not a finalized semantic model. Revisit consolidation after more sections are colored and real redundancy is visible. For example, `--color-bg-hero` may eventually merge with `--color-warm-bg`, and `--color-text-hero` may fold into a broader hero-family semantic token if later Hero variants share the same intent.

## 2026-07-26 - Selected Work color hierarchy

**Decision:** Replaced the flat cyan/navy Selected Work treatment with a layered hierarchy. Turquoise `#43EBFF` is now environmental only; cards, thumbnails, pills, borders, metadata, and line-art use white/cool-white, blue-greys, navy, connector blue, and tiny lotus accents.

**Reasoning:** The section needed to feel structured and engineered without turning every interior component turquoise. Card elevation was refined so the resting state is calmer and hover state is perceptible through border/shadow, with no card movement. Thumbnail shadows and photo-card shadows were allowed visual breathing room inside their horizontal scrollers.

**Tokens created/modified:**

Primitive:
`--turquoise-400`, `--navy-900`, `--blue-grey-600`, `--blue-grey-400`, `--blue-grey-300`, `--cool-white`, `--surface-nested`, `--border-light`, `--border-subtle`, `--divider`, `--connector-blue`, `--card-hover-blue`, `--royal-blue`, `--bright-blue`, `--lotus-pink`, `--pill-default-bg`, `--pill-default-border`, `--pill-company-bg`, `--pill-achievement-bg`, `--thumbnail-border`.

Semantic:
Scoped under `#work`: `--color-text-primary`, `--color-text-interactive`, `--color-text-secondary`, `--color-text-muted`, `--color-text-disabled`, `--color-surface-page-work`, `--color-surface-card`, `--color-surface-thumbnail`, `--color-surface-nested`, `--color-border-primary`, `--color-border-subtle`, `--color-accent-lotus`.

Component:
`--work-background-color`, `--work-heading-color`, `--work-eyebrow-color`, `--work-description-color`, `--work-card-surface-color`, `--work-card-border-color`, `--work-card-border-color-hover`, `--work-card-shadow`, `--work-card-shadow-hover`, `--work-card-title-color`, `--work-card-description-color`, `--work-card-metadata-color`, `--work-card-cta-color`, `--work-card-cta-border-color`, `--work-card-cta-border-color-hover`, `--work-pill-default-surface-color`, `--work-pill-default-border-color`, `--work-pill-default-text-color`, `--work-pill-company-surface-color`, `--work-pill-company-text-color`, `--work-pill-achievement-surface-color`, `--work-pill-achievement-text-color`, `--work-thumbnail-background-color`, `--work-thumbnail-border-color`, `--work-thumbnail-nested-color`, `--work-thumbnail-grid-color`, `--work-thumbnail-primary-color`, `--work-thumbnail-secondary-color`, `--work-thumbnail-interactive-color`, `--work-thumbnail-connector-color`, `--work-thumbnail-lotus-color`, `--work-thumbnail-node-fill-color`.

**Questions raised / conflicts found:** Hero art remains excluded and untouched. The original flat Selected Work attempt was removed from the log before this corrected version was finalized.

## 2026-07-26 - About visual identity

**Decision:** Shifted the About section into a soft lavender environment `#F3E8F7` with navy heading, blue-grey body/supporting text, lotus pink label and small interaction states, lavender borders, white chips, and a warmer portrait shadow.

**Reasoning:** About now acts as the emotional transition between systems work and the person behind it, while preserving layout, typography scale, content structure, and the premium enterprise tone.

**Tokens created/modified:**

Primitive:
`--lavender-50`, `--lavender-border`, `--lotus-pink-strong`.

Semantic:
Uses the existing navy and blue-grey primitives from the Homepage color pass.

Component:
`--about-background-color`, `--about-heading-color`, `--about-body-color`, `--about-supporting-color`, `--about-eyebrow-color`, `--about-border-color`, `--about-portrait-surface-color`, `--about-portrait-shadow`, `--about-chip-background-color`, `--about-chip-border-color`, `--about-chip-text-color`, `--about-chip-border-hover`, `--about-chip-text-hover`.

**Questions raised / conflicts found:** `#5F7388` on `#F3E8F7` computes below 4.5:1 for normal body text, but the exact value came from the approved visual spec and was preserved.

## 2026-07-26 - Selected Moments / In Practice refinement

**Decision:** Kept In Practice on a white section background, switched the eyebrow and active indicators to lotus pink, moved heading/title text to navy, body and metadata to blue-greys, and refined photo-card borders/shadows to feel quieter and more editorial.

**Reasoning:** This section should read as documentary evidence, with photography first and interface treatment second. Resting cards are almost flat; hover relies on a soft two-layer navy-derived shadow and a slightly sharper cool border rather than a strong outline.

**Tokens created/modified:**

Primitive:
`--moments-border`, `--moments-border-hover`.

Semantic:
Uses shared white, navy, blue-grey, border-light, and lotus-pink primitives.

Component:
`--moments-background-color`, `--moments-eyebrow-color`, `--moments-heading-color`, `--moments-body-color`, `--moments-card-background-color`, `--moments-card-border-color`, `--moments-card-border-hover`, `--moments-card-shadow`, `--moments-card-shadow-hover`, `--moments-title-color`, `--moments-metadata-color`, `--moments-indicator-inactive`, `--moments-indicator-active`.

**Questions raised / conflicts found:** The horizontal scroll containers clipped hover shadows, so vertical breathing room was added inside the scrollers with matching negative margins. No layout/content redesign was introduced.

## Projects Umbrella

No project-specific color component tokens were introduced in this pass. Gemini, Collabspace, and Design System case-study pages continue to consume the shared global semantic palette.

## Auth Umbrella

No auth-specific color component tokens were introduced in this pass. `/enter` continues to consume the shared global semantic palette.
