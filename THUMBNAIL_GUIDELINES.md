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

---

# Pattern 2: Radial Hub-and-Spoke (PLM Collabspace)

For projects about collaboration platforms, knowledge networks, or multi-stakeholder systems, use a radial layout instead of the linear progression pattern.

## Composition

- **Canvas:** 460×256 viewBox, `preserveAspectRatio="xMidYMid slice"`
- **Center node:** `cx=230, cy=128` (true center of canvas)
- **Outer nodes:** 6 nodes at radius 85, hexagonal arrangement (0°, 60°, 120°, 180°, 240°, 300°)
  - Coordinates: (315,128), (273,202), (188,202), (145,128), (188,54), (273,54)
- **Outer node shapes:** Each uses a distinct polygonal icon (square, triangle, hexagon, diamond, pentagon, circle) — no two the same

## Spoke system (two-layer)

**Layer 1 — Base line:**
- Stroke: `#C07B50` (Copper), `1px`, opacity `0.22`
- Draws in with `pathLength` spring animation (same as linear pattern)

**Layer 2 — Shimmer sweep:**
- Stroke: `url(#spoke-shimmer)` radial gradient
- Radial gradient: centered at hub `(230,128)`, `r=90`, `gradientUnits="userSpaceOnUse"`
  - 0%: `#F5C88A` opacity 0.9 | 30%: `#E08A58` opacity 1 | 60%: `#C07B50` opacity 1 | 85%: `#8A4830` opacity 0.65 | 100%: transparent
- StrokeWidth: `2.5px`, strokeLinecap: `round`
- `strokeDasharray="18 100"`, strokeDashoffset animates: `18 → -(85+18)=-103`, linear, repeat Infinity
- Stagger: `0.6 + i × 0.28` delay per spoke

## Center node

- Circle r=16, `fill="white"`, `stroke="#C07B50"`, `strokeWidth="1.5"` (matches active node in linear pattern)
- Hub dot r=1.5, `fill="#C07B50"` (no pulsation — shimmer on the lines is the "life" signal)

## Outer nodes

- Circle r=16, `fill="white"`, `stroke="#CECAC2"`, `strokeWidth="1"` (inactive state)
- Icon inside: 1px stroke, `#6A6764`, sized ±4–5px from node center

## 5. Narrative Intent
- **Curiosity over Decoration:** The thumbnail should feel like a captured snippet of a high-fidelity system status, not a marketing illustration.
- **System State:** Every visual element must represent a specific state (Completed, Active, or Pending) in a larger workflow.
- **Minimalism:** If an element doesn't help explain the structural relationship or the current state, it should be removed.
