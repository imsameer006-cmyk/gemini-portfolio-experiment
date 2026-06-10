# CollabNetworkArt Artwork Logic

This document details the geometric and procedural logic used for the `CollabNetworkArt` component.

## Radial Layout Logic

- **Center Point:** `{ x: 940, y: 340 }`
- **Radii:**
  - `R1` (Inner Ring): 120px
  - `R2` (Outer Ring): 240px

### Node Positioning Formula
Nodes are positioned trigonometrically relative to the center:
`x = CENTER.x + radius * cos(angleRad)`
`y = CENTER.y + radius * sin(angleRad)`

- **Ring 1 (5 nodes):** `-90 + i * 72` degrees.
- **Ring 2 (10 nodes):** `-90 + 18 (offset) + i * 36` degrees.
  - *The 18-degree offset ensures Ring 2 nodes perfectly flank Ring 1 nodes.*

## Connection Logic
Connections follow a strict radial, inside-out pattern:
- **Center to Ring 1:** Sequential connections from the center node to each Ring 1 node.
- **Ring 1 to Ring 2:** Each Ring 1 node at index `i` connects to two Ring 2 nodes to create a symmetrical "V" shape.
  - Target indices in Ring 2: `(i * 2 + 1) % 10` and `(i * 2 + 2) % 10`.
