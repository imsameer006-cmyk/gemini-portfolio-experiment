"use client";

import { useRef, useState, useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
import { CheckCircle, MinusCircle } from "@phosphor-icons/react";
import Link from "next/link";
import type { Project, Block, CaseStudySection, CaseStudyData } from "@/lib/types";
import { projects } from "@/lib/data/projects";
import JumpToNav, { toSectionId } from "@/components/ui/JumpToNav";
import { GeminiProjectHero } from "@/components/sections/GeminiProjectHero";
import { InProgressHero } from "@/components/sections/ProjectInProgress";

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
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-2 sm:grid-cols-3 border border-[#E6E3DD] rounded-2xl overflow-hidden bg-[#E6E3DD] gap-px"
    >
      {fields.map(({ label, value }) => (
        <div
          key={label}
          className="px-5 py-5 bg-white flex flex-col gap-2"
        >
          <span className="text-[10px] text-[#74716D] tracking-widest uppercase font-medium">{label}</span>
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
                <span className="text-xs text-[#74716D] leading-relaxed">
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
                    color:        active ? "#A0622E" : "#C07B50",
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
          <h4 className="font-medium text-[#18171A] text-sm leading-snug">{card.heading}</h4>
          <p className="text-sm text-[#6A6764] leading-relaxed">{card.description}</p>
          <div className="space-y-2 mt-auto pt-4 border-t border-[#F2F0EB]">
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#2E7D52] block mb-0.5">Strength</span>
              <p className="text-xs text-[#3A3836] leading-relaxed">{card.strength}</p>
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#74716D] block mb-0.5">Limitation</span>
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
  return (
    <div className="space-y-10">
      {items.map((decision, i) => (
        <motion.div
          key={i}
          className="grid grid-cols-[2rem_1fr] gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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

  return (
    <motion.div
      className={[
        "rounded-xl relative overflow-hidden bg-white border border-[#E6E3DD]",
        isAfter ? "card-green" : "card-red",
      ].join(" ")}
      style={{ padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      initial={{ opacity: 0, x: slideDir }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{
        y: -2,
        boxShadow: "0 6px 24px rgba(0,0,0,0.07)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
                <span className="text-xs text-[#74716D] leading-relaxed">
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
        <figcaption className="text-xs text-[#74716D] text-center leading-snug px-4">{caption}</figcaption>
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
        <figcaption className="text-xs text-[#74716D] text-center leading-snug px-4">{caption}</figcaption>
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
        <figcaption className="text-xs text-[#74716D] leading-snug">{caption}</figcaption>
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
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[#74716D] shrink-0 sm:w-[130px] sm:pt-0.5">
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
                className="text-left px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-[#74716D] border-b border-[#E6E3DD]"
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
  return (
    <div className="space-y-10">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="grid grid-cols-[2rem_1fr] gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span className="font-[family-name:var(--font-instrument-serif)] italic text-2xl text-[#C07B50]/50 leading-none pt-0.5">
            {String(startIndex + i + 1).padStart(2, "0")}
          </span>
          <div className="space-y-4">
            <h4 className="font-medium text-[#18171A] text-base">{item.heading}</h4>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#74716D] block mb-1">
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
              <span className="w-6 h-6 rounded-full bg-white border border-[#E6E3DD] flex items-center justify-center text-[10px] font-semibold text-[#74716D] shrink-0">
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
    default:                 return null;
  }
}

// ── Section Component ──────────────────────────────────────────

function Section({ section }: { section: CaseStudySection }) {
  return (
    <motion.section
      id={toSectionId(section.label)}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="pb-8"
    >
      {/* Animated divider — grows left-to-right on scroll */}
      <motion.div
        className="h-px bg-[#E6E3DD]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
      />

      <div className="pt-12">
        <span className="block text-[10px] text-[#74716D] tracking-widest uppercase font-medium mb-3">
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
          <a href="mailto:imsameer006@gmail.com" className="text-[#C07B50] underline underline-offset-2">
            reach out
          </a>{" "}
          to discuss this project in detail.
        </p>
      </div>
    </div>
  );
}

// ── Animated Link ──────────────────────────────────────────────

const MotionLink = motion(Link);

// ── Main Component ─────────────────────────────────────────────

export default function CaseStudy({ project, content }: Props) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];
  const isGemini = project.slug === "gemini-digital-twin";
  const isCollabspace = project.slug === "design-system";

  return (
    <MotionConfig reducedMotion="user">
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
                className="text-xs text-[#18171A]/50 tracking-widest uppercase font-medium mb-4"
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
        <div className="max-w-[900px] mx-auto px-6 md:px-10 lg:pl-[150px] xl:pl-10 pt-16 pb-[80px] xl:pb-16 space-y-0">
          {content.sections.map((section) => (
            <Section key={section.label} section={section} />
          ))}
        </div>
      ) : (
        <GenericBody />
      )}

      {/* Next project */}
      <div className="border-t border-[#E6E3DD] px-6 md:px-10 py-12 bg-[#F9F8F5]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-[#74716D] tracking-widest uppercase font-medium mb-1">
              Next Project
            </p>
            <p className="text-[#18171A] font-medium">{next.title}</p>
            <p className="text-sm text-[#6A6764] mt-0.5">{next.category}</p>
          </div>
          <MotionLink
            href={`/work/${next.slug}`}
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
    </MotionConfig>
  );
}
