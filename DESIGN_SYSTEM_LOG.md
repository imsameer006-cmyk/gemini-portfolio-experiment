# Design System Decision Log

This log tracks color and design-system decisions from this point forward: what changed, why it changed, which tokens were created or modified, and any questions or conflicts raised during implementation.

Use this entry format for future decisions:

```md
## [Date/session] - [Section/component name]
**Decision:** What was chosen.
**Reasoning:** Why it was chosen, including contrast requirements, mood, source references, or implementation constraints.
**Tokens created/modified:** Token names, grouped by tier: primitive, semantic, component.
**Questions raised / conflicts found:** Any ambiguity discovered, and how it was resolved.
```

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
