# Portfolio Design System Reference

This document is the single source of truth for the current Sameer Gautam portfolio website. It documents the existing visual language, interaction model, content structure, implementation patterns, and governance rules. It is intentionally descriptive first and prescriptive second.

This is not a redesign proposal. The website itself is the source material.

## Table of Contents

1. Purpose and Scope
2. Design Philosophy
3. Design Principles
4. Brand Personality
5. Project Architecture Audit
6. Page Architecture
7. Content Hierarchy
8. Layout System
9. Grid System
10. Spacing System
11. Typography System
12. Color System
13. Design Tokens
14. Image Treatment and Art Direction
15. Illustration and Art Direction
16. Component Inventory
17. Section Patterns
18. Case Study Template
19. In Practice Photo Section
20. Interaction Rules
21. Motion and Transitions
22. Accessibility Rules
23. Responsive Behavior
24. Content and Writing Guidelines
25. Metadata Rules
26. Implementation Notes
27. Governance Rules
28. Future Extension Rules
29. Do / Don't Examples
30. Maintenance Checklist
31. Current Implementation State
32. Protected Decisions

---

## 1. Purpose and Scope

### Current State

The portfolio is a product-design portfolio built in Next.js with Tailwind CSS, Framer Motion, Phosphor icons, structured project data, and reusable section components. It presents Sameer Gautam as a systems-oriented product designer working across enterprise UX, workflow design, user research, and product strategy.

Primary surfaces:

| Surface | Route / File | Purpose |
| --- | --- | --- |
| Homepage | `app/page.tsx` | Main narrative overview |
| Work detail pages | `app/work/[slug]/page.tsx` | Case-study pages generated from project data |
| Hero lab | `app/hero-lab/page.tsx` | Experimental/internal art exploration surface |
| Demo page | `app/demo/page.tsx` | Internal/simple preview surface |
| Global layout | `app/layout.tsx` | Fonts, metadata, nav, footer, shell |
| Global styling | `app/globals.css` | Theme tokens, base behavior, global effects |

### Observation

The system is not a generic portfolio template. It uses editorial pacing, restrained UI details, and product-system storytelling to communicate seniority and clarity. The components are simple on the homepage and more data-driven inside case studies.

### Recommendation

Keep this document updated whenever a new page category, component, token, interaction, or image treatment is introduced. Do not allow new UI patterns to ship without documentation.

---

## 2. Design Philosophy

### Current State

The website direction is:

- Minimal
- Editorial
- Calm
- Systems-oriented
- Human-centered
- Mature
- Evidence-driven
- Sophisticated without being decorative
- Product-design focused
- Enterprise/workflow/system-design oriented

It should feel closer to Apple editorial, Aesop, Monocle, Linear, and Notion than to a loud portfolio template or SaaS landing page.

### Observation

The visual system supports the core positioning: "Building clarity out of complexity." The design uses whitespace, quiet typography, warm neutrals, thin borders, subtle motion, and structured content blocks to show the designer's ability to simplify complex systems.

### Rules

- Let content, structure, and evidence carry the experience.
- Use decoration only when it clarifies a concept or reinforces the system metaphor.
- Favor restraint over spectacle.
- Favor calm hierarchy over dense UI.
- Favor specific product-design language over personal-brand exaggeration.
- Use motion as a state or reading aid, not as entertainment.

### When Not To Use

Do not use this design language for playful campaign pages, trend-led marketing pages, visual experiments intended to be expressive for their own sake, or content that needs a radically different brand context.

---

## 3. Design Principles

| Principle | Current State | Observation | Rule |
| --- | --- | --- | --- |
| Clarity before style | The hero, work cards, and case studies prioritize readable structure. | The site communicates product thinking through hierarchy. | Never add visual complexity unless it improves understanding. |
| Editorial restraint | Large serif headings, measured paragraphs, and generous spacing define the tone. | This creates maturity and calm. | Keep layouts spacious and copy specific. |
| Systems visible | Hero art, process content, and case-study blocks expose relationships, states, and workflows. | The portfolio must prove systems thinking. | Use diagrams, grids, metadata, and structured blocks when explaining complexity. |
| Evidence over hype | Projects emphasize roles, constraints, impacts, collaboration, and outcomes. | This supports hiring-manager evaluation. | Avoid vague claims; show the work logic. |
| Warm technicality | Geist provides product clarity; Instrument Serif provides editorial humanity. | The combination prevents both cold SaaS UI and overly personal storytelling. | Keep the serif/sans balance intact. |
| Motion as meaning | Motion introduces sections, reveals state, and supports interaction. | It is calm and purposeful. | Avoid bounce, parallax excess, and decorative animation. |

---

## 4. Brand Personality

### Current State

The brand voice is calm, mature, precise, and reflective. The visual language is warm-neutral, editorial, and systems-aware.

### Personality Attributes

| Attribute | How It Appears | Why It Matters |
| --- | --- | --- |
| Calm | Warm page background, low-saturation colors, generous spacing | Reduces noise and supports reading |
| Mature | Restrained hover states, thin borders, minimal accent use | Signals senior judgment |
| Human-centered | Documentary photos, testimonials, about portrait, collaboration language | Keeps systems work grounded in people |
| Evidence-driven | Case-study metadata, decisions, before/after blocks, impact pills | Supports hiring decisions |
| Systems-oriented | Mesh art, radial network art, structured data blocks | Makes complexity visible |
| Editorial | Italic serif headings, quote blocks, section pacing | Adds authorship and polish |

### Do Not Shift Toward

- Generic SaaS
- Loud gradients
- Dribbble-style showcase visuals
- Personal lifestyle blog
- Corporate brochure
- High-saturation startup visuals

---

## 5. Project Architecture Audit

### Current State

The project is organized around app routes, section components, UI components, thumbnails, data, and public assets.

| Area | Files | Role |
| --- | --- | --- |
| App shell | `app/layout.tsx`, `app/globals.css` | Fonts, theme, metadata, nav/footer shell |
| Homepage | `app/page.tsx` | Section order |
| Work route | `app/work/[slug]/page.tsx` | Case-study page generation |
| Sections | `components/sections/*` | Homepage and case-study sections |
| UI components | `components/ui/*` | Cards, annotated images, jump navigation |
| Thumbnails | `components/thumbnails/*` | Project-card visual language |
| Data | `lib/data/*`, `lib/types.ts` | Projects, beliefs, process steps, case-study content |
| Assets | `public/*` | Images, case-study media, resume, logos |
| Scripts | `scripts/*` | Asset treatment and screenshot helpers |

