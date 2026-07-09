"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useReveal, staggerDelay, REVEAL_VIEWPORT, REVEAL_DURATION, REVEAL_EASE } from "@/lib/motion";
import { CheckCircle, MinusCircle, ArrowsLeftRight } from "@phosphor-icons/react";
import Link from "next/link";
import type { Project, Block, CaseStudySection, CaseStudyData } from "@/lib/types";
import { projects } from "@/lib/data/projects";
import JumpToNav, { toSectionId } from "@/components/ui/JumpToNav";
import { GeminiProjectHero } from "@/components/sections/GeminiProjectHero";
import { InProgressHero } from "@/components/sections/ProjectInProgress";
import DesignSystemThumbnail from "@/components/thumbnails/DesignSystemThumbnail";

interface Props {
  project: Project;
  content?: CaseStudyData;
}

// ── Block Renderers ────────────────────────────────────────────

function Paragraph({ text }: { text: string }) {
  return (
    <p className="text-base text-[#3A3836] leading-relaxed max-w-[640px]">{text}</p>
  );
}

function Subheading({ text }: { text: string }) {
  return (
    <h3 className="text-sm font-medium text-[#18171A] tracking-wide mt-2">{text}</h3>
  );
}

function Callout({ text }: { text: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: prefersReducedMotion ? 0 : REVEAL_DURATION, ease: REVEAL_EASE }}
      className="border-l-[3px] border-[#C07B50] bg-[#F9F4EF] px-6 py-5 rounded-r-xl max-w-[640px]"
    >
      <p className="text-[#18171A] text-base leading-relaxed">{text}</p>
    </motion.div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base text-[#3A3836] leading-relaxed">
          <span className="mt-2 w-1 h-1 rounded-full bg-[#C07B50] shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function MetaGrid({ fields }: { fields: { label: string; value: string }[] }) {
  const reveal = useReveal();

  return (
    <motion.div
      {...reveal()}
      className="grid grid-cols-2 sm:grid-cols-3 border border-[#E6E3DD] rounded-2xl overflow-hidden bg-[#E6E3DD] gap-px"
    >
      {fields.map(({ label, value }) => (
        <div
          key={label}
          className="px-5 py-5 bg-white flex flex-col gap-2"
        >
          <span className="text-[10px] text-[#6E6D69] tracking-widest uppercase font-medium">{label}</span>
          <span className="text-sm font-medium text-[#18171A] leading-snug">{value}</span>
        </div>
      ))}
    </motion.div>
  );
}

// ── ColCard ────────────────────────────────────────────────────
type ColItem = string | { label: string; detail: string };

