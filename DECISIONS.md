# Key Decisions: Portfolio Refinement

## 1. Unified Hero Color Strategy ("Brand-Aligned Unity")
- **Decision:** All project hero art must strictly follow a shared "Neutral Taupe + Brand Copper" palette.
- **Rationale:** Previous use of project-specific accents (Teal/Green) created visual dissonance. Unifying ensures the portfolio feels like a coherent ecosystem.
- **Principle:** Neutral Taupe (`#9E7E6B`) for inactive structure; Brand Copper (`#C07B50`/`#BFA391`) for active interaction and system flow.

## 2. Animation Logic ("Atmospheric River")
- **Decision:** Replace mechanical "pulsing" or "train" animations with continuous, overlapping staggered shimmer loops.
- **Rationale:** Staggered paths ensure light is always present and flowing, removing the "dead space" that made previous animations feel mechanical and start-stop.
- **Trade-off:** Slightly more complex SVG layering (multiple paths), but higher visual fidelity.

## 3. Typographic Prominence
- **Decision:** Reverted headline typography changes.
- **Rationale:** While increased size was impressive, the risk of layout shifting and breaking the two-line constraint was too high. The original typographic hierarchy is the safe, established design.

## 4. UI/Thumbnail Interaction
- **Decision:** Static stroke widths for thumbnail animations.
- **Rationale:** Maintains "blueprint" precision. Animation intensity is achieved through gradient motion and opacity shifts rather than scaling/stroke changes.