### Observation

The design system is partly tokenized through `app/globals.css`, but many values are still embedded directly in component class names. This is workable for a small portfolio but requires documentation to prevent drift.

### Recommendation

Future implementation can gradually consolidate repeated colors, spacing, and typography into named component-level conventions. Do not refactor for token purity without a design reason.

---

## 6. Page Architecture

### Page-Type Table

| Page Type | Purpose | User Goal | Hiring-Manager Goal | Required Structure |
| --- | --- | --- | --- | --- |
| Homepage | Introduce positioning and route users into proof | Understand who Sameer is and what he does | Assess fit, credibility, and work quality quickly | Hero, Work, About, In Practice, Philosophy, Process, Testimonials, Contact |
| Work index section | Showcase selected projects | Choose a case study | See project relevance and impact | Section label, editorial heading, project grid |
| Case study page | Explain product reasoning and execution | Understand the project story | Evaluate problem solving, constraints, role, impact | Hero, metadata, jump nav, structured narrative sections, adjacent project CTA |
| In-progress project page | Preserve page integrity before content is ready | Understand project exists and is being documented | See pipeline without broken content | Project hero, in-progress notice, disabled jump nav |
| About section | Humanize the designer and summarize positioning | Learn background and focus areas | Assess seniority and domain fit | Portrait, editorial heading, concise bio, capability pills |
| In Practice section | Provide evidence of facilitation and collaboration | See how the designer works with people | Evaluate collaboration, workshops, execution context | Documentary image cards with dot-controlled carousel behavior |
| Contact section | Convert interest into contact | Find email / LinkedIn | Start conversation | Dark CTA section, email button, LinkedIn link |
| Internal lab pages | Explore visual directions | Not primary user-facing | Validate art concepts | May contain experiments; do not treat as canonical unless promoted |

### Homepage

**Current State**

The homepage sequence is:

1. `Hero`
2. `Work`
3. `About`
4. `ExperienceMoments`
5. `Philosophy`
6. `Process`
7. `Testimonials`
8. `Contact`

**Observation**

The order moves from positioning, to proof, to human credibility, to philosophy and process, to social proof and conversion.

**Rules**

- The homepage should not become a dense resume page.
- The hero must stay focused on the central proposition.
- Work should appear before deeper biographical content.
- Testimonials should support, not lead, the narrative.

**Never Add**

- Generic skill charts
- Decorative icon grids
- Long personal timeline blocks
- Marketing feature sections
- Unstructured photo albums

### Case Study Pages

**Current State**

Case-study pages are generated from `projects` and `caseStudies` data. The route accepts a slug, generates metadata, selects the project, renders in-progress pages when marked, and renders structured case-study content otherwise.

**Observation**

This architecture keeps storytelling consistent and prevents each case study from becoming a bespoke page.

**Rules**

- Use structured content blocks for repeatability.
- Keep section labels clear and short.
- Use media when it clarifies product decisions.
- Use the jump nav for longer case studies.
- End with adjacent project navigation.

**Never Add**

- Unstructured one-off sections that duplicate existing block types.
- Raw screenshots without captions.
- Long paragraphs without scannable structure.
- Decorative case-study art that does not clarify the work.

---

## 7. Content Hierarchy

### Current State

The hierarchy repeats across sections:

1. Small uppercase section label
2. Editorial serif heading
3. Short explanatory paragraph
4. Structured proof component
5. Optional metadata, tags, or CTA

### Observation

This hierarchy lets users scan quickly while preserving editorial pacing. The section label provides orientation; the heading provides narrative; the body copy explains; the component proves.

### Rules

- Section labels use uppercase, small sans text, muted color, and wide tracking.
- Main headings use Instrument Serif italic.
- Body copy stays concise and max-width constrained.
- Metadata should be short and structured.
- Avoid adding multiple competing headings in one section.

---

## 8. Layout System

### Current State

Primary layout dimensions:

| Token | Raw Value | Usage |
| --- | --- | --- |
| `layout.page.max` | `1280px` | Homepage content containers |
| `layout.nav.max` | `1360px` | Navigation width |
| `layout.caseStudy.max` | `900px` | Case-study body |
| `layout.caseStudy.offset.desktop` | `lg:pl-[150px]` | Aligns case-study body with jump nav |
| `layout.hero.copy.max` | `840px` homepage, `670px` case-study hero | Keeps hero text readable |
| `layout.body.copy.max` | `560px`, `640px`, `760px` depending context | Prevents long lines |

### Observation

The layout uses large page containers for broad editorial sections and narrower case-study containers for reading. This distinction is important: homepage sections need portfolio presence; case-study pages need reading comfort.

### Rules

- Use `max-w-[1280px]` for broad homepage sections.
- Use `max-w-[900px]` for case-study bodies.
- Use `px-6 md:px-10` as the standard horizontal page gutter.
- Use border-top dividers to separate editorial sections.
- Use dark full-width bands only for philosophical or conversion sections.

---

## 9. Grid System

### Current State

| Pattern | Current Implementation | Purpose |
| --- | --- | --- |
| Homepage work grid | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | Responsive project cards |
| About grid | `lg:grid-cols-[0.85fr_1.15fr]` | Portrait plus identity copy |
| In Practice desktop | Four visible cards in a horizontal snap carousel with dot navigation | Preserves larger image presence when the section contains more than four moments |
| In Practice mobile/tablet | Horizontal snap scroller | Preserves image scale on smaller screens |
| Process grid | `md:grid-cols-2 lg:grid-cols-4` | Four-step process |
| Testimonials grid | `sm:grid-cols-2` | Balanced proof cards |
| Case-study body | Single column inside `900px` | Reading and evidence |
| Case-study meta grid | `grid-cols-2 sm:grid-cols-3` | Compact project facts |

### Observation

The grid system is pragmatic rather than mathematically rigid. It uses grids to preserve clarity and scanning rhythm.

### Rules

- Use simple grids with few columns.
- Avoid nested card grids inside cards.
- Use horizontal scrolling only where cards would otherwise become too compressed.
- Keep gutters modest: `gap-4`, `gap-5`, `gap-6`, `gap-8`, and `gap-12` are common.

