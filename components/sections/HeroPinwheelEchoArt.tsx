"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Hand-authored solid mark (see user-provided Frame 17.svg). Verified star-shaped
// around its own centroid — every ray from the center crosses the boundary exactly
// once — unlike the ASTERISK_PATH used elsewhere in this codebase, which always
// self-crosses when stroked. That property is what makes uniform-scale copies of
// this shape safe at any scale (used for the far "bleed" rings below).
const SOLID_PATH =
  "M296.183 460.5H218.683L218.183 460.5V318.1L94.6831 389.403L55.6831 321.853L179.183 250.55L55.6831 179.247L94.6831 111.697L218.183 183V40.5H296.01V183L419.683 111.597L458.683 179.147L335.183 250.45L458.683 321.753L419.683 389.303L296.183 318V460.5Z";

const NATIVE_CENTER_X = 257.19072;
const NATIVE_CENTER_Y = 271.505;

// True perpendicular offset rings: each ring's boundary is the previous one pushed
// outward by a CONSTANT distance along its own edge normal, so the gap between
// rings is genuinely uniform everywhere (spoke tips and valley notches alike) —
// unlike scaling from the center, where the gap grows proportional to how far a
// point already is from center (tips drift apart much faster than valleys).
//
// Step size is half the spoke's own width (spoke width = 78 native units — the
// vertical spoke spans x=218.183 to x=296.183). At this step, 4 rings stay
// verified self-intersection-free (total offset 156): a 5th ring (195 total)
// breaks with 5 crossings — the valley notches have flattened enough that the
// offset math collapses the same way covered earlier. Ring count is capped
// here accordingly.
const OFFSET_RING_COUNT = 4;
const OFFSET_STEP = 39; // native units per ring — half a spoke width

// Beyond the safe star-offset zone, continue with a hexagon built from just the
// star's 6 outward-facing tip edges (the ones with length ~78, aligned almost
// exactly radially outward — see indices below). A hexagon has no reflex
// vertices, so offsetting it is mathematically safe at ANY distance, unlike the
// star shape. Continuing the SAME distance progression (rather than restarting
// from 0) keeps the transition smooth: at a given distance, the hexagon's
// vertices land at the same radius the star's tip vertices would have — verified
// directly (both landed at radius 486 at distance 195) — so there's no visible
// jump where Phase 1 hands off to Phase 2.
const TIP_EDGE_INDICES = [0, 4, 7, 10, 13, 16];
// The motif is pinned near the top-left corner, so bleeding past the far
// (right/bottom) walls needs far more rings than the near ones — roughly 80 at
// this step size on a typical desktop width. Capped well above that with margin.
const HEXAGON_RING_SAFETY_CAP = 140;

// Position and scale carried over from the last committed StructuralAsteriskHeroArt
// (its PINNED_TARGET_DIAMETER / PINNED_CENTER_X/Y_FRACTION) — this is a swap of the
// art, not the placement, so the new motif sits where the old one did. The old
// pinned diameter (145.41px) was measured for a square mark; this shape's own
// native bounding box is ~403x420 units, so UNIT_SCALE approximates the same
// visual size rather than matching it to the pixel — close enough by design, not
// meant to be exact.
const PINNED_TARGET_DIAMETER = 145.41;
const NATIVE_BBOX_MAX = 420; // solid mark's native bounding box, larger dimension
const UNIT_SCALE = PINNED_TARGET_DIAMETER / NATIVE_BBOX_MAX;
const PINNED_CENTER_X_FRACTION = 0.18379;
// Nudged down from the old fraction (0.20255) to compensate: this shape's
// centroid sits higher relative to its own bounding box than the old symmetric
// asterisk's did, so using the same raw fraction rendered visibly higher
// on screen (overlapping the nav) than the original mark did.
const PINNED_CENTER_Y_FRACTION = 0.2293;
// Fixed pixel nudge, not folded into the fraction above — 25px should stay
// 25px regardless of viewport height, not scale proportionally with it.
const VERTICAL_OFFSET_PX = -25;

type Point = { x: number; y: number };
type Bounds = { width: number; height: number };

function parseAbsolutePath(d: string): Point[] {
  const commands = d.match(/[MLHVZ][^MLHVZ]*/g) ?? [];
  const pts: Point[] = [];
  let cur: Point = { x: 0, y: 0 };

  commands.forEach((command) => {
    const type = command[0];
    const nums = command
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(Number);

    if (type === "M" || type === "L") {
      for (let i = 0; i < nums.length; i += 2) {
        cur = { x: nums[i], y: nums[i + 1] };
        pts.push(cur);
      }
    } else if (type === "H") {
      cur = { x: nums[0], y: cur.y };
      pts.push(cur);
    } else if (type === "V") {
      cur = { x: cur.x, y: nums[0] };
      pts.push(cur);
    }
  });

  // Drop a trailing point that coincides with the first — some exports close a
  // path with an explicit line back to the start on top of the implicit Z,
  // producing a zero-length final edge that breaks offset/normal math.
  if (pts.length > 1) {
    const first = pts[0];
    const last = pts[pts.length - 1];
    if (Math.abs(first.x - last.x) < 1e-6 && Math.abs(first.y - last.y) < 1e-6) {
      pts.pop();
    }
  }

  return pts;
}

