"use client";

import { motion } from "framer-motion";
import { REVEAL_VIEWPORT } from "@/lib/motion";

const CENTER = { x: 230, y: 128 };

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
  const base = { stroke: "#9E7E6B", strokeWidth: "1", fill: "none", variants, custom } as const;

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
      return <motion.circle cx={cx} cy={cy} r={4} stroke="#9E7E6B" strokeWidth="1" fill="none" variants={variants} custom={custom} />;
  }
}

export default function CollabspaceThumbnail() {
  const baseLineDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.38,
      transition: {
        pathLength: { type: "spring" as const, duration: 1.2, bounce: 0, delay: 0.1 },
        opacity: { duration: 0.3 },
      },
    },
  };

  const shimmerVariants = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: [0, 1],
      opacity: [0, 1, 0],
      transition: {
        pathLength: { duration: 3.5, ease: "easeInOut" as const, repeat: Infinity, delay: delay + i * 0.4 },
        opacity:    { duration: 3.5, ease: "easeInOut" as const, repeat: Infinity, delay: delay + i * 0.4, times: [0, 0.5, 1] as [number, number, number] },
      },
    }),
  });

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
      viewport={REVEAL_VIEWPORT}
    >
      <defs>
        <pattern id="grid-collab" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E6E3DD" strokeWidth="0.5" opacity="0.4" />
        </pattern>
        <radialGradient id="spoke-shimmer" cx="230" cy="128" r="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#BFA391" stopOpacity="0" />
          <stop offset="50%"  stopColor="#C07B50" stopOpacity="1"   />
          <stop offset="100%" stopColor="#BFA391" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="460" height="256" fill="#F9F8F5" />
      <rect width="460" height="256" fill="url(#grid-collab)" />

      {/* Base spokes — static, low opacity */}
      {OUTER_NODES.map((node, i) => (
        <motion.path
          key={`base-${i}`}
          d={`M${CENTER.x} ${CENTER.y}L${node.x} ${node.y}`}
          stroke="#C07B50"
          strokeWidth="1.6"
          variants={baseLineDraw}
          className="group-hover:opacity-60 transition-opacity duration-500"
        />
      ))}

      {/* Overlapping Shimmer sweeps for "River" Flow */}
      {OUTER_NODES.map((node, i) => (
        <g key={`shimmer-group-${i}`}>
          <motion.path
            d={`M${CENTER.x} ${CENTER.y}L${node.x} ${node.y}`}
            stroke="url(#spoke-shimmer)"
            strokeWidth="1.8"
            strokeLinecap="round"
            variants={shimmerVariants(0.6)}
            custom={i}
          />
          <motion.path
            d={`M${CENTER.x} ${CENTER.y}L${node.x} ${node.y}`}
            stroke="url(#spoke-shimmer)"
            strokeWidth="1.8"
            strokeLinecap="round"
            variants={shimmerVariants(2.35)}
            custom={i}
          />
        </g>
      ))}

      {/* Outer nodes — inactive with distinct shapes */}
      {OUTER_NODES.map((node, i) => (
        <g key={i}>
          <motion.circle
            cx={node.x} cy={node.y} r={16}
            fill="#FFFFFF" stroke="#9E7E6B" strokeWidth="1"
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
        cx={CENTER.x} cy={CENTER.y} r={16}
        fill="#FFFFFF" stroke="#C07B50" strokeWidth="1.6"
        variants={nodeVariants}
        custom={0}
      />
      <motion.circle
        cx={CENTER.x} cy={CENTER.y} r={1.5}
        fill="#C07B50"
        variants={nodeVariants}
        custom={0}
      />

    </motion.svg>
  );
}
