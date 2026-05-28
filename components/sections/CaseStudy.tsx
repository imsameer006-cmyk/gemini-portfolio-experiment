"use client";

import { useRef, useState, useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
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

function TwoColList({
  left,
  right,
}: {
  left: { heading: string; items: string[]; variant?: string };
  right: { heading: string; items: string[]; variant?: string };
}) {
  const variantStyles: Record<string, string> = {
    positive: "bg-[#F0F6F2] border border-[#BCDBC7]",
    warning: "bg-[#FEF3EE] border border-[#F2C4A8]",
    neutral: "bg-[#F2F0EB] border border-[#E6E3DD]",
  };
  const iconMap: Record<string, string> = {
    positive: "✓",
    warning: "△",
    neutral: "·",
  };
  const textMap: Record<string, string> = {
    positive: "text-[#2E7D52]",
    warning: "text-[#C07B50]",
    neutral: "text-[#6A6764]",
  };

  const renderCol = (col: { heading: string; items: string[]; variant?: string }) => {
    const v = col.variant ?? "neutral";
    return (
      <motion.div
        className={`rounded-xl p-5 flex flex-col gap-3 ${variantStyles[v]}`}
        whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <p className={`text-xs font-semibold tracking-wide uppercase ${textMap[v]}`}>
          {iconMap[v]} {col.heading}
        </p>
        <ul className="space-y-2">
          {col.items.map((item, i) => (
            <li key={i} className="text-sm text-[#3A3836] leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {renderCol(left)}
      {renderCol(right)}
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

      {/* ── Single-pass shimmer overlay ──────────────────────────
          Mounted fresh each time animKey increments (key= forces
          remount → CSS animation restarts from the beginning).
          pointer-events-none so it never blocks pill interaction.  */}
      {/* ── Shimmer overlay — direction handled entirely in CSS ── */}
      {animKey > 0 && (
        <div
          key={animKey}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10 stages-shimmer"
        />
      )}

      {/* ── Desktop (lg+): horizontal scrollable row, → arrows ── */}
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

      {/* ── Mobile/tablet (below lg): vertical stack, ↓ arrows ── */}
      {/* No items-center on flex parents → default stretch makes every
          pill span the full container width for uniform sizing.
          Arrows get their own justify-center wrapper to stay centred.  */}
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

function BeforeAfter({
  before,
  after,
}: {
  before: { heading: string; items: string[] };
  after: { heading: string; items: string[] };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <motion.div
        className="bg-[#FEF3EE] border border-[#F2C4A8] rounded-xl p-5"
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", transition: { duration: 0.18, ease: "easeOut" } }}
      >
        <p className="text-xs font-semibold text-[#C07B50] tracking-widest uppercase mb-3">
          {before.heading}
        </p>
        <ul className="space-y-2">
          {before.items.map((item, i) => (
            <li key={i} className="text-sm text-[#3A3836] leading-relaxed flex gap-2">
              <span className="text-[#C07B50] mt-0.5">—</span>
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        className="bg-[#F0F6F2] border border-[#BCDBC7] rounded-xl p-5"
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", transition: { duration: 0.18, ease: "easeOut" } }}
      >
        <p className="text-xs font-semibold text-[#2E7D52] tracking-widest uppercase mb-3">
          {after.heading}
        </p>
        <ul className="space-y-2">
          {after.items.map((item, i) => (
            <li key={i} className="text-sm text-[#3A3836] leading-relaxed flex gap-2">
              <span className="text-[#2E7D52] mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
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
        {/* Label — inline above heading, shares same left origin as all content */}
        <span className="block text-[10px] text-[#8C8B84] tracking-widest uppercase font-medium mb-3">
          {section.label}
        </span>

        {/* Section heading */}
        {section.heading && (
          <h2 className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(1.5rem,3vw,2.25rem)] leading-snug text-[#18171A] max-w-[22ch] mb-8">
            {section.heading}
          </h2>
        )}

        {/* Content blocks */}
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
