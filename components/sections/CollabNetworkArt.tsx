"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ─── NODE DATA ───────────────────────────────────────────────────────────────
// Center: (940, 340)
// Ring 1: r=110, 5 nodes every 72° starting at -90° (top)
// Ring 2: r=220, 10 nodes every 36° starting at -90° (top)
// All positions computed from exact trigonometry — no positional jitter.

const CENTER_NODE = { id: 0, x: 940, y: 340, ring: 0 };

const RING1_NODES = [
  { id: 1, x: 940,  y: 230, ring: 1 },  // -90°
  { id: 2, x: 1045, y: 306, ring: 1 },  // -18°
  { id: 3, x: 1005, y: 429, ring: 1 },  //  54°
  { id: 4, x: 875,  y: 429, ring: 1 },  // 126°
  { id: 5, x: 835,  y: 306, ring: 1 },  // 198°
];

const RING2_NODES = [
  { id: 6,  x: 940,  y: 120, ring: 2 },  // -90°
  { id: 7,  x: 1069, y: 162, ring: 2 },  // -54°
  { id: 8,  x: 1149, y: 272, ring: 2 },  // -18°
  { id: 9,  x: 1149, y: 408, ring: 2 },  //  18°
  { id: 10, x: 1069, y: 518, ring: 2 },  //  54°
  { id: 11, x: 940,  y: 560, ring: 2 },  //  90°
  { id: 12, x: 811,  y: 518, ring: 2 },  // 126°
  { id: 13, x: 731,  y: 408, ring: 2 },  // 162°
  { id: 14, x: 731,  y: 272, ring: 2 },  // 198°
  { id: 15, x: 811,  y: 162, ring: 2 },  // 234°
];

const ALL_NODES = [CENTER_NODE, ...RING1_NODES, ...RING2_NODES];

// ─── CONNECTIONS — radial spokes only, no lateral ring connections ────────────
// Each Ring 1 node fans outward to its aligned Ring 2 node + the next one
// clockwise (a 36° fan). Every connection travels strictly inside → outside.
const CONNECTIONS: { from: number; to: number; layer: 0 | 1; delay: number }[] = [
  // Center → Ring 1
  { from: 0, to: 1, layer: 0, delay: 0.00 },
  { from: 0, to: 2, layer: 0, delay: 0.06 },
  { from: 0, to: 3, layer: 0, delay: 0.12 },
  { from: 0, to: 4, layer: 0, delay: 0.18 },
  { from: 0, to: 5, layer: 0, delay: 0.24 },
  // Ring 1 → Ring 2 (each node fans to aligned + next clockwise)
  { from: 1, to: 6,  layer: 1, delay: 0.40 },
  { from: 1, to: 7,  layer: 1, delay: 0.46 },
  { from: 2, to: 8,  layer: 1, delay: 0.40 },
  { from: 2, to: 9,  layer: 1, delay: 0.46 },
  { from: 3, to: 10, layer: 1, delay: 0.40 },
  { from: 3, to: 11, layer: 1, delay: 0.46 },
  { from: 4, to: 12, layer: 1, delay: 0.40 },
  { from: 4, to: 13, layer: 1, delay: 0.46 },
  { from: 5, to: 14, layer: 1, delay: 0.40 },
  { from: 5, to: 15, layer: 1, delay: 0.46 },
];

// ─── AMBIENT DOT FIELD ───────────────────────────────────────────────────────
const AMBIENT_DOTS = [
  { x: 870, y: 180 }, { x: 1010, y: 165 }, { x: 1090, y: 210 },
  { x: 1130, y: 350 }, { x: 1120, y: 460 }, { x: 1010, y: 545 },
  { x: 890, y: 535 }, { x: 775, y: 470 }, { x: 710, y: 360 },
  { x: 720, y: 220 }, { x: 830, y: 150 }, { x: 1000, y: 90  },
  { x: 1140, y: 170 }, { x: 1190, y: 280 }, { x: 1200, y: 440 },
  { x: 1090, y: 570 }, { x: 830, y: 580 }, { x: 690, y: 500 },
  { x: 650, y: 320 }, { x: 700, y: 170 }, { x: 940, y: 60  },
  { x: 1060, y: 80  }, { x: 1170, y: 100 }, { x: 1230, y: 340 },
  { x: 960,  y: 620 }, { x: 760, y: 560 }, { x: 640, y: 250 },
  { x: 820, y: 100 }, { x: 1100, y: 130 }, { x: 1250, y: 220 },
];