function toPath(points: Point[]): string {
  return `${points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")} Z`;
}

// Standard per-edge outward-normal offset with mitered corners.
function getOffsetPolygon(vertices: Point[], dist: number, cx: number, cy: number): Point[] {
  const n = vertices.length;
  const offsetLines: { p1: Point; p2: Point }[] = [];

  for (let i = 0; i < n; i += 1) {
    const p1 = vertices[i];
    const p2 = vertices[(i + 1) % n];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy);

    let nx = -dy / len;
    let ny = dx / len;
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    if ((midX - cx) * nx + (midY - cy) * ny < 0) {
      nx = -nx;
      ny = -ny;
    }

    offsetLines.push({
      p1: { x: p1.x + nx * dist, y: p1.y + ny * dist },
      p2: { x: p2.x + nx * dist, y: p2.y + ny * dist },
    });
  }

  const offsetVerts: Point[] = [];

  for (let i = 0; i < n; i += 1) {
    const l1 = offsetLines[(i - 1 + n) % n];
    const l2 = offsetLines[i];
    const a1 = l1.p2.y - l1.p1.y;
    const b1 = l1.p1.x - l1.p2.x;
    const c1 = a1 * l1.p1.x + b1 * l1.p1.y;
    const a2 = l2.p2.y - l2.p1.y;
    const b2 = l2.p1.x - l2.p2.x;
    const c2 = a2 * l2.p1.x + b2 * l2.p1.y;
    const det = a1 * b2 - a2 * b1;

    if (Math.abs(det) > 1e-6) {
      offsetVerts.push({
        x: (b2 * c1 - b1 * c2) / det,
        y: (a1 * c2 - a2 * c1) / det,
      });
    } else {
      offsetVerts.push(l2.p1);
    }
  }

  return offsetVerts;
}

// A convex polygon's closest boundary point to an interior center is generally
// along an EDGE (its perpendicular distance), not at a vertex — vertices are
// always farther out than that. Used to find the polygon's true minimum reach
// in any direction, not an overestimate from vertex distances alone.
function minDistanceToPolygonBoundary(vertices: Point[], center: Point): number {
  const n = vertices.length;
  let min = Infinity;

  for (let i = 0; i < n; i += 1) {
    const a = vertices[i];
    const b = vertices[(i + 1) % n];
    const abx = b.x - a.x;
    const aby = b.y - a.y;
    const lenSq = abx * abx + aby * aby;
    const t = Math.max(0, Math.min(1, ((center.x - a.x) * abx + (center.y - a.y) * aby) / lenSq));
    const closest = { x: a.x + t * abx, y: a.y + t * aby };
    const dist = Math.hypot(center.x - closest.x, center.y - closest.y);
    if (dist < min) min = dist;
  }

  return min;
}

type Line = { p1: Point; p2: Point; nx: number; ny: number };

// Extracts the 6 outward-facing tip edges (by index) as lines with their
// pre-computed outward normal, ready to be offset by any distance.
function getTipLines(vertices: Point[], indices: number[], cx: number, cy: number): Line[] {
  const n = vertices.length;

  return indices.map((i) => {
    const p1 = vertices[i];
    const p2 = vertices[(i + 1) % n];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy);

    let nx = -dy / len;
    let ny = dx / len;
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    if ((midX - cx) * nx + (midY - cy) * ny < 0) {
      nx = -nx;
      ny = -ny;
    }

    return { p1, p2, nx, ny };
  });
}

// Offsets each tip line outward by dist and miters them against their
// neighbors — since all 6 corners here are convex (no reflex vertices exist
// once the valleys are skipped), this never self-intersects at any distance.
function getHexagonOffset(tipLines: Line[], dist: number): Point[] {
  const n = tipLines.length;
  const offsetLines = tipLines.map((l) => ({
    p1: { x: l.p1.x + l.nx * dist, y: l.p1.y + l.ny * dist },
    p2: { x: l.p2.x + l.nx * dist, y: l.p2.y + l.ny * dist },
  }));

  const verts: Point[] = [];

  for (let i = 0; i < n; i += 1) {
    const l1 = offsetLines[i];
    const l2 = offsetLines[(i + 1) % n];
    const a1 = l1.p2.y - l1.p1.y;
    const b1 = l1.p1.x - l1.p2.x;
    const c1 = a1 * l1.p1.x + b1 * l1.p1.y;
    const a2 = l2.p2.y - l2.p1.y;
    const b2 = l2.p1.x - l2.p2.x;
    const c2 = a2 * l2.p1.x + b2 * l2.p1.y;
    const det = a1 * b2 - a2 * b1;

    verts.push({
      x: (b2 * c1 - b1 * c2) / det,
      y: (a1 * c2 - a2 * c1) / det,
    });
  }

  return verts;
}