function ColCard({
  col,
}: {
  col: { heading: string; items: ColItem[]; variant?: string };
}) {
  const v = col.variant ?? "neutral";
  const isGreen = v === "positive";
  const isRed   = v === "warning";

  const Icon =
    isGreen ? <CheckCircle size={14} weight="light" aria-hidden />
    : isRed  ? <MinusCircle size={14} weight="light" aria-hidden />
    : null;

  const labelColor =
    isGreen ? "text-[#3a7a54]"
    : isRed  ? "text-[#B85A48]"
    : "text-[#6A6764]";

  return (
    <motion.div
      className={[
        "rounded-xl bg-white border border-[#E6E3DD] flex flex-col relative overflow-hidden",
        isGreen ? "card-green" : isRed ? "card-red" : "",
      ].join(" ").trim()}
      style={{ padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      whileHover={v !== "neutral" ? {
        y: -2,
        boxShadow: "0 6px 24px rgba(0,0,0,0.07)",
        transition: { duration: 0.25, ease: "easeOut" },
      } : undefined}
    >
      {/* Shimmer — z-2, clipped by overflow-hidden */}
      {isGreen && <div className="shimmer-green" aria-hidden="true" />}
      {isRed   && <div className="shimmer-red"   aria-hidden="true" />}

      {/* Content — sits above bloom (z-1) and shimmer (z-2) */}
      <div className="relative flex flex-col" style={{ zIndex: 3 }}>
        {/* Header zone */}
        <div className={`flex items-center gap-2 ${labelColor}`}>
          {Icon}
          <p className="text-[10px] font-semibold tracking-widest uppercase">
            {col.heading}
          </p>
        </div>

        {/* Subtle structural divider */}
        <div className="mt-5 h-px bg-[#E6E3DD]" />

        {/* Item list */}
        <ul className="mt-5 flex flex-col gap-5">
          {col.items.map((item, i) =>
            typeof item === "string" ? (
              <li key={i} className="text-sm text-[#3A3836] leading-relaxed">
                {item}
              </li>
            ) : (
              <li key={i} className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#18171A] leading-snug">
                  {item.label}
                </span>
                <span className="text-xs text-[#6E6D69] leading-relaxed">
                  {item.detail}
                </span>
              </li>
            )
          )}
        </ul>
      </div>
    </motion.div>
  );
}

function TwoColList({
  left,
  right,
}: {
  left: { heading: string; items: ColItem[]; variant?: string };
  right: { heading: string; items: ColItem[]; variant?: string };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ColCard col={left} />
      <ColCard col={right} />
    </div>
  );
}

function RoleList({ items }: { items: { abbr: string; fullName: string; description: string }[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  // canInteract: true only on hover-capable desktop at ≥1024px without reduced motion
  const [canInteract, setCanInteract] = useState(false);

  useEffect(() => {
    const update = () => {
      const hover   = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const desktop = window.innerWidth >= 1024;
      const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setCanInteract(hover && desktop && !noMotion);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        {items.map(({ abbr, fullName, description }, i) => {
          const active = canInteract && hovered === abbr;
          return (
            <tr
              key={abbr}
              style={{
                borderTop:    i === 0 ? "1px solid #F0EDE8" : undefined,
                borderBottom: "1px solid #F0EDE8",
              }}
            >
              <td style={{ width: "72px", padding: "13px 0", verticalAlign: "top" }}>
                <span
                  style={{
                    display: "inline-block",
                    position: "relative",
                    background:   active ? "#F5EAE0" : "#FBF5EF",
                    border:       `1px solid ${active ? "#C07B50" : "#EDD9C8"}`,
                    borderRadius: "4px",
                    padding:      "3px 8px",
                    fontSize:     "10px",
                    fontWeight:   700,
                    letterSpacing:"0.08em",
                    color:        "var(--color-text-accent)",
                    cursor:       canInteract ? "default" : undefined,
                    transition:   canInteract
                      ? "background 150ms ease, border-color 150ms ease, color 150ms ease"
                      : undefined,
                  }}
                  onMouseEnter={() => canInteract && setHovered(abbr)}
                  onMouseLeave={() => canInteract && setHovered(null)}
                >
                  {abbr}

                  {/* Tooltip — only when hovered on desktop */}
                  {active && (
                    <>
                      {/* Bubble */}
                      <motion.span
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        style={{
                          position:     "absolute",
                          bottom:       "calc(100% + 8px)",
                          left:         "50%",
                          transform:    "translateX(-50%)",
                          background:   "#1a1a1a",
                          color:        "#fff",
                          fontSize:     "11px",
                          fontWeight:   500,
                          letterSpacing: 0,
                          borderRadius: "6px",
                          padding:      "5px 10px",
                          whiteSpace:   "nowrap",
                          pointerEvents:"none",
                          zIndex:       20,
                        }}
                      >
                        {fullName}
                      </motion.span>
                      {/* Downward arrow */}
                      <span
                        aria-hidden="true"
                        style={{
                          position:    "absolute",
                          bottom:      "calc(100% + 3px)",
                          left:        "50%",
                          transform:   "translateX(-50%)",
                          width:       0,
                          height:      0,
                          borderLeft:  "5px solid transparent",
                          borderRight: "5px solid transparent",
                          borderTop:   "5px solid #1a1a1a",
                          pointerEvents:"none",
                          zIndex:      20,
                        }}
                      />
                    </>
                  )}
                </span>
              </td>
              <td style={{
                padding:      "13px 0",
                verticalAlign:"top",
                fontSize:     "13px",
                color:        "#444",
                lineHeight:   1.5,
              }}>
                {description}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ExplorationCards({
  items,
}: {
  items: { heading: string; description: string; strength: string; limitation: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((card, i) => (
        <motion.div
          key={i}
          className="bg-white border border-[#E6E3DD] rounded-2xl p-5 flex flex-col gap-4"
          whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-4 min-h-[4rem]">
            <h4 className="font-medium text-[#18171A] text-sm leading-snug">{card.heading}</h4>
            <p className="text-sm text-[#6A6764] leading-relaxed h-6 overflow-hidden">{card.description}</p>
          </div>
          <div className="space-y-2 pt-4 border-t border-[#F2F0EB]">
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#2E7D52] block mb-0.5">Strength</span>
              <p className="text-xs text-[#3A3836] leading-relaxed">{card.strength}</p>
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#6E6D69] block mb-0.5">Limitation</span>
              <p className="text-xs text-[#3A3836] leading-relaxed">{card.limitation}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Stages({ items }: { items: string[] }) {
  const containerRef            = useRef<HTMLDivElement>(null);
  const [animKey, setAnimKey]   = useState(0);
  const inViewRef               = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Respect prefers-reduced-motion — skip shimmer entirely in JS
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inViewRef.current) {
          inViewRef.current = true;
          setAnimKey((k) => k + 1); // new key → remount inner div → animations restart
        }
        if (!entry.isIntersecting) {
          inViewRef.current = false; // reset so next scroll-in replays
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative border border-[#E6E3DD] rounded-xl overflow-hidden bg-[#F2F0EB]">

      {/* Single-pass shimmer overlay — remounted on each scroll-in */}
      {animKey > 0 && (
        <div
          key={animKey}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10 stages-shimmer"
        />
      )}

      {/* Desktop (lg+): horizontal scrollable row */}
      <div className="hidden lg:block overflow-x-auto stages-scroll px-4">
        <div className="flex items-center gap-1 flex-nowrap py-3">
          {items.map((stage, i) => (
            <div key={i} className="flex items-center gap-1 shrink-0">
              <span className="text-[11px] font-medium bg-white border border-[#E6E3DD] text-[#18171A] px-2 py-1 rounded-full whitespace-nowrap">
                {stage}
              </span>
              {i < items.length - 1 && (
                <span className="text-[#C07B50] text-xs shrink-0 select-none" aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/tablet (below lg): vertical stack */}
      <div className="lg:hidden px-4 py-4">
        <div className="flex flex-col gap-2">
          {items.map((stage, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-[11px] font-medium bg-white border border-[#E6E3DD] text-[#18171A] px-3 py-1.5 rounded-full text-center">
                {stage}
              </span>
              {i < items.length - 1 && (
                <div className="flex justify-center" aria-hidden="true">
                  <span className="text-[#C07B50] text-xs select-none">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Decisions({
  items,
  startIndex = 0,
}: {
  items: { heading: string; body: string; bullets?: string[] }[];
  startIndex?: number;
}) {
  const reveal = useReveal();

  return (
    <div className="space-y-10">
      {items.map((decision, i) => (
        <motion.div
          key={i}
          className="grid grid-cols-[2rem_1fr] gap-4"
          {...reveal(staggerDelay(i))}
        >
          <span className="font-[family-name:var(--font-instrument-serif)] italic text-2xl text-[#C07B50]/50 leading-none pt-0.5">
            {String(startIndex + i + 1).padStart(2, "0")}
          </span>
          <div className="space-y-3">
            <h4 className="font-medium text-[#18171A] text-base">{decision.heading}</h4>
            <p className="text-sm text-[#3A3836] leading-relaxed">{decision.body}</p>
            {decision.bullets && (
              <ul className="space-y-1.5 mt-2">
                {decision.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2.5 text-sm text-[#3A3836] leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-[#C07B50] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── BACard ─────────────────────────────────────────────────────
// Before = red glow contracts inward  |  After = green glow expands outward
type BAItem = string | { label: string; detail: string };

function BACard({
  variant,
  heading,
  items,
  slideDir,
}: {
  variant: "before" | "after";
  heading: string;
  items: BAItem[];
  slideDir: number;
}) {
  const isAfter = variant === "after";
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={[
        "rounded-xl relative overflow-hidden bg-white border border-[#E6E3DD]",
        isAfter ? "card-green" : "card-red",
      ].join(" ")}
      style={{ padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : slideDir }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={REVEAL_VIEWPORT}
      whileHover={{
        y: -2,
        boxShadow: "0 6px 24px rgba(0,0,0,0.07)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      transition={{ duration: prefersReducedMotion ? 0 : REVEAL_DURATION, ease: REVEAL_EASE }}
    >
      {/* Shimmer — z-2, clipped by overflow-hidden */}
      {isAfter
        ? <div className="shimmer-green" aria-hidden="true" />
        : <div className="shimmer-red"   aria-hidden="true" />
      }

      {/* Content — sits above bloom (z-1) and shimmer (z-2) */}
      <div className="relative flex flex-col" style={{ zIndex: 3 }}>
        {/* Header zone — After=green, Before=red */}
        <p className={[
          "text-[10px] font-semibold tracking-widest uppercase",
          isAfter ? "text-[#3a7a54]" : "text-[#B85A48]",
        ].join(" ")}>
          {heading}
        </p>

        {/* Subtle structural divider */}
        <div className="mt-5 h-px bg-[#E6E3DD]" />

        {/* Item list */}
        <ul className="mt-5 flex flex-col gap-5">
          {items.map((item, i) =>
            typeof item === "string" ? (
              <li key={i} className="text-sm text-[#3A3836] leading-relaxed">
                {item}
              </li>
            ) : (
              <li key={i} className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#18171A] leading-snug">
                  {item.label}
                </span>
                <span className="text-xs text-[#6E6D69] leading-relaxed">
                  {item.detail}
                </span>
              </li>
            )
          )}
        </ul>
      </div>
    </motion.div>
  );
}

function BeforeAfter({
  before,
  after,
}: {
  before: { heading: string; items: BAItem[] };
  after: { heading: string; items: BAItem[] };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <BACard variant="before" heading={before.heading} items={before.items} slideDir={-12} />
      <BACard variant="after"  heading={after.heading}  items={after.items}  slideDir={12}  />
    </div>
  );
}

function Lightbox({ type = "image", src, alt, caption, controls = false, mobileDetail = false, onClose }: { type?: "image" | "video"; src: string; alt?: string; caption: string; controls?: boolean; mobileDetail?: boolean; onClose: () => void }) {
  const [panHintDismissed, setPanHintDismissed] = useState(false);
  const dismissPanHint = () => setPanHintDismissed(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Image — stop click from bubbling to overlay */}
      <motion.div
        className={`relative z-10 flex flex-col gap-4 px-6 ${mobileDetail && type === "image" ? "items-start overflow-auto max-h-[82vh] sm:items-center sm:overflow-visible sm:max-h-none" : "items-center"}`}
        style={{ maxWidth: "min(1400px, 92vw)" }}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        onScroll={dismissPanHint}
        onTouchStart={dismissPanHint}
      >
        {type === "video" ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            controls={controls}
            className="w-full h-auto rounded-xl"
            style={{ maxHeight: "82vh", objectFit: "contain", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}
          />
        ) : (
          <img
            src={src}
            alt={alt}
            className={mobileDetail ? "w-[220vw] max-w-none h-auto rounded-xl sm:w-full sm:max-w-full sm:max-h-[82vh]" : "w-full h-auto rounded-xl"}
            style={{ maxHeight: mobileDetail ? undefined : "82vh", objectFit: "contain", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}
          />
        )}
        {caption && (
          <p className="text-xs text-white/50 text-center leading-snug">{caption}</p>
        )}
      </motion.div>

      <AnimatePresence>
        {mobileDetail && type === "image" && !panHintDismissed && (
          <motion.div
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/50 backdrop-blur-sm">
              <ArrowsLeftRight size={12} weight="bold" aria-hidden="true" />
              Drag to explore
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

import { AnimatePresence } from "framer-motion";

function CaseStudyImage({ src, caption, alt, mobileDetail = false }: { src: string; caption: string; alt?: string; mobileDetail?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <figure className="w-full flex flex-col gap-3">
        <div
          className="w-full rounded-2xl overflow-hidden border border-[#E6E3DD] cursor-zoom-in"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
          onClick={() => setOpen(true)}
          role="button"
          aria-label="Expand image"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          <img
            src={src}
            alt={alt ?? caption}
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
        {caption && (
          <figcaption className="text-xs text-[#6E6D69] text-center leading-snug px-4">{caption}</figcaption>
        )}
        {mobileDetail && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="sm:hidden self-center text-xs font-medium text-[#6A6764] underline underline-offset-4"
          >
            Inspect full-size visual
          </button>
        )}
      </figure>

      <AnimatePresence>
        {open && (
          <Lightbox
            src={src}
            alt={alt ?? caption}
            caption={caption}
            mobileDetail={mobileDetail}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function CaseStudyVideo({ src, caption, poster, mobileDetail = false, controls = false }: { src: string; caption: string; poster?: string; mobileDetail?: boolean; controls?: boolean }) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // autoPlay is blocked when the element starts hidden (Framer Motion opacity:0).
  // IntersectionObserver fires play() imperatively once the video is actually visible.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) video.play().catch(() => {}); },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <figure className="w-full flex flex-col gap-3">
        <div
          className="w-full rounded-2xl overflow-hidden border border-[#E6E3DD]"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
          onClick={() => setOpen(true)}
          role="button"
          aria-label="Expand video"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            controls={controls}
            preload="auto"
            className="w-full h-auto block"
            onClick={(e) => controls && e.stopPropagation()}
          />
        </div>
        {caption && (
          <figcaption className="text-xs text-[#6E6D69] text-center leading-snug px-4">{caption}</figcaption>
        )}
        {mobileDetail && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="sm:hidden self-center text-xs font-medium text-[#6A6764] underline underline-offset-4"
          >
            Inspect video full-screen
          </button>
        )}
      </figure>

      <AnimatePresence>
        {open && (
          <Lightbox
            type="video"
            src={src}
            caption={caption}
            controls={controls}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ImagePlaceholder({ caption, tall }: { caption: string; tall?: boolean }) {
  return (
    <figure
      className={[
        "w-full bg-[#F2F0EB] border border-[#E6E3DD] rounded-2xl overflow-hidden flex flex-col justify-end",
        tall ? "min-h-[280px]" : "min-h-[200px]",
      ].join(" ")}
      style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05)" }}
    >
      <div className="p-4 border-t border-[#E6E3DD] bg-white/60 backdrop-blur-sm">
        <figcaption className="text-xs text-[#6E6D69] leading-snug">{caption}</figcaption>
      </div>
    </figure>
  );
}

function PullQuote({ text }: { text: string }) {
  return (
    <blockquote className="border-l-[3px] border-[#C07B50]/30 pl-6 my-1">
      <p className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(1.1rem,2.5vw,1.3rem)] text-[#18171A] leading-snug max-w-[640px]">
        &ldquo;{text}&rdquo;
      </p>
    </blockquote>
  );
}

function ClosingLine({ text }: { text: string }) {
  return (
    <p className="font-[family-name:var(--font-instrument-serif)] italic text-base text-[#6A6764]">
      {text}
    </p>
  );
}

function ContextCards({ items }: { items: { heading: string; body: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((card, i) => (
        <div key={i} className="bg-white border border-[#E6E3DD] rounded-2xl p-5 flex flex-col gap-3">
          <span className="font-[family-name:var(--font-instrument-serif)] italic text-2xl text-[#C07B50]/50 leading-none">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h4 className="font-medium text-[#18171A] text-sm leading-snug">{card.heading}</h4>
          <p className="text-sm text-[#6A6764] leading-relaxed">{card.body}</p>
        </div>
      ))}
    </div>
  );
}

function SynthesisFlow({ rows }: { rows: { label: string; items: string[] }[] }) {
  return (
    <div className="flex flex-col">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-col">
          <div className="bg-[#F2F0EB] border border-[#E6E3DD] rounded-xl p-5 flex flex-col sm:flex-row gap-4 sm:items-start">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[#6E6D69] shrink-0 sm:w-[130px] sm:pt-0.5">
              {row.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {row.items.map((item, j) => (
                <span
                  key={j}
                  className="text-xs text-[#18171A] bg-white border border-[#E6E3DD] rounded-full px-3 py-1 leading-none"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          {i < rows.length - 1 && (
            <div className="flex justify-center items-center h-7" aria-hidden="true">
              <span className="text-[#C07B50] text-base select-none">↓</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SynthesisTable({ headers, rows }: { headers: [string, string]; rows: [string, string][] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E6E3DD]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#F2F0EB]">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-[#6E6D69] border-b border-[#E6E3DD]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E6E3DD]">
          {rows.map(([insight, requirement], i) => (
            <tr key={i} className="bg-white">
              <td className="px-5 py-3.5 text-sm text-[#3A3836] leading-snug">{insight}</td>
              <td className="px-5 py-3.5 text-sm font-medium text-[#18171A] leading-snug">{requirement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DecisionsCDO({
  items,
  startIndex = 0,
}: {
  items: { heading: string; challenge: string; decision: string; outcome: string }[];
  startIndex?: number;
}) {
  const reveal = useReveal();

  return (
    <div className="space-y-10">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="grid grid-cols-[2rem_1fr] gap-4"
          {...reveal(staggerDelay(i))}
        >
          <span className="font-[family-name:var(--font-instrument-serif)] italic text-2xl text-[#C07B50]/50 leading-none pt-0.5">
            {String(startIndex + i + 1).padStart(2, "0")}
          </span>
          <div className="space-y-4">
            <h4 className="font-medium text-[#18171A] text-base">{item.heading}</h4>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#6E6D69] block mb-1">
                  Challenge
                </span>
                <p className="text-sm text-[#3A3836] leading-relaxed">{item.challenge}</p>
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#C07B50]/70 block mb-1">
                  Decision
                </span>
                <p className="text-sm text-[#3A3836] leading-relaxed">{item.decision}</p>
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#2E7D52] block mb-1">
                  Outcome
                </span>
                <p className="text-sm text-[#3A3836] leading-relaxed">{item.outcome}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PublishingWorkflow({ steps }: { steps: string[] }) {
  return (
    <div className="border border-[#E6E3DD] rounded-xl overflow-hidden bg-[#F2F0EB] px-6 py-5 max-w-[400px]">
      <div className="flex flex-col">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex items-center gap-4">
              <span className="w-6 h-6 rounded-full bg-white border border-[#E6E3DD] flex items-center justify-center text-[10px] font-semibold text-[#6E6D69] shrink-0">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-[#18171A]">{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="ml-[11px] w-px h-5 bg-[#D4D0C8] my-1" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DriftAudit({
  groups,
  stats,
}: {
  groups: { label: string; swatches: { hex: string; count?: number }[]; resolved: { hex: string; label: string }[] }[];
  stats: { n: string; label: string }[];
}) {
  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="border border-[#E6E3DD] rounded-2xl bg-white p-7 space-y-6">
        {groups.map((g, gi) => (
          <div key={gi} className="flex flex-wrap items-center gap-2.5">
            <span className="w-full text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
              {g.label}
            </span>
            {g.swatches.map((s, si) => (
              <span key={si} className="inline-flex flex-col items-center">
                <span
                  className="w-8 h-8 rounded-lg border border-black/[0.06]"
                  style={{ background: s.hex }}
                  aria-hidden="true"
                />
                <span className="mt-1 font-[family-name:var(--font-geist-mono)] text-[9px] text-[var(--color-text-muted)]">
                  {s.hex}
                  {s.count ? ` ×${s.count}` : ""}
                </span>
              </span>
            ))}
            <span className="mx-1 text-[var(--color-text-muted)]" aria-hidden="true">→</span>
            {g.resolved.map((r, ri) => (
              <span key={ri} className="inline-flex flex-col items-center">
                <span
                  className="w-8 h-8 rounded-lg border border-black/[0.06]"
                  style={{ background: r.hex }}
                  aria-hidden="true"
                />
                <span className="mt-1 font-[family-name:var(--font-geist-mono)] text-[9px] text-[var(--color-text-accent)]">
                  {r.label}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-px bg-[#E6E3DD] border border-[#E6E3DD] rounded-2xl overflow-hidden">
        {stats.map((s, i) => (
          <div key={i} className="bg-white px-6 py-5 flex items-baseline justify-between gap-4">
            <span className="font-[family-name:var(--font-instrument-serif)] italic text-4xl text-[var(--color-text-accent)] leading-none">
              {s.n}
            </span>
            <span className="text-xs text-[#6A6764] text-right max-w-[170px]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TokenChain({ steps }: { steps: { tier: string; token: string; why: string }[] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="mt-8 grid gap-px bg-[#E6E3DD] border border-[#E6E3DD] rounded-2xl overflow-hidden md:grid-cols-4">
      {steps.map((s, i) => (
        <div key={i} className="bg-white px-6 py-6">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-accent)] mb-2.5">
            {s.tier}
          </p>
          <span className="inline-block font-[family-name:var(--font-geist-mono)] text-[13px] bg-[#F2F0EB] rounded-lg px-3 py-2">
            {s.token}
          </span>
          <p className="mt-3 text-xs text-[var(--color-text-muted)] leading-relaxed">{s.why}</p>
        </div>
      ))}
      <div className="bg-white px-6 py-6 flex items-center justify-center">
        <button
          type="button"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          aria-label="Live demo: token chain rendered as a project card hover state"
          className="w-full max-w-[170px] rounded-xl border bg-white p-4 text-left transition-[border-color,box-shadow] duration-300"
          style={{
            borderColor: hovered ? "var(--color-accent)" : "#E6E3DD",
            boxShadow: hovered ? "0 8px 40px -8px rgba(0,0,0,0.12)" : "none",
          }}
        >
          <span className="block h-12 rounded-lg bg-[#F2F0EB] mb-2.5" aria-hidden="true" />
          <span className="block text-[13px] font-medium text-[#18171A]">Hover me</span>
          <span className="block text-[10px] text-[var(--color-text-muted)] mt-0.5">The chain, rendered</span>
        </button>
      </div>
    </div>
  );
}

function ContrastMatrix({
  rows,
}: {
  rows: { pairing: string; swatchBg: string; swatchFg: string; ratio: string; verdict: "pass-aaa" | "pass" | "fail"; fix?: string }[];
}) {
  const verdictStyle: Record<string, string> = {
    "pass-aaa": "text-[#3A7A54] border-[#3A7A54]/40",
    pass: "text-[#3A7A54] border-[#3A7A54]/40",
    fail: "text-[#B95A48] border-[#B95A48]/40",
  };
  const verdictLabel: Record<string, string> = {
    "pass-aaa": "Pass · AAA",
    pass: "Pass",
    fail: "Fail",
  };
  return (
    <div className="mt-8 border border-[#E6E3DD] rounded-2xl bg-white overflow-hidden overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[560px]">
        <thead>
          <tr className="bg-[#F2F0EB]">
            {["Pairing", "Measured", "WCAG AA", "Remediation"].map((h) => (
              <th
                key={h}
                className="text-left text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-muted)] px-4 py-3 border-b border-[#E6E3DD]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i < rows.length - 1 ? "border-b border-[#E6E3DD]" : ""}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-9 h-6 rounded-md border border-black/[0.06] flex items-center justify-center text-[9px] font-medium shrink-0"
                    style={{ background: r.swatchBg, color: r.swatchFg }}
                  >
                    Aa
                  </span>
                  <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#3A3836]">{r.pairing}</span>
                </div>
              </td>
              <td className="px-4 py-3 font-[family-name:var(--font-geist-mono)] text-[12px] text-[#3A3836]">{r.ratio}</td>
              <td className="px-4 py-3">
                <span className={`inline-block text-[10px] font-medium uppercase tracking-wide rounded-full border px-2.5 py-0.5 ${verdictStyle[r.verdict]}`}>
                  {verdictLabel[r.verdict]}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-[#6A6764]">{r.fix ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComponentAnatomy({
  componentName,
  annotations,
}: {
  componentName: string;
  annotations: { label: string; token: string }[];
}) {
  return (
    <div className="mt-8 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="rounded-2xl bg-[#F2F0EB] border border-[#E6E3DD] p-9 flex justify-center">
        <div className="w-full max-w-[280px] bg-white border border-[#E6E3DD] rounded-2xl overflow-hidden hover:border-[#C07B50]/40 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] transition-[border-color,box-shadow] duration-300">
          <div className="h-[100px]" style={{ background: "linear-gradient(135deg, #F2F0EB, #F5E8DC)" }} aria-hidden="true" />
          <div className="p-5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-medium uppercase tracking-wide text-[#C07B50]">Enterprise UX</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">2025</span>
            </div>
            <h4 className="text-[15px] font-medium text-[#18171A] mb-1.5">{componentName}</h4>
            <p className="text-xs text-[#6A6764] leading-relaxed">Approval workflow for a multi-stakeholder platform.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {annotations.map((a, i) => (
          <div
            key={i}
            className={`grid grid-cols-[24px_1fr] gap-3.5 py-3 items-baseline ${i > 0 ? "border-t border-[#E6E3DD]" : ""}`}
          >
            <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--color-text-accent)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <span className="text-[13px] text-[#18171A]">{a.label}</span>
              <span className="block font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--color-text-muted)] mt-0.5">
                {a.token}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BenchmarkMatrix({
  rows,
}: {
  rows: { category: string; m3: boolean; carbon: boolean; self: boolean | "roadmap"; note?: string }[];
}) {
  const Cell = ({ v }: { v: boolean | "roadmap" }) => {
    if (v === "roadmap")
      return (
        <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-text-accent)] border border-[var(--color-accent)]/45 rounded-full px-2.5 py-0.5">
          Roadmap
        </span>
      );
    return v ? (
      <span className="text-[#3A7A54] font-medium" aria-label="Yes">✓</span>
    ) : (
      <span className="text-[var(--color-text-muted)]" aria-label="No">—</span>
    );
  };
  return (
    <div className="mt-8 border border-[#E6E3DD] rounded-2xl bg-white overflow-hidden overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[520px]">
        <thead>
          <tr className="bg-[#F2F0EB]">
            {["Capability", "Material 3", "Carbon", "This system"].map((h, i) => (
              <th
                key={h}
                className={`text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-muted)] px-4 py-3 border-b border-[#E6E3DD] ${i === 0 ? "text-left" : "text-center"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i < rows.length - 1 ? "border-b border-[#E6E3DD]" : ""}>
              <td className="px-4 py-3 text-sm font-medium text-[#18171A]">
                {r.category}
                {r.note && <span className="block text-xs font-normal text-[#6A6764] mt-0.5">{r.note}</span>}
              </td>
              <td className="px-4 py-3 text-center"><Cell v={r.m3} /></td>
              <td className="px-4 py-3 text-center"><Cell v={r.carbon} /></td>
              <td className="px-4 py-3 text-center"><Cell v={r.self} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderBlock(block: Block, i: number): React.ReactNode {
  switch (block.type) {
    case "paragraph":        return <Paragraph key={i} text={block.text} />;
    case "subheading":       return <Subheading key={i} text={block.text} />;
    case "callout":          return <Callout key={i} text={block.text} />;
    case "bullet-list":      return <BulletList key={i} items={block.items} />;
    case "meta-grid":        return <MetaGrid key={i} fields={block.fields} />;
    case "two-col-list":     return <TwoColList key={i} left={block.left} right={block.right} />;
    case "role-list":        return <RoleList key={i} items={block.items} />;
    case "exploration-cards":return <ExplorationCards key={i} items={block.items} />;
    case "stages":           return <Stages key={i} items={block.items} />;
    case "decisions":        return <Decisions key={i} items={block.items} startIndex={block.startIndex ?? 0} />;
    case "before-after":     return <BeforeAfter key={i} before={block.before} after={block.after} />;
    case "image-placeholder":return <ImagePlaceholder key={i} caption={block.caption} tall={block.tall} />;
    case "case-study-image": return <CaseStudyImage key={i} src={block.src} caption={block.caption} alt={block.alt} mobileDetail={block.mobileDetail} />;
    case "case-study-video": return <CaseStudyVideo key={i} src={block.src} caption={block.caption} poster={block.poster} mobileDetail={block.mobileDetail} controls={block.controls} />;
    case "pull-quote":       return <PullQuote key={i} text={block.text} />;
    case "closing-line":     return <ClosingLine key={i} text={block.text} />;
    case "context-cards":    return <ContextCards key={i} items={block.items} />;
    case "synthesis-flow":   return <SynthesisFlow key={i} rows={block.rows} />;
    case "synthesis-table":  return <SynthesisTable key={i} headers={block.headers} rows={block.rows} />;
    case "decisions-cdo":    return <DecisionsCDO key={i} items={block.items} startIndex={block.startIndex ?? 0} />;
    case "publishing-workflow": return <PublishingWorkflow key={i} steps={block.steps} />;
    case "drift-audit":      return <DriftAudit key={i} groups={block.groups} stats={block.stats} />;
    case "token-chain":      return <TokenChain key={i} steps={block.steps} />;
    case "contrast-matrix":  return <ContrastMatrix key={i} rows={block.rows} />;
    case "component-anatomy":return <ComponentAnatomy key={i} componentName={block.componentName} annotations={block.annotations} />;
    case "benchmark-matrix": return <BenchmarkMatrix key={i} rows={block.rows} />;
    default:                 return null;
  }
}

// ── Section Component ──────────────────────────────────────────

function Section({ section }: { section: CaseStudySection }) {
  const reveal = useReveal();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={toSectionId(section.label)}
      {...reveal()}
      className="pb-8"
    >
      {/* Animated divider — grows left-to-right on scroll */}
      <motion.div
        className="h-px bg-[#E6E3DD]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: prefersReducedMotion ? 0 : REVEAL_DURATION, ease: REVEAL_EASE }}
        style={{ originX: 0 }}
      />

      <div className="pt-6 md:pt-12">
        <span className="block text-[10px] text-[var(--color-text-accent)] tracking-widest uppercase font-medium mb-3">
          {section.label}
        </span>

        {section.heading && (
          <h2 className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(1.5rem,3vw,2.25rem)] leading-snug text-[#18171A] max-w-[22ch] mb-8">
            {section.heading}
          </h2>
        )}

        <div className={["space-y-6", !section.heading ? "mt-4" : ""].join(" ").trim()}>
          {section.blocks.map((block, i) => renderBlock(block, i))}
        </div>
      </div>
    </motion.section>
  );
}

// ── Generic Fallback Body ──────────────────────────────────────

function GenericBody() {
  return (
    <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20">
      <div className="border-t border-[#E6E3DD] pt-12 space-y-6">
        <p className="text-[#6A6764] text-base leading-relaxed">
          Full case study coming soon. In the meantime, feel free to{" "}
          <a href="mailto:hi@withsameer.design" className="text-[#C07B50] underline underline-offset-2">
            reach out
          </a>{" "}
          to discuss this project in detail.
        </p>
      </div>
    </div>
  );
}

// ── Animated Link ──────────────────────────────────────────────

const MotionLink = motion.create(Link);

// ── Main Component ─────────────────────────────────────────────

export default function CaseStudy({ project, content }: Props) {
  const visible = projects.filter((p) => p.featured && !p.hidden);
  const currentIndex = visible.findIndex((p) => p.slug === project.slug);
  const isLast = currentIndex === visible.length - 1;
  const adjacentProject = isLast ? visible[currentIndex - 1] : visible[currentIndex + 1];
  const adjacentLabel = isLast ? "Previous Project" : "Next Project";
  const isGemini = project.slug === "gemini-digital-twin";
  const isCollabspace = project.slug === "plm-collabspace";
  const isDesignSystem = project.slug === "design-system";

  return (
    <article>
      {/* Hero — full-bleed bg, text anchored to shared 900px grid origin */}
      {isGemini ? (
        <GeminiProjectHero
          category={project.category}
          title={project.title}
          description={project.description}
          client={project.client}
          impact={project.impact}
          tags={project.tags}
        />
      ) : isCollabspace ? (
        <InProgressHero project={project} />
      ) : isDesignSystem ? (
        <div className="relative isolate overflow-hidden bg-[#F9F8F5]">
          <section className="relative flex md:min-h-screen flex-col justify-start px-6 pb-16 md:pb-[88px] pt-[72px] md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute right-8 top-1/2 hidden aspect-[460/256] w-[43vw] max-w-[620px] -translate-y-1/2 lg:block"
              aria-hidden="true"
            >
              <DesignSystemThumbnail />
            </motion.div>

            <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1280px]">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs text-[var(--color-text-accent)] tracking-widest uppercase font-medium mb-4"
              >
                {project.category}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2.50rem,3.74vw,4.06rem)] italic leading-tight text-[#18171A] max-w-[670px]"
              >
                {project.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-5 text-base text-[#18171A]/65 max-w-[48ch] leading-relaxed mb-6 pointer-events-auto"
              >
                {project.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8 pointer-events-auto"
              >
                <Link
                  href="/system"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-accent)] hover:text-[var(--color-accent-hover)] transition-colors duration-200"
                >
                  Browse the full Token Atlas
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>
              {project.heroMetadata && project.heroMetadata.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="grid w-fit grid-cols-[auto_auto] sm:grid-cols-[auto_auto_auto] overflow-hidden rounded-xl border border-[#E6E3DD] bg-[#E6E3DD] gap-px mb-8 pointer-events-auto"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                >
                  {project.heroMetadata.map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-1.5 bg-white px-6 py-3">
                      <span className="text-[10px] font-medium uppercase tracking-widest text-[#18171A]/[0.38]">
                        {label}
                      </span>
                      <span className="text-[15px] font-normal text-[#18171A]/85 leading-snug">
                        {value}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-2 pointer-events-auto max-w-[640px]"
              >
                <span className="text-sm font-medium text-[#18171A] bg-[#18171A]/8 px-3 py-1.5 rounded-full">
                  {project.impact}
                </span>
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs text-[#18171A]/50 border border-[#18171A]/15 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </section>
        </div>
      ) : (
        <div
          className="min-h-screen flex flex-col justify-center pt-24 pb-16"
          style={{ backgroundColor: project.coverColor }}
        >
          <div className="max-w-[900px] lg:pl-[150px] xl:pl-10 mx-auto w-full px-6 md:px-10">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs text-[var(--color-text-accent)] tracking-widest uppercase font-medium mb-4"
              >
                {project.category}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(2rem,5vw,4rem)] leading-tight text-[#18171A] max-w-[22ch] mb-5"
              >
                {project.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-base text-[#18171A]/65 max-w-[48ch] leading-relaxed mb-8"
              >
                {project.description}
              </motion.p>
              {project.heroMetadata && project.heroMetadata.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="grid w-fit grid-cols-[auto_auto] sm:grid-cols-[auto_auto_auto] overflow-hidden rounded-xl border border-[#18171A]/10 bg-[#18171A]/10 gap-px mb-8"
                >
                  {project.heroMetadata.map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-1.5 bg-white/70 px-6 py-3">
                      <span className="text-[10px] font-medium uppercase tracking-widest text-[#18171A]/40">
                        {label}
                      </span>
                      <span className="text-[15px] font-normal text-[#18171A]/85 leading-snug">
                        {value}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-2"
              >
                <span className="text-sm font-medium text-[#18171A] bg-[#18171A]/8 px-3 py-1.5 rounded-full">
                  {project.impact}
                </span>
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs text-[#18171A]/50 border border-[#18171A]/15 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Jump-to navigation — sections derived from content so each project gets its own nav */}
      {content && <JumpToNav sections={content.sections.map((s) => ({ label: s.label }))} />}

      {/* Case study body — pb-[80px] on mobile/tablet clears the fixed 52px bottom bar */}
      {content ? (
        <div className="max-w-[900px] mx-auto px-6 md:px-10 lg:pl-[150px] xl:pl-10 pt-4 md:pt-16 pb-[80px] xl:pb-16 space-y-0">
          {content.sections.map((section) => (
            <Section key={section.label} section={section} />
          ))}
        </div>
      ) : (
        <GenericBody />
      )}

      {project.slug === "design-system" && (
        <div className="max-w-[900px] mx-auto px-6 md:px-10 lg:pl-[150px] xl:pl-10 pb-16">
          <div className="border-t border-[#E6E3DD] pt-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[var(--color-text-accent)] tracking-widest uppercase font-medium mb-1">Go deeper</p>
              <p className="text-[#18171A] font-medium">Every token, every rule, in one reference.</p>
            </div>
            <Link
              href="/system"
              className="inline-flex items-center gap-2 bg-[#18171A] text-[#F9F8F5] text-sm font-medium px-5 py-3 rounded-full hover:bg-[#C07B50] transition-colors duration-200 min-h-[44px]"
            >
              View the Token Atlas
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Adjacent project */}
      <div className="border-t border-[#E6E3DD] px-6 md:px-10 py-12 bg-[#F9F8F5]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-[var(--color-text-accent)] tracking-widest uppercase font-medium mb-1">
              {adjacentLabel}
            </p>
            <p className="text-[#18171A] font-medium">{adjacentProject.title}</p>
            <p className="text-sm text-[#6A6764] mt-0.5">{adjacentProject.category}</p>
          </div>
          <MotionLink
            href={`/work/${adjacentProject.slug}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-[#18171A] text-[#F9F8F5] text-sm font-medium px-5 py-3 rounded-full hover:bg-[#C07B50] transition-colors duration-200 min-h-[44px]"
          >
            View case study
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MotionLink>
        </div>
      </div>
    </article>
  );
}