// ─── MICRO PATHS (ambient texture lines) ────────────────────────────────────
const MICRO_LINES = [
  "M700 180 L760 220", "M800 130 L840 160", "M880 100 L910 140",
  "M960 80  L970 120", "M1030 90 L1040 130","M1100 110 L1120 155",
  "M1160 160 L1180 200","M1200 250 L1210 290","M1220 350 L1230 390",
  "M1210 440 L1200 480","M1170 510 L1140 545","M1110 560 L1070 580",
  "M1020 590 L980 600", "M930 600 L890 590", "M840 570 L810 550",
  "M770 530 L750 500", "M710 470 L690 440", "M660 400 L650 370",
  "M650 310 L660 280", "M680 240 L700 210", "M630 340 L670 330",
  "M1260 300 L1240 330","M1260 400 L1240 380","M620 420 L650 410",
];

// ─── NODE MARKER ─────────────────────────────────────────────────────────────
function NodeMarker({ node, active, highlighted, finalComplete }: {
  node: { id: number; x: number; y: number; ring: number };
  active: boolean;
  highlighted: boolean;
  finalComplete: boolean;
}) {
  const fill   = finalComplete ? "#5A9382" : active ? "#405F56" : "#F9F8F5";
  const stroke = finalComplete ? "#5A9382" : active ? "#477C6C" : "#627B72";
  const op     = (highlighted || active) ? 1 : 0.66;

  if (node.ring === 0) {
    return (
      <motion.g
        initial={false}
        animate={{ opacity: highlighted ? 1 : 0.82, scale: highlighted ? 1.08 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
      >
        <circle cx={node.x} cy={node.y} r={10} fill="none" stroke={stroke} strokeWidth="1.5" opacity={op} />
        <circle cx={node.x} cy={node.y} r={5}  fill={fill}  stroke={stroke} strokeWidth="1.5" opacity={op} />
        <circle cx={node.x} cy={node.y} r={2}  fill={finalComplete ? "#F9F8F5" : active ? "#F9F8F5" : "#627B72"} opacity={active ? 0.92 : 0.52} />
      </motion.g>
    );
  }

  if (node.ring === 1) {
    return (
      <motion.g
        initial={false}
        animate={{ opacity: op, scale: highlighted ? 1.15 : 1 }}
        transition={{ delay: active ? 0.45 : 0, duration: 0.3, ease: EASE }}
        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
      >
        <circle cx={node.x} cy={node.y} r={5} fill="none" stroke={stroke} strokeWidth="1.5" />
        <circle cx={node.x} cy={node.y} r={2} fill={fill} opacity={active ? 0.9 : 0.5} />
      </motion.g>
    );
  }

  return (
    <motion.g
      initial={false}
      animate={{ opacity: op * 0.85, scale: highlighted ? 1.1 : 1 }}
      transition={{ delay: active ? 0.72 : 0, duration: 0.3, ease: EASE }}
      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
    >
      <rect
        x={node.x - 3.5} y={node.y - 3.5}
        width={7} height={7}
        transform={`rotate(45 ${node.x} ${node.y})`}
        fill="none" stroke={stroke} strokeWidth="1.2"
      />
    </motion.g>
  );
}

// ─── GLOW HALO ───────────────────────────────────────────────────────────────
function NodeGlow({ node, active, highlighted, finalComplete }: {
  node: { id: number; x: number; y: number; ring: number };
  active: boolean; highlighted: boolean; finalComplete: boolean;
}) {
  const color = node.ring === 0 ? "#477C6C" : node.ring === 1 ? "#5A9382" : "#95ADA2";
  const r     = node.ring === 0 ? 28 : node.ring === 1 ? 18 : 12;
  const op    = finalComplete ? 0.55 : active ? 0.42 : highlighted ? 0.28 : 0;

  return (
    <motion.circle
      cx={node.x} cy={node.y} r={r}
      fill={color}
      filter="url(#collab-node-glow)"
      initial={false}
      animate={{ opacity: op }}
      transition={{ duration: 0.4, ease: EASE }}
    />
  );
}

// ─── CONNECTION LINE ──────────────────────────────────────────────────────────
function ConnectionLine({ conn, nodeMap, active }: {
  conn: typeof CONNECTIONS[0];
  nodeMap: Record<number, { x: number; y: number; ring: number }>;
  active: boolean;
}) {
  const a = nodeMap[conn.from];
  const b = nodeMap[conn.to];
  if (!a || !b) return null;

  const d       = `M${a.x} ${a.y}L${b.x} ${b.y}`;
  const strokeW = conn.layer === 0 ? 1.2 : 0.9;
  const baseOp  = conn.layer === 0 ? 0.22 : 0.14;

  return (
    <g>
      <path d={d} stroke="url(#collab-base-fade)" strokeWidth={strokeW} fill="none" opacity={baseOp} />

      <motion.path
        d={d}
        stroke="url(#collab-active-route)"
        strokeWidth={strokeW + 0.3}
        fill="none"
        pathLength={1}
        initial={false}
        animate={active
          ? { opacity: 1, strokeDasharray: "1 0", strokeDashoffset: 0 }
          : { opacity: 0, strokeDasharray: "0 1", strokeDashoffset: 0 }
        }
        transition={{
          opacity:         { duration: 0.25, delay: conn.delay, ease: EASE },
          strokeDasharray: { duration: 0.7,  delay: conn.delay, ease: EASE },
        }}
      />

      {active && (
        <motion.path
          d={d}
          stroke="url(#collab-shimmer)"
          strokeWidth={(strokeW + 0.3) * 2.2}
          fill="none"
          filter="url(#collab-shimmer-glow)"
          initial={{ opacity: 0, pathLength: 1, strokeDasharray: "0.06 1", strokeDashoffset: 0.08 }}
          animate={{ opacity: [0, 1, 0], strokeDashoffset: [0.08, -1] }}
          transition={{
            opacity:          { duration: 0.9, delay: conn.delay + 0.35, ease: EASE, times: [0, 0.3, 1] },
            strokeDashoffset: { duration: 0.9, delay: conn.delay + 0.35, ease: EASE },
          }}
        />
      )}
    </g>
  );
}

// ─── RADIAL SHIMMER WAVE ──────────────────────────────────────────────────────
function RadialShimmerWave({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <>
      {([0, 0.3, 0.65] as const).map((delay, i) => (
        <motion.circle
          key={i}
          cx={940} cy={340}
          r={20}
          fill="none"
          stroke="url(#collab-radial-shimmer)"
          strokeWidth={i === 0 ? 3 : i === 1 ? 2 : 1.2}
          filter="url(#collab-shimmer-glow)"
          initial={{ r: 20, opacity: 0 }}
          animate={{ r: [20, 240], opacity: [0, 0.7, 0] }}
          transition={{
            r:       { duration: 1.4, delay, ease: EASE },
            opacity: { duration: 1.4, delay, ease: EASE, times: [0, 0.15, 1] },
          }}
        />
      ))}
    </>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function CollabNetworkArt() {
  const [activated, setActivated] = useState(false);
  const [hovered,   setHovered]   = useState(false);
  const [complete,  setComplete]  = useState(false);

  const nodeMap = Object.fromEntries(ALL_NODES.map(n => [n.id, n])) as Record<number, { x: number; y: number; ring: number }>;

  const handleClick = useCallback(() => {
    if (activated) return;
    setActivated(true);
    setTimeout(() => setComplete(true), 2450);
  }, [activated]);

  return (
    <div className="absolute top-0 right-0 bottom-0 left-[600px] z-[1]">
      <svg
        viewBox="0 0 1280 700"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full lg:pointer-events-auto"
        aria-label="Interactive community network — click to activate"
        role="group"
        style={{ opacity: complete ? 0.52 : 0.28, transition: "opacity 1200ms ease" }}
      >
        <defs>
          <radialGradient id="collab-base-fade" cx="940" cy="340" r="240" gradientUnits="userSpaceOnUse">
            <stop offset="0"   stopColor="#A89F94" stopOpacity="0.25" />
            <stop offset="0.5" stopColor="#A89F94" stopOpacity="0.14" />
            <stop offset="1"   stopColor="#A89F94" stopOpacity="0.04" />
          </radialGradient>

          <radialGradient id="collab-active-route" cx="940" cy="340" r="230" gradientUnits="userSpaceOnUse">
            <stop offset="0"    stopColor="#5A9382" stopOpacity="0.9"  />
            <stop offset="0.55" stopColor="#5A9382" stopOpacity="0.65" />
            <stop offset="1"    stopColor="#477C6C" stopOpacity="0.35" />
          </radialGradient>

          <linearGradient id="collab-shimmer" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0"    stopColor="#FFFFFF" stopOpacity="0"    />
            <stop offset="0.44" stopColor="#F9F8F5" stopOpacity="0.72" />
            <stop offset="0.58" stopColor="#F0EDE8" stopOpacity="0.88" />
            <stop offset="1"    stopColor="#FFFFFF" stopOpacity="0"    />
          </linearGradient>

          <radialGradient id="collab-radial-shimmer" cx="50%" cy="50%" r="50%">
            <stop offset="0"   stopColor="#F0EDE8" stopOpacity="0"   />
            <stop offset="0.4" stopColor="#F0EDE8" stopOpacity="0.9" />
            <stop offset="1"   stopColor="#FFFFFF" stopOpacity="0"   />
          </radialGradient>

          <filter id="collab-node-glow" x="-180%" y="-180%" width="460%" height="460%">
            <feGaussianBlur stdDeviation="10" />
          </filter>

          <filter id="collab-shimmer-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* Layer 1: Micro texture lines */}
        <g stroke="url(#collab-base-fade)" strokeWidth="0.5" fill="none"
           opacity={complete ? 1 : 0.85} style={{ transition: "opacity 1200ms ease" }}>
          {MICRO_LINES.map((d, i) => (
            <path key={i} d={d} strokeDasharray={i % 3 === 0 ? "2 10" : i % 3 === 1 ? "8 12" : undefined} />
          ))}
        </g>

        {/* Layer 2: Ambient dot field */}
        <g fill="#5A9382" opacity="0.07">
          {AMBIENT_DOTS.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={i % 4 === 0 ? 1.5 : 1} />
          ))}
        </g>

        {/* Layers 3–5: Connections (radial spokes only) */}
        {CONNECTIONS.map((conn, i) => (
          <ConnectionLine key={i} conn={conn} nodeMap={nodeMap} active={activated} />
        ))}

        {/* Radial shimmer wave on activate */}
        <RadialShimmerWave active={activated} />

        {/* Ambient topology rings */}
        <circle cx={940} cy={340} r={110} fill="none" stroke="#627B72" strokeWidth="0.4" opacity="0.06" strokeDasharray="4 8" />
        <circle cx={940} cy={340} r={220} fill="none" stroke="#627B72" strokeWidth="0.4" opacity="0.04" strokeDasharray="3 10" />

        {/* Layer 7: Node glows */}
        {ALL_NODES.map(node => (
          <NodeGlow
            key={node.id}
            node={node}
            active={activated}
            highlighted={node.id === 0 ? hovered : false}
            finalComplete={complete}
          />
        ))}

        {/* Layer 8: Node markers */}
        {ALL_NODES.map(node => (
          <NodeMarker
            key={node.id}
            node={node}
            active={activated}
            highlighted={node.id === 0 ? hovered : false}
            finalComplete={complete}
          />
        ))}

        {/* Layer 9: Centre hit target */}
        <circle
          cx={940} cy={340} r={36}
          fill="transparent"
          className="cursor-pointer"
          style={{ pointerEvents: "auto" }}
          tabIndex={0}
          aria-label={activated ? "Network activated" : "Activate collaboration network"}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          onClick={handleClick}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
        />

        {/* Ring 1 pre-pulse on hover preview */}
        {!activated && RING1_NODES.map(node => (
          <motion.circle
            key={`prepulse-${node.id}`}
            cx={node.x} cy={node.y} r={16}
            fill="#5A9382"
            filter="url(#collab-node-glow)"
            initial={false}
            animate={{ opacity: hovered ? 0.15 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        ))}
      </svg>
    </div>
  );
}
