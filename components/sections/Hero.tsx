"use client";

import { ArrowDown, DownloadSimple, MapPin } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const SIGNALS = [
  { value: "Research", label: "Evidence-Led" },
  { value: "Strategy", label: "Outcome-Focused" },
  { value: "Systems", label: "Creating Clarity" },
  { value: "Craft", label: "Execution Excellence" },
];

type ClarityThreadVisualProps = {
  hoverSuppressed: boolean;
  isOpen: boolean;
  onNodeEnter: () => void;
  onNodeUnlock: () => void;
};

function ClarityThreadVisual({
  hoverSuppressed,
  isOpen,
  onNodeEnter,
  onNodeUnlock,
}: ClarityThreadVisualProps) {
  const [nodeReady, setNodeReady] = useState(false);

  useEffect(() => {
    // primary thread finishes at 1.05s delay + 2.7s duration = 3.75s
    const t = setTimeout(() => setNodeReady(true), 3800);
    return () => clearTimeout(t);
  }, []);

  const complexityPaths = [
    "M307 258C251 177 120 194 91 271C58 360 176 428 259 383C351 333 317 184 207 179C96 174 64 309 144 374C235 448 352 363 321 250C291 137 119 131 76 248C34 363 171 462 275 407C380 352 370 190 255 151C138 111 39 234 83 347C128 463 309 457 353 334C395 218 273 102 153 149C43 192 23 343 127 417C231 492 398 409 381 275C364 137 195 78 93 172C-8 265 33 441 165 472C298 504 424 391 383 254C343 119 166 70 66 188",
    "M329 260C268 211 171 215 123 272C68 337 105 427 195 431C293 435 359 342 318 250C276 156 146 141 82 223C17 306 56 421 161 456C269 492 382 408 377 294C371 171 238 88 123 142C6 197-17 354 75 442C168 531 337 522 405 405C474 286 400 132 272 103",
    "M312 263C232 244 149 277 129 344C105 422 186 474 262 441C350 403 366 292 303 228C241 164 126 178 80 259C31 344 74 446 171 475C276 506 397 430 398 315C399 204 302 100 190 121C78 143 19 263 58 370C98 482 241 532 343 472",
    "M317 258C245 304 130 293 83 220C30 139 87 48 194 69C299 90 360 207 310 294C259 384 126 391 58 312C-9 235 15 113 105 58C195 4 329 33 388 130C448 229 414 369 310 427",
    "M306 259C224 201 116 226 87 311C59 394 132 469 227 459C325 449 389 350 354 253C319 158 205 113 116 158C27 204 1 324 62 407C124 491 253 512 347 451",
    "M312 259C252 322 142 337 73 270C2 201 27 87 125 53C224 18 337 82 361 184C386 288 318 392 213 411C109 430 15 355 8 250",
  ];

  const corePaths = [
    "M306 259C250 236 188 242 158 281C124 325 151 382 209 383C274 384 321 330 303 269C285 209 208 186 156 224C104 262 102 340 153 381C206 423 292 404 325 342C360 277 318 199 251 178C183 157 109 199 99 270",
    "M309 259C246 279 170 260 144 202C115 138 165 79 238 93C313 108 361 182 344 255C326 329 254 381 181 366C108 351 59 282 72 210",
  ];

  const primaryThreadPath =
    "M94 274C133 219 215 304 286 242C334 201 250 150 188 206C125 264 207 343 293 292C351 257 335 210 291 234C247 259 285 303 338 275C353 268 363 262 370 260C392 260 414 260 436 260L1600 260";

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute right-[max(2.5rem,calc((100vw-1280px)/2+0.5rem))] top-[24%] z-20 hidden h-[320px] w-[min(31vw,440px)] lg:block"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 720 520"
        fill="none"
        className="h-full w-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.g
          stroke="#18171A"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.28, pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.5, ease: [0.42, 0, 0.18, 1] }}
          transform="translate(-56 0) scale(0.88 1)"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          {complexityPaths.map((path) => (
            <motion.path key={path} d={path} strokeWidth="1.25" />
          ))}
        </motion.g>

        <motion.g
          stroke="#18171A"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.2, pathLength: 1 }}
          transition={{ duration: 2, delay: 0.75, ease: [0.42, 0, 0.18, 1] }}
          transform="translate(-56 0) scale(0.88 1)"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          {corePaths.map((path) => (
            <motion.path key={path} d={path} strokeWidth="0.95" />
          ))}
        </motion.g>

        <motion.path
          d={primaryThreadPath}
          stroke="#18171A"
          strokeLinecap="round"
          strokeWidth="1.45"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.5, pathLength: 1 }}
          transition={{ duration: 2.7, delay: 1.05, ease: [0.42, 0, 0.18, 1] }}
        />
      </svg>
      <button
        type="button"
        aria-label="Reveal design philosophy"
        aria-expanded={isOpen}
        onClick={() => {
          if (!hoverSuppressed) {
            onNodeEnter();
          }
        }}
        onFocus={() => {
          if (!hoverSuppressed) {
            onNodeEnter();
          }
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse" && !hoverSuppressed) {
            onNodeEnter();
          }
        }}
        onPointerLeave={onNodeUnlock}
        className="pointer-events-auto absolute left-[56%] top-1/2 flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none items-center justify-center border-0 bg-transparent p-0 text-[54px] font-bold leading-none text-[#0A0A0A] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C07B50]"
      >
        {nodeReady && (
        <motion.svg
          aria-hidden="true"
          viewBox="-44 -44 88 88"
          className="h-[44%] w-[44%] origin-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: [1, 0.45, 1],
            rotate: 360,
            scale: 1,
          }}
          transition={{
            opacity: {
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.5, 1],
            },
            rotate: {
              duration: 6,
              ease: "linear",
              repeat: Infinity,
            },
            scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <g stroke="currentColor" strokeLinecap="round" strokeWidth="8">
            <line x1="0" y1="-26" x2="0" y2="26" />
            <line x1="-22.5" y1="-13" x2="22.5" y2="13" />
            <line x1="-22.5" y1="13" x2="22.5" y2="-13" />
          </g>
        </motion.svg>
        )}
      </button>
    </motion.div>
  );
}

