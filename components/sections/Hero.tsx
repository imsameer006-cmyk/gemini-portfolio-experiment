"use client";

import { ArrowDown, DownloadSimple, MapPin } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

type Origin = {
  x: number;
  y: number;
};

type ClarityThreadVisualProps = {
  hoverSuppressed: boolean;
  isOpen: boolean;
  onNodeBlur: () => void;
  onNodeEnter: (origin: Origin) => void;
  onNodeUnlock: () => void;
};

function getElementCenter(element: HTMLElement): Origin {
  const rect = element.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function ClarityThreadVisual({
  hoverSuppressed,
  isOpen,
  onNodeBlur,
  onNodeEnter,
  onNodeUnlock,
}: ClarityThreadVisualProps) {
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
    "M94 274C133 219 215 304 286 242C334 201 250 150 188 206C125 264 207 343 293 292C351 257 335 210 291 234C247 259 285 303 338 275C353 268 363 262 370 260C399 260 395 205 423 208C455 212 428 292 481 298C525 303 508 260 552 265C605 271 658 268 700 260";

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

        <motion.path
          d="M370 238C370.3 252 370.3 268 370 282"
          stroke="#C07B50"
          strokeLinecap="round"
          strokeWidth="5"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.72, pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.15, ease: [0.42, 0, 0.18, 1] }}
        />

        <motion.g
          initial={{ opacity: 0, scale: 0.82, rotate: -18 }}
          animate={{ opacity: 0.82, scale: 1, rotate: 342 }}
          transition={{
            opacity: { duration: 0.7, delay: 1.55, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.7, delay: 1.55, ease: [0.16, 1, 0.3, 1] },
            rotate: { duration: 8, delay: 1.55, ease: "linear", repeat: Infinity },
          }}
          style={{ transformOrigin: "370px 260px" }}
        >
          <g transform="translate(370 260)">
            <circle r="15" fill="#C07B50" stroke="#F9F8F5" strokeWidth="1.8" />
            {Array.from({ length: 4 }).map((_, i) => (
              <rect
                key={i}
                x="-2.2"
                y="-10.2"
                width="4.4"
                height="9.6"
                rx="0.6"
                fill="#F9F8F5"
                transform={`rotate(${i * 90})`}
              />
            ))}
            <circle r="3.2" fill="#F9F8F5" />
          </g>
        </motion.g>
      </svg>
      <button
        type="button"
        aria-label="Reveal design philosophy"
        aria-expanded={isOpen}
        onBlur={onNodeBlur}
        onClick={(event) => {
          if (!hoverSuppressed) {
            onNodeEnter(getElementCenter(event.currentTarget));
          }
        }}
        onFocus={(event) => {
          if (!hoverSuppressed) {
            onNodeEnter(getElementCenter(event.currentTarget));
          }
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse" && !hoverSuppressed) {
            onNodeEnter(getElementCenter(event.currentTarget));
          }
        }}
        onPointerLeave={onNodeUnlock}
        className="pointer-events-auto absolute left-[51.4%] top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C07B50]"
      >
        <span className="sr-only">Reveal design philosophy</span>
      </button>
    </motion.div>
  );
}

function PhilosophyOverlay({
  isOpen,
  onClose,
  origin,
}: {
  isOpen: boolean;
  onClose: () => void;
  origin: Origin;
}) {
  const shouldReduceMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const originPoint = `${origin.x}px ${origin.y}px`;

  useEffect(() => {
    if (isOpen) {
      overlayRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeTimer = setTimeout(onClose, shouldReduceMotion ? 1800 : 5200);

    return () => {
      clearTimeout(closeTimer);
    };
  }, [isOpen, onClose, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Design philosophy"
          tabIndex={-1}
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[#141310] px-6 text-center md:px-10"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { clipPath: `circle(0px at ${originPoint})`, opacity: 0 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { clipPath: `circle(150vmax at ${originPoint})`, opacity: 1 }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { clipPath: `circle(0px at ${originPoint})`, opacity: 0 }
          }
          transition={{ duration: shouldReduceMotion ? 0.18 : 1.15, ease: [0.16, 1, 0.3, 1] }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              onClose();
            }
          }}
          onClick={onClose}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") {
              onClose();
            }
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,248,245,0.10),transparent_45%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(237,235,227,0.08)_1px,transparent_0)] bg-[length:34px_34px] opacity-60"
          />

          <motion.div
            className="relative flex min-h-[44vh] w-full max-w-[980px] items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <motion.p
              className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2.5rem,7vw,6rem)] italic leading-[1.04] text-[#F9F8F5]"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 14 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: [0, 1, 1, 0],
                      scale: [0.96, 1, 1, 1],
                      x: [0, 0, 0, 180],
                      y: [14, 0, 0, 0],
                      filter: [
                        "blur(8px)",
                        "blur(0px)",
                        "blur(0px)",
                        "blur(3px)",
                      ],
                    }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0, transition: { duration: 0.18 } }
                  : {
                      opacity: 0,
                      scale: 0.94,
                      y: 14,
                      filter: "blur(8px)",
                      transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.18 }
                  : {
                      duration: 3.3,
                      times: [0, 0.22, 0.68, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }
              }
            >
              Design is the art of turning complexity into clarity.
            </motion.p>

            <motion.div
              aria-hidden="true"
              className="absolute h-1.5 w-[min(46vw,460px)] origin-left rounded-full bg-[#F9F8F5]"
              initial={{ opacity: 0, scaleX: 0, x: 0 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: [0, 0, 1, 1, 0],
                      scaleX: [0, 0, 1, 1, 1],
                      x: [0, 0, 0, 0, 180],
                    }
              }
              exit={{
                opacity: 0,
                x: 180,
                transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.01 }
                  : {
                      duration: 4.1,
                      times: [0, 0.48, 0.62, 0.84, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }
              }
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
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
  const [overlayOrigin, setOverlayOrigin] = useState<Origin>({ x: 0, y: 0 });
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  const openPhilosophy = (origin: Origin) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    setOverlayOrigin(origin);
    setIsPhilosophyOpen(true);
  };

  const closePhilosophy = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    setHoverSuppressed(true);
    setIsPhilosophyOpen(false);
  };

  const closePhilosophySoon = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsPhilosophyOpen(false);
    }, 120);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePhilosophy();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isPhilosophyOpen) {
      return;
    }

    const handleDismissKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePhilosophy();
      }
    };

    document.addEventListener("keydown", handleDismissKey, true);

    return () => {
      document.removeEventListener("keydown", handleDismissKey, true);
    };
  }, [isPhilosophyOpen]);

  return (
    <section
      aria-label="Introduction"
      className="relative min-h-[88svh] overflow-hidden px-6 pb-14 pt-16 md:min-h-[86svh] md:px-10 md:pb-16 md:pt-20"
    >
      <ClarityThreadVisual
        hoverSuppressed={hoverSuppressed}
        isOpen={isPhilosophyOpen}
        onNodeBlur={closePhilosophySoon}
        onNodeEnter={openPhilosophy}
        onNodeUnlock={() => setHoverSuppressed(false)}
      />
      <PhilosophyOverlay
        isOpen={isPhilosophyOpen}
        onClose={closePhilosophy}
        origin={overlayOrigin}
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

      <div className="relative z-10 mx-auto min-h-[calc(88svh-7.5rem)] w-full max-w-[1280px] pt-3 md:min-h-[calc(86svh-9rem)] md:pt-0">
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