---

## 10. Spacing System

### Current State

Spacing is implemented with Tailwind utilities. Common values:

| Semantic Token | Raw Value | Usage | Reasoning |
| --- | --- | --- | --- |
| `space.page.x.mobile` | `px-6` | Global section gutters | Comfortable mobile reading |
| `space.page.x.desktop` | `md:px-10` | Global section gutters | Aligns sections without crowding |
| `space.section.y.standard.mobile` | `py-24`, `pb-24` | Major sections | Calm vertical rhythm |
| `space.section.y.standard.desktop` | `md:py-36`, `md:pb-32` | Major sections | Editorial spaciousness |
| `space.section.borderTop` | `pt-16` | Sections with divider | Creates a reset between content blocks |
| `space.card.padding` | `p-6`, `md:p-7`, `p-7` | Cards | Enough room for metadata and paragraphs |
| `space.inline.gap` | `gap-2`, `gap-3`, `gap-4` | Buttons, chips, card rows | Tight functional grouping |
| `space.grid.gap` | `gap-5` | Card grids | Consistent portfolio density |

### Observation

Whitespace carries the brand. The site feels calm because section spacing is generous and content blocks have clear breathing room.

### Rules

- Do not compress vertical spacing to fit more content above the fold.
- Use border lines and whitespace instead of heavy backgrounds to separate sections.
- Keep paragraph max widths short enough for comfortable reading.
- Use smaller spacing inside dense metadata blocks.

---

## 11. Typography System

### Font Families

| Token | Raw Value | Usage | Reasoning |
| --- | --- | --- | --- |
| `font.family.sans` | Geist Sans | Body, UI, nav, labels | Modern product clarity |
| `font.family.display` | Instrument Serif | Hero, section headings, quotes, display numbers | Editorial warmth and authorship |
| `font.family.mono` | Geist Mono | Technical metadata where needed | Systematic/data tone |

### Type Styles

| Semantic Token | Raw Style | Usage | When To Use | When Not To Use |
| --- | --- | --- | --- | --- |
| `type.hero.home` | Instrument Serif italic, `clamp(3rem,8vw,7rem)`, `leading-[1.05]`, max `16ch` | Homepage hero | One central proposition | Secondary headings |
| `type.hero.caseStudy` | Instrument Serif italic, `clamp(2.50rem,3.74vw,4.06rem)`, max `670px` | Project heroes | Case-study title | Body copy |
| `type.section.heading` | Instrument Serif italic, `clamp(2rem,4.5vw,3.5rem)`, tight leading | Major homepage sections | Section narrative | Dense UI |
| `type.case.heading` | Instrument Serif italic, `clamp(1.5rem,3vw,2.25rem)` | Case-study sections | Section story points | Card titles |
| `type.body.standard` | Geist, `text-base`, relaxed line-height | Paragraphs | Explanatory content | Labels |
| `type.body.large` | Geist, `text-lg md:text-xl`, relaxed | About lead copy | Important identity copy | Metadata |
| `type.label.section` | Geist, `text-xs`, uppercase, `tracking-widest`, medium | Section labels | Orientation | Long phrases |
| `type.label.micro` | Geist, `text-[10px]`, uppercase, wide tracking | Metadata labels, role labels | Dense structured info | Main copy |
| `type.card.title` | Geist, `text-lg md:text-xl`, medium, `leading-snug` | Project cards | Project names | Long prose |
| `type.caption` | Geist, `text-xs` or `text-[11px]`, muted | Captions, metadata | Supporting info | Primary statements |
| `type.quote` | Instrument Serif italic, `text-lg` to display scale | Philosophy and testimonials | Human proof and principles | Functional UI |

### Observation

The typography feels editorial because Instrument Serif is used for narrative moments and never overloaded as body text. Geist keeps product information clean and practical.

### Rules

- Use italic serif for major narrative headings and quotes.
- Use sans for product facts, labels, navigation, captions, and paragraphs.
- Keep uppercase labels short.
- Use letter spacing only on labels and metadata, not body text.
- Avoid negative tracking.
- Avoid hero-scale type inside cards or dense panels.

### Heading Line Rules

- Homepage hero: allow expressive line breaks, max around `16ch`.
- Section headings: keep to one or two lines when possible.
- Card titles: keep concise; truncate if they threaten the card rhythm.
- Case-study headings: keep focused and explanatory.

---

## 12. Color System

### Primitive Colors

| Primitive | Raw Value | Current Use |
| --- | --- | --- |
| `primitive.warm.50` | `#F9F8F5` | Page background |
| `primitive.white` | `#FFFFFF` | Cards and surfaces |
| `primitive.warm.100` | `#F2F0EB` | Tinted surface, process background |
| `primitive.border.100` | `#E6E3DD` | Borders, dividers |
| `primitive.border.200` | `#CECAC2` | Stronger dividers |
| `primitive.text.900` | `#18171A` | Primary text |
| `primitive.text.800` | `#1C1A16` | Alternate primary in nav/heroes |
| `primitive.text.650` | `#3A3836` | Rich paragraph text |
| `primitive.text.500` | `#6A6764` | Secondary text |
| `primitive.text.400` | `#9C9A95` | Muted labels |
| `primitive.accent.copper` | `#C07B50` | Primary accent/action |
| `primitive.accent.copperDark` | `#A8643C` | Hover accent |
| `primitive.accent.copperLight` | `#F5E8DC` | Selection, glow |
| `primitive.dark.900` | `#141310` | Dark section background |
| `primitive.dark.800` | `#1C1B17` | Dark surface |
| `primitive.dark.border` | `#2E2C27` | Dark borders |
| `primitive.dark.text` | `#EDEBE3` | Dark-section text |
| `primitive.dark.muted` | `#6A6860` | Dark muted text |
| `primitive.success` | `#3A7A54` | Open-to-work dot, positive states |
| `primitive.warning` | `#B85A48` | Warning / before states |
| `primitive.diagram.taupe` | `#9E7E6B` | Diagram inactive lines |
| `primitive.diagram.copperSoft` | `#BFA391` | Diagram completed states |

### Semantic Colors

