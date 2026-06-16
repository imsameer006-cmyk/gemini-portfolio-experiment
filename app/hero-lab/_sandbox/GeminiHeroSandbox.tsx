"use client";

/**
 * REENGINEERED WORKFLOW GRAPH — REACTIVE MESH ARCHITECTURE
 * 1. Nodes strictly tied to grid column and row intersections.
 * 2. Background mesh lines and intersection dots change opacity based on distance from the active node.
 * 3. Interactive nodes live inside the same SVG as the mesh (not a separate
 *    HTML overlay) so they share the exact same viewBox/scaling transform —
 *    this is what guarantees they land precisely on grid intersections at
 *    every viewport size, instead of just approximately.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, useMemo } from "react";

// SYSTEM VECTOR LAYOUT MATRIX
const MATRIX_COLS = 24;
const MATRIX_ROWS = 14;
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 700;

const EASE = [0.16, 1, 0.3, 1] as const;

// Formula to extract absolute pixel spaces from grid indices
const getGridCoords = (col: number, row: number) => ({
  x: (col / MATRIX_COLS) * CANVAS_WIDTH,
  y: (row / MATRIX_ROWS) * CANVAS_HEIGHT,
});

// Deterministic pseudo-random — integer-only hash (no Math.sin/trig), so the
// result is bit-identical on the server and the client. A sin-based PRNG can
// differ in the last few decimal places between Node's SSR pass and the
// browser's JS engine, which causes React hydration mismatches.
const seededRandom = (seed: number) => {
  let x = (seed * 1597334677) >>> 0;
  x = (x ^ (x >>> 15)) >>> 0;
  x = (x * 2246822519) >>> 0;
  x = (x ^ (x >>> 13)) >>> 0;
  x = (x * 3266489917) >>> 0;
  x = (x ^ (x >>> 16)) >>> 0;
  return x / 4294967296;
};

// 4-point sparkle/star outline centered at (cx,cy)
const starPath = (cx: number, cy: number, size: number) => {
  const inner = size * 0.28;
  return `M ${cx} ${cy - size} L ${cx + inner} ${cy - inner} L ${cx + size} ${cy} L ${cx + inner} ${cy + inner} L ${cx} ${cy + size} L ${cx - inner} ${cy + inner} L ${cx - size} ${cy} L ${cx - inner} ${cy - inner} Z`;
};

// Structural node positions mapped perfectly to your system matrix intersections
const GRID_NODES = [
  { id: 0, col: 14, row: 5, shape: "circle" },
  { id: 1, col: 17, row: 7, shape: "square" },
  { id: 2, col: 21, row: 6, shape: "diamond" },
  { id: 3, col: 13, row: 9, shape: "completion" },
] as const;

export function GeminiHeroSandbox() {
  const reduceMotion = useReducedMotion();
  const [activated, setActivated] = useState<Set<number>>(() => new Set());
  const [hovered, setHovered] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const complete = activated.size === GRID_NODES.length;
  const [showCompletionSweep, setShowCompletionSweep] = useState(false);
  const [completionArrived, setCompletionArrived] = useState(false);

  // Compute pristine top layer coordinates
  const INTERACTIVE_NODES = useMemo(() => {
    return GRID_NODES.map((node) => ({
      ...node,
      ...getGridCoords(node.col, node.row),
    }));
  }, []);

  // Every activated node keeps its own glow permanently lit — hover adds one
  // extra temporary glow on top, which fades away on mouse-leave unless that
  // node has since been clicked (at which point it's already in `activated`
  // and stays lit regardless of hover state).
  const focusPoints = useMemo(() => {
    const points = Array.from(activated).map((id) => ({
      col: GRID_NODES[id].col,
      row: GRID_NODES[id].row,
    }));
    if (hovered !== null && !activated.has(hovered)) {
      points.push({ col: GRID_NODES[hovered].col, row: GRID_NODES[hovered].row });
    }
    return points;
  }, [hovered, activated]);

  // SYSTEM CANVAS FABRIC GENERATOR
  // Vertical and horizontal lines are cut into short per-cell segments (one
  // per grid step) rather than single long paths spanning the whole canvas.
  // Each segment carries its own exact (col,row) anchor so the radius-based
  // proximity glow can fall off correctly along the line's length — a single
  // long path can only have one opacity value, which previously caused whole
  // columns/rows to light up edge-to-edge instead of just the area near the
  // hovered/active node.
  const backdropFabric = useMemo(() => {
    const meshLines: { id: string; d: string; col: number; row: number }[] = [];
    const dots: { id: string; cx: number; cy: number; col: number; row: number }[] = [];

    for (let c = 0; c <= MATRIX_COLS; c++) {
      const x = (c / MATRIX_COLS) * CANVAS_WIDTH;

      for (let r = 0; r <= MATRIX_ROWS; r++) {
        const y = (r / MATRIX_ROWS) * CANVAS_HEIGHT;

        // Lattice Dots
        dots.push({
          id: `dot-mesh-${c}-${r}`,
          cx: x,
          cy: y,
          col: c,
          row: r,
        });

        // Vertical segment from this intersection down to the next row
        if (r < MATRIX_ROWS) {
          const nextY = ((r + 1) / MATRIX_ROWS) * CANVAS_HEIGHT;
          meshLines.push({
            id: `v-seg-${c}-${r}`,
            d: `M ${x} ${y} V ${nextY}`,
            col: c,
            row: r + 0.5,
          });
        }

        // Horizontal segment from this intersection right to the next column
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
  }, []);

  // SPARSE TWINKLING STAR FIELD — sits beneath everything else. Density ramps
  // from ~3% near the left protection mask to ~35% at the far right edge
  // (averaging ~15-20% overall), so stars are mostly concentrated on the
  // right side rather than spread evenly. Each star's delay/duration/size is
  // seeded by its own (col,row) so the field is stable across re-renders but
  // every star twinkles on its own independent, asynchronous cycle.
  const microStars = useMemo(() => {
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
  }, []);

  const activateNode = (id: number) => {
    if (activated.has(id)) return;
    setHasInteracted(true);

    const next = new Set(activated);
    next.add(id);
    setActivated(next);

    if (next.size === GRID_NODES.length) {
      setShowCompletionSweep(true);
      window.setTimeout(() => setCompletionArrived(true), 1200);
    }
  };

  // RADIAL INVERSE DISTANCE WEIGHING PROXIMITY CALCULATOR
  // Takes the strongest boost across every focus point (all activated nodes
  // plus the current hover preview), so each clicked node keeps its own
  // glow permanently instead of only the most recent one being lit.
  const getProximityOpacity = (itemCol: number, itemRow: number, baseWeight: number) => {
    const xRatio = itemCol / MATRIX_COLS;
    // Elegant left-to-right editorial fade layout
    const globalFade = xRatio < 0.15 ? 0 : Math.pow((xRatio - 0.15) / 0.85, 1.6);

    if (globalFade === 0) return 0;

    let maxBoost = 0;
    for (const focus of focusPoints) {
      const dCol = itemCol - focus.col;
      const dRow = itemRow - focus.row;
      const gridDistance = Math.sqrt(dCol * dCol + dRow * dRow);

      // Within 4.5 segments, illuminate the neighborhood canvas lines
      if (gridDistance <= 4.5) {
        const structuralBoost = (1 - gridDistance / 4.5) * 0.55;
        if (structuralBoost > maxBoost) maxBoost = structuralBoost;
      }
    }

    return Math.min(0.9, (baseWeight + maxBoost) * globalFade);
  };

  return (
    <div className="relative isolate overflow-hidden bg-[#F9F8F5]">
      {/* COMPLETION SWEEP — plays once, exactly when the 4th node is activated */}
      <AnimatePresence>
        {showCompletionSweep && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-y-[18%] -left-[68%] z-[3] w-[72%] skew-x-[-26deg] blur-[28px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(192,123,80,0.05) 15%, rgba(255,255,255,0.92) 48%, rgba(192,123,80,0.1) 70%, transparent 100%)",
            }}
            initial={{ x: "0%", opacity: 0.08 }}
            animate={{ x: "225%", opacity: [0, 0.85, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 2.4, ease: [0.16, 1, 0.3, 1], times: [0, 0.48, 1] }}
          />
        )}
      </AnimatePresence>

      <section className="relative flex md:min-h-screen flex-col justify-start overflow-x-hidden px-6 pb-16 md:pb-[88px] pt-[72px] md:px-10">

        {/* REACTIVE BLUEPRINT BACKGROUND LAYER — mesh + interactive nodes now
            live in the SAME svg/viewBox, so node positions are guaranteed to
            land exactly on grid intersections at any viewport size. */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {/* CONTENT VISIBILITY MASKS */}
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

          <svg
            viewBox="0 0 1280 700"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <filter id="node-glow-sandbox" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>

            {/* Twinkling star field — back-most layer, painted before
                everything else so the mesh and nodes sit on top of it */}
            <g fill="#9E7E6B">
              {microStars.map((star) => (
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

            {/* Mesh Infrastructure Vectors */}
            <g fill="none" stroke="#9E7E6B" strokeWidth="0.5">
              {backdropFabric.meshLines.map((line) => {
                const currentOpacity = getProximityOpacity(line.col, line.row, 0.14);
                return (
                  <motion.path
                    key={line.id}
                    d={line.d}
                    animate={{ opacity: currentOpacity }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                );
              })}
            </g>

            {/* Mesh Anchors (Dots) */}
            <g fill="#9E7E6B">
              {backdropFabric.dots.map((dot) => {
                const currentOpacity = getProximityOpacity(dot.col, dot.row, 0.32);
                const isFocused = focusPoints.some(
                  (focus) => dot.col === focus.col && dot.row === focus.row
                );

                return (
                  <motion.circle
                    key={dot.id}
                    cx={dot.cx}
                    cy={dot.cy}
                    r={isFocused ? "1.75" : "0.85"}
                    animate={{
                      opacity: currentOpacity,
                      fill: isFocused ? "#C07B50" : "#9E7E6B",
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                );
              })}
            </g>

            {/* Interactive nodes — drawn directly in the mesh's own coordinate
                space, so they're pixel-exact on the grid by construction. */}
            <g className="pointer-events-none lg:pointer-events-auto">
              {INTERACTIVE_NODES.map((node, nodeIndex) => {
                const active = activated.has(node.id);
                const preview = hovered === node.id;
                const highlighted = active || preview;
                const finalComplete = completionArrived;
                const accent = node.id === 2 ? "#C07B50" : "#9E7E6B";

                return (
                  <g
                    key={node.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${active ? "Activated" : "Activate"} network interface target ${node.id + 1}`}
                    style={{ cursor: "pointer", outline: "none" }}
                    onMouseEnter={() => {
                      setHovered(node.id);
                      setHasInteracted(true);
                    }}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => {
                      setHovered(node.id);
                      setHasInteracted(true);
                    }}
                    onBlur={() => setHovered(null)}
                    onClick={() => activateNode(node.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        activateNode(node.id);
                      }
                    }}
                  >
                    {/* Transparent hit target — generous radius for easy clicking */}
                    <circle cx={node.x} cy={node.y} r={18} fill="transparent" pointerEvents="auto" />

                    {/* Ambient breathing glow, idle only */}
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={8}
                      fill={accent}
                      filter="url(#node-glow-sandbox)"
                      pointerEvents="none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: active ? 0 : [0.06, 0.3, 0.06] }}
                      transition={
                        active
                          ? { duration: 0.4, ease: "easeOut" }
                          : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: nodeIndex * 0.5 }
                      }
                    />

                    {/* Pure editorial primitive geometry */}
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
                        animate={{ scale: highlighted ? 1.2 : 1 }}
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
                        animate={{ scale: highlighted ? 1.2 : 1, rotate: 45 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                      />
                    ) : node.shape === "completion" ? (
                      <motion.g
                        pointerEvents="none"
                        animate={{ scale: highlighted ? 1.2 : 1 }}
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
                        animate={{ scale: highlighted ? 1.2 : 1 }}
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

        {/* TYPOGRAPHY LAYOUT SECTION */}
        <div className="pointer-events-none relative z-[10] mx-auto w-full max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
            className="mb-8"
          >
            <div className="mb-[28px] w-fit">
              <p className="text-[12px] font-[525] uppercase tracking-widest text-[#1C1A16]/40">
                Workflow Design
              </p>
            </div>
            <h1
              id="hero-lab-sandbox-gemini-title"
              className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2.50rem,3.74vw,4.06rem)] italic leading-tight text-[#1C1A16] max-w-[670px]"
            >
              Multi-Stakeholder Approval Workflow for a Digital Twin Platform
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.1, ease: EASE }}
          >
            <p className="mb-[32px] max-w-[560px] text-base leading-relaxed text-[#1C1A16]/60">
              Designed a visible approval workflow that clarified ownership, review state, and next
              actions across four engineering roles.
            </p>

            <div
              className="grid w-fit grid-cols-[auto_auto] sm:grid-cols-[auto_auto_auto] overflow-hidden rounded-xl border border-[#E6E3DD] bg-[#E6E3DD] gap-px"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
            >
              {DEFAULT_METADATA.map(({ label, value }) => (
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
                <span className="rounded-full border border-[#C8BFB2] px-3 py-1.5 text-[12.5px] text-[#1C1A16]/55">
                  Launched to 50+ FAEs in China
                </span>
                {["Workflow Design", "B2B", "UX Research", "Systems Design"].map((tag) => (
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
                      Explore the matrix
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

const DEFAULT_METADATA = [
  { label: "Year", value: "2025–2026" },
  { label: "Role", value: "UX Designer" },
  { label: "Product", value: "Gemini – Digital Twin" },
  { label: "Domain", value: "B2B" },
  { label: "Users", value: "FAE, PAE, PMG, PJM" },
  { label: "Scope", value: "MVP" },
];

export default GeminiHeroSandbox;
