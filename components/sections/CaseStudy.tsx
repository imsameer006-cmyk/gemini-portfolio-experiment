"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, MotionConfig, useReducedMotion, useAnimation } from "framer-motion";
import { CheckCircle, MinusCircle } from "@phosphor-icons/react";
import Link from "next/link";
import type { Project, Block, CaseStudySection, CaseStudyData } from "@/lib/types";
import { projects } from "@/lib/data/projects";
import JumpToNav, { toSectionId } from "@/components/ui/JumpToNav";

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
          <span className="text-[10px] text-[#8C8B84] tracking-widest uppercase font-medium">{label}</span>
          <span className="text-sm font-medium text-[#18171A] leading-snug">{value}</span>
        </div>
      ))}
    </motion.div>
  );
}

// ── ColCard ────────────────────────────────────────────────────
function ColCard({
  col,
}: {
  col: { heading: string; items: string[]; variant?: string };
}) {
  const prefersReduced = useReducedMotion();
  const v = col.variant ?? "neutral";
  const glowControls = useAnimation();

  // True only on devices that support real hover (mouse/trackpad).
  // Phones and tablets report (hover: none) so they get the static path.
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const Icon =
    v === "positive"
      ? <CheckCircle size={16} weight="regular" aria-hidden />
      : v === "warning"
      ? <MinusCircle size={16} weight="regular" aria-hidden />
      : null;

  const labelColor = v === "positive" ? "text-[#C07B50]" : "text-[#6A6764]";

  const hoverShadow =
    v === "positive"
      ? "0 4px 20px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(72,110,75,0.22)"
      : v === "warning"
      ? "0 4px 20px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(180,60,60,0.22)"
      : "0 4px 20px rgba(0,0,0,0.06)";

  // Hover-in: full directional animation (desktop only)
  const handleHoverStart = () => {
    if (!canHover || prefersReduced || v === "neutral") return;
    if (v === "positive") {
      glowControls.start({
        scale:   [0.02, 0.55, 1.5],
        opacity: [0,    1.0,  0.85],
        transition: { duration: 2.5, times: [0, 0.25, 1], ease: ["easeIn", [0.22, 1, 0.36, 1]] },
      });
    } else {
      glowControls.start({
        scale:   [2.5,  1.1,  1.0],
        opacity: [0,    1.0,  0.88],
        transition: { duration: 2.5, times: [0, 0.75, 1], ease: [0.22, 1, 0.36, 1] },
      });
    }
  };

  // Hover-out: fade opacity only — glow dissolves in place, no movement
  const handleHoverEnd = () => {
    if (!canHover || prefersReduced || v === "neutral") return;
    glowControls.start({
      opacity: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  };

  return (
    <motion.div
      className="rounded-xl bg-[#F2F0EB] border border-[#E6E3DD] flex flex-col relative overflow-hidden"
      style={{
        padding: "28px",
        // Ambient shadow always visible — gives cards depth on touch devices
        // where hover never fires. On desktop it's replaced by hoverShadow.
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
      whileHover={canHover ? { y: -2, boxShadow: hoverShadow } : undefined}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      transition={{
        y:         { duration: 0.18, ease: "easeOut" },
        boxShadow: { duration: 0.4,  ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Glow — only rendered when hover is supported */}
      {!prefersReduced && canHover && v !== "neutral" && (
        <motion.div
          aria-hidden="true"
          className="absolute pointer-events-none"
          initial={{ scale: v === "positive" ? 0.02 : 2.5, opacity: 0 }}
          animate={glowControls}
          style={{
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            // Card 1: bright centre fading out — expansion reads clearly.
            // Card 2: ring gradient (transparent core, colour at ~64% radius)
            // so the ring is trackable as it sweeps from outside → card edges.
            background:
              v === "positive"
                ? "radial-gradient(circle, rgba(72,110,75,0.16) 0%, rgba(72,110,75,0.08) 40%, rgba(72,110,75,0) 70%)"
                : "radial-gradient(circle, rgba(180,60,60,0.16) 0%, rgba(180,60,60,0.08) 40%, rgba(180,60,60,0) 70%)",
          }}
        />
      )}

      {/* Content sits above glow layer */}
      <div className="relative flex flex-col" style={{ zIndex: 1 }}>
        <div className={`flex items-center gap-2 ${labelColor}`}>
          {Icon}
          <p className="text-xs font-semibold tracking-wide uppercase">
            {col.heading}
          </p>
        </div>
        <ul className="mt-5 flex flex-col gap-2">
          {col.items.map((item, i) => (
            <li
              key={i}
              className="text-sm text-[#3A3836]"
              style={{ lineHeight: "1.8" }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function TwoColList({
  left,
  right,
}: {
  left: { heading: string; items: string[]; variant?: string };
  right: { heading: string; items: string[]; variant?: string };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ColCard col={left} />
      <ColCard col={right} />
    </div>
  );
}

function RoleList({ items }: { items: { abbr: string; description: string }[] }) {
  return (
    <div className="space-y-1">
      {items.map(({ abbr, description }) => (
        <motion.div
          key={abbr}
          className="flex gap-3 items-baseline px-2 py-2 -mx-2 rounded-lg"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
          transition={{ duration: 0.15 }}
        >
          <span className="text-sm font-semibold text-[#C07B50] w-10 shrink-0">{abbr}</span>
          <span className="text-sm text-[#3A3836] leading-relaxed">
            — {description}
          </span>
        </motion.div>
      ))}
    </div>
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
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#8C8B84] block mb-0.5">Limitation</span>
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
}: {
  items: { heading: string; body: string; bullets?: string[] }[];
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
            {String(i + 1).padStart(2, "0")}
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
function BACard({
  variant,
  heading,
  items,
  slideDir,
}: {
  variant: "before" | "after";
  heading: string;
  items: string[];
  slideDir: number;
}) {
  const prefersReduced = useReducedMotion();
  const glowControls  = useAnimation();

  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const isAfter = variant === "after";

  const hoverShadow = isAfter
    ? "0 4px 20px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(72,110,75,0.22)"
    : "0 4px 20px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(180,60,60,0.22)";

  const handleHoverStart = () => {
    if (!canHover || prefersReduced) return;
    if (isAfter) {
      glowControls.start({
        scale:   [0.02, 0.55, 1.5],
        opacity: [0,    1.0,  0.85],
        transition: { duration: 2.5, times: [0, 0.25, 1], ease: ["easeIn", [0.22, 1, 0.36, 1]] },
      });
    } else {
      glowControls.start({
        scale:   [2.5,  1.1,  1.0],
        opacity: [0,    1.0,  0.88],
        transition: { duration: 2.5, times: [0, 0.75, 1], ease: [0.22, 1, 0.36, 1] },
      });
    }
  };

  const handleHoverEnd = () => {
    if (!canHover || prefersReduced) return;
    glowControls.start({
      opacity: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  };

  return (
    <motion.div
      className={[
        "rounded-xl p-5 relative overflow-hidden",
        isAfter
          ? "bg-[#F0F6F2] border border-[#BCDBC7]"
          : "bg-[#FEF3EE] border border-[#F2C4A8]",
      ].join(" ")}
      initial={{ opacity: 0, x: slideDir }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      whileHover={canHover ? {
        y: -2,
        boxShadow: hoverShadow,
        transition: {
          y:         { duration: 0.18, ease: "easeOut" },
          boxShadow: { duration: 0.4,  ease: [0.22, 1, 0.36, 1] },
        },
      } : undefined}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glow layer — desktop only */}
      {!prefersReduced && canHover && (
        <motion.div
          aria-hidden="true"
          className="absolute pointer-events-none"
          initial={{ scale: isAfter ? 0.02 : 2.5, opacity: 0 }}
          animate={glowControls}
          style={{
            top: "50%", left: "50%",
            x: "-50%",  y: "-50%",
            width: "400px", height: "400px",
            borderRadius: "50%",
            background: isAfter
              ? "radial-gradient(circle, rgba(72,110,75,0.16) 0%, rgba(72,110,75,0.08) 40%, rgba(72,110,75,0) 70%)"
              : "radial-gradient(circle, rgba(180,60,60,0.16) 0%, rgba(180,60,60,0.08) 40%, rgba(180,60,60,0) 70%)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative" style={{ zIndex: 1 }}>
        <p className={[
          "text-xs font-semibold tracking-widest uppercase mb-3",
          isAfter ? "text-[#2E7D52]" : "text-[#C07B50]",
        ].join(" ")}>
          {heading}
        </p>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-[#3A3836] leading-relaxed flex gap-2">
              <span className={`mt-0.5 ${isAfter ? "text-[#2E7D52]" : "text-[#C07B50]"}`}>
                {isAfter ? "✓" : "—"}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function BeforeAfter({
  before,
  after,
}: {
  before: { heading: string; items: string[] };
  after: { heading: string; items: string[] };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <BACard variant="before" heading={before.heading} items={before.items} slideDir={-12} />
      <BACard variant="after"  heading={after.heading}  items={after.items}  slideDir={12}  />
    </div>
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
        <figcaption className="text-xs text-[#9C9A95] leading-snug">{caption}</figcaption>
      </div>
    </figure>
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
    case "decisions":        return <Decisions key={i} items={block.items} />;
    case "before-after":     return <BeforeAfter key={i} before={block.before} after={block.after} />;
    case "image-placeholder":return <ImagePlaceholder key={i} caption={block.caption} tall={block.tall} />;
    default:                 return null;
  }
}

// ── Section Component ──────────────────────────────────────────

function Section({ section, index }: { section: CaseStudySection; index: number }) {
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
        <span className="block text-[10px] text-[#8C8B84] tracking-widest uppercase font-medium mb-3">
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

function GenericBody({ project }: { project: Project }) {
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

  return (
    <MotionConfig reducedMotion="user">
    <article>
      {/* Hero — full-bleed bg, text anchored to shared 900px grid origin */}
      <div
        className="min-h-screen flex flex-col justify-center pt-24 pb-16"
        style={{ backgroundColor: project.coverColor }}
      >
        <div className="max-w-[900px] mx-auto w-full px-6 md:px-10 lg:pl-[150px] xl:pl-10">
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

      {/* Jump-to navigation — only for pages with rich content */}
      {content && <JumpToNav />}

      {/* Case study body — pb-[80px] on mobile/tablet clears the fixed 52px bottom bar */}
      {content ? (
        <div className="max-w-[900px] mx-auto px-6 md:px-10 lg:pl-[150px] xl:pl-10 pt-16 pb-[80px] xl:pb-16 space-y-0">
          {content.sections.map((section, i) => (
            <Section key={section.label} section={section} index={i} />
          ))}
        </div>
      ) : (
        <GenericBody project={project} />
      )}

      {/* Next project */}
      <div className="border-t border-[#E6E3DD] px-6 md:px-10 py-12 bg-[#F9F8F5]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-[#8C8B84] tracking-widest uppercase font-medium mb-1">
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
