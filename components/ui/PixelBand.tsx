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

const NAV_SIGNAL_REST = 0.85;
const NAV_SIGNAL_LIT = 1;
const NAV_QUIET_ZONE_RADIUS = 1;
const NAV_FLOW_PEAK_MULTIPLIER = 2.0;
const NAV_FLOW_PEAK_CAP = 0.13;

function navFlowPeak(rest: number) {
  return Math.min(rest * NAV_FLOW_PEAK_MULTIPLIER, NAV_FLOW_PEAK_CAP);
}

function isNearSignal(
  wordCol: number,
  wordRow: number,
  wordColumns: boolean[][],
  glyphHeight: number,
  radius: number,
) {
  for (let dc = -radius; dc <= radius; dc += 1) {
    for (let dr = -radius; dr <= radius; dr += 1) {
      const c = wordCol + dc;
      const r = wordRow + dr;
      if (c >= 0 && c < wordColumns.length && r >= 0 && r < glyphHeight && wordColumns[c][r]) {
        return true;
      }
    }
  }
  return false;
}

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
  const [canFancyHover, setCanFancyHover] = useState(false);

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
    const fancyHoverQuery = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
    );
    const update = () => setCanFancyHover(fancyHoverQuery.matches);
    update();

    fancyHoverQuery.addEventListener("change", update);
    return () => fancyHoverQuery.removeEventListener("change", update);
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
          ? variant === "nav" ? NAV_SIGNAL_REST : 0.9
          : noiseOpacity;
        const quiet =
          !signal &&
          variant === "nav" &&
          isNearSignal(wordCol, wordRow, wordColumns, glyphHeight, NAV_QUIET_ZONE_RADIUS);
        const flowDelay = ((col + row * 0.35) % 8) * 80;
        const delay = signal
          ? 400 + Math.max(wordCol, 0) * 18 + Math.max(wordRow, 0) * 8
          : random() * 180;

        return {
          key: `${row}-${col}`,
          row,
          col,
          x: col * PITCH,
          y: row * PITCH,
          signal,
          quiet,
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
      data-lit={variant === "nav" && lit && canFancyHover ? "true" : undefined}
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
        <g fill="currentColor">
          {geometry.cells.map((cell) => {
            if (isSmart && !cell.signal && !shouldKeepSmartNoise(cell.row, cell.col, seed)) {
              return null;
            }

            const opacity = variant === "nav"
              ? cell.signal
                ? lit ? NAV_SIGNAL_LIT : NAV_SIGNAL_REST
                : cell.baseOpacity
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
              ? ({
                  transition: "fill-opacity 200ms ease",
                  ...(cell.signal
                    ? undefined
                    : {
                        "--pixel-rest-opacity": cell.baseOpacity.toString(),
                        "--pixel-flow-opacity": navFlowPeak(cell.baseOpacity).toString(),
                        ...(lit && canFancyHover && !cell.quiet
                          ? {
                              animationName: "pixel-noise-flow",
                              animationDuration: "960ms",
                              animationTimingFunction: "linear",
                              animationIterationCount: "infinite",
                              animationDelay: `${cell.flowDelay.toFixed(0)}ms`,
                            }
                          : undefined),
                      }),
                } as CSSProperties)
              : undefined;

            return (
              <rect
                key={cell.key}
                className={[
                  "pixel-band__cell",
                  cell.signal ? "pixel-band__cell--signal" : "pixel-band__cell--noise",
                ].join(" ")}
                x={cell.x}
                y={cell.y}
                width={isSmart && !cell.signal ? SMART_NOISE_SCALE : CELL}
                height={isSmart && !cell.signal ? SMART_NOISE_SCALE : CELL}
                rx={isSmart ? "3" : "2"}
                fillOpacity={opacity}
                style={variant === "nav" ? navStyle : animationStyle}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