| Semantic Token | Raw Value | Usage | Accessibility Note |
| --- | --- | --- | --- |
| `color.surface.page` | `#F9F8F5` | Main page background | Warm but light enough for dark text |
| `color.surface.card` | `#FFFFFF` | Cards | Keeps cards legible |
| `color.surface.tinted` | `#F2F0EB` | Process band, placeholders | Must pair with primary/secondary text |
| `color.text.primary` | `#18171A` | Primary text | Strong contrast |
| `color.text.secondary` | `#6A6764` | Body support | Check contrast on tinted backgrounds |
| `color.text.muted` | `#9C9A95` | Labels | Use for non-critical text |
| `color.border.subtle` | `#E6E3DD` | Cards/dividers | Visual separation without heaviness |
| `color.action.primary` | `#18171A` | Primary CTA background | High contrast with warm background |
| `color.action.hover` | `#C07B50` | CTA hover and links | Accent; avoid overuse |
| `color.section.dark` | `#141310` | Philosophy/contact/footer | Creates narrative contrast |
| `color.section.darkText` | `#EDEBE3` | Dark-section headings/buttons | Use for primary dark text |

### Observation

The color system is warm-neutral and understated. Copper is used as a meaningful accent, not as a decorative wash.

### Rules

- Use copper sparingly for action, emphasis, active state, or diagram state.
- Use green/red only for meaningful status or before/after semantics.
- Do not introduce bright saturated colors without semantic need.
- Prefer borders and subtle surfaces over heavy fills.

---

## 13. Design Tokens

### Token Model

**Primitive tokens** are raw values: `#F9F8F5`, `16px`, `0.16, 1, 0.3, 1`.

**Semantic tokens** describe intent: `color.surface.page`, `space.section.desktop`, `type.hero.home`.

**Component tokens** describe component-specific decisions: `card.project.radius`, `motion.card.hover.duration`.

### Token Tables

#### Color Tokens

| Token | Raw Value | Usage | Reasoning | Where Used | Do Not Use For |
| --- | --- | --- | --- | --- | --- |
| `color.surface.page` | `#F9F8F5` | Body, heroes, nav overlay | Warm editorial base | `layout`, `Hero`, case-study heroes | Cards needing surface separation |
| `color.surface.card` | `#FFFFFF` | Project cards, testimonial cards, metadata cells | Clear object boundary | `ProjectCard`, `Testimonials`, `CaseStudy` | Full-page background |
| `color.surface.tinted` | `#F2F0EB` | Process, placeholders, carousel dots surface | Quiet contrast | `Process`, `ExperienceMoments`, placeholders | Primary text |
| `color.border.subtle` | `#E6E3DD` | Borders/dividers | Editorial hairline structure | Most components | Heavy separation |
| `color.text.primary` | `#18171A` | Main text | Readability | All pages | Muted metadata |
| `color.text.secondary` | `#6A6764` | Supporting body | Softer hierarchy | Body paragraphs | Primary headings |
| `color.text.muted` | `#9C9A95` | Labels and captions | Orientation without dominance | Section labels | Essential content on low contrast |
| `color.accent.copper` | `#C07B50` | Actions, active states | Brand action and warmth | CTAs, nav active, diagrams | Large backgrounds |
| `color.status.success` | `#3A7A54` | Positive status | Semantic green | Open-to-work dot, positive cards | Decoration |
| `color.status.warning` | `#B85A48` | Warning/before state | Semantic contrast | Case-study warning cards | Non-status accents |

#### Typography Tokens

| Token | Raw Value | Usage | Reasoning | Where Used |
| --- | --- | --- | --- | --- |
| `font.sans` | Geist Sans | UI/body | Functional clarity | Global body |
| `font.display` | Instrument Serif | Editorial headings | Mature, human voice | Hero, sections, quotes |
| `type.label.uppercase` | `text-xs`, `tracking-widest`, uppercase | Section labels | Fast scanning | Homepage sections |
| `type.micro.uppercase` | `text-[10px]`, wide tracking | Metadata labels | Dense but readable | Case-study metadata |
| `type.body.relaxed` | `text-base`, relaxed line-height | Paragraphs | Reading comfort | Body and case study |
| `type.card.meta` | `text-[11px]`, uppercase, `tracking-[0.06em]` | In Practice cards | Two-row card discipline | `ExperienceMoments` |

#### Spacing Tokens

| Token | Raw Value | Usage | Reasoning |
| --- | --- | --- | --- |
| `space.gutter.mobile` | `24px` / `px-6` | Section gutters | Comfortable mobile edge |
| `space.gutter.desktop` | `40px` / `md:px-10` | Section gutters | Editorial alignment |
| `space.section.mobile` | `96px` / `py-24` | Major sections | Calm rhythm |
| `space.section.desktop` | `144px` / `md:py-36` | Major sections | Premium editorial spacing |
| `space.divider.top` | `64px` / `pt-16` | After border dividers | Creates section reset |
| `space.card.grid` | `20px` / `gap-5` | Card grids | Balanced density |
| `space.card.padding` | `24px-28px` | Card interiors | Scannable content |

#### Radius, Borders, Shadows

| Token | Raw Value | Usage | Reasoning |
| --- | --- | --- | --- |
| `radius.card.large` | `16px` / `rounded-2xl` | Cards and media frames | Soft but not playful |
| `radius.card.medium` | `12px` / `rounded-xl` | Case-study blocks | Structured container feel |
| `radius.image.about` | `8px` / `rounded-lg` | Portrait | Editorial restraint |
| `radius.pill` | `999px` / `rounded-full` | Pills/buttons | Functional chip language |
| `border.hairline` | `1px solid #E6E3DD` | Structure | Quiet separation |
| `shadow.card.hover` | `0 8px 40px -8px rgba(0,0,0,0.1-0.12)` | Card hover | Subtle lift |
| `shadow.case.media` | `0 4px 24px rgba(0,0,0,0.07)` | Media | Slight depth |

#### Motion Tokens

| Token | Raw Value | Usage | Reasoning |
| --- | --- | --- | --- |
| `motion.ease.primary` | `[0.16, 1, 0.3, 1]` | Entrances and section reveals | Calm, refined ease-out |
| `motion.duration.fast` | `150ms-200ms` | Links/buttons | Immediate feedback |
| `motion.duration.card` | `300ms` | Card hover border/shadow | Smooth but restrained |
| `motion.duration.section` | `450ms-600ms` | Section reveal | Editorial entry |
| `motion.duration.caseSection` | `900ms` | Case-study section reveal | Slower reading rhythm |
| `motion.reduced` | `MotionConfig reducedMotion="user"` and CSS media query | Accessibility | Honors user preference |

