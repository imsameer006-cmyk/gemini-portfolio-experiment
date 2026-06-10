"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ─── NODE DATA ───────────────────────────────────────────────────────────────
const CENTER = { x: 940, y: 340 };
const R1 = 120;
const R2 = 178; // 120 + 58 (previously 192, reducing distance by 20%)

const calculatePos = (angleDeg: number, radius: number) => {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER.x + radius * Math.cos(angleRad),
    y: CENTER.y + radius * Math.sin(angleRad),
  };
};

// Ring 1: 5 nodes at 72 deg spacing
const RING1_NODES = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  ...calculatePos(-90 + i * 72, R1),
  ring: 1,
}));

// Ring 2: 10 nodes at 36 deg spacing, offset by 18 deg to flank Ring 1 nodes
const RING2_NODES = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 6,
  ...calculatePos(-90 + 18 + i * 36, R2),
  ring: 2,
}));

const CENTER_NODE = { id: 0, ...CENTER, ring: 0 };
const ALL_NODES = [CENTER_NODE, ...RING1_NODES, ...RING2_NODES];

// Connections: Center->Ring1, Ring1->Ring2 (strictly radial)
const CONNECTIONS = [
  // Center -> Ring 1 (Sequential around the circle)
  ...RING1_NODES.map((n, i) => ({ from: 0, to: n.id, layer: 0 as const, delay: 0.1 })),

  // Ring 1 -> Ring 2 (Strictly radial fan, symmetrically aligned)
  ...RING1_NODES.flatMap((n, i) => [
    // Connect to the two nodes in Ring 2 that are symmetrical around the radial axis
    { from: n.id, to: RING2_NODES[(i * 2 + 9) % 10].id, layer: 1 as const, delay: 0.3 },
    { from: n.id, to: RING2_NODES[(i * 2) % 10].id, layer: 1 as const, delay: 0.3 },
  ]),
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
  // Muted Copper-based activation colors (Subtle Copper / Terra Cotta)
  const fill   = finalComplete ? "#BFA391" : active ? "#BFA391" : "#F9F8F5";
  const stroke = finalComplete ? "#BFA391" : active ? "#BFA391" : "#9E7E6B";
  
  // Healthy inactive visibility: outer nodes need more presence
  const baseOp = node.ring === 2 && !active && !finalComplete ? 0.32 : 0.65;
  const op     = (highlighted || active) ? 1 : baseOp; 

  if (node.ring === 0) {
    return (
      <motion.g
        initial={false}
        animate={{ opacity: highlighted ? 1 : 0.85, scale: highlighted ? 1.05 : 1 }}
        transition={{ delay: 0.1, duration: 0.3, ease: EASE }}
        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
      >
        <circle cx={node.x} cy={node.y} r={10} fill="none" stroke={stroke} strokeWidth="2" opacity={op} />
        <circle cx={node.x} cy={node.y} r={5}  fill={finalComplete ? "#BFA391" : active ? "#BFA391" : "#BFA391"}  stroke={stroke} strokeWidth="2" opacity={op} />
        <circle cx={node.x} cy={node.y} r={2}  fill={finalComplete ? "#F9F8F5" : active ? "#F9F8F5" : "#9E7E6B"} opacity={active ? 0.8 : 0.52} />
      </motion.g>
    );
  }

  if (node.ring === 1) {
    return (
      <motion.g
        initial={false}
        animate={{ opacity: op, scale: highlighted ? 1.1 : 1 }}
        transition={{ delay: active ? 0.3 : 0, duration: 0.3, ease: EASE }}
        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
      >
        <circle cx={node.x} cy={node.y} r={6} fill={finalComplete ? "#BFA391" : active ? "#BFA391" : "#F9F8F5"} stroke={stroke} strokeWidth="2" />
      </motion.g>
    );
  }

  return (
    <motion.g
      initial={false}
      animate={{ opacity: op * 0.8, scale: highlighted ? 1.1 : 1 }}
      transition={{ delay: active ? 0.5 : 0, duration: 0.3, ease: EASE }}
      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
    >
      <circle
        cx={node.x} cy={node.y}
        r={5}
        fill="transparent"
        stroke={stroke}
        strokeWidth="2"
      />
    </motion.g>
  );
  }

