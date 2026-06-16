# Design System: Gemini Portfolio

This document outlines the current design system foundation for the Gemini Portfolio, focusing on professional enterprise SaaS aesthetics and unified brand identity.

## Current Design Language Status

The portfolio direction is warm, premium, minimal, and enterprise-oriented. Every project hero and case study must feel like part of the same architectural ecosystem.

- **Tone:** calm, clear, senior, systems-oriented, and specific.
- **Visual posture:** editorial warmth combined with enterprise UI precision.
- **Primary narrative:** clarity emerging from complex workflow governance.
- **Hero Principle:** Every hero must communicate hierarchy, progression, and completion. All hero art must strictly follow the "Brand-Aligned Unity" palette (Neutral Taupe Foundation + Brand Copper Accent), avoiding project-specific product colors (like Teal/Sage) in hero art diagrams.
- **Status color logic:** Green/Red reserved for completion/rejection.
- **Motion:** Subtle, purposeful, and state-driven. Gemini uses a linear completion sweep and local mesh illumination; radial atmospheric-river motion is reserved for Collabspace/network art.
- **Headlines:** High-prominence display font at scale with tight leading, two-line constraint.

## 1. Typography

### Typefaces
- **Display:** [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) (Italic). Used for emotional storytelling, section headings, and emphasis.
- **Sans (UI/Body):** [Geist Sans](https://vercel.com/font/sans). Used for functional UI, body text, and structural labels.
- **Mono:** [Geist Mono](https://vercel.com/font/mono). Used for data, technical metadata, and small labels.

### Scale
| Level | Size (Mobile/Desktop) | Weight | Font | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `3rem` / `clamp(3rem, 8vw, 7rem)` | 400 (Italic) | Instrument | Main landing headline |
| **Section Heading** | `2rem` / `clamp(1.5rem, 3vw, 2.25rem)` | 400 (Italic) | Instrument | Primary section titles |
| **Body (Standard)** | `text-base` (16px) | 400 | Geist Sans | Main content paragraphs |
| **Micro Label** | `text-[10px]` | 700 (Tracking 0.08em) | Geist Sans | Role pills, uppercase headers |

## 2. Color Palette

### Neutrals (Foundation)
- **Background:** `#F9F8F5` (`var(--color-warm-bg)`)
- **Surface:** `#FFFFFF` (`var(--color-surface)`)
- **Border:** `#E6E3DD` (`var(--color-border)`)

### Text
- **Primary:** `#18171A` (`var(--color-text)`)
- **Secondary:** `#6A6764` (`var(--color-text-secondary)`)
- **Taupe (Neutral/Ghost):** `#9E7E6B` (`var(--color-taupe)`) - Foundation for inactive art elements.

### Accent (Copper)
- **Brand Copper:** `#C07B50` (`var(--color-accent)`) - Primary actions/Active nodes.
- **Subtle Copper:** `#BFA391` (`var(--color-accent-subtle)`) - Secondary active states.

### Status (Enterprise)
- **Success (Green):** `#3a7a54`
- **Warning (Red):** `#B85A48`

## 3. Diagram Language (Hero Systems)

All interactive hero art must follow this unified semantic system:

- **Inactive/Ghost State:** Use `#9E7E6B` (Taupe) for structural lines, rings, and dots.
- **Active State:** Use Brand Copper (`#C07B50` / `#BFA391`) for active paths and triggered nodes.
- **Completion Sweep:** Use Copper-to-White-to-Copper atmospheric light. Gemini uses a linear sweep; Collabspace may use radial atmospheric-river motion.
- **No project-specific product accent colors (e.g., Green/Teal) are permitted in hero art.**

### Gemini Reactive Mesh Grammar

The Gemini hero is the canonical mesh-based workflow art direction.

- **Grid as source of truth:** Nodes, labels, dots, route lines, and hit targets must share one SVG coordinate system.
- **Grid-locked nodes:** Interactive nodes sit exactly on matrix intersections, not approximate HTML overlays.
- **Reactive fabric:** Mesh lines are split into per-cell segments so proximity illumination stays local to hovered/active nodes.
- **Progression route:** Workflow progression follows orthogonal stepped paths along the mesh only. No freeform connector paths.
- **Sequential interaction:** Nodes activate in numbered left-to-right order. Step numbers are quiet annotations below nodes, not primary badges.
- **State hierarchy:** The newest active node carries emphasis; earlier activated nodes settle into a quieter state.
- **Completion:** Final state resolves into subtle copper/platinum tones with a soft linear sweep.
- **Responsive behavior:** On mobile/tablet, the art becomes ambient. Reduce density/opacity and avoid relying on interaction.

### Collabspace Radial Network Grammar

Collabspace art should remain distinct from Gemini by using radial network logic.

- **Radial structure:** Hub-and-spoke or concentric network arrangements are appropriate.
- **Motion:** Radial atmospheric-river shimmer/sweep belongs here, not in the Gemini mesh.
- **Narrative:** Use radial motion to communicate knowledge flow, collaboration, and connected domains.