---

## 14. Image Treatment and Art Direction

### Current State

Image usage includes:

- About portrait with controlled crop and scale.
- Project thumbnails generated as system diagrams.
- Case-study screenshots and videos in bordered frames.
- Documentary In Practice images processed into WebP via `scripts/apply-editorial-gallery-treatment.mjs`.
- Public original gallery images retained under `public/Gallery`.

### Documentary Photo Direction

Images should feel:

- Editorial documentary
- Calm
- Human
- Understated
- Authentic
- Slightly desaturated
- Harmonized with warm-neutral UI
- One step quieter than reality

### Documented Preset

Use this as the intended visual direction for future manual edits:

| Adjustment | Direction |
| --- | --- |
| Saturation | `-15%` |
| Vibrance | `-10%` |
| Contrast | `-8%` |
| Highlights | `-20%` |
| Shadows | `+8%` |
| Whites | `-10%` |
| Blacks | `+5%` |
| Temperature | `+2` |
| Tint | `+1` |
| Clarity | `-3%` |
| Texture | `-2%` |
| Grain | `+2%`, very subtle |

### Current Scripted Approximation

The gallery treatment script reduces saturation and contrast, softens highlights/whites, lifts shadows/blacks, adds a slight warm/tint shift, softens dominant greens/reds, and adds very subtle deterministic grain.

### Cropping Rules

- Prefer `4:3` for documentary cards.
- Use `16:10` or wide ratios for screenshots when product context needs width.
- Avoid random aspect ratios.
- Prioritize gestures, people, boards, screens, and discussions.
- Remove unnecessary empty space.
- Preserve authenticity.

### Do Not Use

- Instagram filters
- Heavy grain
- Sepia
- Black and white unless intentionally required
- Cinematic grading
- HDR
- Strong shadows
- Strong vignettes
- Oversaturation

---

## 15. Illustration and Art Direction

### Current State

The site uses abstract system art rather than decorative illustrations:

- Homepage clarity thread: messy paths resolve into a copper line and interactive node.
- Gemini hero: grid-locked reactive mesh with workflow sequence.
- Collabspace hero: radial network grammar.
- Project thumbnails: compact diagrammatic previews.

### Observation

The art direction reinforces systems thinking. It shows relationships, flows, progression, activation, and structure.

### Rules

- Use art to explain system logic.
- Keep diagrams warm-neutral and copper-led.
- Use taupe for inactive system elements.
- Use copper for active, selected, or resolving elements.
- Avoid project-specific bright colors in canonical hero art unless they have semantic meaning.

### Diagram Grammar

| Diagram Type | Use For | Visual Rules |
| --- | --- | --- |
| Mesh / matrix | Workflow, approval, state progression | Grid-locked nodes, stepped paths, local activation |
| Radial network | Knowledge, collaboration, domains | Hub/rings/spokes, radial sweep |
| Clarity thread | Complexity resolving into clarity | Organic paths plus single resolving copper thread |
| Thumbnail diagrams | Project preview | Condensed visual summary, low detail |

---

## 16. Component Inventory

### Component Summary

| Component | File | Purpose |
| --- | --- | --- |
| `Nav` | `components/Nav.tsx` | Persistent navigation, active section tracking, mobile menu |
| `Footer` | `components/Footer.tsx` | Dark terminal footer with links |
| `Hero` | `components/sections/Hero.tsx` | Homepage positioning and interactive philosophy overlay |
| `Work` | `components/sections/Work.tsx` | Featured project index |
| `ProjectCard` | `components/ui/ProjectCard.tsx` | Case-study preview card |
| `About` | `components/sections/About.tsx` | Portrait, bio, capability pills |
| `ExperienceMoments` | `components/sections/ExperienceMoments.tsx` | Documentary photo proof section |
| `Philosophy` | `components/sections/Philosophy.tsx` | Dark editorial belief section |
| `Process` | `components/sections/Process.tsx` | Four-step process explanation |
| `Testimonials` | `components/sections/Testimonials.tsx` | Social proof cards |
| `Contact` | `components/sections/Contact.tsx` | Dark CTA section |
| `CaseStudy` | `components/sections/CaseStudy.tsx` | Structured case-study renderer |
| `GeminiProjectHero` | `components/sections/GeminiProjectHero.tsx` | Interactive mesh hero |
| `InProgressHero` | `components/sections/ProjectInProgress.tsx` | In-progress project hero with radial art |
| `CaseStudyInProgress` | `components/sections/CaseStudyInProgress.tsx` | Placeholder body for unfinished case studies |
| `JumpToNav` | `components/ui/JumpToNav.tsx` | Section navigation for long case studies |
| `AnnotatedImage` | `components/ui/AnnotatedImage.tsx` | Numbered image annotation and legend |
| `GeminiThumbnail` | `components/thumbnails/GeminiThumbnail.tsx` | Project card workflow thumbnail |
| `CollabspaceThumbnail` | `components/thumbnails/CollabspaceThumbnail.tsx` | Project card network thumbnail |

### Navigation

**Purpose**

Provide persistent orientation and conversion access without overwhelming the page.

**Anatomy**

- Wordmark
- Desktop section links
- Resume button
- LinkedIn icon
- Mobile hamburger
- Mobile full-screen menu

**States**

- Transparent at top
- Warm translucent background after scroll
- Active section underline
- Mobile open/closed

**Accessibility**

- Mobile menu uses `aria-expanded`.
- LinkedIn icon has an explicit aria label.
- Mobile menu uses dialog semantics.
- Body scroll is locked when menu is open.

**Usage Rules**

- Keep link count limited.
- Use section anchors for homepage.
- On case-study pages, Work remains the active conceptual area.

### Project Card

**Purpose**

Summarize a project in a scannable, clickable card.

**Anatomy**

- Visual panel
- Category/year row
- Title
- Two-line description
- Client/impact pills
- Hover CTA

**States**

- Resting border
- Hover copper border and shadow
- Visual panel slight scale on desktop

**Rules**

- Title must be specific.
- Description should be one concise sentence.
- Impact must be short enough to fit a pill.
- Avoid more than two metadata pills in the visible row.

### In Practice Card

**Purpose**

Show real work moments as evidence of facilitation and collaboration.

