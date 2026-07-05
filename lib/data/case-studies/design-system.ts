import type { CaseStudyData } from "@/lib/types";

export const designSystem: CaseStudyData = {
  projectSlug: "design-system",
  sections: [
    {
      label: "Overview",
      heading: "This site had seven blacks. I could prove it.",
      blocks: [
        {
          type: "paragraph",
          text: "This portfolio was designed and built solo, in an AI-native workflow — fast, iterative, mostly agent-generated. Speed came with a cost: every session made reasonable color decisions independently, and nothing forced them to agree with each other.",
        },
        {
          type: "paragraph",
          text: "So I audited it. Not a redesign — a real, measured pass across every production file: every hex value, every WCAG contrast ratio, every place a component reached for a raw color instead of a decision. This case study documents what that audit actually found, and what changed as a result.",
        },
        { type: "subheading", text: "My Role" },
        {
          type: "callout",
          text: "Design & architecture, solo. Audit → token remediation → component work, executed with Claude Code as the implementation partner.",
        },
        { type: "subheading", text: "What changed" },
        {
          type: "callout",
          text: "3 near-black values consolidated to 2 deliberate tokens. 2 competing muted-grays merged into 1 that passes WCAG AA. 4 real contrast failures found and fixed. 1 dead token discovered and put to work.",
        },
      ],
    },

    {
      label: "The Audit",
      heading: "Fifty colors, for a five-color palette.",
      blocks: [
        {
          type: "paragraph",
          text: "I grepped every hex value out of every production component — 20 files, excluding the internal hero-lab sandbox. Fifty distinct hex values came back, for a system meant to run on a warm neutral palette plus one accent. Three findings mattered more than the rest.",
        },
        {
          type: "drift-audit",
          groups: [
            {
              label: "Near-black text ink — 3 competing values, 104 declarations",
              swatches: [
                { hex: "#18171A", count: 64 },
                { hex: "#1C1A16", count: 26 },
                { hex: "#3A3836", count: 14 },
              ],
              resolved: [
                { hex: "#18171A", label: "color.text" },
                { hex: "#3A3836", label: "color.text.body" },
              ],
            },
            {
              label: "Muted gray labels — 2 competing values, one already quietly fixed",
              swatches: [
                { hex: "#9C9A95", count: 21 },
                { hex: "#74716D", count: 13 },
              ],
              resolved: [{ hex: "#6E6D69", label: "color.text.muted" }],
            },
            {
              label: "Copper accent — hardcoded, never referenced through a token",
              swatches: [{ hex: "#C07B50", count: 70 }],
              resolved: [
                { hex: "#C07B50", label: "color.accent" },
                { hex: "#96552F", label: "color.text.accent" },
              ],
            },
          ],
          stats: [
            { n: "50", label: "distinct hex values across 20 production components" },
            { n: "104", label: "near-black text declarations across 3 different hex values" },
            { n: "70", label: "raw instances of the copper accent, zero through a token" },
          ],
        },
        {
          type: "paragraph",
          text: "The middle finding was the most interesting: two different \"muted gray\" values were already coexisting. One (#74716D, used only inside the case-study renderer) had an accidental 4.57:1 contrast ratio — legible. The other (#9C9A95, used everywhere else — nav, cards, testimonials, captions) sat at 2.47–2.81:1, a real WCAG AA failure. Nobody had noticed one file had already half-solved the problem the rest of the site still had.",
        },
      ],
    },

    {
      label: "The Reframe",
      heading: "Drift isn't sloppiness. It's an unsigned contract.",
      blocks: [
        {
          type: "paragraph",
          text: "None of those 50 hex values was a mistake in isolation. Each was a reasonable decision, made again, by a different session, with no memory of the last one. That's the actual failure mode of agentic development: every undocumented decision gets re-decided — plausibly, differently, indefinitely.",
        },
        {
          type: "callout",
          text: "A design system is not a component library. It's a set of decisions made once, in a format both a human and a machine can obey without re-litigating it.",
        },
      ],
    },

    {
      label: "Foundations",
      heading: "Three tiers. Every value referenced, once.",
      blocks: [
        {
          type: "paragraph",
          text: "Every color now lives in a primitive, is given intent by a semantic token, and is consumed by components through that semantic layer — not the raw hex. The chain matters more than any single value: change the primitive, and every consumer updates with it.",
        },
        {
          type: "token-chain",
          steps: [
            {
              tier: "Tier 1 · Primitive",
              token: "#C07B50",
              why: "A raw value. It means nothing yet — it's just a warm copper hex.",
            },
            {
              tier: "Tier 2 · Semantic",
              token: "color.accent",
              why: "Intent: the brand's action color, reserved for display sizes and dark surfaces — not body text.",
            },
            {
              tier: "Tier 3 · Component",
              token: "card.border.hover",
              why: "One specific decision: what a project card does when a visitor reaches for it.",
            },
          ],
        },
        {
          type: "two-col-list",
          left: {
            heading: "New tokens this audit added",
            variant: "positive",
            items: [
              { label: "color.text.body", detail: "#3A3836 — softer body-copy ink, already in use, now given a name" },
              { label: "color.text.accent", detail: "#96552F — copper safe at body and label sizes, 4.5:1+ everywhere it's used" },
              { label: "color.focus.ring", detail: "Points to the existing hover token — which nothing had ever consumed until now" },
            ],
          },
          right: {
            heading: "Existing tokens this audit changed",
            variant: "warning",
            items: [
              { label: "color.text.muted", detail: "#9C9A95 → #6E6D69 — the two competing grays, unified into one that passes" },
              { label: "color.dark.muted", detail: "#6A6860 → #847F76 — failed at its actual 12–16px usage, not the large-text size it was assumed to be" },
            ],
          },
        },
      ],
    },

    {
      label: "Accessibility",
      heading: "Computed, not claimed.",
      blocks: [
        {
          type: "paragraph",
          text: "With every color pairing named, auditing became arithmetic: compute the WCAG contrast ratio for every documented text/surface pairing actually in use. Primary text held up well — 16.4–17.9:1 across every surface. Four pairings did not.",
        },
        {
          type: "contrast-matrix",
          rows: [
            { pairing: "text.primary / all surfaces", swatchBg: "#F9F8F5", swatchFg: "#18171A", ratio: "16.4–17.9:1", verdict: "pass-aaa" },
            { pairing: "text.secondary / warm.bg", swatchBg: "#F9F8F5", swatchFg: "#6A6764", ratio: "5.29:1", verdict: "pass" },
            {
              pairing: "text.muted (old #9C9A95) / all surfaces",
              swatchBg: "#F9F8F5",
              swatchFg: "#9C9A95",
              ratio: "2.47–2.81:1",
              verdict: "fail",
              fix: "→ #6E6D69, 4.55–5.18:1",
            },
            {
              pairing: "accent as body text / light surfaces",
              swatchBg: "#F9F8F5",
              swatchFg: "#C07B50",
              ratio: "2.98–3.19:1",
              verdict: "fail",
              fix: "new token text.accent #96552F, 4.8–5.9:1",
            },
            {
              pairing: "focus ring / tinted surface",
              swatchBg: "#F2F0EB",
              swatchFg: "#C07B50",
              ratio: "2.98:1",
              verdict: "fail",
              fix: "ring repointed to accent.hover, 4.05:1",
            },
            {
              pairing: "role-pill text · 10px bold copper",
              swatchBg: "#FBF5EF",
              swatchFg: "#C07B50",
              ratio: "3.14:1",
              verdict: "fail",
              fix: "→ text.accent, 4.7–5.3:1",
            },
            {
              pairing: "dark.muted at true 12–16px usage",
              swatchBg: "#141310",
              swatchFg: "#6A6860",
              ratio: "3.33:1",
              verdict: "fail",
              fix: "→ #847F76, 4.67:1",
            },
            { pairing: "accent / dark sections", swatchBg: "#141310", swatchFg: "#C07B50", ratio: "5.48:1", verdict: "pass" },
          ],
        },
        {
          type: "paragraph",
          text: "The dark-muted failure was the sharpest lesson: prior documentation assumed that token was only used at large sizes, where a lower ratio is compliant. It wasn't — Footer, Contact, and Philosophy all render it at 12–16px, regular weight. The assumption was never checked against the actual rendered site.",
        },
      ],
    },

    {
      label: "Components",
      heading: "Where tokens and rules converge.",
      blocks: [
        {
          type: "paragraph",
          text: "A component is the synthesis: every visual property should consume a token, every state should obey the accessibility spec. ProjectCard — the piece every visitor touches first — annotated against what it actually does.",
        },
        {
          type: "component-anatomy",
          componentName: "Gemini Digital Twin",
          annotations: [
            { label: "Resting border", token: "border-[#E6E3DD] · card.border → border.hairline" },
            { label: "Hover border + lift", token: "hover:border-[#C07B50]/40 · shadow, 300ms ease-out-expo" },
            { label: "Corner radius", token: "rounded-2xl · 16px, consistent across every card" },
            { label: "Metadata row", token: "text-[#6E6D69] · remediated muted token, not the old failing gray" },
            { label: "Focus + link semantics", token: "whole card is one Link, aria-label = case-study title" },
            { label: "Content rule", token: "one category label, one client pill, one impact pill, two-line description max" },
          ],
        },
      ],
    },

    {
      label: "Machine Contract",
      heading: "In agentic development, the system is the spec.",
      blocks: [
        {
          type: "paragraph",
          text: "This site is built by an agent working from my decisions. The token layer is the contract between us: I decide once, in a format the agent can consume deterministically. It generates freely inside that contract — and a raw hex outside it is a defect, not a style choice.",
        },
        {
          type: "decisions",
          items: [
            {
              heading: "G1 — Token reference only",
              body: "No raw hex, px, or ms in new component code. Grep is the gatekeeper — this audit is what happens when nobody runs it for a while.",
            },
            {
              heading: "G2 — Documented before shipped",
              body: "A new pattern that isn't in the system doc doesn't merge. The six block types this case study introduces went through the same check.",
            },
            {
              heading: "G3 — Contrast is arithmetic",
              body: "Every new color pairing gets computed against WCAG AA before it renders anywhere — not eyeballed.",
            },
            {
              heading: "G4 — Motion obeys the curve",
              body: "One easing (cubic-bezier(0.16, 1, 0.3, 1)) everywhere, reduced-motion respected globally. No bounce, no parallax.",
            },
            {
              heading: "G5 — Human signs the decision",
              body: "The agent executes; taste, trade-offs, and every token value stay mine. This audit's fixes were proposed as options and chosen deliberately, not auto-applied.",
            },
          ],
        },
      ],
    },

    {
      label: "Validation",
      heading: "Benchmarked against the systems that set the standard.",
      blocks: [
        {
          type: "paragraph",
          text: "Checked against Material 3 and IBM Carbon — not for parity of scale, but to verify every structural category a mature system carries is actually present here. Two gaps are real, and they're listed as gaps, not hidden.",
        },
        {
          type: "benchmark-matrix",
          rows: [
            { category: "Three-tier token architecture", m3: true, carbon: true, self: true },
            { category: "Color tokens with usage constraints", m3: true, carbon: true, self: true, note: "documented \"not for\" per token" },
            { category: "Type scale as live specimens", m3: true, carbon: true, self: true },
            { category: "Spacing & grid rules", m3: true, carbon: true, self: true },
            { category: "Motion tokens (ease + duration)", m3: true, carbon: true, self: true },
            { category: "Component states incl. focus", m3: true, carbon: true, self: true, note: "20 components, 26 case-study block types" },
            { category: "WCAG contrast, computed & documented", m3: true, carbon: true, self: true, note: "4 real failures found and fixed above" },
            { category: "Governance & contribution rules", m3: true, carbon: true, self: true, note: "five gates" },
            { category: "Icon system", m3: true, carbon: true, self: "roadmap" },
            { category: "Data-visualization palette", m3: true, carbon: true, self: "roadmap" },
          ],
        },
      ],
    },

    {
      label: "Impact",
      heading: "Before and after",
      blocks: [
        {
          type: "before-after",
          before: {
            heading: "Before the audit",
            items: [
              { label: "3 near-black values", detail: "doing the job of text ink, with no documented reason for the split" },
              { label: "2 competing muted grays", detail: "one accidentally accessible, one failing WCAG AA everywhere else" },
              { label: "4 real contrast failures", detail: "muted text, copper-as-text, focus ring, and dark-muted at its true size" },
              { label: "1 dead token", detail: "color.accent.hover, defined in globals.css, never once consumed" },
            ],
          },
          after: {
            heading: "After the audit",
            items: [
              { label: "2 deliberate ink tokens", detail: "color.text for headings, color.text.body for long-form copy" },
              { label: "1 unified muted token", detail: "color.text.muted at #6E6D69 — passes AA on every surface it's used" },
              { label: "0 known contrast failures", detail: "every documented pairing re-measured and passing" },
              { label: "1 token put to work", detail: "color.accent.hover now drives the focus ring sitewide" },
            ],
          },
        },
        {
          type: "closing-line",
          text: "Every number in this case study was measured against this site's own compiled output — not written first and matched to later.",
        },
      ],
    },

    {
      label: "Reflection",
      heading: "A design system is a decision-making system.",
      blocks: [
        {
          type: "pull-quote",
          text: "In agentic development, the design system doesn't describe the product. It is the spec the product gets built from.",
        },
        {
          type: "paragraph",
          text: "The audit didn't invent problems to make a better story. It found three real ones — a genuine near-black split, an accidentally-half-fixed contrast failure, and a dead token nobody had noticed — and fixed them where they actually lived, across Nav, ProjectCard, ExperienceMoments, Testimonials, GeminiProjectHero, and the role-pill component. The interesting part was never the audit itself. It was that a solo, AI-native workflow can drift this much in a few months, silently, unless something is built to catch it.",
        },
      ],
    },
  ],
};
