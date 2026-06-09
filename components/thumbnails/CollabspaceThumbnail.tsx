"use client";

import { motion } from "framer-motion";

const CENTER = { x: 230, y: 128 };
const SPOKE_LENGTH = 85;

const OUTER_NODES = [
  { x: 315, y: 128, shape: "square"   },
  { x: 273, y: 202, shape: "triangle" },
  { x: 188, y: 202, shape: "hexagon"  },
  { x: 145, y: 128, shape: "diamond"  },
  { x: 188, y: 54,  shape: "pentagon" },
  { x: 273, y: 54,  shape: "circle"   },
] as const;

type Shape = typeof OUTER_NODES[number]["shape"];

function NodeIcon({
  shape, cx, cy, variants, custom,
}: {
  shape: Shape;
  cx: number;
  cy: number;
  variants: Parameters<typeof motion.path>[0]["variants"];
  custom: number;
}) {
  const base = { stroke: "#6A6764", strokeWidth: "1", fill: "none", variants, custom } as const;

  switch (shape) {
    case "square":
      return <motion.path d={`M${cx-4} ${cy-4}H${cx+4}V${cy+4}H${cx-4}Z`} {...base} />;
    case "triangle":
      return <motion.path d={`M${cx} ${cy-5}L${cx+5} ${cy+4}H${cx-5}Z`} strokeLinejoin="round" strokeLinecap="round" {...base} />;
    case "hexagon":
      return <motion.path d={`M${cx} ${cy-5}L${cx+4} ${cy-2.5}L${cx+4} ${cy+2.5}L${cx} ${cy+5}L${cx-4} ${cy+2.5}L${cx-4} ${cy-2.5}Z`} strokeLinejoin="round" {...base} />;
    case "diamond":
      return <motion.path d={`M${cx} ${cy-5}L${cx+5} ${cy}L${cx} ${cy+5}L${cx-5} ${cy}Z`} strokeLinejoin="round" {...base} />;
    case "pentagon":
      return <motion.path d={`M${cx} ${cy-5}L${cx+4.8} ${cy-1.5}L${cx+2.9} ${cy+4}L${cx-2.9} ${cy+4}L${cx-4.8} ${cy-1.5}Z`} strokeLinejoin="round" {...base} />;
    case "circle":
      return <motion.circle cx={cx} cy={cy} r={4} stroke="#6A6764" strokeWidth="1" fill="none" variants={variants} custom={custom} />;
  }
}

export default function CollabspaceThumbnail() {
  const baseLineDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.22,
      transition: {
        pathLength: { type: "spring" as const, duration: 1.2, bounce: 0, delay: 0.1 },
        opacity: { duration: 0.3 },
      },
    },
  };

  const shimmerVariants = {
    hidden: { strokeDashoffset: 18, opacity: 0 },
    visible: (i: number) => ({
      strokeDashoffset: [18, -(SPOKE_LENGTH + 18)],
      opacity: 1,
      transition: {
        strokeDashoffset: {
          duration: 2,
          delay: 0.6 + i * 0.28,
          ease: "linear" as const,
          repeat: Infinity,
        },
        opacity: { duration: 0.3, delay: 0.6 },
      },
    }),
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <motion.svg
      viewBox="0 0 460 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <defs>
        <pattern id="grid-collab" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E6E3DD" strokeWidth="0.5" opacity="0.4" />
        </pattern>
        {/* Radial gradient centred at hub — shimmer goes warm-amber → copper → deep sienna */}
        <radialGradient id="spoke-shimmer" cx="230" cy="128" r="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#F5C88A" stopOpacity="0.9" />
          <stop offset="30%"  stopColor="#E08A58" stopOpacity="1"   />
          <stop offset="60%"  stopColor="#C07B50" stopOpacity="1"   />
          <stop offset="85%"  stopColor="#8A4830" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#5A2810" stopOpacity="0"   />
        </radialGradient>
      </defs>

      <rect width="460" height="256" fill="#F2F0EB" />
      <rect width="460" height="256" fill="url(#grid-collab)" />

      {/* Base spokes — static, low opacity */}
      {OUTER_NODES.map((node, i) => (
        <motion.path
          key={`base-${i}`}
          d={`M${CENTER.x} ${CENTER.y}L${node.x} ${node.y}`}
          stroke="#C07B50"
          strokeWidth="1"
          variants={baseLineDraw}
        />
      ))}

      {/* Shimmer sweeps — gradient dash travelling centre → outer */}
      {OUTER_NODES.map((node, i) => (
        <motion.path
          key={`shimmer-${i}`}
          d={`M${CENTER.x} ${CENTER.y}L${node.x} ${node.y}`}
          stroke="url(#spoke-shimmer)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="18 100"
          variants={shimmerVariants}
          custom={i}
        />
      ))}

      {/* Outer nodes — inactive with distinct shapes */}
      {OUTER_NODES.map((node, i) => (
        <g key={i}>
          <motion.circle
            cx={node.x} cy={node.y} r="16"
            fill="#FFFFFF" stroke="#CECAC2" strokeWidth="1"
            variants={nodeVariants}
            custom={i + 1}
          />
          <NodeIcon
            shape={node.shape}
            cx={node.x} cy={node.y}
            variants={nodeVariants}
            custom={i + 1}
          />
        </g>
      ))}

      {/* Centre node — active */}
      <motion.circle
        cx={CENTER.x} cy={CENTER.y} r="16"
        fill="#FFFFFF" stroke="#C07B50" strokeWidth="1.5"
        variants={nodeVariants}
        custom={0}
      />
      <motion.circle
        cx={CENTER.x} cy={CENTER.y} r="1.5"
        fill="#C07B50"
        variants={nodeVariants}
        custom={0}
      />
    </motion.svg>
  );
}
