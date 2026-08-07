"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

const MATRIX_COLS = 24;
const MATRIX_ROWS = 14;
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 700;

const EASE = [0.16, 1, 0.3, 1] as const;
const RING_COUNT = 5;
const FIRST_RING_NODES = 8;
const FIRST_RING_RADIUS = 94.6;
const RING_RADIUS_GROWTH = 1.56;
const ART_OFFSET_X = 40;

const getGridCoords = (col: number, row: number) => ({
  x: (col / MATRIX_COLS) * CANVAS_WIDTH,
  y: (row / MATRIX_ROWS) * CANVAS_HEIGHT,
});

const BASE_CENTER = getGridCoords(17.625, 6.8);
export const COLLAB_ART_CENTER = { x: BASE_CENTER.x + ART_OFFSET_X, y: BASE_CENTER.y };

type RingNode = {
  id: string;
  count: number;
  index: number;
  ring: number;
  x: number;
  y: number;
};

type Ring = {
  index: number;
  nodes: RingNode[];
  radius: number;
};

const getDistance = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Math.cos/Math.sin are not guaranteed bit-identical across JS engines, so the
// server (Node/SSR) and the client (browser) can compute a last-digit-different
// float from the same input, which React flags as a hydration mismatch.
// Rounding to a fixed precision here makes the two renders produce the same
// number without any perceptible change to node position.
const roundCoord = (value: number) => Math.round(value * 1e4) / 1e4;

