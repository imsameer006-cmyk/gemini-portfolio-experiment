"use client";

/**
 * SANDBOX COPY - isolated from components/sections/CollabNetworkArt.tsx
 * and the InProgressHero wrapper in components/sections/ProjectInProgress.tsx.
 * Edit freely. This IS imported by app/hero-lab/page.tsx, a real (noindex)
 * production route, so changes here are live at /hero-lab.
 * To ship a change to the actual case study: port the diff back into those
 * two files manually.
 */

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
const CENTER = { x: BASE_CENTER.x + ART_OFFSET_X, y: BASE_CENTER.y };

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

const SANDBOX_PROJECT = {
  category: "Enterprise Platform Design",
  title: "Driving Adoption of an Enterprise Collaboration Platform",
  description:
    "Building a shared knowledge and collaboration platform that connected 2,000+ employees, domains, and expertise across a global organization.",
  client: "Rohde & Schwarz",
  impact: "Platform Adoption",
  tags: ["UX Research", "Stakeholder Discovery", "Information Architecture", "Knowledge Management"],
  heroMetadata: [
    { label: "Year", value: "2023-2024" },
    { label: "Role", value: "UX Research & Product Design" },
    { label: "Product", value: "PLM Collabspace" },
    { label: "Domain", value: "B2B Enterprise" },
    { label: "Users", value: "2,000+ Global Employees" },
    { label: "Scope", value: "Knowledge Ecosystem" },
  ],
};

function CollabRadialArt({
  activated,
  hovered,
  onActivate,
  onHover,
}: {
  activated: boolean;
  hovered: boolean;
  onActivate: () => void;
  onHover: (hovered: boolean) => void;
}) {
  const reduceMotion = useReducedMotion();

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
          x: roundCoord(CENTER.x + radius * Math.cos(radians)),
          y: roundCoord(CENTER.y + radius * Math.sin(radians)),
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
    const centerDistance = getDistance(node, CENTER);
    const hoverRadius = rings[Math.min(2, rings.length - 1)]?.radius ?? 240;
    const proximity = Math.max(0, 1 - centerDistance / hoverRadius);
    const resting = node.ring <= 2 ? 0.32 : 0.16;
    const hoverBoost = hovered ? proximity * 0.55 : 0;
    const activeBoost = activated ? 0.42 : 0;

    return Math.min(0.88, resting + hoverBoost + activeBoost);
  };

  const handleActivate = () => {
    onActivate();
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
          <filter id="collab-radial-glow-sandbox" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="collab-hub-glow-sandbox" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <g fill="none">
          {rings.map((ring) => {
            const delay = reduceMotion ? 0 : ring.index * 0.16;

            return (
              <motion.circle
                key={`ring-path-${ring.index}`}
                cx={CENTER.x}
                cy={CENTER.y}
                r={ring.radius}
                stroke={activated ? "#C07B50" : "#9E7E6B"}
                strokeWidth={ring.index === 1 ? 0.72 : 0.52}
                strokeDasharray={ring.index % 2 === 0 ? "4 14" : "1 11"}
                initial={false}
                animate={{
                  opacity: getRingOpacity(ring.index),
                }}
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
                d={`M ${CENTER.x} ${CENTER.y} L ${node.x} ${node.y}`}
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
            const sequenceDelay = reduceMotion ? 0 : node.ring * 0.17 + (node.index / node.count) * 0.1;
            const active = activated;
            const innerNode = node.ring <= 2;

            return (
              <motion.circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r={innerNode ? 1.85 : 1.15}
                initial={false}
                animate={{
                  fill: active ? (node.ring <= 2 ? "#C07B50" : "#BFA391") : "#9E7E6B",
                  opacity: getNodeOpacity(node),
                  scale: active ? 1.18 : hovered && node.ring <= 2 ? 1.14 : 1,
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
                    cx={CENTER.x}
                    cy={CENTER.y}
                    r={ring.radius}
                    fill="none"
                    stroke="#F5E8DC"
                    strokeWidth={8}
                    filter="url(#collab-radial-glow-sandbox)"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: [0, 0.72, 0], scale: [0.96, 1, 1.02] }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.72,
                      delay: reduceMotion ? 0 : ring.index * 0.24,
                      ease: EASE,
                      times: [0, 0.45, 1],
                    }}
                    style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
                  />
                ))}
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>

        <g className="pointer-events-none lg:pointer-events-auto">
          <motion.circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={8}
            fill="#9E7E6B"
            filter="url(#collab-hub-glow-sandbox)"
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
            aria-label={activated ? "Collabspace radial network activated" : "Activate Collabspace radial network"}
            style={{ cursor: "pointer", outline: "none" }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            onFocus={() => onHover(true)}
            onBlur={() => onHover(false)}
            onClick={handleActivate}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleActivate();
              }
            }}
          >
            <circle cx={CENTER.x} cy={CENTER.y} r={34} fill="transparent" pointerEvents="auto" />
            <motion.circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={9}
              fill={activated ? "#C07B50" : "#F9F8F5"}
              stroke={activated ? "#C07B50" : "#9E7E6B"}
              strokeWidth={1.5}
              pointerEvents="none"
              animate={{ scale: hovered || activated ? 1.16 : 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }}
              style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            />
            <motion.circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={2.5}
              fill={activated ? "#F9F8F5" : "#9E7E6B"}
              opacity={activated ? 0.95 : 0.58}
              pointerEvents="none"
              animate={{ scale: hovered ? 1.22 : 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }}
              style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            />
          </g>
        </g>
      </svg>
      </div>
    </div>
  );
}

