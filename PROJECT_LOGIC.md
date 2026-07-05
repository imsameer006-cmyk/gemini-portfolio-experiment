# CollabNetworkArt Artwork Logic

This document records the current production logic for `components/sections/CollabNetworkArt.tsx` and its use inside `components/sections/ProjectInProgress.tsx`.

## Direction Note

Collabspace should remain the portfolio's radial network art system. The radial "atmospheric river" shimmer and sweep language belongs here, not in the Gemini hero.

Gemini is the ordered reactive mesh workflow system. Collabspace is the connected-domain, knowledge-flow, collaboration-network system. Keep these semantic roles separate.

Last reviewed during the 2026-06-19 handoff. No Collabspace art implementation changes were made in that session; this file remains the source of truth for the Collabspace radial-art logic.

**2026-07-05 note:** Collabspace's project slug changed from `design-system` to `plm-collabspace` (the old slug was reassigned to a new, unrelated project 3 case study about the portfolio's own design system — see `DECISIONS.md` #13–#14). No art/geometry logic on this page changed; only the URL and the `isCollabspace` check in `CaseStudy.tsx` were updated. If you're searching for "design-system" expecting to find Collabspace, you won't — that slug now belongs to a different project.

## Current Canvas and Grid

- Matrix columns: `24`
- Matrix rows: `14`
- Canvas width: `1280`
- Canvas height: `700`
- Base grid center: `getGridCoords(17.625, 6.8)`
- Horizontal art offset: `40`
- Exported center: `COLLAB_ART_CENTER = { x: 980, y: 340 }`

The center is intentionally right-shifted so the radial art can live behind the right side of the in-progress hero while the copy remains readable on the left.

## Radial Ring Logic

- Ring count: `5`
- First ring nodes: `8`
- Node count formula: `FIRST_RING_NODES * 2 ** ringIndex`
- Ring node counts: `8`, `16`, `32`, `64`, `128`
- First ring radius: `94.6`
- Radius growth: `1.56`
- Radius formula: `FIRST_RING_RADIUS * RING_RADIUS_GROWTH ** ringIndex`

Each even-numbered ring gets an angular offset of `180 / count` degrees. This prevents all rings from stacking into identical radial spokes and makes the network feel denser and more organic.

Node positioning:

```txt
angle = -90 + offset + (nodeIndex / count) * 360
x = COLLAB_ART_CENTER.x + radius * cos(angle)
y = COLLAB_ART_CENTER.y + radius * sin(angle)
```

## Connection Logic

The current implementation renders:

- Concentric ring paths.
- Radial spokes from the center to selected nodes.
- Node dots on each ring.
- Center hub rings and activation states.
- Animated sweep and shimmer layers for interaction.

Spokes are intentionally sparse. A node receives a center spoke when `node.index % 4 === 0`, which gives enough structure to communicate hub-and-spoke flow without turning the art into a dense technical diagram.

## Interaction Logic

The art tracks two local states:

- `hovered`
- `activated`

Hover increases ring and node opacity based on proximity to the center. Activation adds a stronger boost and triggers the parent in-progress hero's completion/sweep behavior.

The center hub is the primary interaction target. It should remain keyboard and pointer accessible through the parent hero interaction layer.

## Motion Direction

Use soft, overlapping, atmospheric motion. Avoid mechanical pulsing, train-like routes, or hard start-stop effects.

Motion should imply:

- Connected domains.
- Knowledge flow.
- Collaboration networks.
- Work in progress becoming legible.

## Protected Decisions

- Do not change Collabspace into Gemini's linear workflow mesh.
- Do not return to the older two-ring `5 + 10` node geometry without review.
- Do not move the center point casually; it is aligned to the in-progress hero composition.
- Do not add project-specific color accents. Use the shared neutral taupe and copper direction.
- Do not over-densify spokes. The art should feel like an atmospheric network, not an engineering schematic.
