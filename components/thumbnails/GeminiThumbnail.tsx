"use client";

import { motion } from "framer-motion";

export default function GeminiThumbnail() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring" as const, duration: 1.2, bounce: 0, delay: 0.1 },
        opacity: { duration: 0.2 }
      }
    }
  };

  const baseLineDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.3,
      transition: {
        pathLength: { type: "spring" as const, duration: 1.2, bounce: 0, delay: 0.1 },
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
        pathLength: { duration: 3, ease: "easeInOut", repeat: Infinity, delay },
        opacity: { duration: 3, ease: "easeInOut", repeat: Infinity, delay, times: [0, 0.5, 1] },
      }
    }
  });

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.12,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    })
  };

  const labelVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.5 + i * 0.12,
        duration: 0.6
      }
    })
  };

  const yPos = 145;

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
      {/* Subtle grid background */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E6E3DD" strokeWidth="0.5" opacity="0.4" />
        </pattern>
        <linearGradient id="line-shimmer" x1="80" y1="145" x2="220" y2="145" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#BFA391" stopOpacity="0" />
          <stop offset="50%"  stopColor="#C07B50" stopOpacity="1"   />
          <stop offset="100%" stopColor="#BFA391" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="460" height="256" fill="#F9F8F5" />
      <rect width="460" height="256" fill="url(#grid)" />

      {/* Main Connection Path - Horizontal & Asymmetrical */}
      <motion.path
        d={`M80 ${yPos}H380`}
        stroke="#9E7E6B"
        strokeWidth="1"
        opacity="0.22"
        variants={draw}
      />
      <motion.path
        d={`M80 ${yPos}H220`}
        stroke="#C07B50"
        strokeWidth="1.6"
        strokeLinecap="round"
        variants={baseLineDraw}
        className="group-hover:opacity-60 transition-opacity duration-500"
      />

      {/* Overlapping Shimmer Paths for "River" Flow */}
      <motion.path
        d={`M80 ${yPos}H220`}
        stroke="url(#line-shimmer)"
        strokeWidth="2.0"
        strokeLinecap="round"
        variants={shimmerVariants(0.6)}
      />
      <motion.path
        d={`M80 ${yPos}H220`}
        stroke="url(#line-shimmer)"
        strokeWidth="2.0"
        strokeLinecap="round"
        variants={shimmerVariants(2.1)}
      />

      {/* Node 1: DRAFT */}
      <g>
        <motion.circle 
          cx="80" cy={yPos} r="16" 
          fill="#FFFFFF" 
          stroke="#C07B50" 
          strokeWidth="1.2"
          variants={nodeVariants}
          custom={0}
        />
        <motion.path 
          d={`M76 ${yPos-4}H81L84 ${yPos-1}V${yPos+6}H76V${yPos-4}Z`} 
          stroke="#C07B50" 
          strokeWidth="1" 
          variants={nodeVariants}
          custom={0}
        />
        <motion.text 
          x="80" y={yPos+36} 
          fontFamily="var(--font-geist-mono), monospace" 
          fontSize="9" 
          fontWeight="500" 
          letterSpacing="0.05em" 
          fill="#C07B50" 
          opacity="0.85"
          textAnchor="middle"
          variants={labelVariants}
          custom={0}
        >
          DRAFT
        </motion.text>
      </g>

      {/* Node 2: PRE-CHECK */}
      <g>
        <motion.circle 
          cx="220" cy={yPos} r="16" 
          fill="#FFFFFF" 
          stroke="#C07B50" 
          strokeWidth="1.6"
          variants={nodeVariants}
          custom={1}
        />
        <motion.circle 
          cx="218" cy={yPos-2} r="5" 
          stroke="#C07B50" 
          strokeWidth="1.2" 
          variants={nodeVariants}
          custom={1}
        />
        <motion.path 
          d={`M222 ${yPos+2}L226 ${yPos+6}`} 
          stroke="#C07B50" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          variants={nodeVariants}
          custom={1}
        />
        <motion.text 
          x="220" y={yPos+36} 
          fontFamily="var(--font-geist-mono), monospace" 
          fontSize="9" 
          fontWeight="500" 
          letterSpacing="0.05em" 
          fill="#C07B50" 
          textAnchor="middle"
          variants={labelVariants}
          custom={1}
        >
          PRE-CHECK
        </motion.text>
      </g>

      {/* Node 3: FEASIBILITY */}
      <g>
        <motion.circle 
          cx="360" cy={yPos} r="16" 
          fill="#FFFFFF" 
          stroke="#9E7E6B" 
          strokeWidth="1"
          opacity="0.45"
          variants={nodeVariants}
          custom={2}
        />
        <motion.path 
          d={`M354 ${yPos}L358 ${yPos+4}L366 ${yPos-4}`} 
          stroke="#9E7E6B" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          opacity="0.6"
          variants={nodeVariants}
          custom={2}
        />
        <motion.text 
          x="360" y={yPos+36} 
          fontFamily="var(--font-geist-mono), monospace" 
          fontSize="9" 
          fontWeight="500" 
          letterSpacing="0.05em" 
          fill="#9E7E6B" 
          opacity="0.45"
          textAnchor="middle"
          variants={labelVariants}
          custom={2}
        >
          FEASIBILITY
        </motion.text>
      </g>
    </motion.svg>
  );
}
