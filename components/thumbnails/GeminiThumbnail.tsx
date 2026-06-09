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

  const pulseDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: [0.4, 1, 0.4],
      transition: {
        pathLength: { type: "spring" as const, duration: 1.2, bounce: 0, delay: 0.1 },
        opacity: {
          delay: 1.3,
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" as const
        }
      }
    }
  };

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
      </defs>
      <rect width="460" height="256" fill="#F2F0EB" />
      <rect width="460" height="256" fill="url(#grid)" />

      {/* Main Connection Path - Horizontal & Asymmetrical */}
      <motion.path
        d={`M80 ${yPos}H380`}
        stroke="#CECAC2"
        strokeWidth="1"
        variants={draw}
      />
      <motion.path
        d={`M80 ${yPos}H220`}
        stroke="#C07B50"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={pulseDraw}
      />

      {/* Node 1: DRAFT */}
      <g>
        <motion.circle 
          cx="80" cy={yPos} r="16" 
          fill="#FFFFFF" 
          stroke="#CECAC2" 
          strokeWidth="1"
          variants={nodeVariants}
          custom={0}
        />
        <motion.path 
          d={`M76 ${yPos-4}H81L84 ${yPos-1}V${yPos+6}H76V${yPos-4}Z`} 
          stroke="#6A6764" 
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
          fill="#9C9A95" 
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
          strokeWidth="1.5"
          variants={nodeVariants}
          custom={1}
        />
        <motion.circle 
          cx="218" cy={yPos-2} r="5" 
          stroke="#C07B50" 
          strokeWidth="1" 
          variants={nodeVariants}
          custom={1}
        />
        <motion.path 
          d={`M222 ${yPos+2}L226 ${yPos+6}`} 
          stroke="#C07B50" 
          strokeWidth="1" 
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
          stroke="#CECAC2" 
          strokeWidth="1"
          variants={nodeVariants}
          custom={2}
        />
        <motion.path 
          d={`M354 ${yPos}L358 ${yPos+4}L366 ${yPos-4}`} 
          stroke="#CECAC2" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          variants={nodeVariants}
          custom={2}
        />
        <motion.text 
          x="360" y={yPos+36} 
          fontFamily="var(--font-geist-mono), monospace" 
          fontSize="9" 
          fontWeight="500" 
          letterSpacing="0.05em" 
          fill="#9C9A95" 
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
