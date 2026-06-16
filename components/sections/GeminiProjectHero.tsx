"use client";

/**
 * Gemini case-study hero art.
 *
 * The copy and metadata stay data-driven through GeminiProjectHero props. The
 * visual layer is the finalized reactive mesh: nodes, labels, and stepped
 * progression all share the same SVG grid coordinate system.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

const MATRIX_COLS = 24;
const MATRIX_ROWS = 14;
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 700;

const EASE = [0.16, 1, 0.3, 1] as const;

const getGridCoords = (col: number, row: number) => ({
  x: (col / MATRIX_COLS) * CANVAS_WIDTH,
  y: (row / MATRIX_ROWS) * CANVAS_HEIGHT,
});

const seededRandom = (seed: number) => {
  let x = (seed * 1597334677) >>> 0;
  x = (x ^ (x >>> 15)) >>> 0;
  x = (x * 2246822519) >>> 0;
  x = (x ^ (x >>> 13)) >>> 0;
  x = (x * 3266489917) >>> 0;
  x = (x ^ (x >>> 16)) >>> 0;
  return x / 4294967296;
};

const starPath = (cx: number, cy: number, size: number) => {
  const inner = size * 0.28;
  return `M ${cx} ${cy - size} L ${cx + inner} ${cy - inner} L ${cx + size} ${cy} L ${cx + inner} ${cy + inner} L ${cx} ${cy + size} L ${cx - inner} ${cy + inner} L ${cx - size} ${cy} L ${cx - inner} ${cy - inner} Z`;
};

const GRID_NODES = [
  { id: 0, col: 14, row: 5, shape: "circle" },
  { id: 1, col: 17, row: 7, shape: "square" },
  { id: 2, col: 21, row: 6, shape: "diamond" },
  { id: 3, col: 13, row: 9, shape: "circle" },
  { id: 4, col: 22, row: 9, shape: "completion" },
] as const;

const INTERACTIVE_NODES = GRID_NODES.map((node) => ({
  ...node,
  ...getGridCoords(node.col, node.row),
}));

const WORKFLOW_NODE_ORDER = [3, 0, 1, 2, 4] as const;

const getStepNumber = (id: number) => WORKFLOW_NODE_ORDER.findIndex((nodeId) => nodeId === id) + 1;

function getSteppedPath(fromId: number, toId: number, turn: "horizontal" | "vertical" = "horizontal") {
  const from = INTERACTIVE_NODES.find((node) => node.id === fromId);
  const to = INTERACTIVE_NODES.find((node) => node.id === toId);

  if (!from || !to) return "";

  if (turn === "vertical") {
    return `M ${from.x} ${from.y} V ${to.y} H ${to.x}`;
  }

  return `M ${from.x} ${from.y} H ${to.x} V ${to.y}`;
}

const WORKFLOW_STEP_PATHS = [
  { id: "step-1-2", from: 3, to: 0, d: getSteppedPath(3, 0, "vertical") },
  { id: "step-2-3", from: 0, to: 1, d: getSteppedPath(0, 1) },
  { id: "step-3-4", from: 1, to: 2, d: getSteppedPath(1, 2) },
  { id: "step-4-5", from: 2, to: 4, d: getSteppedPath(2, 4) },
];

const BACKDROP_FABRIC = (() => {
  const meshLines: { id: string; d: string; col: number; row: number }[] = [];
  const dots: { id: string; cx: number; cy: number; col: number; row: number }[] = [];

  for (let c = 0; c <= MATRIX_COLS; c++) {
    const x = (c / MATRIX_COLS) * CANVAS_WIDTH;

    for (let r = 0; r <= MATRIX_ROWS; r++) {
      const y = (r / MATRIX_ROWS) * CANVAS_HEIGHT;

      dots.push({
        id: `dot-mesh-${c}-${r}`,
        cx: x,
        cy: y,
        col: c,
        row: r,
      });

      if (r < MATRIX_ROWS) {
        const nextY = ((r + 1) / MATRIX_ROWS) * CANVAS_HEIGHT;
        meshLines.push({
          id: `v-seg-${c}-${r}`,
          d: `M ${x} ${y} V ${nextY}`,
          col: c,
          row: r + 0.5,
        });
      }

      if (c < MATRIX_COLS) {
        const nextX = ((c + 1) / MATRIX_COLS) * CANVAS_WIDTH;
        meshLines.push({
          id: `h-seg-${c}-${r}`,
          d: `M ${x} ${y} H ${nextX}`,
          col: c + 0.5,
          row: r,
        });
      }
    }
  }

  return { meshLines, dots };
})();

const MICRO_STARS = (() => {
  const stars: { id: string; x: number; y: number; size: number; delay: number; duration: number }[] = [];

  for (let c = 0; c <= MATRIX_COLS; c++) {
    const xRatio = c / MATRIX_COLS;
    if (xRatio < 0.15) continue;

    const rightBias = (xRatio - 0.15) / 0.85;
    const probability = 0.03 + 0.32 * rightBias;

    for (let r = 0; r <= MATRIX_ROWS; r++) {
      const seed = c * 1000 + r;
      if (seededRandom(seed) >= probability) continue;

      stars.push({
        id: `star-${c}-${r}`,
        x: (c / MATRIX_COLS) * CANVAS_WIDTH,
        y: (r / MATRIX_ROWS) * CANVAS_HEIGHT,
        size: 2 + seededRandom(seed + 1) * 1.5,
        delay: seededRandom(seed + 2) * 4,
        duration: 2.5 + seededRandom(seed + 3) * 2,
      });
    }
  }

  return stars;
})();

function ReactiveMeshNetwork({
  activated,
  hovered,
  lastActivated,
  nextNodeId,
  completionArrived,
  onHover,
  onActivate,
}: {
  activated: Set<number>;
  hovered: number | null;
  lastActivated: number | null;
  nextNodeId: number | undefined;
  completionArrived: boolean;
  onHover: (id: number | null) => void;
  onActivate: (id: number) => void;
}) {
  const focusPoints = useMemo(() => {
    const points = Array.from(activated).map((id) => ({
      id,
      col: GRID_NODES[id].col,
      row: GRID_NODES[id].row,
      weight: id === lastActivated ? 0.56 : 0.34,
    }));

    if (hovered !== null && !activated.has(hovered)) {
      points.push({
        id: hovered,
        col: GRID_NODES[hovered].col,
        row: GRID_NODES[hovered].row,
        weight: 0.58,
      });
    }

    return points;
  }, [activated, hovered, lastActivated]);

  const getProximityOpacity = (itemCol: number, itemRow: number, baseWeight: number) => {
    const xRatio = itemCol / MATRIX_COLS;
    const globalFade = xRatio < 0.15 ? 0 : Math.pow((xRatio - 0.15) / 0.85, 1.6);

    if (globalFade === 0) return 0;

    let maxBoost = 0;
    for (const focus of focusPoints) {
      const dCol = itemCol - focus.col;
      const dRow = itemRow - focus.row;
      const gridDistance = Math.sqrt(dCol * dCol + dRow * dRow);

      if (gridDistance <= 4.5) {
        const structuralBoost = (1 - gridDistance / 4.5) * focus.weight;
        if (structuralBoost > maxBoost) maxBoost = structuralBoost;
      }
    }

    return Math.min(0.9, (baseWeight + maxBoost) * globalFade);
  };

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 inset-y-0 z-[20] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #F9F8F5 0%, #F9F8F5 28%, rgba(249,248,245,0.82) 42%, transparent 52%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 z-[20] w-[6%] pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(249,248,245,0), #F9F8F5)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[20] h-16 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(249,248,245,0), #F9F8F5)" }}
      />

      <svg
        viewBox="0 0 1280 700"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full pointer-events-none opacity-[0.58] lg:opacity-100"
        aria-hidden="true"
      >
        <defs>
          <filter id="gemini-node-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <g className="hidden lg:block" fill="#9E7E6B">
          {MICRO_STARS.map((star) => (
            <motion.path
              key={star.id}
              d={starPath(star.x, star.y, star.size)}
              initial={{ opacity: 0.05 }}
              animate={{ opacity: [0.05, 0.2, 0.05] }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.delay,
              }}
            />
          ))}
        </g>

        <g fill="none" stroke="#9E7E6B" strokeWidth="0.5">
          {BACKDROP_FABRIC.meshLines.map((line) => {
            const currentOpacity = getProximityOpacity(line.col, line.row, 0.1);

            return (
              <motion.path
                key={line.id}
                d={line.d}
                initial={{ opacity: currentOpacity }}
                animate={{ opacity: currentOpacity }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            );
          })}
        </g>

        <g fill="#9E7E6B">
          {BACKDROP_FABRIC.dots.map((dot) => {
            const currentOpacity = getProximityOpacity(dot.col, dot.row, 0.24);
            const focusedPoint = focusPoints.find(
              (focus) => dot.col === focus.col && dot.row === focus.row
            );
            const isFocused = Boolean(focusedPoint);
            const focusedFill = completionArrived && focusedPoint?.id !== hovered ? "#BFA391" : "#C07B50";

            return (
              <motion.circle
                key={dot.id}
                cx={dot.cx}
                cy={dot.cy}
                r={isFocused ? "1.75" : "0.85"}
                initial={{
                  opacity: currentOpacity,
                  fill: isFocused ? focusedFill : "#9E7E6B",
                }}
                animate={{
                  opacity: currentOpacity,
                  fill: isFocused ? focusedFill : "#9E7E6B",
                }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            );
          })}
        </g>

        <g className="hidden lg:block" fill="none" strokeLinecap="square" strokeLinejoin="miter">
          {WORKFLOW_STEP_PATHS.map((path) => {
            const settled = activated.has(path.from) && activated.has(path.to);
            const preview =
              hovered === path.to && activated.has(path.from) && !activated.has(path.to);
            const visible = settled || preview;

            return (
              <g key={path.id}>
                <path d={path.d} stroke="#9E7E6B" strokeWidth={0.65} opacity={0.18} />
                <motion.path
                  d={path.d}
                  stroke="#C07B50"
                  strokeWidth={1.15}
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{
                    opacity: completionArrived ? 0.34 : settled ? 0.5 : preview ? 0.34 : 0,
                    pathLength: visible ? 1 : 0,
                  }}
                  transition={{ duration: 0.55, ease: EASE }}
                />
              </g>
            );
          })}
        </g>

        <g className="pointer-events-none lg:pointer-events-auto">
          {INTERACTIVE_NODES.map((node, nodeIndex) => {
            const active = activated.has(node.id);
            const preview = hovered === node.id;
            const available = active || node.id === nextNodeId;
            const finalComplete = completionArrived;
            const accent = node.id === 2 ? "#C07B50" : "#9E7E6B";
            const isLatest = lastActivated === node.id;
            const nodeScale = finalComplete ? 1 : preview || isLatest ? 1.2 : active ? 1.06 : 1;
            const stepNumber = getStepNumber(node.id);

            return (
              <g
                key={node.id}
                role="button"
                tabIndex={0}
                aria-disabled={!available}
                aria-label={`${active ? "Activated" : "Activate"} workflow step ${stepNumber}`}
                style={{ cursor: available ? "pointer" : "default", outline: "none" }}
                onMouseEnter={() => onHover(available ? node.id : null)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(available ? node.id : null)}
                onBlur={() => onHover(null)}
                onClick={() => {
                  if (available) onActivate(node.id);
                }}
                onKeyDown={(event) => {
                  if (available && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault();
                    onActivate(node.id);
                  }
                }}
              >
                <circle cx={node.x} cy={node.y} r={18} fill="transparent" pointerEvents="auto" />

                <motion.g
                  pointerEvents="none"
                  initial={false}
                  animate={{
                    opacity: finalComplete ? 0.36 : active || preview ? 0.48 : available ? 0.38 : 0.22,
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <text
                    x={node.x}
                    y={node.y + 24}
                    textAnchor="middle"
                    className="fill-[#1C1A16] text-[9px] font-semibold"
                    letterSpacing="0.08em"
                  >
                    {stepNumber}
                  </text>
                </motion.g>

                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={8}
                  fill={accent}
                  filter="url(#gemini-node-glow)"
                  pointerEvents="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: active ? 0 : [0.06, 0.3, 0.06] }}
                  transition={
                    active
                      ? { duration: 0.4, ease: "easeOut" }
                      : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: nodeIndex * 0.5 }
                  }
                />

                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={12}
                  fill={accent}
                  filter="url(#gemini-node-glow)"
                  pointerEvents="none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: finalComplete ? 0.05 : isLatest ? 0.12 : active ? 0.055 : 0,
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                />

                {node.shape === "square" ? (
                  <motion.rect
                    x={node.x - 5}
                    y={node.y - 5}
                    width={10}
                    height={10}
                    fill={finalComplete ? "#BFA391" : active ? "#9E7E6B" : "#F9F8F5"}
                    stroke={finalComplete ? "#BFA391" : "#9E7E6B"}
                    strokeWidth={1.5}
                    pointerEvents="none"
                    animate={{ scale: nodeScale }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                ) : node.shape === "diamond" ? (
                  <motion.rect
                    x={node.x - 5}
                    y={node.y - 5}
                    width={10}
                    height={10}
                    fill={finalComplete ? "#BFA391" : active ? "#C07B50" : "#F9F8F5"}
                    stroke={finalComplete ? "#BFA391" : "#C07B50"}
                    strokeWidth={1.5}
                    pointerEvents="none"
                    animate={{ scale: nodeScale, rotate: 45 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                ) : node.shape === "flag" ? (
                  <motion.g
                    pointerEvents="none"
                    animate={{ scale: nodeScale }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  >
                    <path
                      d={`M ${node.x - 5} ${node.y + 7} V ${node.y - 7}`}
                      fill="none"
                      stroke={finalComplete ? "#BFA391" : "#9E7E6B"}
                      strokeWidth={1.5}
                      strokeLinecap="square"
                    />
                    <path
                      d={`M ${node.x - 5} ${node.y - 7} H ${node.x + 6} L ${node.x + 2} ${node.y - 2} H ${node.x - 5} Z`}
                      fill={finalComplete ? "#BFA391" : active ? "#9E7E6B" : "#F9F8F5"}
                      stroke={finalComplete ? "#BFA391" : "#9E7E6B"}
                      strokeWidth={1.5}
                      strokeLinejoin="miter"
                    />
                  </motion.g>
                ) : node.shape === "completion" ? (
                  <motion.g
                    pointerEvents="none"
                    animate={{ scale: nodeScale }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={7}
                      fill={finalComplete ? "#BFA391" : active ? "#9E7E6B" : "#F9F8F5"}
                      stroke={finalComplete ? "#BFA391" : "#9E7E6B"}
                      strokeWidth={1.5}
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={2}
                      fill={finalComplete || active ? "#F9F8F5" : "#9E7E6B"}
                      opacity={finalComplete || active ? 0.95 : 0.52}
                    />
                  </motion.g>
                ) : (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={5}
                    fill={finalComplete ? "#BFA391" : active ? "#9E7E6B" : "#F9F8F5"}
                    stroke={finalComplete ? "#BFA391" : "#9E7E6B"}
                    strokeWidth={1.5}
                    pointerEvents="none"
                    animate={{ scale: nodeScale }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

interface GeminiProjectHeroProps {
  category?: string;
  title?: string;
  description?: string;
  client?: string;
  impact?: string;
  tags?: string[];
  metadata?: { label: string; value: string }[];
}

const DEFAULT_METADATA: { label: string; value: string }[] = [
  { label: "Year", value: "2025–2026" },
  { label: "Role", value: "UX Designer" },
  { label: "Product", value: "Gemini – Digital Twin" },
  { label: "Domain", value: "B2B" },
  { label: "Users", value: "FAE, PAE, PMG, PJM" },
  { label: "Scope", value: "MVP" },
];

export function GeminiProjectHero({
  category = "Workflow Design",
  title = "Multi-Stakeholder Approval Workflow for a Digital Twin Platform",
  description = "Designed a visible approval workflow that clarified ownership, review state, and next actions across four engineering roles.",
  client,
  impact = "Launched to 50+ FAEs in China",
  tags = ["Workflow Design", "B2B", "UX Research", "Systems Design"],
  metadata = DEFAULT_METADATA,
}: GeminiProjectHeroProps) {
  const reduceMotion = useReducedMotion();
  const [activated, setActivated] = useState<Set<number>>(() => new Set());
  const [hovered, setHovered] = useState<number | null>(null);
  const [lastActivated, setLastActivated] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showCompletionSweep, setShowCompletionSweep] = useState(false);
  const [completionArrived, setCompletionArrived] = useState(false);
  const nextNodeId = WORKFLOW_NODE_ORDER[activated.size];

  const activateNode = (id: number) => {
    if (activated.has(id)) return;
    if (id !== nextNodeId) return;

    setHasInteracted(true);
    const next = new Set(activated);
    next.add(id);
    setActivated(next);
    setLastActivated(id);

    if (next.size === GRID_NODES.length) {
      setShowCompletionSweep(true);
      window.setTimeout(() => setCompletionArrived(true), 1200);
    }
  };

  const handleHover = (id: number | null) => {
    if (id !== null) setHasInteracted(true);
    setHovered(id);
  };

  return (
    <div className="relative isolate overflow-hidden bg-[#F9F8F5]">
      <AnimatePresence>
        {showCompletionSweep ? (
          <motion.div
            aria-hidden="true"
            data-completion-sweep="true"
            className="pointer-events-none absolute -inset-y-[18%] -left-[62%] z-[3] w-[56%] skew-x-[-26deg] blur-[22px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(192,123,80,0.05) 15%, rgba(255,255,255,0.92) 48%, rgba(192,123,80,0.1) 70%, transparent 100%)",
            }}
            initial={{ x: "0%", opacity: 0.08 }}
            animate={{ x: "225%", opacity: [0, 0.85, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 1.85,
              ease: EASE,
              times: [0, 0.48, 1],
            }}
          />
        ) : null}
      </AnimatePresence>

      <section
        aria-labelledby="hero-lab-title"
        className="relative flex md:min-h-screen flex-col justify-start overflow-x-hidden px-6 pb-16 md:pb-[88px] pt-[72px] md:px-10"
      >
        <ReactiveMeshNetwork
          activated={activated}
          hovered={hovered}
          lastActivated={lastActivated}
          nextNodeId={nextNodeId}
          completionArrived={completionArrived}
          onHover={handleHover}
          onActivate={activateNode}
        />

        <div className="pointer-events-none relative z-[10] mx-auto w-full max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
            className="mb-8"
          >
            <div className="mb-[28px] w-fit">
              <p className="text-[12px] font-[525] uppercase tracking-widest text-[#1C1A16]/40">
                {category}
              </p>
            </div>
            <h1
              id="hero-lab-title"
              className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2.50rem,3.74vw,4.06rem)] italic leading-tight text-[#1C1A16] max-w-[670px]"
            >
              {title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.1, ease: EASE }}
            className="pointer-events-none"
          >
            <p className="mb-[32px] max-w-[560px] text-base leading-relaxed text-[#1C1A16]/60">
              {description}
            </p>

            <div
              className="grid w-fit grid-cols-[auto_auto] sm:grid-cols-[auto_auto_auto] overflow-hidden rounded-xl border border-[#E6E3DD] bg-[#E6E3DD] gap-px"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
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

            <div className="mt-[20px] flex max-w-[1280px] items-end justify-between">
              <div className="flex max-w-[583px] flex-wrap gap-[10px]">
                {client && (
                  <span className="rounded-full bg-[#1C1A16]/[0.09] px-3 py-1.5 text-sm font-medium text-[#1C1A16]">
                    {client}
                  </span>
                )}
                <span className="rounded-full border border-[#C8BFB2] px-3 py-1.5 text-[12.5px] text-[#1C1A16]/55">
                  {impact}
                </span>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#C8BFB2] px-3 py-1.5 text-[12.5px] text-[#1C1A16]/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <AnimatePresence>
                {!hasInteracted ? (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none hidden items-center gap-2.5 pb-1 lg:flex"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 0.62, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.45, delay: 1.1, ease: EASE }}
                  >
                    <motion.span
                      className="block h-2.5 w-2.5 rounded-full border border-[#C07B50]/75 bg-[#F9F8F5] shadow-[0_0_0_1px_rgba(192,123,80,0.08)]"
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
                      Explore the workflow
                    </span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
