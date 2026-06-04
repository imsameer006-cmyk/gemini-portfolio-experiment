"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const INTERACTIVE_NODES = [
  { id: 0, x: 704, y: 204, shape: "circle", halo: "#317E72" },
  { id: 1, x: 884, y: 286, shape: "square", halo: "#315A53" },
  { id: 2, x: 1190, y: 380, shape: "square", halo: "#C07B50" },
  { id: 3, x: 954, y: 570, shape: "circle", halo: "#8AAFA5" },
] as const;

const NETWORK_PATHS = [
  { id: "p01", owner: 0, delay: 0, d: "M610 286V254C610 222 650 204 704 204" },
  { id: "p02", owner: 0, delay: 0.12, d: "M704 204H776C816 204 838 224 838 264V286H884" },
  { id: "p03", owner: 0, delay: 0.2, d: "M704 204V126H752" },
  { id: "p04", owner: 1, delay: 0, d: "M884 286H970C1010 286 1030 266 1030 226V196H1074" },
  { id: "p05", owner: 1, delay: 0.1, d: "M884 286V380H1190" },
  { id: "p06", owner: 1, delay: 0.18, d: "M884 286V170H922" },
  { id: "p07", owner: 2, delay: 0, d: "M1074 196H1238" },
  { id: "p08", owner: 2, delay: 0.08, d: "M1190 380H1328" },
  { id: "p09", owner: 2, delay: 0.16, d: "M1190 380V444C1190 464 1176 474 1148 474H954" },
  { id: "p10", owner: 2, delay: 0.24, d: "M1190 380V286H1300" },
  { id: "p11", owner: 3, delay: 0, d: "M954 474V570" },
  { id: "p12", owner: 3, delay: 0.08, d: "M954 570H786C754 570 738 596 738 642V752" },
  { id: "p13", owner: 3, delay: 0.16, d: "M954 570H1132V730" },
  { id: "p14", owner: 3, delay: 0.24, d: "M954 570V706" },
] as const;

const SECONDARY_PATHS = [
  "M646 100V204H704",
  "M752 126V204",
  "M838 286V158H922",
  "M884 286V170",
  "M1030 226V108",
  "M1074 196V102",
  "M1190 380V286H1300",
  "M1190 380V520H1262",
  "M954 474H1036V390",
  "M954 474H846C818 474 804 490 804 522V650H786",
  "M954 474V548C954 582 978 600 1020 600H1132",
  "M804 522H700V470",
  "M786 650H900V746",
  "M606 596H520V694",
  "M1132 612H1308",
  "M1074 196V102",
  "M1030 226V108",
  "M1190 380V520H1262V608",
  "M884 286H774V382H694",
] as const;

const DECORATIVE_NODES = [
  { x: 610, y: 286, r: 2 },
  { x: 520, y: 410, r: 4 },
  { x: 620, y: 322, r: 3 },
  { x: 646, y: 100, r: 3 },
  { x: 752, y: 126, r: 4 },
  { x: 838, y: 158, r: 3 },
  { x: 922, y: 158, r: 2 },
  { x: 884, y: 170, r: 3 },
  { x: 1030, y: 108, r: 3 },
  { x: 1074, y: 102, r: 2 },
  { x: 1238, y: 196, r: 4 },
  { x: 1300, y: 286, r: 3 },
  { x: 1328, y: 380, r: 4 },
  { x: 1262, y: 520, r: 3 },
  { x: 1036, y: 390, r: 3 },
  { x: 1020, y: 600, r: 4 },
  { x: 1308, y: 612, r: 3 },
  { x: 1132, y: 730, r: 3 },
  { x: 900, y: 746, r: 2 },
  { x: 954, y: 706, r: 3 },
  { x: 738, y: 752, r: 4 },
  { x: 786, y: 650, r: 4 },
  { x: 700, y: 470, r: 3 },
  { x: 606, y: 538, r: 3 },
  { x: 520, y: 694, r: 4 },
  { x: 774, y: 382, r: 3 },
  { x: 694, y: 382, r: 2 },
  { x: 1262, y: 608, r: 3 },
] as const;

const MICRO_PATHS = [
  "M382 118H472V176H548",
  "M430 260H536V214H606",
  "M360 548H458V602H548",
  "M486 744V676H570",
  "M566 76V148H622",
  "M666 52V112H726",
  "M792 70H860V122H934",
  "M980 62V136H1048",
  "M1102 72H1178V122H1282",
  "M1284 154H1372",
  "M1248 244H1360",
  "M1330 330V430H1386",
  "M1286 466H1388",
  "M1228 548H1334V594H1400",
  "M1184 672H1276V744",
  "M1036 756H1104V692H1172",
  "M842 778V716H900",
  "M646 772H706V714",
  "M466 650H552V710",
  "M520 342H574",
  "M736 328H804",
  "M1014 324H1084",
  "M1106 512H1184",
] as const;