export default function CollabNetworkArt({
  onInteract,
}: {
  onInteract?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const rings = useMemo<Ring[]>(() => {
    return Array.from({ length: RING_COUNT }, (_, ringIndex) => {
      const index = ringIndex + 1;
      const count = FIRST_RING_NODES * 2 ** ringIndex;
      const radius = FIRST_RING_RADIUS * RING_RADIUS_GROWTH ** ringIndex;
      const offset = index % 2 === 0 ? 180 / count : 0;

      const nodes = Array.from({ length: count }, (_, nodeIndex) => {
        const angle = -90 + offset + (nodeIndex / count) * 360;
        const radians = (angle * Math.PI) / 180;

        return {
          id: `collab-ring-${index}-${nodeIndex}`,
          count,
          index: nodeIndex,
          ring: index,
          x: roundCoord(COLLAB_ART_CENTER.x + radius * Math.cos(radians)),
          y: roundCoord(COLLAB_ART_CENTER.y + radius * Math.sin(radians)),
        };
      });

      return { index, nodes, radius };
    });
  }, []);

  const allNodes = useMemo(() => rings.flatMap((ring) => ring.nodes), [rings]);

  // Resting/baseline is what used to be the hover-boosted tier (always on now);
  // hovering adds what used to be the click-activated tier on top of that.
  const getRingOpacity = (ringIndex: number) => {
    const distanceWeight = 1 - (ringIndex - 1) / RING_COUNT;
    const resting = 0.09 + distanceWeight * 0.11;
    const baseline = 0.18 + distanceWeight * 0.22;
    const hoverBoost = hovered ? 0.3 + distanceWeight * 0.16 : 0;

    return Math.min(0.72, resting + baseline + hoverBoost);
  };

  const getNodeOpacity = (node: RingNode) => {
    const centerDistance = getDistance(node, COLLAB_ART_CENTER);
    const hoverRadius = rings[Math.min(2, rings.length - 1)]?.radius ?? 240;
    const proximity = Math.max(0, 1 - centerDistance / hoverRadius);
    const resting = node.ring <= 2 ? 0.32 : 0.16;
    const baseline = proximity * 0.55;
    const hoverBoost = hovered ? 0.42 : 0;

    return Math.min(0.88, resting + baseline + hoverBoost);
  };

  const handleHover = (nextHovered: boolean) => {
    setHovered(nextHovered);
    if (nextHovered) onInteract?.();
  };

  return (
    <div className="absolute inset-0 z-[1] flex items-stretch justify-center pointer-events-none">
      <div
        className="absolute inset-x-0 inset-y-0 z-[20] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #092212 0%, #092212 28%, rgba(9,34,18,0.82) 42%, transparent 52%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 z-[20] w-[6%] pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(9,34,18,0), #092212)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[20] h-16 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(9,34,18,0), #092212)" }}
      />

      <div className="relative h-full w-full">
        <svg
          viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full pointer-events-none opacity-[0.55] md:opacity-100"
          aria-label="Interactive Collabspace radial network"
          role="group"
        >
          <defs>
            <filter id="collab-hub-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          <g fill="none">
            {rings.map((ring) => {
              const delay = reduceMotion ? 0 : ring.index * 0.16;

              return (
                <motion.circle
                  key={`ring-path-${ring.index}`}
                  cx={COLLAB_ART_CENTER.x}
                  cy={COLLAB_ART_CENTER.y}
                  r={ring.radius}
                  stroke={hovered ? "#B6FF00" : "rgba(217,235,225,0.6)"}
                  strokeWidth={ring.index === 1 ? 0.9 : 0.68}
                  strokeDasharray={ring.index % 2 === 0 ? "4 14" : "1 11"}
                  initial={false}
                  animate={{ opacity: getRingOpacity(ring.index) }}
                  transition={{ duration: reduceMotion ? 0 : 0.46, delay, ease: EASE }}
                />
              );
            })}
          </g>

          <g stroke="rgba(217,235,225,0.6)" strokeWidth="0.6" fill="none">
            {allNodes.map((node) => {
              if (node.index % 4 !== 0) return null;

              return (
                <motion.path
                  key={`radial-spoke-${node.id}`}
                  d={`M ${COLLAB_ART_CENTER.x} ${COLLAB_ART_CENTER.y} L ${node.x} ${node.y}`}
                  initial={false}
                  animate={{
                    opacity: hovered ? 0.14 : node.ring <= 3 ? 0.12 : 0.07,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : node.ring * 0.12,
                    ease: EASE,
                  }}
                />
              );
            })}
          </g>

          <g fill="rgba(217,235,225,0.32)">
            {allNodes.map((node) => {
              const sequenceDelay = reduceMotion
                ? 0
                : node.ring * 0.17 + (node.index / node.count) * 0.1;
              const innerNode = node.ring <= 2;

              return (
                <motion.circle
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  r={innerNode ? 1.85 : 1.15}
                  initial={false}
                  animate={{
                    fill: hovered ? (node.ring <= 2 ? "#B6FF00" : "#E8E3D5") : "rgba(217,235,225,0.32)",
                    opacity: getNodeOpacity(node),
                    scale: hovered ? 1.18 : node.ring <= 2 ? 1.14 : 1,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.44, delay: sequenceDelay, ease: EASE }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              );
            })}
          </g>

          <g className="pointer-events-none lg:pointer-events-auto">
            <motion.circle
              cx={COLLAB_ART_CENTER.x}
              cy={COLLAB_ART_CENTER.y}
              r={8}
              fill="rgba(217,235,225,0.32)"
              filter="url(#collab-hub-glow)"
              pointerEvents="none"
              animate={{
                opacity: hovered ? 0 : 0.18,
              }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
            />

            <g
              tabIndex={0}
              style={{ cursor: "default", outline: "none" }}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
              onFocus={() => handleHover(true)}
              onBlur={() => handleHover(false)}
            >
              <circle
                cx={COLLAB_ART_CENTER.x}
                cy={COLLAB_ART_CENTER.y}
                r={34}
                fill="transparent"
                pointerEvents="auto"
              />
              <motion.circle
                cx={COLLAB_ART_CENTER.x}
                cy={COLLAB_ART_CENTER.y}
                r={9}
                fill={hovered ? "#B6FF00" : "#133920"}
                stroke={hovered ? "#B6FF00" : "rgba(217,235,225,0.32)"}
                strokeWidth={1.5}
                pointerEvents="none"
                animate={{ scale: hovered ? 1.16 : 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }}
                style={{ transformOrigin: `${COLLAB_ART_CENTER.x}px ${COLLAB_ART_CENTER.y}px` }}
              />
              <motion.circle
                cx={COLLAB_ART_CENTER.x}
                cy={COLLAB_ART_CENTER.y}
                r={2.5}
                fill={hovered ? "#133920" : "rgba(217,235,225,0.32)"}
                opacity={hovered ? 0.95 : 0.58}
                pointerEvents="none"
                animate={{ scale: hovered ? 1.22 : 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }}
                style={{ transformOrigin: `${COLLAB_ART_CENTER.x}px ${COLLAB_ART_CENTER.y}px` }}
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