// ─── GLOW HALO ───────────────────────────────────────────────────────────────
function NodeGlow({ node, active, highlighted, finalComplete }: {
  node: { id: number; x: number; y: number; ring: number };
  active: boolean; highlighted: boolean; finalComplete: boolean;
}) {
  const color = finalComplete ? "#BFA391" : active ? "#BFA391" : "#CECAC2";
  const r     = node.ring === 0 ? 24 : node.ring === 1 ? 16 : 10;
  // Subtler glow opacity with ring-based delay for sequential reveal
  const op    = finalComplete ? 0.08 : active ? 0.06 : highlighted ? 0.05 : 0;
  const delay = node.ring * 0.15;

  return (
    <motion.circle
      cx={node.x} cy={node.y} r={r}
      fill={color}
      filter="url(#collab-node-glow)"
      initial={false}
      animate={{ opacity: op }}
      transition={{ delay, duration: 0.4, ease: EASE }}
    />
  );
}

// ─── CONNECTION LINE ──────────────────────────────────────────────────────────
function ConnectionLine({ conn, nodeMap, active, index }: {
  conn: typeof CONNECTIONS[0];
  nodeMap: Record<number, { x: number; y: number; ring: number }>;
  active: boolean;
  index: number;
}) {
  const a = nodeMap[conn.from];
  const b = nodeMap[conn.to];
  if (!a || !b) return null;

  const d       = `M${a.x} ${a.y}L${b.x} ${b.y}`;
  const strokeW = conn.layer === 0 ? 1.2 : 0.9;
  const baseOp  = conn.layer === 0 ? 0.38 : 0.28;

  // Staggering logic: base delay + a small offset per connection index for organic flow
  const staggerDelay = conn.delay + (index * 0.04);

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
          opacity:         { duration: 0.25, delay: staggerDelay, ease: EASE },
          strokeDasharray: { duration: 0.7,  delay: staggerDelay, ease: EASE },
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
            opacity:          { duration: 0.9, delay: staggerDelay + 0.35, ease: EASE, times: [0, 0.3, 1] },
            strokeDashoffset: { duration: 0.9, delay: staggerDelay + 0.35, ease: EASE },
          }}
        />
      )}
    </g>
  );
}

