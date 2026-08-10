"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";

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

// Every ring — near offset rings and far hexagon rings alike — shares this
// exact same stroke treatment. Previously each ring had its own opacity
// (linear decay for the near rings, exponential decay for the far ones),
// which made the field read as a sequence of individually-styled lines. The
// only thing that varies visibility across the field now is the single
// radial fade mask below (see radialFadeGeometry / contourFadeMask) — the
// rings themselves are one uniform material, like engraved contour lines.
const CONTOUR_STROKE_COLOR = "#C3CA8F";
const CONTOUR_STROKE_WIDTH = 1.2;
const CONTOUR_STROKE_OPACITY = 0.14; // within the requested 12-16% range

// Sparse mineral-inclusion highlight for the motif's grain, layered on top of
// the base olive grain (see grainNoise / grainHighlight filters below) rather
// than replacing any of it. Softened from the hero headline's #B6FF00 by
// pulling blue up off zero and easing green down slightly, so it reads as an
// accent belonging to the motif's own dark palette rather than a literal
// reuse of the headline's own token.
const MOTIF_HIGHLIGHT_COLOR = "#AEEA3D";
// Empirically calibrated, not derived from the naive "top X% of the [0,1]
// value range = top X% of pixels" assumption — that assumption is wrong here.
// feColorMatrix's 0.33/0.33/0.33 average of feTurbulence's 3 channels
// clusters tightly around ~0.5-0.6 rather than spreading uniformly, so e.g. a
// literal top-2%-of-value-range threshold (0.98) produced ZERO visible
// pixels in direct testing, and even a top-20%-of-value-range threshold (0.8)
// produced ~0.0006% coverage. This value was found by directly rendering the
// real filter pipeline at a sweep of thresholds and measuring actual pixel
// coverage: 0.62 empirically yields ~2.3%, inside the requested 1-3% range.
// History, each step re-verified against the real rendered motif via
// connected-component fleck counting at 1x resolution (not extrapolated —
// the threshold-vs-coverage curve is steep/non-linear enough that computed
// guesses consistently missed):
//   0.62   -> 227 flecks (baseline)
//   0.624  -> 192 flecks (-15.4%, "reduce by 15%")
//   0.646  -> 101 flecks (-47.4%, "further reduce by 50%" off the 192
//             baseline — the achievable step nearest 96; the next available
//             threshold step (0.647) overshoots to 80 flecks/-58.3%, with no
//             finer value landing between the two at this resolution).
const HIGHLIGHT_THRESHOLD = 0.646;
// A steep but finite slope (not an instantaneous step) so each fleck gets a
// hair of antialiasing at its own edge rather than a hard-pixel cutoff —
// reads as a soft catch of light rather than a jagged/glittery pixel.
const HIGHLIGHT_SLOPE = 500;

// Position and scale carried over from the last committed StructuralAsteriskHeroArt
// (its PINNED_TARGET_DIAMETER / PINNED_CENTER_X/Y_FRACTION) — this is a swap of the
// art, not the placement, so the new motif sits where the old one did. The old
// pinned diameter (145.41px) was measured for a square mark; this shape's own
// native bounding box is ~403x420 units, so UNIT_SCALE approximates the same
// visual size rather than matching it to the pixel — close enough by design, not
// meant to be exact.
const PINNED_TARGET_DIAMETER = 130.869;
const NATIVE_BBOX_MAX = 420; // solid mark's native bounding box, larger dimension
const UNIT_SCALE = PINNED_TARGET_DIAMETER / NATIVE_BBOX_MAX;
const PINNED_CENTER_X_FRACTION = 0.18379;
const MOBILE_MOTIF_SCALE_MULTIPLIER = 1.2;
const MOBILE_BREAKPOINT_PX = 768;
const SHIMMER_BREAKPOINT_PX = 0;
// Per-ring stagger for the shimmer sweep, so the pulse visibly travels
// outward ring-by-ring rather than firing all at once. Triggered via a
// mount-time state flip (see shimmerActive below), not a CSS animation-delay
// counted from element mount — that was tried first, but this SVG's
// mask/measurement setup means the CSS animation's real start (confirmed via
// getAnimations()[0].startTime) doesn't line up with true element mount, so
// a live attribute flip is used instead, exactly like the sweep's original
// hover trigger, just fired on mount rather than pointer events.
const RING_SHIMMER_STEP_MS = 23;
const MOBILE_RING_SHIMMER_STEP_MS = 70;
const MOBILE_VERTICAL_OFFSET_PX = 80;
// Nudged down from the old fraction (0.20255) to compensate: this shape's
// centroid sits higher relative to its own bounding box than the old symmetric
// asterisk's did, so using the same raw fraction rendered visibly higher
// on screen (overlapping the nav) than the original mark did.
const PINNED_CENTER_Y_FRACTION = 0.2293;
// Fixed pixel nudge, not folded into the fraction above — 25px should stay
// 25px regardless of viewport height, not scale proportionally with it.
const VERTICAL_OFFSET_PX = -15;

