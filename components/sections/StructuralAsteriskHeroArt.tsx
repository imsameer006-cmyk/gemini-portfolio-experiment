"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";

const SPOKE_ANGLES = [270, 330, 30, 90, 150, 210];
const BASE_CELL = 40;
const BASE_LENGTH = BASE_CELL * 6.5;
const BASE_HALF_WIDTH = BASE_CELL * 1.2;
const BASE_INNER_R = BASE_CELL * 0.1;
const BASE_OFFSET = 12;
const BASE_SIZE = 640;
// The ring-extent container spans the full Hero section (so rings can ripple
// across it), but the asterisk's own size and anchor point are pinned —
// frozen at the exact pixel size/position established through prior
// scale/position iterations, expressed as a fraction of the Hero section so
// they stay put regardless of the section's own dimensions. Without this,
// both would balloon/shift the moment the measurement box grew to fill the
// whole section, since they used to be derived from that same box.
const PINNED_TARGET_DIAMETER = 145.41;
const PINNED_CENTER_X_FRACTION = 0.18379;
const PINNED_CENTER_Y_FRACTION = 0.20255;

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

  return { offsetVerts };
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
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  const geometry = useMemo(() => {
    const centerX = bounds.width * PINNED_CENTER_X_FRACTION;
    const targetDiameter = PINNED_TARGET_DIAMETER;
    const scale = targetDiameter / BASE_SIZE;
    const half = BASE_SIZE * scale * 0.5;
    const rawCenterY = bounds.height * PINNED_CENTER_Y_FRACTION;
    // Guarantee the shape is always fully contained, regardless of container size —
    // clamp so its top/bottom edges never cross the container bounds.
    const centerY = Math.min(Math.max(rawCenterY, half), Math.max(bounds.height - half, half));
    const asteriskVerts = getAsteriskVertices(scale);
    const { offsetVerts } = getOffsetPolygonData(asteriskVerts, BASE_OFFSET * scale);
    const diagonal = Math.hypot(bounds.width, bounds.height);
    const ringStep = Math.max(26, BASE_CELL * scale * 1.35);
    const structuralRings = [];

    for (let r = ringStep; r <= diagonal * 0.72; r += ringStep) {
      structuralRings.push(r);
    }

    return {
      centerX,
      centerY,
      half,
      asteriskPathData: toPath(asteriskVerts),
      offsetPathData: toPath(offsetVerts),
      structuralRings,
      sweepRadius: diagonal * 0.78,
    };
  }, [bounds]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${bounds.width} ${bounds.height}`}
        width="100%"
        height="100%"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <style>
            {`
              @keyframes rippleOut {
                0% {
                  transform: scale(0.05);
                  opacity: 0;
                }
                20% {
                  opacity: 0.85;
                }
                70% {
                  opacity: 0.3;
                }
                100% {
                  transform: scale(1.1);
                  opacity: 0;
                }
              }

              .ripple-group {
                animation: rippleOut 8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
              }
            `}
          </style>

          <radialGradient id={`${uid}-sweepGradient`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="black" />
            <stop offset="40%" stopColor="black" />
            <stop offset="75%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>

          <radialGradient id={`${uid}-rippleGradient`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="35%" stopColor="white" stopOpacity="0.9" />
            <stop offset="65%" stopColor="white" stopOpacity="0.25" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id={`${uid}-structuralSweepMask`}>
            <circle
              cx={geometry.centerX}
              cy={geometry.centerY}
              r={geometry.sweepRadius}
              fill={`url(#${uid}-sweepGradient)`}
              style={{
                transition: reduceMotion ? "none" : "r 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </mask>

          <mask
            id={`${uid}-continuousSweepMask`}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={bounds.width}
            height={bounds.height}
          >
            <rect width="100%" height="100%" fill="white" fillOpacity="0.18" />
            <g
              className={reduceMotion ? undefined : "ripple-group"}
              style={{
                transformOrigin: `${geometry.centerX}px ${geometry.centerY}px`,
                ...(reduceMotion ? { opacity: 0 } : {}),
              }}
            >
              <circle
                cx={geometry.centerX}
                cy={geometry.centerY}
                r={geometry.sweepRadius}
                fill={`url(#${uid}-rippleGradient)`}
              />
            </g>
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
        </defs>

        <g mask={`url(#${uid}-continuousSweepMask)`}>
          <g mask={`url(#${uid}-outsideOffsetMask)`}>
            {geometry.structuralRings.map((r) => (
              <circle
                key={`ring-base-${r}`}
                cx={geometry.centerX}
                cy={geometry.centerY}
                r={r}
                stroke="#B0BC64"
                strokeWidth="0.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                opacity="0.3"
              />
            ))}
          </g>
        </g>

        <g mask={`url(#${uid}-continuousSweepMask)`}>
          <g mask={`url(#${uid}-outsideOffsetMask)`}>
            <circle
              cx={geometry.centerX}
              cy={geometry.centerY}
              r={geometry.sweepRadius}
              fill="#B0BC64"
              opacity="0.08"
            />
            {geometry.structuralRings.map((r) => (
              <circle
                key={`ring-pulse-${r}`}
                cx={geometry.centerX}
                cy={geometry.centerY}
                r={r}
                stroke="#B0BC64"
                strokeWidth="0.75"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />
            ))}
          </g>
        </g>

        <g mask={`url(#${uid}-structuralSweepMask)`}>
          <g mask={`url(#${uid}-outsideOffsetMask)`}>
            {geometry.structuralRings.map((r) => (
              <circle
                key={`ring-lit-${r}`}
                cx={geometry.centerX}
                cy={geometry.centerY}
                r={r}
                fill="none"
                stroke="#B0BC64"
                strokeWidth="0.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity="0.28"
              />
            ))}
          </g>
        </g>

        <g clipPath={`url(#${uid}-asteriskClip)`} shapeRendering="geometricPrecision">
          <rect
            x={geometry.centerX - geometry.half}
            y={geometry.centerY - geometry.half}
            width={geometry.half * 2}
            height={geometry.half * 2}
            fill="#243427"
            shapeRendering="geometricPrecision"
          />
        </g>
      </svg>
    </div>
  );
}