**Anatomy**

- 4:3 image
- One-line title
- One-line company/location metadata

**Current Tokens**

- Radius: `rounded-2xl`
- Border: `#E6E3DD`
- Caption min-height: `88px`
- Title: `13px`, desktop `12px`, medium
- Metadata: `11px`, uppercase, muted

**Rules**

- Keep content to two visual rows.
- Use ellipsis for overflow rather than increasing card height.
- Do not let the section feel like a personal album.

### Case Study Renderer

**Purpose**

Convert structured case-study data into a consistent narrative page.

**Block Types**

| Block | Purpose |
| --- | --- |
| `paragraph` | Standard narrative text |
| `subheading` | Local section anchor within narrative |
| `callout` | Important insight or decision |
| `bullet-list` | Scannable evidence |
| `meta-grid` | Project facts |
| `two-col-list` | Comparison or dual framing |
| `role-list` | Stakeholder role explanation |
| `exploration-cards` | Concept option comparison |
| `stages` | Process or workflow sequence |
| `decisions` | Numbered decision rationale |
| `before-after` | Current vs improved state |
| `case-study-image` | Evidence screenshot with lightbox |
| `case-study-video` | Workflow media with lightbox |
| `pull-quote` | Human or conceptual emphasis |
| `closing-line` | Editorial closing statement |
| `context-cards` | Three-part context framing |
| `synthesis-flow` | Research-to-system mapping |
| `synthesis-table` | Insight-to-requirement mapping |
| `decisions-cdo` | Challenge/decision/outcome structure |
| `publishing-workflow` | Step sequence |

**Rules**

- Prefer existing block types before creating new ones.
- Every media block needs a caption and useful alt text.
- Use callouts for key insights, not decoration.
- Use decision blocks when explaining reasoning.

---

## 17. Section Patterns

| Pattern | Current Examples | Purpose | Required Elements | When Not To Use |
| --- | --- | --- | --- | --- |
| Editorial intro | Hero, Work header, About heading | Establish narrative | Label, heading, short copy | Dense details |
| Bordered section | About, In Practice, Testimonials | Reset the page rhythm | Top border, `pt-16`, label | Full-bleed dark sections |
| Project showcase | Work | Present selectable proof | Label, heading, cards | Non-project content |
| Documentary gallery | In Practice | Show collaboration evidence | Photos, caption rows, carousel | Personal travel/lifestyle images |
| Dark philosophy band | Philosophy | Create reflective contrast | Dark bg, quote, beliefs | Every other section |
| Process grid | Process | Explain working model | Number, title, description | Case-study narrative body |
| Social proof grid | Testimonials | Build trust | Quote, person/team, affiliation | Anonymous generic praise |
| Final CTA | Contact | Convert interest | Dark bg, heading, email, link | Mid-page content |
| Case-study narrative | CaseStudy Section | Explain work | Divider, label, heading, blocks | Homepage marketing copy |

---

## 18. Case Study Template

### Current State

Published case studies use structured labels and block content. The requested future template aligns with the existing renderer.

### Recommended Structure

| Step | Purpose | Include | Do Not Include |
| --- | --- | --- | --- |
| 1. Context | Explain the product and business setting | Product, company, users, timing | Long company history |
| 2. Role | Clarify responsibility | Role, scope, collaborators | Inflated ownership claims |
| 3. Problem | Define the core design challenge | Current pain, user impact | Generic problem statements |
| 4. Constraints | Show operating reality | Technical, business, timeline, organizational limits | Excuses |
| 5. Users / stakeholders | Define actors | Roles, needs, relationships | Personas without evidence |
| 6. Research/discovery | Show evidence gathering | Interviews, audits, workshops, data | Methods list without insight |
| 7. Core insight | Identify what changed the framing | Insight and consequence | Vague observation |
| 8. Product framing | Translate insight into system direction | Principles, requirements | Pure UI preference |
| 9. Workflow/system model | Make structure visible | States, roles, paths, ownership | Decorative diagrams |
| 10. Key decisions | Explain trade-offs | Challenge, decision, outcome | Screenshot tour only |
| 11. Interaction model | Show behavior | State changes, feedback, transitions | Static UI only |
| 12. Screens | Provide evidence | Screenshots/videos, captions | Uncaptioned images |
| 13. Trade-offs | Show judgment | What was chosen and why | Retrospective blame |
| 14. Impact | Show result | Launch, adoption, qualitative evidence | Unsupported metrics |
| 15. Reflection | Show learning | What changed in thinking | Generic lessons |

### Observation

This structure positions the designer as a product thinker, not only a UI designer.

---

## 19. In Practice Photo Section

### Current State

Section label: `Selected Moments`

Heading: `In Practice.`

Copy currently explains that product design is about working with people and that these moments capture conversations, workshops, collaborations, ambiguity, shared understanding, and systems behind the final experience.

Current cards:

- Facilitating Discussions
- Cross-functional Collaboration
- Content Co-creation
- Systems Mapping
- Design-Engineering Alignment

### Purpose

Show evidence of how the designer works, not only what final screens look like.

### Hiring Signal

The section communicates:

- Facilitation
- Collaboration
- Storytelling
- Systems thinking
- Product execution
- Workplace credibility

### Card Structure

| Element | Rule |
| --- | --- |
| Image | 4:3, editorial documentary, treated WebP |
| Title | One line, specific work behavior |
| Metadata | Company + location, one line |
| Card count | Keep the set tightly curated; desktop shows four visible cards at a time |
| Desktop | Horizontal snap carousel with dot navigation and four visible cards |
| Mobile/tablet | Horizontal snap scroller with dot navigation |

### Accessibility

- Each image needs descriptive alt text.
- Dot buttons need labels and `aria-current`.
- Carousel must remain swipeable and usable by buttons.
- Cards should not rely on hover-only content.

### Future Image Selection

Use images that show work context: workshops, boards, discussions, screens, reviews, mapping, and collaboration. Avoid images that read as personal lifestyle documentation.

---

## 20. Interaction Rules

### Current State

Interactions are subtle and functional:

- Nav changes background after scroll.
- Nav tracks active section on homepage.
- Mobile nav opens as full-screen overlay.
- Cards lift through border/shadow changes.
- Project cards reveal a CTA on hover.
- In Practice carousel scrolls horizontally on smaller screens.
- Case-study media opens in a lightbox.
- Case-study jump nav tracks sections.
- Hero art supports hover/click/keyboard activation.

