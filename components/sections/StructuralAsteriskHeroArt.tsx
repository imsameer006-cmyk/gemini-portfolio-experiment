"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";

const SPOKE_ANGLES = [270, 330, 30, 90, 150, 210];
const BASE_CELL = 40;
const BASE_LENGTH = BASE_CELL * 6.5;
const BASE_HALF_WIDTH = BASE_CELL;
const BASE_INNER_R = BASE_CELL * 0.1;
const BASE_OFFSET = 12;
const BASE_SIZE = 640;
const SUBDIVISIONS = 3;
const ASTERISK_SIZE_MULTIPLIER = 1.625;

const ART_GRADIENT_DARK = "#0A0A0A";
const ART_GRADIENT_MID = "#5A5A5A";
const ART_GRADIENT_LIGHT = "#EDEDED";
const ART_IDLE_DARK_START = "#2D2B30";
const ART_IDLE_DARK_END = "#141315";

type Point = {
  x: number;
  y: number;
};

type Bounds = {
  width: number;
  height: number;
};

function getSpokeLocalPoints(length: number, halfWidth: number, innerR: number) {
  return [
    { x: innerR, y: -halfWidth },
    { x: length, y: -halfWidth },
    { x: length, y: halfWidth },
    { x: innerR, y: halfWidth },
  ];
}

function transformPoint(point: Point, spokeAngle: number) {
  const totalAngle = spokeAngle * (Math.PI / 180);
  const cos = Math.cos(totalAngle);
  const sin = Math.sin(totalAngle);

  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
  };
}

function getAsteriskVertices(scale: number) {
  const verts: Point[] = [];
  const points = getSpokeLocalPoints(
    BASE_LENGTH * scale,
    BASE_HALF_WIDTH * scale,
    BASE_INNER_R * scale,
  );

  SPOKE_ANGLES.forEach((angle) => {
    points.forEach((point) => {
      verts.push(transformPoint(point, angle));
    });
  });

  return verts;
}

function getOffsetPolygonData(vertices: Point[], dist: number) {
  const n = vertices.length;
  const offsetLines: { p1: Point; p2: Point }[] = [];
  const normals: Point[] = [];

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

    if (midX * nx + midY * ny < 0) {
      nx = -nx;
      ny = -ny;
    }

    normals.push({ x: nx, y: ny });
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

    if (Math.abs(det) > 1e-5) {
      offsetVerts.push({
        x: (b2 * c1 - b1 * c2) / det,
        y: (a1 * c2 - a2 * c1) / det,
      });
    } else {
      offsetVerts.push(l2.p1);
    }
  }

  return { offsetVerts, normals };
}

