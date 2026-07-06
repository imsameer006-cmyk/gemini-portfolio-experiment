"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type PixelBandVariant = "hero" | "nav";
type PixelBandMode = "locked" | "smart";

interface PixelBandProps {
  variant?: PixelBandVariant;
  mode?: PixelBandMode;
  pad?: number;
  seed?: number;
  lit?: boolean;
  className?: string;
}

const CELL = 12;
const GAP = 3;
const PITCH = CELL + GAP;
const NAV_HEIGHT = 12;
const WORD = "SAMEER GAUTAM";
const LETTER_COLUMNS = 2;
const SPACE_COLUMNS = 5;
const NOISE_OPACITIES = [0.05, 0.07, 0.09, 0.12, 0.15];

const HERO_GLYPH_WIDTH = 7;
const HERO_GLYPH_HEIGHT = 9;
const SMART_NOISE_SCALE = CELL - 1;

const HERO_GLYPHS: Record<string, string[]> = {
  G: [
    "0111110",
    "1000001",
    "1000000",
    "1000000",
    "1001111",
    "1000001",
    "1000001",
    "1000001",
    "0111110",
  ],
  S: [
    "0111110",
    "1000001",
    "1000000",
    "1000000",
    "0111110",
    "0000001",
    "0000001",
    "1000001",
    "0111110",
  ],
  A: [
    "0011100",
    "0100010",
    "1000001",
    "1000001",
    "1111111",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
  ],
  M: [
    "1000001",
    "1100011",
    "1010101",
    "1010101",
    "1001001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
  ],
  E: [
    "1111111",
    "1000000",
    "1000000",
    "1000000",
    "1111110",
    "1000000",
    "1000000",
    "1000000",
    "1111111",
  ],
  R: [
    "1111110",
    "1000001",
    "1000001",
    "1000001",
    "1111110",
    "1010000",
    "1001000",
    "1000100",
    "1000010",
  ],
  T: [
    "1111111",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
  ],
  U: [
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "1000001",
    "0111110",
  ],
};