function PhilosophyOverlay({ isOpen, onComplete }: { isOpen: boolean; onComplete: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen) {
      overlayRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const overlay = overlayRef.current;
    const canvas = canvasRef.current;

    if (!overlay || !canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let cancelled = false;
    const text = "Building clarity out of complexity.";
    const color = "#EFEFEF";
    const rootStyles = getComputedStyle(document.documentElement);
    const displayFamily =
      rootStyles.getPropertyValue("--font-instrument-serif").trim() ||
      "Georgia, Times New Roman, serif";

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
      });

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeInQuart = (t: number) => t * t * t * t;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animLoop = (duration: number, draw: (progress: number) => void) =>
      new Promise<void>((resolve) => {
        const start = performance.now();

        const frame = (now: number) => {
          if (cancelled) {
            resolve();
            return;
          }

          const progress = Math.min((now - start) / duration, 1);
          draw(progress);

          if (progress < 1) {
            window.requestAnimationFrame(frame);
          } else {
            resolve();
          }
        };

        window.requestAnimationFrame(frame);
      });

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      return { width, height };
    };

    const buildGrid = (width: number, height: number) => {
      const spacing = 30;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;
      const jitter = 11;

      return Array.from({ length: rows * cols }, (_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const targetX = offsetX + col * spacing;
        const targetY = offsetY + row * spacing;

        return {
          sourceX: targetX + (Math.random() - 0.5) * jitter * 2,
          sourceY: targetY + (Math.random() - 0.5) * jitter * 2,
          targetX,
          targetY,
        };
      });
    };

    const drawGrid = (
      dots: ReturnType<typeof buildGrid>,
      progress: number,
      masterAlpha: number,
      width: number,
      height: number,
    ) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDistance = Math.hypot(width, height) * 0.55;

      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";

      dots.forEach((dot) => {
        const x = lerp(dot.sourceX, dot.targetX, progress);
        const y = lerp(dot.sourceY, dot.targetY, progress);
        const distance = Math.hypot(dot.targetX - centerX, dot.targetY - centerY);
        const falloff = Math.pow(1 - Math.min(distance / maxDistance, 1), 1.5);
        const alpha = lerp(0.03, 0.1, falloff) * masterAlpha;
        const radius = lerp(0.8, 1.4, falloff);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239,239,239,${alpha.toFixed(3)})`;
        ctx.fill();
      });
    };

    const drawLine = (x: number, y: number, width: number, height: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = "rgba(255,255,255,0.9)";
      ctx.shadowBlur = 18;
      ctx.fillStyle = color;

      if (typeof ctx.roundRect === "function") {
        ctx.beginPath();
        ctx.roundRect(x, y - height / 2, width, height, height / 2);
        ctx.fill();
      } else {
        ctx.fillRect(x, y - height / 2, width, height);
      }

      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(255,255,255,0.5)";
      ctx.fill();
      ctx.restore();
    };

    const run = async () => {
      const { width, height } = setupCanvas();
      const centerX = width / 2;
      const centerY = height / 2;
      const dots = buildGrid(width, height);
      const fontSize = shouldReduceMotion ? 42 : Math.min(Math.max(width * 0.032, 36), 58);
      const font = `italic 400 ${fontSize}px ${displayFamily}`;

      ctx.font = font;
      ctx.textBaseline = "middle";

      const chars = text.split("");
      const totalWidth = chars.reduce((sum, char) => sum + ctx.measureText(char).width, 0);
      let glyphX = centerX - totalWidth / 2;
      const glyphs = chars.map((char) => {
        const width = ctx.measureText(char).width;
        const glyph = { char, x: glyphX, width };
        glyphX += width;

        return glyph;
      });

      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "auto";

      if (shouldReduceMotion) {
        overlay.style.opacity = "1";
        ctx.clearRect(0, 0, width, height);
        drawGrid(dots, 1, 0.7, width, height);
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.textAlign = "center";
        ctx.fillText(text, centerX, centerY);
        await wait(1600);

        if (!cancelled) {
          onComplete();
        }

        return;
      }

      await animLoop(380, (progress) => {
        const eased = easeOutCubic(progress);
        overlay.style.opacity = eased.toFixed(4);
        ctx.clearRect(0, 0, width, height);
        drawGrid(dots, Math.min(eased * 1.6, 1), eased, width, height);
      });

      ctx.clearRect(0, 0, width, height);
      drawGrid(dots, 1, 1, width, height);
      await wait(60);

      const stagger = 20;
      const enterDuration = 320;
      const fullEnterDuration = (chars.length - 1) * stagger + enterDuration;

      await new Promise<void>((resolve) => {
        const start = performance.now();

        const frame = (now: number) => {
          if (cancelled) {
            resolve();
            return;
          }

          const elapsed = now - start;
          ctx.clearRect(0, 0, width, height);
          drawGrid(dots, 1, 1, width, height);

          glyphs.forEach((glyph, index) => {
            const local = elapsed - index * stagger;
            const progress = local <= 0 ? 0 : Math.min(local / enterDuration, 1);
            const eased = easeOutCubic(progress);

            ctx.save();
            ctx.globalAlpha = eased;
            ctx.shadowBlur = 0;
            ctx.fillStyle = color;
            ctx.font = font;
            ctx.textBaseline = "middle";
            ctx.fillText(glyph.char, glyph.x, centerY + lerp(10, 0, eased));
            ctx.restore();
          });

          if (elapsed < fullEnterDuration) {
            window.requestAnimationFrame(frame);
          } else {
            resolve();
          }
        };

        window.requestAnimationFrame(frame);
      });

      await wait(600);

      const lineHeight = 5;

      await animLoop(700, (progress) => {
        const eased = easeInOutCubic(progress);
        ctx.clearRect(0, 0, width, height);
        drawGrid(dots, 1, 1, width, height);

        glyphs.forEach((glyph) => {
          ctx.save();
          ctx.translate(glyph.x + glyph.width / 2, centerY);
          ctx.scale(1, lerp(1, 0, eased));
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
          ctx.fillStyle = color;
          ctx.font = font;
          ctx.textBaseline = "middle";
          ctx.fillText(glyph.char, -glyph.width / 2, 0);
          ctx.restore();
        });

        if (progress > 0.55) {
          const lineProgress = (progress - 0.55) / 0.45;
          const lineEased = easeOutCubic(lineProgress);
          drawLine(
            centerX - (totalWidth / 2) * lineEased,
            centerY,
            totalWidth * lineEased,
            lineHeight,
            lineProgress,
          );
        }
      });

      await wait(320);

      const lineStartX = centerX - totalWidth / 2;

      await animLoop(500, (progress) => {
        const eased = easeInQuart(progress);
        const deltaX = width * 1.6 * eased;
        const alpha = progress < 0.7 ? 1 : lerp(1, 0, (progress - 0.7) / 0.3);

        ctx.clearRect(0, 0, width, height);
        drawGrid(dots, 1, 1, width, height);
        drawLine(lineStartX + deltaX, centerY, totalWidth, lineHeight, alpha);
      });

      ctx.clearRect(0, 0, width, height);
      await wait(420);

      await animLoop(400, (progress) => {
        const fadeOut = 1 - easeOutCubic(progress);
        overlay.style.opacity = fadeOut.toFixed(4);
        ctx.clearRect(0, 0, width, height);
        drawGrid(dots, 1, fadeOut, width, height);
      });

      if (!cancelled) {
        onComplete();
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [isOpen, onComplete, shouldReduceMotion]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onComplete();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Design philosophy"
      tabIndex={-1}
      className="fixed inset-0 z-[80] overflow-hidden bg-[#080808] opacity-0 outline-none"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <p className="sr-only">Building clarity out of complexity.</p>
    </div>
  );
}

function SignalPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
      className="mt-9 grid max-w-[660px] grid-cols-2 border-y border-[#E6E3DD] sm:grid-cols-4 md:mt-10"
      aria-label="Portfolio focus areas"
      role="list"
    >
      {SIGNALS.map((signal, index) => (
        <div
          key={signal.label}
          className={[
            "relative px-3 py-3 text-center",
            index === 0 || index === 1 ? "border-b border-[#CECAC2] sm:border-b-0" : "",
            index === 0 || index === 2 ? "after:absolute after:right-0 after:top-1/2 after:h-8 after:w-px after:-translate-y-1/2 after:bg-[rgba(206,202,194,0.58)] after:content-['']" : "",
            index === 1 ? "sm:after:absolute sm:after:right-0 sm:after:top-1/2 sm:after:h-8 sm:after:w-px sm:after:-translate-y-1/2 sm:after:bg-[rgba(206,202,194,0.58)] sm:after:content-['']" : "",
          ].join(" ")}
          role="listitem"
        >
          <div className="font-display text-lg italic leading-none text-[#18171A] md:text-xl">
            {signal.value}
          </div>
          <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.08em] text-[#9C9A95] md:text-[10px]">
            {signal.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const [hoverSuppressed, setHoverSuppressed] = useState(false);
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);
  const unlockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  const openPhilosophy = () => {
    if (isPhilosophyOpen) {
      return;
    }

    if (unlockTimeoutRef.current) {
      clearTimeout(unlockTimeoutRef.current);
    }

    setIsPhilosophyOpen(true);
  };

  const closePhilosophy = () => {
    setHoverSuppressed(true);
    setIsPhilosophyOpen(false);

    unlockTimeoutRef.current = setTimeout(() => {
      setHoverSuppressed(false);
    }, 650);
  };

  useEffect(() => {
    return () => {
      if (unlockTimeoutRef.current) {
        clearTimeout(unlockTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      aria-label="Introduction"
      className="relative min-h-[82svh] overflow-hidden px-6 pb-10 pt-14 md:min-h-[80svh] md:px-10 md:pb-12 md:pt-[4.5rem]"
    >
      <ClarityThreadVisual
        hoverSuppressed={hoverSuppressed}
        isOpen={isPhilosophyOpen}
        onNodeEnter={openPhilosophy}
        onNodeUnlock={() => setHoverSuppressed(false)}
      />
      <PhilosophyOverlay
        isOpen={isPhilosophyOpen}
        onComplete={closePhilosophy}
      />

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #E6E3DD 1px, transparent 0)`,
          backgroundSize: "32px 32px",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 mx-auto min-h-[calc(82svh-6rem)] w-full max-w-[1280px] pt-3 md:min-h-[calc(80svh-7.5rem)] md:pt-0">
        <div className="max-w-[840px]">
          <motion.div
            {...FADE_UP}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#BFD9CB]/70 bg-[#EDF7F1]/90 px-3 py-1.5 text-xs font-medium text-[#6A6764]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#3A7A54]" />
            <span>Available for product design roles</span>
            <span className="text-[#A7A39B]" aria-hidden="true">
              /
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} weight="fill" aria-hidden="true" />
              Munich, Germany
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mb-4 max-w-[16ch] text-[clamp(3rem,8vw,7rem)] italic leading-[1.05] text-[#18171A]"
          >
            Building clarity{" "}
            <span className="not-italic">out of</span>{" "}
            complexity.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 max-w-[58ch] text-base leading-relaxed text-[#6A6764] md:whitespace-nowrap md:text-lg"
          >
            I design products that work for people and perform for business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={scrollToWork}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#18171A] px-5 py-3 text-sm font-medium text-[#F9F8F5] transition-colors duration-200 hover:bg-[#C07B50]"
            >
              View work
              <ArrowDown size={14} weight="bold" aria-hidden="true" />
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#E6E3DD] px-5 py-3 text-sm font-medium text-[#6A6764] transition-all duration-200 hover:border-[#C07B50] hover:text-[#18171A]"
            >
              Resume
              <DownloadSimple size={14} weight="bold" aria-hidden="true" />
            </a>
          </motion.div>

          <SignalPanel />
        </div>

      </div>

      {/* Decorative accent line at bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-6 md:left-10 right-6 md:right-10 h-px bg-[#E6E3DD] origin-left"
      />
    </section>
  );
}