function useElementBounds<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [bounds, setBounds] = useState<Bounds>({ width: 1440, height: 960 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, bounds] as const;
}

export default function HeroPinwheelEchoArt() {
  const [containerRef, bounds] = useElementBounds<HTMLDivElement>();

  const offsetRingPaths = useMemo(() => {
    const solidVertices = parseAbsolutePath(SOLID_PATH);
    const paths: string[] = [];

    for (let i = 1; i <= OFFSET_RING_COUNT; i += 1) {
      const ring = getOffsetPolygon(solidVertices, OFFSET_STEP * i, NATIVE_CENTER_X, NATIVE_CENTER_Y);
      paths.push(toPath(ring));
    }

    return paths;
  }, []);

  const geometry = useMemo(() => {
    const centerX = bounds.width * PINNED_CENTER_X_FRACTION;
    const centerY = bounds.height * PINNED_CENTER_Y_FRACTION + VERTICAL_OFFSET_PX;

    return { unitScale: UNIT_SCALE, centerX, centerY };
  }, [bounds]);

  // Keep adding hexagon rings (continuing the same distance progression Phase 1
  // left off at) until the ring's closest point to center — not just its
  // farthest — clears the distance to the farthest wall. Using the closest
  // point rather than the farthest is deliberate: the motif is pinned near the
  // top-left corner, so "bleed past all four walls" means every direction of
  // the ring's silhouette has to reach far enough, not just whichever vertex
  // happens to point toward the nearest edge.
  const hexagonRingPaths = useMemo(() => {
    const solidVertices = parseAbsolutePath(SOLID_PATH);
    const tipLines = getTipLines(solidVertices, TIP_EDGE_INDICES, NATIVE_CENTER_X, NATIVE_CENTER_Y);
    const paths: string[] = [];

    const farthestWallDistance =
      Math.max(
        geometry.centerX,
        bounds.width - geometry.centerX,
        geometry.centerY,
        bounds.height - geometry.centerY,
      ) + 40;

    const nativeCenter = { x: NATIVE_CENTER_X, y: NATIVE_CENTER_Y };
    let i = 1;
    let minBoundaryDistancePx = 0;

    while (minBoundaryDistancePx < farthestWallDistance && i <= HEXAGON_RING_SAFETY_CAP) {
      const dist = OFFSET_STEP * (OFFSET_RING_COUNT + i);
      const ring = getHexagonOffset(tipLines, dist);
      paths.push(toPath(ring));

      minBoundaryDistancePx = minDistanceToPolygonBoundary(ring, nativeCenter) * geometry.unitScale;
      i += 1;
    }

    return paths;
  }, [bounds, geometry]);

  const baseTransform = `translate(${geometry.centerX} ${geometry.centerY}) scale(${geometry.unitScale}) translate(${-NATIVE_CENTER_X} ${-NATIVE_CENTER_Y})`;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      <svg
        viewBox={`0 0 ${bounds.width} ${bounds.height}`}
        width="100%"
        height="100%"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        {/* Near rings, true perpendicular offset, uniform gaps */}
        {offsetRingPaths.map((d, index) => (
          <path
            key={`pinwheel-offset-${index}`}
            d={d}
            fill="none"
            stroke="#D2E823"
            strokeWidth={1.2}
            vectorEffect="non-scaling-stroke"
            opacity={Math.max(0.18, 0.85 - index * 0.08)}
            transform={baseTransform}
          />
        ))}

        {/* Far rings, hexagon built from the tip edges only — safe at any distance */}
        {hexagonRingPaths.map((d, index) => (
          <path
            key={`pinwheel-hexagon-${index}`}
            d={d}
            fill="none"
            stroke="#D2E823"
            strokeWidth={1.2}
            vectorEffect="non-scaling-stroke"
            // Exponential decay, not a linear ramp with a floor — there can be
            // dozens of these rings reaching out to the far walls, and a shared
            // opacity floor made that many overlapping faint strokes read as a
            // visible wash/crosshatch. Decaying smoothly toward (but never
            // exactly reaching) zero keeps only the near rings clearly visible.
            opacity={0.5 * Math.pow(0.965, index)}
            transform={baseTransform}
          />
        ))}

        <path d={SOLID_PATH} fill="#243427" stroke="#243427" transform={baseTransform} />
      </svg>
    </div>
  );
}
