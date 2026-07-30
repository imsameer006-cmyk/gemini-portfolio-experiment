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
// Verified self-intersection-free, and free of a subtler degeneracy (rays from
// center failing to cross the boundary at all), through 180 native units of total
// offset; stopping at 160 keeps real margin rather than riding the exact edge.
const OFFSET_RING_COUNT = 8;
const OFFSET_STEP = 20; // native units per ring

const UNIT_SCALE_MOBILE = 300 / 514;
const UNIT_SCALE_DESKTOP = 440 / 514;
const DESKTOP_BREAKPOINT = 768;

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
    const unitScale = bounds.width >= DESKTOP_BREAKPOINT ? UNIT_SCALE_DESKTOP : UNIT_SCALE_MOBILE;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    return { unitScale, centerX, centerY };
  }, [bounds]);

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

        <path d={SOLID_PATH} fill="#243427" stroke="#243427" transform={baseTransform} />
      </svg>
    </div>
  );
}