// Spatial attenuation layer for the rings, stacked ON TOP of the existing
// per-index fade (never replaces it) — a very soft elliptical dip in ring
// opacity roughly matching where the headline + supporting paragraph sit in
// Hero.tsx (that text column runs roughly x:[80,840]px / y:[215,670]px on a
// typical 1440x900 viewport, i.e. fractionally x:[0.055,0.583] y:[0.24,0.74]).
// Centered on the TEXT BLOCK's own centroid, not the motif's — at the motif's
// position (0.18379, 0.2293) this ellipse's falloff is already back to ~99%
// of full strength, so the near rings around the asterisk are essentially
// untouched, while the dip is strongest in the middle of the reading column
// and fades back to full strength well before the empty right side.
const TEXT_DIM_CENTER_X_FRACTION = 0.319;
const TEXT_DIM_CENTER_Y_FRACTION = 0.49;
const TEXT_DIM_RADIUS_X_FRACTION = 0.3;
const TEXT_DIM_RADIUS_Y_FRACTION = 0.3;
// Minimum opacity multiplier at the dead center of the dim zone. Deliberately
// gentle (roughly half, not a hard cut) since this multiplies rings that are
// often already faint from the per-index fade — the goal is a calmer overall
// composition, not a visible mask edge or shape.
const TEXT_DIM_MIN_OPACITY = 0.45;

type Point = { x: number; y: number };
type Bounds = { left: number; width: number; height: number };

type HeroPinwheelEchoArtProps = {
  centerYOverridePx?: number | null;
};

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
  const [bounds, setBounds] = useState<Bounds>({ left: 0, width: 1440, height: 960 });
  // Tracks whether `bounds` has ever been set from a real measurement, as
  // opposed to still holding the {1440, 960} fallback. The fallback can't be
  // avoided — getBoundingClientRect needs a real DOM node, which doesn't exist
  // until this component mounts on the client — so callers should not render
  // fallback-derived geometry at all; they should wait for this flag instead.
  const [hasMeasured, setHasMeasured] = useState(false);

  // useLayoutEffect (fires before paint), not useEffect (fires after paint):
  // this only closes the gap between mount and the first real measurement —
  // it does NOT remove the wait for the JS bundle to load and hydrate in the
  // first place, which is the larger part of the delay. That's why callers
  // also need `hasMeasured` rather than relying on this alone.
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      setBounds({ left: rect.left, width: rect.width, height: rect.height });
      setHasMeasured(true);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, bounds, hasMeasured] as const;
}

