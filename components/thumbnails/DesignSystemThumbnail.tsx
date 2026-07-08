"use client";

import { motion } from "framer-motion";
import { REVEAL_VIEWPORT } from "@/lib/motion";

const DRIFT_SWATCHES = [
  { x: 62, y: 96, size: 9, rotate: -8 },
  { x: 92, y: 146, size: 11, rotate: 10 },
  { x: 54, y: 138, size: 8, rotate: 4 },
  { x: 104, y: 108, size: 10, rotate: -6 },
  { x: 76, y: 168, size: 9, rotate: 12 },
] as const;

const RESOLVED_SWATCHES = [
  { x: 224, accent: false },
  { x: 284, accent: false },
  { x: 344, accent: true },
] as const;

const Y = 128;

export default function DesignSystemThumbnail() {
  const driftIn = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: (i: number) => ({
      opacity: 0.45,
      scale: 1,
      transition: { delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  const baseLineDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.3,
      transition: {
        pathLength: { type: "spring" as const, duration: 1.2, bounce: 0, delay: 0.35 },
        opacity: { duration: 0.3 },
      },
    },
  };

  const shimmerVariants = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: [0, 1],
      opacity: [0, 1, 0],
      transition: {
        pathLength: { duration: 3, ease: "easeInOut" as const, repeat: Infinity, delay },
        opacity: { duration: 3, ease: "easeInOut" as const, repeat: Infinity, delay, times: [0, 0.5, 1] as [number, number, number] },
      },
    },
  });

  const resolvedIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.55 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
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
        <pattern id="grid-ds" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E6E3DD" strokeWidth="0.5" opacity="0.4" />
        </pattern>
        <linearGradient id="line-shimmer-ds" x1="150" y1={Y} x2="340" y2={Y} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BFA391" stopOpacity="0" />
          <stop offset="50%" stopColor="#C07B50" stopOpacity="1" />
          <stop offset="100%" stopColor="#BFA391" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="460" height="256" fill="#F9F8F5" />
      <rect width="460" height="256" fill="url(#grid-ds)" />

      {/* Drifted swatches — scattered, low opacity, representing pre-audit color drift */}
      {DRIFT_SWATCHES.map((s, i) => (
        <motion.rect
          key={i}
          x={s.x - s.size / 2}
          y={s.y - s.size / 2}
          width={s.size}
          height={s.size}
          rx={2}
          stroke="#9E7E6B"
          strokeWidth="1"
          transform={`rotate(${s.rotate} ${s.x} ${s.y})`}
          variants={driftIn}
          custom={i}
        />
      ))}

      {/* Connecting path — drift converging into the token chain */}
      <motion.path d={`M150 ${Y}H340`} stroke="#9E7E6B" strokeWidth="1.6" strokeLinecap="round" variants={baseLineDraw} className="group-hover:opacity-60 transition-opacity duration-500" />
      <motion.path d={`M150 ${Y}H340`} stroke="url(#line-shimmer-ds)" strokeWidth="2" strokeLinecap="round" variants={shimmerVariants(0.6)} />
      <motion.path d={`M150 ${Y}H340`} stroke="url(#line-shimmer-ds)" strokeWidth="2" strokeLinecap="round" variants={shimmerVariants(2.1)} />

      {/* Resolved swatches — the tokenized system */}
      {RESOLVED_SWATCHES.map((s, i) => (
        <g key={i}>
          <motion.rect
            x={s.x - 15}
            y={Y - 15}
            width={30}
            height={30}
            rx={6}
            fill="#FFFFFF"
            stroke={s.accent ? "#C07B50" : "#9E7E6B"}
            strokeWidth={s.accent ? 1.6 : 1}
            variants={resolvedIn}
            custom={i}
          />
          {s.accent && (
            <motion.circle cx={s.x} cy={Y} r={4} fill="#C07B50" variants={resolvedIn} custom={i} />
          )}
        </g>
      ))}
    </motion.svg>
  );
}