function mulberry32(seed: number) {
  return function random() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildWordColumns(glyphs: Record<string, string[]>, glyphWidth: number, glyphHeight: number) {
  const columns: boolean[][] = [];
  const letters = WORD.split("");

  letters.forEach((letter, letterIndex) => {
    if (letter === " ") {
      for (let i = 0; i < SPACE_COLUMNS; i += 1) {
        columns.push(Array.from({ length: glyphHeight }, () => false));
      }
      return;
    }

    const glyph = glyphs[letter];

    for (let x = 0; x < glyphWidth; x += 1) {
      columns.push(glyph.map((row) => row[x] === "1"));
    }

    const nextLetter = letters[letterIndex + 1];
    if (nextLetter && nextLetter !== " ") {
      for (let i = 0; i < LETTER_COLUMNS; i += 1) {
        columns.push(Array.from({ length: glyphHeight }, () => false));
      }
    }
  });

  return columns;
}

function shouldKeepSmartNoise(row: number, col: number, seed: number) {
  const hash = Math.imul(row + 1, 73856093) ^ Math.imul(col + 1, 19349663) ^ Math.imul(seed, 83492791);
  return ((hash >>> 0) % 100) >= 45;
}

export default function PixelBand({
  variant = "hero",
  mode = "locked",
  pad,
  seed = 42,
  lit = false,
  className = "",
}: PixelBandProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const requestedPad = pad ?? (variant === "nav" ? 1 : 2);
  const [activePad, setActivePad] = useState(requestedPad);
  const [animate, setAnimate] = useState(false);
  const [resolved, setResolved] = useState(true);
  const [allowsMotion, setAllowsMotion] = useState(false);

  useEffect(() => {
    if (variant !== "hero" || pad !== undefined) return;

    const query = window.matchMedia("(max-width: 479px)");
    const update = () => setActivePad(query.matches ? 1 : requestedPad);
    update();

    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [pad, requestedPad, variant]);

  useEffect(() => {
    if (variant !== "hero") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!motionQuery.matches) return;

    const node = rootRef.current;
    if (!node) return;

    const frame = window.requestAnimationFrame(() => {
      setAnimate(true);
      setResolved(false);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setResolved(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [variant]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setAllowsMotion(motionQuery.matches);
    update();

    motionQuery.addEventListener("change", update);
    return () => motionQuery.removeEventListener("change", update);
  }, []);

  const geometry = useMemo(() => {
    const glyphHeight = HERO_GLYPH_HEIGHT;
    const wordColumns = buildWordColumns(
      HERO_GLYPHS,
      HERO_GLYPH_WIDTH,
      glyphHeight,
    );
    const random = mulberry32(seed);
    const totalCols = wordColumns.length + activePad * 2;
    const totalRows = glyphHeight + activePad * 2;
    const viewWidth = totalCols * PITCH - GAP;
    const viewHeight = totalRows * PITCH - GAP;

    const cells = Array.from({ length: totalRows }, (_, row) =>
      Array.from({ length: totalCols }, (_, col) => {
        const wordCol = col - activePad;
        const wordRow = row - activePad;
        const signal =
          wordCol >= 0 &&
          wordCol < wordColumns.length &&
          wordRow >= 0 &&
          wordRow < glyphHeight &&
          wordColumns[wordCol][wordRow];

        const noiseOpacity = NOISE_OPACITIES[Math.floor(random() * NOISE_OPACITIES.length)];
        const baseOpacity = signal
          ? variant === "nav" ? 0.7 : 0.9
          : variant === "nav"
            ? noiseOpacity / 2
            : noiseOpacity;
        const flowDelay = ((col + row * 0.35) % 8) * 80;
        const delay = signal
          ? 400 + Math.max(wordCol, 0) * 18 + Math.max(wordRow, 0) * 8
          : random() * 180;

        return {
          key: `${row}-${col}`,
          x: col * PITCH,
          y: row * PITCH,
          signal,
          baseOpacity,
          delay,
          flowDelay,
        };
      }),
    ).flat();

    return { cells, viewWidth, viewHeight };
  }, [activePad, seed, variant]);

  const wrapperClass =
    variant === "nav"
      ? "pixel-band pixel-band--nav"
      : "pixel-band pixel-band--hero";
  const isAnimating = animate && variant === "hero";
  const isSmart = mode === "smart";

  return (
    <div
      ref={rootRef}
      className={`${wrapperClass} ${resolved ? "is-resolved" : ""} ${className}`.trim()}
      style={{
        aspectRatio: `${geometry.viewWidth} / ${geometry.viewHeight}`,
        ...(variant === "nav"
          ? {
              width: `${(geometry.viewWidth / geometry.viewHeight) * NAV_HEIGHT}px`,
              height: `${NAV_HEIGHT}px`,
            }
          : undefined),
      }}
    >
      <svg
        role="img"
        aria-label="Sameer Gautam"
        viewBox={`0 0 ${geometry.viewWidth} ${geometry.viewHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {isSmart && (
          <style>
            {`
              /* Base / Idle State (On Page Load) */
              .pixel-noise {
                fill-opacity: 0.06 !important;
                transition: fill-opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1);
              }

              .pixel-text {
                fill-opacity: 0.85 !important;
                transition: fill-opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1), fill 0.3s ease;
              }

              /* Interactive Hover State */
              svg:hover .pixel-text {
                fill-opacity: 1 !important;
              }

              svg:hover .pixel-noise {
                fill-opacity: 0.015 !important;
              }
            `}
          </style>
        )}
        <g fill="currentColor">
          {geometry.cells.map((cell) => {
            if (isSmart && !cell.signal) {
              const [row, col] = cell.key.split("-").map(Number);
              if (!shouldKeepSmartNoise(row, col, seed)) return null;
            }

            const navOpacity = lit
              ? cell.baseOpacity
              : cell.signal
                ? cell.baseOpacity * 0.72
                : cell.baseOpacity * 0.8;
            const opacity = variant === "nav"
              ? navOpacity
              : isAnimating && !resolved
              ? cell.signal ? 0.08 : 0
              : cell.baseOpacity;
            const animationStyle = isAnimating
              ? {
                  transitionProperty: "fill-opacity",
                  transitionDuration: cell.signal ? "600ms" : "400ms",
                  transitionDelay: `${cell.delay.toFixed(0)}ms`,
                  transitionTimingFunction: "var(--ease-out-expo)",
                } as CSSProperties
              : undefined;

            const navStyle = variant === "nav"
              ? {
                  "--pixel-rest-opacity": opacity.toString(),
                  "--pixel-flow-opacity": (Math.min(cell.baseOpacity * 1.7, 0.16)).toString(),
                  ...(lit && allowsMotion && !cell.signal
                    ? {
                        animationName: "pixel-noise-flow",
                        animationDuration: "960ms",
                        animationTimingFunction: "linear",
                        animationIterationCount: "infinite",
                        animationDelay: `${cell.flowDelay.toFixed(0)}ms`,
                      }
                    : undefined),
                  transition: "fill-opacity 200ms ease",
                } as CSSProperties
              : undefined;

            return (
              <rect
                key={cell.key}
                className={
                  isSmart
                    ? cell.signal ? "pixel-text" : "pixel-noise"
                    : [
                        "pixel-band__cell",
                        cell.signal ? "pixel-band__cell--signal" : "pixel-band__cell--noise",
                      ].join(" ")
                }
                x={cell.x}
                y={cell.y}
                width={isSmart && !cell.signal ? SMART_NOISE_SCALE : CELL}
                height={isSmart && !cell.signal ? SMART_NOISE_SCALE : CELL}
                rx={isSmart ? "3" : "2"}
                fillOpacity={isSmart ? undefined : opacity}
                style={isSmart ? undefined : variant === "nav" ? navStyle : animationStyle}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