function toPath(vertices: Point[]) {
  return `${vertices.map((v, i) => `${i === 0 ? "M" : "L"} ${v.x} ${v.y}`).join(" ")} Z`;
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

export default function StructuralAsteriskHeroArt() {
  const [containerRef, bounds] = useElementBounds<HTMLDivElement>();
  const [isActive, setIsActive] = useState(false);
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const active = reduceMotion || isActive;

  const geometry = useMemo(() => {
    const shortSide = Math.min(bounds.width, bounds.height);
    const centerX = bounds.width / 2;
    const centerY = bounds.height * (bounds.width < 768 ? 0.445 : bounds.width < 1024 ? 0.335 : 0.355);
    const baseTargetDiameter = Math.min(
      Math.max(shortSide * (bounds.width < 768 ? 0.3915 : bounds.width < 1024 ? 0.28 : 0.24), bounds.width < 768 ? 71 : 130),
      bounds.width < 768 ? 131 : bounds.width < 1024 ? 220 : 280,
    );
    const targetDiameter = baseTargetDiameter * ASTERISK_SIZE_MULTIPLIER;
    const scale = targetDiameter / BASE_SIZE;
    const asteriskVerts = getAsteriskVertices(scale);
    const { offsetVerts, normals } = getOffsetPolygonData(asteriskVerts, BASE_OFFSET * scale);
    const diagonal = Math.hypot(bounds.width, bounds.height);
    const ringStep = Math.max(26, BASE_CELL * scale * 1.35);
    const structuralRings = [];

    for (let r = ringStep; r <= diagonal * 0.72; r += ringStep) {
      structuralRings.push(r);
    }

    const structuralLines = [];

    for (let i = 0; i < offsetVerts.length; i += 1) {
      const v1 = offsetVerts[i];
      const v2 = offsetVerts[(i + 1) % offsetVerts.length];
      const normal = normals[i];

      for (let s = 0; s < SUBDIVISIONS; s += 1) {
        const t = s / SUBDIVISIONS;
        const startX = v1.x + (v2.x - v1.x) * t;
        const startY = v1.y + (v2.y - v1.y) * t;

        structuralLines.push({
          id: `line-${i}-${s}`,
          x1: startX,
          y1: startY,
          x2: startX + normal.x * diagonal,
          y2: startY + normal.y * diagonal,
        });
      }
    }

    return {
      centerX,
      centerY,
      half: BASE_SIZE * scale * 0.5,
      asteriskPathData: toPath(asteriskVerts),
      offsetPathData: toPath(offsetVerts),
      structuralLines,
      structuralRings,
      sweepRadius: diagonal * 0.78,
      innerSweepRadius: BASE_SIZE * scale * 0.62,
    };
  }, [bounds]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-auto absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${bounds.width} ${bounds.height}`}
        width="100%"
        height="100%"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
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
            <feComponentTransfer in="grainAlpha">
              <feFuncA type="discrete" tableValues="0 0 0.15 0.15 0.4 0.4 0.6" />
            </feComponentTransfer>
          </filter>

          <radialGradient id={`${uid}-asteriskGradient`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={ART_GRADIENT_DARK} />
            <stop offset="55%" stopColor={ART_GRADIENT_MID} />
            <stop offset="100%" stopColor={ART_GRADIENT_LIGHT} />
          </radialGradient>

          <linearGradient id={`${uid}-idleDarkGradient`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ART_IDLE_DARK_START} />
            <stop offset="100%" stopColor={ART_IDLE_DARK_END} />
          </linearGradient>

          <radialGradient id={`${uid}-sweepGradient`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id={`${uid}-structuralSweepMask`}>
            <circle
              cx={geometry.centerX}
              cy={geometry.centerY}
              r={active ? geometry.sweepRadius : 0}
              fill={`url(#${uid}-sweepGradient)`}
              style={{
                transition: reduceMotion ? "none" : "r 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </mask>

          <mask id={`${uid}-outsideOffsetMask`}>
            <rect x="0" y="0" width={bounds.width} height={bounds.height} fill="white" />
            <path
              d={geometry.offsetPathData}
              fill="black"
              transform={`translate(${geometry.centerX} ${geometry.centerY})`}
            />
          </mask>

          <clipPath id={`${uid}-asteriskClip`}>
            <path
              d={geometry.asteriskPathData}
              transform={`translate(${geometry.centerX} ${geometry.centerY})`}
            />
          </clipPath>

          <mask id={`${uid}-insideOutSweepMask`}>
            <circle
              cx={geometry.centerX}
              cy={geometry.centerY}
              r={active ? geometry.innerSweepRadius : 0}
              fill="white"
              style={{
                transition: reduceMotion ? "none" : "r 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </mask>
        </defs>

        <g mask={`url(#${uid}-outsideOffsetMask)`}>
          {geometry.structuralRings.map((r) => (
            <circle
              key={`ring-base-${r}`}
              cx={geometry.centerX}
              cy={geometry.centerY}
              r={r}
              stroke="var(--color-border-strong)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
          ))}
        </g>

        <path
          d={geometry.offsetPathData}
          transform={`translate(${geometry.centerX} ${geometry.centerY})`}
          stroke="var(--color-border-strong)"
          strokeWidth="1"
          fill="none"
          opacity="0.62"
        />

        {geometry.structuralLines.map((line) => (
          <line
            key={line.id}
            x1={geometry.centerX + line.x1}
            y1={geometry.centerY + line.y1}
            x2={geometry.centerX + line.x2}
            y2={geometry.centerY + line.y2}
            stroke="var(--color-border-strong)"
            strokeWidth="0.5"
            opacity="0.32"
          />
        ))}

        <g mask={`url(#${uid}-structuralSweepMask)`}>
          <g mask={`url(#${uid}-outsideOffsetMask)`}>
            {geometry.structuralRings.map((r) => (
              <circle
                key={`ring-lit-${r}`}
                cx={geometry.centerX}
                cy={geometry.centerY}
                r={r}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="0.5"
                opacity="0.28"
              />
            ))}
          </g>
          <path
            d={geometry.offsetPathData}
            transform={`translate(${geometry.centerX} ${geometry.centerY})`}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {geometry.structuralLines.map((line) => (
            <line
              key={`lit-${line.id}`}
              x1={geometry.centerX + line.x1}
              y1={geometry.centerY + line.y1}
              x2={geometry.centerX + line.x2}
              y2={geometry.centerY + line.y2}
              stroke="var(--color-accent)"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}
        </g>

        <g clipPath={`url(#${uid}-asteriskClip)`}>
          <rect
            x={geometry.centerX - geometry.half}
            y={geometry.centerY - geometry.half}
            width={geometry.half * 2}
            height={geometry.half * 2}
            fill={`url(#${uid}-idleDarkGradient)`}
          />
          <rect
            x={geometry.centerX - geometry.half}
            y={geometry.centerY - geometry.half}
            width={geometry.half * 2}
            height={geometry.half * 2}
            fill="black"
            filter={`url(#${uid}-grainNoise)`}
            opacity="0.6"
          />
        </g>

        <g clipPath={`url(#${uid}-asteriskClip)`}>
          <g mask={`url(#${uid}-insideOutSweepMask)`}>
            <rect
              x={geometry.centerX - geometry.half}
              y={geometry.centerY - geometry.half}
              width={geometry.half * 2}
              height={geometry.half * 2}
              fill={`url(#${uid}-asteriskGradient)`}
            />
            <rect
              x={geometry.centerX - geometry.half}
              y={geometry.centerY - geometry.half}
              width={geometry.half * 2}
              height={geometry.half * 2}
              fill="white"
              filter={`url(#${uid}-grainNoise)`}
              opacity="0.5"
            />
          </g>
        </g>

        <path
          d={geometry.asteriskPathData}
          transform={`translate(${geometry.centerX} ${geometry.centerY})`}
          fill="#000000"
          fillOpacity="0.001"
          pointerEvents="all"
          style={{ cursor: reduceMotion ? "default" : "pointer" }}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse" && !reduceMotion) {
              setIsActive(true);
            }
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse" && !reduceMotion) {
              setIsActive(false);
            }
          }}
          onClick={() => {
            if (!reduceMotion) {
              setIsActive((current) => !current);
            }
          }}
        />
      </svg>
    </div>
  );
}
