"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

export default function CollabNetworkArt({
  onActivate,
  onInteract,
}: {
  onActivate?: () => void;
  onInteract?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [activated, setActivated] = useState(false);
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
          x: COLLAB_ART_CENTER.x + radius * Math.cos(radians),
          y: COLLAB_ART_CENTER.y + radius * Math.sin(radians),
        };
      });

      return { index, nodes, radius };
    });
  }, []);

  const allNodes = useMemo(() => rings.flatMap((ring) => ring.nodes), [rings]);

  const getRingOpacity = (ringIndex: number) => {
    const distanceWeight = 1 - (ringIndex - 1) / RING_COUNT;
    const resting = 0.055 + distanceWeight * 0.075;
    const hoverBoost = hovered ? 0.18 + distanceWeight * 0.22 : 0;
    const activeBoost = activated ? 0.3 + distanceWeight * 0.16 : 0;

    return Math.min(0.72, resting + hoverBoost + activeBoost);
  };

  const getNodeOpacity = (node: RingNode) => {
    const centerDistance = getDistance(node, COLLAB_ART_CENTER);
    const hoverRadius = rings[Math.min(2, rings.length - 1)]?.radius ?? 240;
    const proximity = Math.max(0, 1 - centerDistance / hoverRadius);
    const resting = node.ring <= 2 ? 0.32 : 0.16;
    const hoverBoost = hovered ? proximity * 0.55 : 0;
    const activeBoost = activated ? 0.42 : 0;

    return Math.min(0.88, resting + hoverBoost + activeBoost);
  };

  const handleActivate = () => {
    if (activated) return;
    setActivated(true);
    onActivate?.();
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
            "linear-gradient(to right, #F9F8F5 0%, #F9F8F5 28%, rgba(249,248,245,0.82) 42%, transparent 52%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 z-[20] w-[6%] pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(249,248,245,0), #F9F8F5)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[20] h-16 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(249,248,245,0), #F9F8F5)" }}
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
            <filter id="collab-radial-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
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
                  stroke={activated ? "#C07B50" : "#9E7E6B"}
                  strokeWidth={ring.index === 1 ? 0.72 : 0.52}
                  strokeDasharray={ring.index % 2 === 0 ? "4 14" : "1 11"}
                  initial={false}
                  animate={{ opacity: getRingOpacity(ring.index) }}
                  transition={{ duration: reduceMotion ? 0 : 0.46, delay, ease: EASE }}
                />
              );
            })}
          </g>

          <g stroke="#9E7E6B" strokeWidth="0.45" fill="none">
            {allNodes.map((node) => {
              if (node.index % 4 !== 0) return null;

              return (
                <motion.path
                  key={`radial-spoke-${node.id}`}
                  d={`M ${COLLAB_ART_CENTER.x} ${COLLAB_ART_CENTER.y} L ${node.x} ${node.y}`}
                  initial={false}
                  animate={{
                    opacity: activated ? 0.14 : hovered && node.ring <= 3 ? 0.12 : 0.035,
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

          <g fill="#9E7E6B">
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
                    fill: activated ? (node.ring <= 2 ? "#C07B50" : "#BFA391") : "#9E7E6B",
                    opacity: getNodeOpacity(node),
                    scale: activated ? 1.18 : hovered && node.ring <= 2 ? 1.14 : 1,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.44, delay: sequenceDelay, ease: EASE }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              );
            })}
          </g>

          <AnimatePresence>
            {activated && (
              <motion.g aria-hidden="true" exit={{ opacity: 0 }}>
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.42, 0] }}
                  transition={{ duration: reduceMotion ? 0 : 2.1, ease: EASE, times: [0, 0.42, 1] }}
                >
                  {rings.map((ring) => (
                    <motion.circle
                      key={`ripple-wash-${ring.index}`}
                      cx={COLLAB_ART_CENTER.x}
                      cy={COLLAB_ART_CENTER.y}
                      r={ring.radius}
                      fill="none"
                      stroke="#F5E8DC"
                      strokeWidth={8}
                      filter="url(#collab-radial-glow)"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: [0, 0.72, 0], scale: [0.96, 1, 1.02] }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.72,
                        delay: reduceMotion ? 0 : ring.index * 0.24,
                        ease: EASE,
                        times: [0, 0.45, 1],
                      }}
                      style={{ transformOrigin: `${COLLAB_ART_CENTER.x}px ${COLLAB_ART_CENTER.y}px` }}
                    />
                  ))}
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>

          <g className="pointer-events-none lg:pointer-events-auto">
            <motion.circle
              cx={COLLAB_ART_CENTER.x}
              cy={COLLAB_ART_CENTER.y}
              r={8}
              fill="#9E7E6B"
              filter="url(#collab-hub-glow)"
              pointerEvents="none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: activated ? 0 : hovered ? 0.18 : [0.06, 0.3, 0.06],
              }}
              transition={
                activated || hovered
                  ? { duration: reduceMotion ? 0 : 0.35, ease: EASE }
                  : { duration: reduceMotion ? 0 : 3, repeat: Infinity, ease: "easeInOut" }
              }
            />

            <g
              role="button"
              tabIndex={0}
              aria-label={
                activated ? "Collabspace radial network activated" : "Activate Collabspace radial network"
              }
              style={{ cursor: "pointer", outline: "none" }}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
              onFocus={() => handleHover(true)}
              onBlur={() => handleHover(false)}
              onClick={handleActivate}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleActivate();
                }
              }}
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
                fill={activated ? "#C07B50" : "#F9F8F5"}
                stroke={activated ? "#C07B50" : "#9E7E6B"}
                strokeWidth={1.5}
                pointerEvents="none"
                animate={{ scale: hovered || activated ? 1.16 : 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }}
                style={{ transformOrigin: `${COLLAB_ART_CENTER.x}px ${COLLAB_ART_CENTER.y}px` }}
              />
              <motion.circle
                cx={COLLAB_ART_CENTER.x}
                cy={COLLAB_ART_CENTER.y}
                r={2.5}
                fill={activated ? "#F9F8F5" : "#9E7E6B"}
                opacity={activated ? 0.95 : 0.58}
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
