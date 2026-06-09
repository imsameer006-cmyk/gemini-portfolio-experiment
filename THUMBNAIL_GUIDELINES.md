# Thumbnail Design Guidelines: Work Section

These guidelines ensure consistency across all project thumbnails in the "Work" grid, maintaining the "Systems Thinking" and "Editorial Enterprise" aesthetic.

## 1. Visual Foundation
- **Background Color:** `#F2F0EB` (Warm Paper neutral).
- **Surface Texture:** A subtle structural grid background.
    - Pattern: `40x40` unit.
    - Stroke: `#E6E3DD`, `0.5px` weight.
    - Opacity: `0.4`.
- **Composition:** Asymmetrical horizontal progression.
    - Vertical Alignment: `yPos` of `145` (on a 256px height canvas) to create editorial "breathing room" at the top.
    - Horizontal Span: Nodes should span roughly from `X=80` to `X=380`. Avoid perfect centering to provoke curiosity and create a more sophisticated "captured" feel.

## 2. Diagram Grammar (Precision & Restraint)
- **Structural Lines (Inactive):**
    - Stroke Weight: `1px`.
    - Color: `#CECAC2` (Warm Gray).
- **Active Path (Human Agency):**
    - Stroke Weight: `1.5px`.
    - Color: `#C07B50` (Copper).
    - Cap/Join: `round`.
- **Nodes:**
    - Radius: `16px`.
    - Fill: `#FFFFFF` (Pure White).
    - Border: `1px` for inactive (`#CECAC2`), `1.5px` for active (`#C07B50`).
- **Iconography:**
    - Style: Abstract, structural SVG paths.
    - Weight: `1px` to `1.2px` (matching the node's importance).
    - Color: `#6A6764` (Inactive), `#C07B50` (Active).

## 3. Typography
- **Font Family:** `Geist Mono` (Monospace) - reinforces the systemic/technical theme.
- **Font Size:** `9px`.
- **Font Weight:** `500`.
- **Letter Spacing:** `0.05em`.
- **Color:**
    - Active State: `#C07B50` (Copper).
    - Inactive/Pending States: `#9C9A95` (Muted Gray).
- **Placement:** Exactly `36px` below the node center (`yPos + 36`), `text-anchor: middle`.

## 4. Motion & Interactivity
- **Entry Animation (Framer Motion):**
    - Line: `pathLength` draw using a `spring` transition (duration `1.2`, bounce `0`).
    - Nodes: Staggered scale entry (`scale: 0.8` -> `1.0`) with a `0.3s` base delay.
    - Labels: Staggered fade-in following node entry.
- **State Pulse (The "Living System"):**
    - The active Copper path must have a slow, subtle opacity pulse to signal life.
    - Values: `[0.4, 1, 0.4]`.
    - Duration: `4s`.
    - Repeat: `Infinity`.
    - Ease: `easeInOut`.

## 5. Narrative Intent
- **Curiosity over Decoration:** The thumbnail should feel like a captured snippet of a high-fidelity system status, not a marketing illustration.
- **System State:** Every visual element must represent a specific state (Completed, Active, or Pending) in a larger workflow.
- **Minimalism:** If an element doesn't help explain the structural relationship or the current state, it should be removed.