// ─── WAVE EASE (matches project 1 completion sweep) ──────────────────────────
const WAVE_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function CollabNetworkArt({ onInteract }: { onInteract?: () => void }) {
  const [isMounted, setMounted] = useState(false);
  const [activated, setActivated] = useState(false);
  const [hovered,   setHovered]   = useState(false);
  const [complete,  setComplete]  = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nodeMap = Object.fromEntries(ALL_NODES.map(n => [n.id, n])) as Record<number, { x: number; y: number; ring: number }>;

  const handleClick = useCallback(() => {
    if (activated) return;
    setActivated(true);
    if (onInteract) onInteract();
    setTimeout(() => setComplete(true), 2450);
  }, [activated, onInteract]);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    if (onInteract) onInteract();
  }, [onInteract]);

  if (!isMounted) return <div className="hidden md:absolute md:inset-0 md:flex md:items-center md:justify-end z-[1] pointer-events-none" />;

  return (
    <div className="hidden md:absolute md:inset-0 md:flex md:items-center md:justify-end z-[1] pointer-events-none">
      {/* Content Protection Mask: Fades the art out as it approaches the left content column */}
      <div 
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "linear-gradient(to right, #F9F8F5 0%, #F9F8F5 25%, transparent 50%)",
        }}
      />

      <div className="relative w-full lg:w-[1280px] h-[700px]">

      {/* Radial shimmer — CSS div outside SVG, one-shot, same treatment as P1 completion sweep */}
      {activated && (
        <motion.div
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none z-[3]"
          style={{
            left: CENTER.x,
            top: CENTER.y,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, transparent 20%, rgba(192,123,80,0.3) 45%, rgba(255,255,255,1.0) 50%, transparent 70%)",
            filter: "blur(40px)",
          }}
          initial={{ width: 40, height: 40, opacity: 0.08 }}
          animate={{ width: 3600, height: 3600, opacity: [0, 0.52, 0] }}
          transition={{
            width:   { duration: 2.4, ease: [0.4, 0, 0.2, 1] },
            height:  { duration: 2.4, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 2.4, ease: [0.4, 0, 0.2, 1], times: [0, 0.48, 1] },
          }}
        />
      )}

      <svg
        viewBox="0 0 1280 700"
        className="absolute inset-0 w-full h-full pointer-events-auto"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Interactive community network — click to activate"
        role="group"
        style={{ 
          opacity: complete ? 0.48 : 0.24, 
          transition: "opacity 1200ms ease",
          // On tablets, the art is slightly more centered to avoid being cut off
          transform: "scale(var(--art-scale, 1)) translateX(var(--art-x-offset, 0))"
        }}
      >
        <style>{`
          @media (min-width: 768px) and (max-width: 1023px) {
            svg {
              --art-scale: 0.85;
              --art-x-offset: -120px;
            }
          }
        `}</style>
        <defs>
          <radialGradient id="collab-base-fade" cx={CENTER.x} cy={CENTER.y} r="240" gradientUnits="userSpaceOnUse">
            <stop offset="0"   stopColor="#9E7E6B" stopOpacity="0.45" />
            <stop offset="0.5" stopColor="#9E7E6B" stopOpacity="0.25" />
            <stop offset="1"   stopColor="#9E7E6B" stopOpacity="0.12" />
          </radialGradient>

          <radialGradient id="collab-active-route" cx={CENTER.x} cy={CENTER.y} r="230" gradientUnits="userSpaceOnUse">
            <stop offset="0"    stopColor="#BFA391" stopOpacity="0.72" />
            <stop offset="0.55" stopColor="#BFA391" stopOpacity="0.52" />
            <stop offset="1"    stopColor="#9E7E6B" stopOpacity="0.32" />
          </radialGradient>

          <linearGradient id="collab-shimmer" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0"    stopColor="#FFFFFF" stopOpacity="0"    />
            <stop offset="0.44" stopColor="#F9F8F5" stopOpacity="0.72" />
            <stop offset="0.58" stopColor="#F5E8DC" stopOpacity="0.88" />
            <stop offset="1"    stopColor="#FFFFFF" stopOpacity="0"    />
          </linearGradient>

          <filter id="collab-node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>

          <filter id="collab-shimmer-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* Layer 1: Micro texture lines (Standardized healthy visibility) */}
        <g stroke="#9E7E6B" strokeWidth="0.5" fill="none"
           opacity={complete ? 0.28 : 0.18} style={{ transition: "opacity 1200ms ease" }}>
          {MICRO_LINES.map((d, i) => (
            <path key={i} d={d} strokeDasharray={i % 3 === 0 ? "2 10" : i % 3 === 1 ? "8 12" : undefined} />
          ))}
        </g>

        {/* Layer 2: Ambient dot field (Standardized healthy visibility) */}
        <g fill="#9E7E6B" opacity="0.14">
          {AMBIENT_DOTS.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={i % 4 === 0 ? 1.5 : 1} />
          ))}
        </g>

        {/* Layers 3–5: Connections (radial spokes only) */}
        {CONNECTIONS.map((conn, i) => (
          <ConnectionLine key={i} conn={conn} nodeMap={nodeMap} active={activated} index={i} />
        ))}

        {/* Ambient topology rings */}
        <circle cx={CENTER.x} cy={CENTER.y} r={R1} fill="none" stroke="#9E7E6B" strokeWidth="0.4" opacity="0.12" strokeDasharray="4 8" />
        <circle cx={CENTER.x} cy={CENTER.y} r={R2} fill="none" stroke="#9E7E6B" strokeWidth="0.4" opacity="0.08" strokeDasharray="3 10" />

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
          cx={CENTER.x} cy={CENTER.y} r={36}
          fill="transparent"
          className="cursor-pointer"
          style={{ pointerEvents: "auto", outline: "none" }}
          tabIndex={0}
          aria-label={activated ? "Network activated" : "Activate collaboration network"}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setHovered(false)}
          onFocus={handleMouseEnter}
          onBlur={() => setHovered(false)}
          onClick={handleClick}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
        />

        {/* Ring 1 pre-pulse on hover preview */}
        {!activated && RING1_NODES.map(node => (
          <motion.circle
            key={`prepulse-${node.id}`}
            cx={node.x} cy={node.y} r={16}
            fill="#9E7E6B"
            filter="url(#collab-node-glow)"
            initial={false}
            animate={{ opacity: hovered ? 0.15 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        ))}
      </svg>
      </div>
    </div>
  );
}