const MICRO_NODES = [
  { x: 382, y: 118 }, { x: 472, y: 176 }, { x: 430, y: 260 },
  { x: 536, y: 214 }, { x: 360, y: 548 }, { x: 458, y: 602 },
  { x: 486, y: 744 }, { x: 566, y: 76 }, { x: 666, y: 52 },
  { x: 792, y: 70 }, { x: 860, y: 122 }, { x: 980, y: 62 },
  { x: 1102, y: 72 }, { x: 1178, y: 122 }, { x: 1284, y: 154 },
  { x: 1360, y: 244 }, { x: 1330, y: 330 }, { x: 1388, y: 466 },
  { x: 1334, y: 594 }, { x: 1276, y: 744 }, { x: 1104, y: 692 },
  { x: 1036, y: 756 }, { x: 842, y: 778 }, { x: 646, y: 772 },
  { x: 552, y: 710 }, { x: 520, y: 342 }, { x: 736, y: 328 },
  { x: 1014, y: 324 }, { x: 1106, y: 512 },
] as const;

function InteractiveNetwork({
  activated,
  frozenHalos,
  hovered,
  complete,
  completionArrived,
  onHover,
  onActivate,
}: {
  activated: Set<number>;
  frozenHalos: Record<number, { captured: number; target: number }>;
  hovered: number | null;
  complete: boolean;
  completionArrived: boolean;
  onHover: (id: number | null) => void;
  onActivate: (id: number, visibleRadius?: number) => void;
}) {
  const hoverRadii = useRef<Record<number, number>>({});

  return (
    <svg
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-label="Interactive abstract workflow network"
      role="group"
      style={{ opacity: complete ? 0.84 : 1, transition: "opacity 900ms ease" }}
    >
      <defs>
        <linearGradient id="micro-network-fade" x1="320" y1="0" x2="1400" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#315A53" stopOpacity="0.018" />
          <stop offset="0.34" stopColor="#315A53" stopOpacity="0.05" />
          <stop offset="0.68" stopColor="#315A53" stopOpacity="0.11" />
          <stop offset="1" stopColor="#315A53" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="base-network-fade" x1="360" y1="0" x2="1320" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#315A53" stopOpacity="0.025" />
          <stop offset="0.3" stopColor="#315A53" stopOpacity="0.075" />
          <stop offset="1" stopColor="#315A53" stopOpacity="0.19" />
        </linearGradient>
        <linearGradient id="active-network-route" x1="560" y1="0" x2="1320" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#317E72" stopOpacity="0.28" />
          <stop offset="0.72" stopColor="#317E72" stopOpacity="0.85" />
          <stop offset="1" stopColor="#315A53" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="network-shimmer" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.44" stopColor="#FFFFFF" stopOpacity="0.72" />
          <stop offset="0.58" stopColor="#F9F8F5" stopOpacity="0.88" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id="network-node-glow" x="-180%" y="-180%" width="460%" height="460%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id="network-shimmer-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      <motion.g
        data-micro-paths="true"
        fill="none"
        stroke="url(#micro-network-fade)"
        strokeWidth="1"
        initial={false}
        animate={{ opacity: complete ? 1 : 0.9 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        {MICRO_PATHS.map((path, index) => (
          <path
            key={path}
            d={path}
            strokeDasharray={index % 3 === 0 ? "2 7" : index % 3 === 1 ? "8 9" : undefined}
          />
        ))}
      </motion.g>
      <motion.g
        data-micro-nodes="true"
        fill="#315A53"
        initial={false}
        animate={{ opacity: complete ? 0.16 : 0.11 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        {MICRO_NODES.map((node, index) => (
          <circle key={`${node.x}-${node.y}`} cx={node.x} cy={node.y} r={index % 4 === 0 ? 1.8 : 1.2} />
        ))}
      </motion.g>

      <g fill="none" stroke="url(#base-network-fade)" strokeWidth="1">
        {NETWORK_PATHS.map((path) => (
          <path key={path.id} d={path.d} />
        ))}
        {SECONDARY_PATHS.map((path) => (
          <path key={path} d={path} strokeDasharray="4 7" />
        ))}
      </g>

      {NETWORK_PATHS.map((path) => {
        const active = activated.has(path.owner);
        const preview = hovered === path.owner;

        return (
          <motion.path
            key={`active-${path.id}`}
            data-route-layer="settled"
            data-route-owner={path.owner}
            d={path.d}
            fill="none"
            stroke="url(#active-network-route)"
            strokeWidth={active ? 1.8 : 1.4}
            strokeLinecap="round"
            initial={false}
            animate={{
              opacity: active ? 0.82 : preview ? 0.3 : 0,
              pathLength: active || preview ? 1 : 0,
            }}
            transition={{
              duration: active ? 0.65 : 0.35,
              delay: active ? 0.72 + path.delay : 0,
              ease: EASE,
            }}
          />
        );
      })}

      {NETWORK_PATHS.map((path) => {
        const active = activated.has(path.owner);

        return (
          <motion.path
            key={`shimmer-${path.id}`}
            data-route-layer="shimmer"
            data-route-owner={path.owner}
            d={path.d}
            fill="none"
            stroke="url(#network-shimmer)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeDasharray="54 920"
            filter="url(#network-shimmer-glow)"
            initial={false}
            animate={{
              opacity: active ? [0, 0.82, 0] : 0,
              strokeDashoffset: active ? [80, -920] : 80,
            }}
            transition={{
              duration: 0.92,
              delay: active ? path.delay : 0,
              ease: "easeInOut",
              times: [0, 0.48, 1],
            }}
          />
        );
      })}

      <g fill="#315A53">
        {DECORATIVE_NODES.map((node) => (
          <circle key={`${node.x}-${node.y}`} cx={node.x} cy={node.y} r={node.r} opacity="0.16" />
        ))}
      </g>

      {INTERACTIVE_NODES.map((node) => {
        const frozenHalo = frozenHalos[node.id];
        if (!frozenHalo) return null;

        return (
          <motion.circle
            key={`frozen-halo-${node.id}`}
            data-frozen-halo={node.id}
            cx={node.x}
            cy={node.y}
            fill={node.halo}
            filter="url(#network-node-glow)"
            pointerEvents="none"
            initial={{ opacity: 0.055, r: frozenHalo.captured }}
            animate={{ opacity: 0.03, r: frozenHalo.target }}
            transition={{ duration: 1.35, ease: EASE }}
          />
        );
      })}

      {INTERACTIVE_NODES.map((node) => {
        const active = activated.has(node.id);
        const preview = hovered === node.id;
        const highlighted = active || preview;
        const finalComplete = node.id === 3 && completionArrived;

        return (
          <g
            key={node.id}
            data-interactive-node={node.id}
            role="button"
            tabIndex={0}
            aria-label={`${active ? "Activated" : "Activate"} network node ${node.id + 1}`}
            onMouseEnter={() => onHover(node.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(node.id)}
            onBlur={() => onHover(null)}
            onClick={() => onActivate(node.id, hoverRadii.current[node.id])}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onActivate(node.id);
              }
            }}
            className="pointer-events-none outline-none lg:pointer-events-auto lg:cursor-pointer"
          >
            <circle cx={node.x} cy={node.y} r="28" fill="transparent" />
            {preview && !active ? (
              <motion.circle
                key={`hover-halo-${node.id}`}
                data-node-hover-halo={node.id}
                cx={node.x}
                cy={node.y}
                r="22"
                fill={node.halo}
                filter="url(#network-node-glow)"
                pointerEvents="none"
                initial={{ opacity: 0.055, r: 22 }}
                animate={{ opacity: 0.055, r: 420 }}
                exit={{ opacity: 0.03 }}
                onUpdate={(latest) => {
                  if (typeof latest.r === "number") hoverRadii.current[node.id] = latest.r;
                }}
                transition={{
                  r: { duration: 4.8, ease: "linear" },
                  opacity: { duration: 0.65, ease: EASE },
                }}
              />
            ) : null}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="22"
              fill={finalComplete ? "#276B5F" : node.halo}
              filter="url(#network-node-glow)"
              initial={false}
              animate={{ opacity: active ? 0.08 : 0 }}
              transition={{ duration: 0.35 }}
            />
            {node.shape === "square" ? (
              <motion.rect
                x={node.x - 7}
                y={node.y - 7}
                width="14"
                height="14"
                fill={finalComplete ? "#276B5F" : active ? "#315A53" : "#E0EDE8"}
                stroke={finalComplete ? "#276B5F" : active ? "#315A53" : "#55756F"}
                initial={false}
                animate={{ opacity: highlighted ? 1 : 0.48, scale: highlighted ? 1.12 : 1 }}
                transition={{ delay: active ? 0.72 : 0, duration: 0.35, ease: EASE }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            ) : (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="7"
                fill={finalComplete ? "#276B5F" : active ? "#315A53" : "#E0EDE8"}
                stroke={finalComplete ? "#276B5F" : active ? "#315A53" : "#55756F"}
                strokeWidth="1.2"
                initial={false}
                animate={{ opacity: highlighted ? 1 : 0.48, scale: highlighted ? 1.18 : 1 }}
                transition={{ delay: active ? 0.72 : 0, duration: 0.35, ease: EASE }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function HeroVisualLab() {
  const reduceMotion = useReducedMotion();
  const [activated, setActivated] = useState<Set<number>>(() => new Set());
  const [frozenHalos, setFrozenHalos] = useState<
    Record<number, { captured: number; target: number }>
  >({});
  const [hovered, setHovered] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const complete = activated.size === INTERACTIVE_NODES.length;
  const [showCompletionSweep, setShowCompletionSweep] = useState(false);
  const [completionArrived, setCompletionArrived] = useState(false);

  const activateNode = (id: number, visibleRadius?: number) => {
    if (activated.has(id)) return;

    setHasInteracted(true);
    const capturedRadius = Math.min(420, Math.max(110, visibleRadius ?? 110));
    const targetRadius = capturedRadius < 190 ? 130 : capturedRadius < 310 ? 240 : 360;
    const next = new Set(activated);
    next.add(id);
    setActivated(next);
    setFrozenHalos((current) => ({
      ...current,
      [id]: { captured: capturedRadius, target: targetRadius },
    }));

    if (next.size === INTERACTIVE_NODES.length) {
      setShowCompletionSweep(true);
      window.setTimeout(() => setCompletionArrived(true), 2450);
    }
  };

  const handleHover = (id: number | null) => {
    if (id !== null) setHasInteracted(true);
    setHovered(id);
  };

  return (
    <div className="relative isolate overflow-hidden bg-[#E0EDE8]">
      <AnimatePresence>
        {completionArrived ? (
          <motion.div
            aria-hidden="true"
            data-completion-edge-glow="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[32%] blur-xl"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(49,126,114,0.07) 30%, rgba(39,107,95,0.24) 100%)",
            }}
            initial={{ opacity: 0, scaleX: 0.62, transformOrigin: "right center" }}
            animate={{ opacity: 1, scaleX: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.25, ease: EASE }}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showCompletionSweep ? (
          <motion.div
            aria-hidden="true"
            data-completion-sweep="true"
            className="pointer-events-none absolute -inset-y-[18%] -left-[68%] z-[3] w-[78%] skew-x-[-6deg] blur-2xl"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.56) 50%, rgba(245,232,220,0.2) 68%, transparent 100%)",
            }}
            initial={{ x: "0%", opacity: 0.08 }}
            animate={{ x: "225%", opacity: [0.08, 0.62, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 3.2,
              ease: [0.4, 0, 0.2, 1],
              times: [0, 0.48, 1],
            }}
          />
        ) : null}
      </AnimatePresence>

      <section
        aria-labelledby="hero-lab-title"
        className="relative flex min-h-screen flex-col justify-center px-6 pb-16 pt-24 md:px-10"
      >
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <InteractiveNetwork
            activated={activated}
            frozenHalos={frozenHalos}
            hovered={hovered}
            complete={complete}
            completionArrived={completionArrived}
            onHover={handleHover}
            onActivate={activateNode}
          />
        </div>

        <div className="pointer-events-none relative z-[2] mx-auto grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(440px,1.05fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
            className="pointer-events-auto relative"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#18171A]/50">
              Workflow Design
            </p>
            <h1
              id="hero-lab-title"
              className="mb-5 max-w-[22ch] font-[family-name:var(--font-instrument-serif)] text-[clamp(2rem,5vw,4rem)] italic leading-tight text-[#18171A]"
            >
              Gemini — Digital Twin
            </h1>
            <p className="mb-8 max-w-[48ch] text-base leading-relaxed text-[#18171A]/65">
              Designed a visible approval workflow that clarified ownership, review
              state, and next actions across four engineering roles.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#18171A]/8 px-3 py-1.5 text-sm font-medium text-[#18171A]">
                Launched to 20 FAEs in China
              </span>
              {["Workflow Design", "B2B", "UX Research", "Systems Design"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#18171A]/15 px-3 py-1.5 text-xs text-[#18171A]/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="hidden min-h-[520px] lg:block" aria-hidden="true" />
        </div>

        <AnimatePresence>
          {!hasInteracted ? (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-32 right-10 z-[3] hidden items-center gap-2.5 lg:flex xl:bottom-36 xl:right-[max(2.5rem,calc((100vw-1280px)/2))]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.62, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.45, delay: 1.1, ease: EASE }}
            >
              <motion.span
                className="block h-2.5 w-2.5 rounded-full border border-[#315A53]/75 bg-[#F9F8F5] shadow-[0_0_0_1px_rgba(49,90,83,0.08)]"
                animate={{
                  boxShadow: [
                    "0 0 0 1px rgba(49,90,83,0.18), 0 0 0 0 rgba(49,90,83,0.18)",
                    "0 0 0 1px rgba(49,90,83,0.22), 0 0 0 8px rgba(49,90,83,0.12)",
                    "0 0 0 1px rgba(49,90,83,0.16), 0 0 0 15px rgba(49,90,83,0)",
                  ],
                  scale: [1, 1.12, 1],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#315A53]/80">
                Explore the workflow
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
    </div>
  );
}