### Rules

- Use interaction to reveal structure or provide navigation.
- Keep hover effects quiet.
- Do not hide essential information behind hover.
- Make interactive SVG nodes keyboard reachable.
- Use buttons for actions and links for navigation.

---

## 21. Motion and Transitions

### Current State

Framer Motion drives section reveals, card entrances, hero art, lightbox transitions, and diagram activation. CSS handles global reduced-motion, shimmer keyframes, role-pill tooltips, and card bloom effects.

### Motion Guidelines

| Motion Type | Current Pattern | Rule |
| --- | --- | --- |
| Section reveal | Fade up with 12-24px y offset | Use for major content entrance |
| Card reveal | Staggered fade up | Use for grids |
| Hover lift | Small y movement or border/shadow | Keep subtle |
| Diagram activation | State-driven illumination and sweep | Use only for system art |
| Carousel scroll | Native smooth horizontal scroll | Do not over-animate |
| Lightbox | Fade/scale modal | Must close with Escape |

### Avoid

- Bouncy transitions
- Dramatic parallax
- Excessive stagger
- Motion that slows reading
- Motion that continues indefinitely without purpose

---

## 22. Accessibility Rules

### Current State

The project includes focus-visible styling, reduced motion support, semantic sections, labeled nav/dialogs, image alt text, and keyboard support for key interactive art/media.

### Global Rules

- Maintain `:focus-visible` with copper outline.
- Respect `prefers-reduced-motion`.
- Use semantic `section`, `article`, `figure`, `blockquote`, `nav`, `footer`, and `main`.
- Use `button` for in-page actions and `a`/`Link` for navigation.
- Keep touch targets at least 44px when interactive.
- Provide meaningful alt text for informative images.
- Use empty/hidden treatment only for decorative elements.

### Component Accessibility

| Component | Requirement |
| --- | --- |
| Nav | `aria-expanded`, labeled icon links, scroll lock for mobile menu |
| Project Card | Link label includes case-study title |
| In Practice Carousel | Dot labels, `aria-current`, native scroll |
| Lightbox | Dialog semantics, Escape close, backdrop close, keyboard open |
| Case-study media | Captions, alt text, full-screen inspection on mobile where needed |
| Interactive SVG art | Role/button, tab index, keyboard activation |
| Jump nav | Disabled state must be clear and non-interactive |

---

## 23. Responsive Behavior

### Current State

Responsive rules use Tailwind breakpoints:

- Mobile first
- `sm` for tighter card grids or 2-column moments
- `md` for nav desktop behavior and section spacing
- `lg` for large grids, case-study offsets, desktop-only art
- `xl` for case-study body alignment refinement

### Rules

- Mobile must prioritize readable copy and large media.
- Desktop can show broader grids and interactive art.
- Hide complex decorative/interactive art on smaller screens when it would impair clarity.
- Horizontal scroll is acceptable for image/card collections where scaling down would harm the image.
- Do not shrink text purely to force desktop layouts onto mobile.

---

## 24. Content and Writing Guidelines

### Current Voice

Clear, mature, specific, evidence-driven, calm, systems-oriented.

### Preferred Language

Use language around:

- Systems thinking
- Workflow design
- Product reasoning
- Facilitation
- Trade-offs
- Evidence
- Constraints
- Collaboration
- Outcomes
- State clarity
- Ownership
- Alignment

### Avoid

- Passionate designer
- Pixel-perfect
- User-centered problem solver
- I love solving problems
- Beautiful experiences
- Innovative solutions
- Generic transformation claims
- Unsupported metrics

### Copy Rules

- Headings should be short, editorial, and specific.
- Paragraphs should explain one idea at a time.
- Case-study captions should explain why the image matters.
- Card titles should be clear and short.
- Metadata labels should be nouns, not sentences.
- CTAs should be direct.

---

## 25. Metadata Rules

### Current State

Global metadata is defined in `app/layout.tsx`. Project metadata is generated in `app/work/[slug]/page.tsx`.

### Global Metadata

- Site title: Sameer Gautam - Product Designer
- Description: Product designer who builds clarity out of complexity, systems thinker, interaction designer, UX researcher.
- Open Graph title and description mirror the brand positioning.

### Project Metadata

Each project page uses:

- Project title plus Sameer Gautam
- Project description from `projects`

### Project Data Fields

| Field | Purpose |
| --- | --- |
| `slug` | Route identity |
| `title` | Public project title |
| `category` | Case-study domain |
| `year` | Timeframe |
| `description` | Short value statement |
| `impact` | Evidence summary |
| `tags` | Domain/skill tags |
| `client` | Organization |
| `featured` | Homepage visibility |
| `hidden` | Hide from visible lists |
| `status` | Published or in progress |
| `heroMetadata` | Case-study hero facts |

---

## 26. Implementation Notes

### Current State

The project uses:

- Next.js app router
- TypeScript
- Tailwind CSS
- `@theme` tokens in `app/globals.css`
- Framer Motion
- Next font loading for Geist, Geist Mono, and Instrument Serif
- Next Image for most optimized images
- Structured content in TypeScript data files

### Notes

- The app route `params` are asynchronous in `app/work/[slug]/page.tsx`.
- Case-study content is data-driven through `Block` union types.
- Global theme tokens exist, but many semantic choices are still inline Tailwind classes.
- The screenshot and treatment scripts are supporting tools, not user-facing surfaces.
- The hero lab and demo pages are experimental/internal and should not automatically define production rules.

### Recommendation

If the system grows, document new component variants before implementation. Only consolidate tokens when repeated usage creates maintenance risk.

---

## 27. Governance Rules

### Adding a New Component

Before adding:

1. Check whether an existing component or block type already solves the need.
2. Identify the problem the component solves.
3. Define anatomy, states, responsive behavior, and accessibility.
4. Add documentation here.
5. Only then implement.

### Updating a Token

Document:

- What changed
- Why it changed
- Which components/pages it affects
- Whether the change is primitive, semantic, or component-specific
- Accessibility impact

### Adding a New Page

Document:

- Page type
- User goal
- Hiring-manager goal
- Required sections
- Optional sections
- What should never be added

### Adding a New Case Study

Required:

- Project data entry
- Metadata
- Case-study sections
- Captions and alt text for media
- Structured decisions/trade-offs
- Impact or honest status

### Adding New Photos

Required:

- Select work-context images, not personal album images.
- Apply the editorial documentary treatment.
- Use consistent aspect ratios.
- Add alt text.
- Keep card titles concise.

### Preventing Visual Drift

- Do not introduce new colors casually.
- Do not introduce new typefaces.
- Do not add new card radii without reason.
- Do not add decorative effects that do not map to content.
- Do not add motion that exists only for delight.

---

## 28. Future Extension Rules

### Current State

The system can support more case studies, more documentary cards, additional testimonials, and deeper project pages without changing the core identity.

### Recommendations

- Add new case-study block types only when existing blocks cannot express the content clearly.
- Keep new homepage sections rare.
- If adding a resume/experience page, use the case-study reading width or a structured timeline, not a dense LinkedIn-style page.
- If adding a work index page, reuse project cards and metadata conventions.
- If adding photo documentation, preserve the In Practice rules.

---

## 29. Do / Don't Examples

| Do | Don't |
| --- | --- |
| Use Instrument Serif for major editorial statements | Use serif for every label and paragraph |
| Use copper for active, action, or emphasis states | Flood sections with copper backgrounds |
| Use thin borders and whitespace to separate content | Add heavy shadows or dense card stacks |
| Write "Designed a multi-role approval workflow..." | Write "Created beautiful user-centered solutions" |
| Caption media with the decision it supports | Drop screenshots without explanation |
| Use structured decision blocks for trade-offs | Present a long screenshot tour |
| Keep documentary photos work-centered | Make the gallery feel like a personal album |
| Respect reduced motion | Add motion that cannot be disabled |
| Reuse case-study block types | Create one-off layouts for every story |
| Document exceptions | Let local tweaks become silent new rules |

---

## 30. Maintenance Checklist

Use this checklist before shipping future changes:

- [ ] Does the change preserve the current website identity?
- [ ] Is the pattern already documented?
- [ ] If new, has the pattern been added to this manual?
- [ ] Does it use existing colors, type, spacing, and motion?
- [ ] Does it avoid unnecessary decoration?
- [ ] Is the content specific and evidence-driven?
- [ ] Are accessibility requirements documented and met?
- [ ] Does responsive behavior preserve readability?
- [ ] Are images treated consistently?
- [ ] Are captions and alt text meaningful?
- [ ] Are metadata fields accurate?
- [ ] Does the change prevent or create visual drift?
- [ ] Does it help future designers, developers, or AI agents continue without guessing?

---

## 31. Current Implementation State

### Implemented

- Homepage sequence: `Hero`, `Work`, `About`, `ExperienceMoments`, `Philosophy`, `Process`, `Testimonials`, `Contact`.
- Work detail pages generated from structured project and case-study data.
- Gemini hero art uses the ordered reactive mesh workflow system.
- Collabspace in-progress hero uses radial network art with atmospheric interaction.
- In Practice / Selected Moments section uses six editorial documentary cards.
- In Practice desktop layout is a horizontal snap carousel with four visible cards and dot navigation.
- In Practice mobile and tablet layout is a horizontal snap carousel with dot navigation.
- In Practice card captions are constrained to two visual rows: one title row and one metadata row.
- Treated gallery assets live in `public/Gallery/editorial`.
- Editorial gallery treatment script lives at `scripts/apply-editorial-gallery-treatment.mjs`.

### Partially Implemented

- Some case-study pages depend on the maturity of available project content and media.
- Collabspace remains intentionally in-progress until its case-study narrative is ready.
- Some visual conventions remain inline Tailwind classes rather than consolidated semantic tokens.
- Internal lab/demo routes exist for exploration and should not automatically redefine production rules.

### Known Risks

- Visual drift can happen if local Tailwind values are copied without updating this manual.
- Documentary image sections can start feeling like a personal album if future photos are not work-context specific.
- Long card labels can break rhythm if future contributors remove the two-row caption rule.
- Generated visual design-system artifacts can become misleading if they are not regenerated from this document.

### Not Canonical

The generated HTML design-system file reviewed during the 2026-06-17 session is not canonical. It had incomplete coverage, incorrect font assumptions, encoding artifacts, and placeholder/invented content. It may only be used later as a regenerated companion if it faithfully reflects this Markdown manual.

---

## 32. Protected Decisions

These decisions should not be casually overwritten. Revisit them only with an explicit design or architecture review.

| Area | Protected Direction | Reason |
| --- | --- | --- |
| Source of truth | `DESIGN_SYSTEM.md` is canonical | Preserves principles, rationale, and implementation notes in one maintainable place |
| Positioning | Enterprise UX, workflow design, systems thinking, facilitation, product strategy | Keeps the portfolio focused on senior product-design evaluation |
| Visual tone | Calm, editorial, warm-neutral, evidence-led | Communicates maturity and clarity |
| Typography | Geist for product clarity, Instrument Serif for editorial emphasis | Balances technical credibility and human authorship |
| Color | Warm neutrals with copper accent | Prevents project-by-project visual fragmentation |
| Homepage order | Work proof before deeper philosophy/process/social proof | Supports hiring-manager scanning |
| Case studies | Structured data/block rendering | Keeps storytelling consistent and maintainable |
| Gemini art | Ordered reactive workflow mesh | Matches governance/workflow progression |
| Collabspace art | Radial network / atmospheric river | Matches collaboration and connected domains |
| In Practice cards | Two caption rows with ellipsis | Preserves grid rhythm and prevents caption spill |
| Images | Editorial documentary treatment for work-context photos | Keeps photo evidence cohesive and brand-aligned |
| Motion | Motion as meaning, not decoration | Supports clarity and avoids spectacle |

---

## Final Quality Review

### Current State

This manual documents the current portfolio design system: philosophy, page architecture, content hierarchy, layout, grids, spacing, typography, colors, tokens, image treatment, art direction, components, section patterns, case-study templates, interactions, motion, accessibility, responsiveness, content rules, metadata, implementation notes, governance, maintenance, current implementation state, and protected decisions.

### Observation

The system's strength is restraint. The portfolio feels credible because its visual language is quiet, structured, and specific. Future work should protect that restraint.

### Recommendation

Treat this document as a living contract. When the website changes, update the documentation in the same change set or explicitly document why no design-system update is required.