export default function HeroPinwheelEchoArt({ centerYOverridePx = null }: HeroPinwheelEchoArtProps) {
  const uid = useId().replace(/:/g, "");
  const [containerRef, bounds, hasMeasured] = useElementBounds<HTMLDivElement>();
  const [shimmerActive, setShimmerActive] = useState(false);
  const svgReady = hasMeasured && centerYOverridePx !== null;

  // Flips the shimmer rings' data-active attribute one frame after the SVG
  // first paints, exactly mirroring the sweep's original hover trigger (an
  // attribute added after the elements already exist) instead of declaring
  // an animation-delay counted from mount — that was tried first, but this
  // SVG's mask/measurement setup means a CSS animation-delay's real start
  // (confirmed via getAnimations()[0].startTime) lands ~400-650ms later than
  // the delay value alone would suggest. A genuine post-mount attribute flip
  // does not have that drift.
  useEffect(() => {
    if (!svgReady) return;

    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setShimmerActive(true));
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [svgReady]);

  // Native bounding box of the solid mark, used to size the grain overlay rect
  // (clipped to the mark's own shape below) so the filter's noise fills it edge
  // to edge with no gaps.
  const nativeBBox = useMemo(() => {
    const solidVertices = parseAbsolutePath(SOLID_PATH);
    const xs = solidVertices.map((p) => p.x);
    const ys = solidVertices.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return { minX, minY, width: maxX - minX, height: maxY - minY };
  }, []);

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
    const isMobile = bounds.width < MOBILE_BREAKPOINT_PX;
    const screenCenterX =
      typeof window === "undefined" ? bounds.width / 2 : window.innerWidth / 2 - bounds.left;
    const centerX =
      isMobile ? screenCenterX : bounds.width * PINNED_CENTER_X_FRACTION;
    const centerY = centerYOverridePx ??
      (bounds.height * PINNED_CENTER_Y_FRACTION + VERTICAL_OFFSET_PX + (isMobile ? MOBILE_VERTICAL_OFFSET_PX : 0));
    const unitScale = UNIT_SCALE * (isMobile ? MOBILE_MOTIF_SCALE_MULTIPLIER : 1);

    return { unitScale, centerX, centerY };
  }, [bounds, centerYOverridePx]);

  const isMobileShimmer = bounds.width < MOBILE_BREAKPOINT_PX;
  const shouldRenderRingShimmer = bounds.width >= SHIMMER_BREAKPOINT_PX;

  const spatialMaskGeometry = useMemo(
    () => ({
      centerX: bounds.width * TEXT_DIM_CENTER_X_FRACTION,
      centerY: bounds.height * TEXT_DIM_CENTER_Y_FRACTION,
      radiusX: bounds.width * TEXT_DIM_RADIUS_X_FRACTION,
      radiusY: bounds.height * TEXT_DIM_RADIUS_Y_FRACTION,
    }),
    [bounds],
  );

  // Single global radial fade, replacing the old per-ring index-based opacity
  // entirely. Centered on the asterisk's own on-screen position — the same
  // point the motif and baseTransform use — with its radius reaching the
  // FARTHEST canvas corner from that point, so the fade-to-invisible
  // completes smoothly across the whole visible field. A circle of that
  // radius fully encloses the bounds rectangle (every point in a rectangle
  // is at most as far from an interior point as its farthest corner is), so
  // there's no need for a background rect the way spatialMask needed one —
  // this mask alone already covers every pixel with no hard edge anywhere.
  const radialFadeGeometry = useMemo(() => {
    const farthestCornerDistance = Math.max(
      Math.hypot(geometry.centerX, geometry.centerY),
      Math.hypot(bounds.width - geometry.centerX, geometry.centerY),
      Math.hypot(geometry.centerX, bounds.height - geometry.centerY),
      Math.hypot(bounds.width - geometry.centerX, bounds.height - geometry.centerY),
    );

    return { centerX: geometry.centerX, centerY: geometry.centerY, radius: farthestCornerDistance };
  }, [bounds, geometry]);

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
  const shimmerRingPaths = useMemo(
    () => [
      ...offsetRingPaths.map((d) => ({ d, keyPrefix: "offset" })),
      ...hexagonRingPaths.map((d) => ({ d, keyPrefix: "hexagon" })),
    ],
    [hexagonRingPaths, offsetRingPaths],
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* Gated on hasMeasured, not just rendered with the {1440, 960} fallback:
          every path/mask/gradient below is derived from `bounds`, so painting
          them before the container's real size is known would show the art at
          the wrong scale for a frame, then visibly snap once the real
          measurement lands. Rendering nothing until then reads as normal
          page-load, not as a shape resizing itself. The ref-bearing div above
          still always renders, so the measurement in useElementBounds can
          actually happen. */}
      {svgReady && (
      <svg
        viewBox={`0 0 ${bounds.width} ${bounds.height}`}
        width="100%"
        height="100%"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <style>{`
            .hero-ring-shimmer {
              opacity: 0;
            }

            .hero-ring-shimmer[data-active="true"] {
              animation: hero-ring-shimmer-sweep var(--hero-ring-shimmer-duration, 546ms) var(--hero-ring-shimmer-ease, cubic-bezier(0.16, 1, 0.3, 1)) both;
            }

            @keyframes hero-ring-shimmer-sweep {
              0% {
                opacity: 0;
              }
              34% {
                opacity: var(--hero-ring-shimmer-peak-opacity, 0.78);
              }
              100% {
                opacity: 0;
              }
            }

            @media (max-width: 767px) {
              .hero-ring-shimmer[data-active="true"] {
                --hero-ring-shimmer-duration: 1800ms;
                --hero-ring-shimmer-ease: cubic-bezier(0.4, 0, 0.2, 1);
                --hero-ring-shimmer-peak-opacity: 0.18;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .hero-ring-shimmer[data-active="true"] {
                animation: none;
              }
            }
          `}</style>

          {/* Grain effect ported from the pre-dark-forest StructuralAsteriskHeroArt
              (commit 8b29604) — same feTurbulence/feColorMatrix/feComponentTransfer
              mechanics, recolored with the current #B0BC64 accent token instead of
              that commit's now-deleted gray palette.
              feTurbulence is a generator primitive — it ignores SourceGraphic
              entirely, so without the final feComposite below the filter's
              output is pure black-with-varying-alpha regardless of the
              element's own fill (confirmed by sampling actual rendered
              pixels: the "grain" was rendering black, not #B0BC64, same
              latent bug as the original this was ported from). The
              feComposite operator="in" takes the rect's real fill color from
              SourceGraphic and masks it by the noise-derived alpha instead,
              so the olive tint actually renders. */}
          <filter id={`${uid}-grainNoise`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.38"
              numOctaves="2"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0.33 0.33 0.33 0 0"
              result="grainAlpha"
            />
            <feComponentTransfer in="grainAlpha" result="grainAlphaStepped">
              <feFuncA type="discrete" tableValues="0 0 0.15 0.15 0.4 0.4 0.6" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="grainAlphaStepped" operator="in" />
          </filter>

          {/* Sparse mineral-inclusion highlight — deliberately reuses the SAME
              feTurbulence parameters (and default seed) as grainNoise above,
              so this generates the exact same underlying noise field rather
              than an independently-random second pattern. That means the
              highlight's "highest values" line up precisely with the
              brightest peaks WITHIN the base grain's own noise, reading as
              inclusions inside the same grain rather than an unrelated
              sparkle layer. Only values above HIGHLIGHT_THRESHOLD are lit
              (~2% of the field, see the constant's comment for how that
              threshold was actually determined); everywhere else is fully
              transparent. */}
          <filter id={`${uid}-grainHighlight`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.38"
              numOctaves="2"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0.33 0.33 0.33 0 0"
              result="grainAlpha"
            />
            <feComponentTransfer in="grainAlpha" result="highlightAlphaStepped">
              <feFuncA type="linear" slope={HIGHLIGHT_SLOPE} intercept={-HIGHLIGHT_SLOPE * HIGHLIGHT_THRESHOLD} />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="highlightAlphaStepped" operator="in" />
          </filter>

          <clipPath id={`${uid}-solidClip`}>
            <path d={SOLID_PATH} />
          </clipPath>

          {/* objectBoundingBox (the default) stretches this gradient's circle to
              fit whatever shape it fills — painting it onto an ellipse below
              gives an elliptical falloff for free, no manual x/y scaling math
              needed. Edge stop is full-white/opacity-1, matching the base rect
              behind it, so there's no visible seam at the ellipse boundary. */}
          <radialGradient id={`${uid}-textDimGradient`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity={TEXT_DIM_MIN_OPACITY} />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </radialGradient>

          <mask id={`${uid}-spatialMask`}>
            <rect x="0" y="0" width={bounds.width} height={bounds.height} fill="white" />
            <ellipse
              cx={spatialMaskGeometry.centerX}
              cy={spatialMaskGeometry.centerY}
              rx={spatialMaskGeometry.radiusX}
              ry={spatialMaskGeometry.radiusY}
              fill={`url(#${uid}-textDimGradient)`}
            />
          </mask>

          {/* Full strength at the center, fading linearly to fully transparent
              at the edge — spread over a radius as large as the farthest
              canvas corner, the transition is soft simply by virtue of being
              stretched across hundreds of pixels; no extra easing stops
              needed. */}
          <radialGradient id={`${uid}-contourFadeGradient`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id={`${uid}-contourFadeMask`}>
            <circle
              cx={radialFadeGeometry.centerX}
              cy={radialFadeGeometry.centerY}
              r={radialFadeGeometry.radius}
              fill={`url(#${uid}-contourFadeGradient)`}
            />
          </mask>

          <radialGradient
            id={`${uid}-ringShimmerGradient`}
            cx={geometry.centerX}
            cy={geometry.centerY}
            r={radialFadeGeometry.radius}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#E8E3D5" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#B6FF00" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#D9EBE1" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#D9EBE1" stopOpacity="0.12" />
          </radialGradient>
        </defs>

        {/* One global radial fade centered on the asterisk (contourFadeMask),
            nested with the existing text-column dip (spatialMask) — masks
            compose multiplicatively when nested, so both attenuations apply
            together. Every ring below shares one stroke treatment
            (CONTOUR_STROKE_*); these masks are now the ONLY source of
            visibility variation across the field. */}
        <g mask={`url(#${uid}-contourFadeMask)`}>
          <g mask={`url(#${uid}-spatialMask)`}>
            {/* Near rings, true perpendicular offset, uniform gaps */}
            {offsetRingPaths.map((d, index) => (
              <path
                key={`pinwheel-offset-${index}`}
                d={d}
                fill="none"
                stroke={CONTOUR_STROKE_COLOR}
                strokeWidth={CONTOUR_STROKE_WIDTH}
                vectorEffect="non-scaling-stroke"
                opacity={CONTOUR_STROKE_OPACITY}
                transform={baseTransform}
              />
            ))}

            {/* Far rings, hexagon built from the tip edges only — safe at any distance */}
            {hexagonRingPaths.map((d, index) => (
              <path
                key={`pinwheel-hexagon-${index}`}
                d={d}
                fill="none"
                stroke={CONTOUR_STROKE_COLOR}
                strokeWidth={CONTOUR_STROKE_WIDTH}
                vectorEffect="non-scaling-stroke"
                opacity={CONTOUR_STROKE_OPACITY}
                transform={baseTransform}
              />
            ))}
          </g>

          {shouldRenderRingShimmer && (
            <g mask={`url(#${uid}-spatialMask)`}>
              {shimmerRingPaths.map(({ d, keyPrefix }, index) => (
                <path
                  key={`pinwheel-shimmer-${keyPrefix}-${index}`}
                  className="hero-ring-shimmer"
                  data-active={shimmerActive ? "true" : "false"}
                  d={d}
                  fill="none"
                  stroke={`url(#${uid}-ringShimmerGradient)`}
                  strokeLinecap="round"
                  strokeWidth={CONTOUR_STROKE_WIDTH * 1.65}
                  vectorEffect="non-scaling-stroke"
                  transform={baseTransform}
                  style={{ animationDelay: `${index * (isMobileShimmer ? MOBILE_RING_SHIMMER_STEP_MS : RING_SHIMMER_STEP_MS)}ms` }}
                />
              ))}
            </g>
          )}
        </g>

        <g clipPath={`url(#${uid}-solidClip)`} transform={baseTransform}>
          <path d={SOLID_PATH} fill="#243427" stroke="#243427" />
          <rect
            x={nativeBBox.minX}
            y={nativeBBox.minY}
            width={nativeBBox.width}
            height={nativeBBox.height}
            fill="#B0BC64"
            filter={`url(#${uid}-grainNoise)`}
            opacity="0.35"
          />
          {/* Microscopic mineral-inclusion highlight, on top of the olive grain
              above. Kept translucent (not the filter's own full alpha) so the
              flecks read as catching light rather than glowing or sparkling. */}
          <rect
            x={nativeBBox.minX}
            y={nativeBBox.minY}
            width={nativeBBox.width}
            height={nativeBBox.height}
            fill={MOTIF_HIGHLIGHT_COLOR}
            filter={`url(#${uid}-grainHighlight)`}
            opacity="0.5"
          />
        </g>
      </svg>
      )}
    </div>
  );
}