export function CollabHeroSandbox() {
  const reduceMotion = useReducedMotion();
  const project = SANDBOX_PROJECT;
  const metadata = project.heroMetadata ?? [];

  const [activated, setActivated] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleActivate = () => {
    setHasInteracted(true);
    setActivated(true);
  };

  const handleHover = (nextHovered: boolean) => {
    setHovered(nextHovered);
    if (nextHovered) setHasInteracted(true);
  };

  return (
    <div data-cs-hero="true" className="relative isolate overflow-hidden bg-[#F9F8F5]">
      <section
        aria-labelledby="hero-lab-sandbox-collab-title"
        className="relative flex md:min-h-screen flex-col justify-start overflow-x-hidden px-6 pb-16 md:pb-[88px] pt-[72px] md:px-10"
      >
        <AnimatePresence>
          {activated && (
            <motion.div
              aria-hidden="true"
              data-collab-radial-sweep="true"
              className="pointer-events-none absolute rounded-full z-[3]"
              style={{
                left: CENTER.x,
                top: CENTER.y,
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, transparent 20%, rgba(192,123,80,0.3) 45%, rgba(255,255,255,1.0) 50%, transparent 70%)",
                filter: "blur(40px)",
              }}
              initial={{ width: 40, height: 40, opacity: 0.08 }}
              animate={{ width: 4600, height: 4600, opacity: [0, 0.52, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                width: { duration: reduceMotion ? 0 : 2.4, ease: [0.4, 0, 0.2, 1] },
                height: { duration: reduceMotion ? 0 : 2.4, ease: [0.4, 0, 0.2, 1] },
                opacity: {
                  duration: reduceMotion ? 0 : 2.4,
                  ease: [0.4, 0, 0.2, 1],
                  times: [0, 0.48, 1],
                },
              }}
            />
          )}
        </AnimatePresence>

        <CollabRadialArt
          activated={activated}
          hovered={hovered}
          onActivate={handleActivate}
          onHover={handleHover}
        />

        <div className="pointer-events-none relative z-[10] mx-auto w-full max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
            className="mb-8"
          >
            <p className="mb-[28px] text-[12px] font-[525] uppercase tracking-widest text-[#1C1A16]/40">
              {project.category}
            </p>
            <h1
              id="hero-lab-sandbox-collab-title"
              className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2.50rem,3.74vw,4.06rem)] italic leading-tight text-[#1C1A16] max-w-[670px]"
            >
              {project.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.1, ease: EASE }}
          >
            <p className="mb-[32px] max-w-[560px] text-base leading-relaxed text-[#1C1A16]/60">
              {project.description}
            </p>

            {metadata.length > 0 && (
              <div
                className="grid w-fit grid-cols-[auto_auto] sm:grid-cols-[auto_auto_auto] overflow-hidden rounded-xl border border-[#E6E3DD] bg-[#E6E3DD] gap-px"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
              >
                {metadata.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1.5 bg-white px-6 py-3">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-[#1C1A16]/[0.38]">
                      {label}
                    </span>
                    <span className="text-[15px] font-normal text-[#1C1A16]/85 leading-snug">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-[20px] flex max-w-[1280px] items-end justify-between">
              <div className="flex max-w-[720px] flex-wrap gap-[10px]">
                {project.client && (
                  <span className="rounded-full bg-[#1C1A16]/[0.09] px-3 py-1.5 text-sm font-medium text-[#1C1A16]">
                    {project.client}
                  </span>
                )}
                {project.impact && (
                  <span className="rounded-full border border-[#C8BFB2] px-3 py-1.5 text-[12.5px] text-[#1C1A16]/55">
                    {project.impact}
                  </span>
                )}
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#C8BFB2] px-3 py-1.5 text-[12.5px] text-[#1C1A16]/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <AnimatePresence>
                {!hasInteracted && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none hidden items-center gap-2.5 pb-1 lg:flex"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 0.62, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.45, delay: 1.1, ease: EASE }}
                  >
                    <motion.span
                      className="block h-2.5 w-2.5 rounded-full border border-[#C07B50]/75 bg-[#F9F8F5]"
                      animate={{
                        boxShadow: [
                          "0 0 0 1px rgba(192,123,80,0.18), 0 0 0 0 rgba(192,123,80,0.18)",
                          "0 0 0 1px rgba(192,123,80,0.22), 0 0 0 8px rgba(192,123,80,0.12)",
                          "0 0 0 1px rgba(192,123,80,0.16), 0 0 0 15px rgba(192,123,80,0)",
                        ],
                        scale: [1, 1.12, 1],
                      }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C07B50]/85">
                      Explore the radial network
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </section>
    </div>
  );
}

export default CollabHeroSandbox;
