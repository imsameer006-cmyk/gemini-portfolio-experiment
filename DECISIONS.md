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
