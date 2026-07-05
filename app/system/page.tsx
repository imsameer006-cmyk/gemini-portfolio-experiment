"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import JumpToNav, { toSectionId } from "@/components/ui/JumpToNav";

const EASE = [0.16, 1, 0.3, 1] as const;

const CHAPTERS = [
  "Hierarchy",
  "Color",
  "Typography",
  "Spacing",
  "Radius & Shadows",
  "Motion",
  "Components",
  "Accessibility",
  "Governance",
] as const;

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Chapter({
  num,
  eyebrow,
  heading,
  headingItalic,
  description,
  children,
}: {
  num: string;
  eyebrow: string;
  heading: string;
  headingItalic: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={toSectionId(eyebrow)} className="max-w-[1100px] mx-auto px-6 md:px-10 lg:pl-[150px] xl:pl-10 pt-16 md:pt-24 border-t border-[#E6E3DD]">
      <Reveal>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-accent)] mb-2.5">
          {num} — {eyebrow}
        </p>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(26px,3.6vw,36px)] italic leading-tight text-[#18171A] mb-2">
          {heading} <span className="italic">{headingItalic}</span>
        </h2>
        <p className="text-[15px] text-[#6A6764] max-w-[640px] leading-relaxed">{description}</p>
      </Reveal>
      {children}
    </section>
  );
}

function TokenRow({
  swatch,
  token,
  value,
  usage,
  notFor,
  badge,
}: {
  swatch: string;
  token: string;
  value: string;
  usage: string;
  notFor: string;
  badge?: string;
}) {
  return (
    <tr className="border-b border-[#E6E3DD] last:border-b-0">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-md border border-black/[0.07] shrink-0" style={{ background: swatch }} aria-hidden="true" />
          <span className="font-[family-name:var(--font-geist-mono)] text-[11.5px] whitespace-nowrap">{token}</span>
          {badge && (
            <span className="text-[9px] font-medium uppercase tracking-wide text-[var(--color-text-accent)] border border-[var(--color-accent)]/45 rounded-full px-2 py-0.5">
              {badge}
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3 font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--color-text-muted)] whitespace-nowrap">{value}</td>
      <td className="px-4 py-3 text-[13px] text-[#3A3836]">{usage}</td>
      <td className="px-4 py-3 text-[12px] text-[#B95A48]">{notFor}</td>
    </tr>
  );
}

export default function SystemPage() {
  return (
    <main className="bg-[#F9F8F5] pb-32">
      {/* ── Cover — data-cs-hero + md:min-h-screen match the project-hero shell so
          JumpToNav's scroll-visibility timing feels consistent across the site ── */}
      <div data-cs-hero="true" className="relative isolate overflow-hidden bg-[#F9F8F5]">
      <header className="relative flex md:min-h-screen flex-col justify-start max-w-[1100px] mx-auto px-6 md:px-10 lg:pl-[150px] xl:pl-10 pt-16 md:pt-24 pb-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-accent)] mb-3">
            Design System · Token Atlas
          </p>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(38px,6vw,60px)] italic leading-tight text-[#18171A] mb-5 max-w-[16ch]">
            Every value. Every rule.
          </h1>
          <p className="text-base text-[#6A6764] max-w-[620px] leading-relaxed mb-10">
            The complete, current reference for the system that renders this site — every value below
            was read directly from <code className="font-[family-name:var(--font-geist-mono)] text-[13px] bg-[#F2F0EB] px-1.5 py-0.5 rounded">app/globals.css</code> and
            the production component files, not written first and matched to code later.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#E6E3DD] border border-[#E6E3DD] rounded-xl overflow-hidden max-w-[720px]">
            {[
              { k: "Token layers", v: "3 — Primitive · Semantic · Component" },
              { k: "Color tokens", v: "13 light + 6 dark + copper ramp" },
              { k: "Components", v: "20 React components" },
              { k: "Case-study blocks", v: "26 block types" },
              { k: "Motion", v: "1 easing consumed · untokenized durations" },
              { k: "Contrast fails found", v: "4 — all fixed, 2026-07" },
            ].map((m) => (
              <div key={m.k} className="bg-white px-5 py-3.5">
                <p className="text-[9.5px] uppercase tracking-wide text-[var(--color-text-muted)] mb-1">{m.k}</p>
                <p className="text-[13px] font-medium text-[#18171A]">{m.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </header>
      </div>

      <JumpToNav sections={CHAPTERS.map((label) => ({ label }))} />

      {/* ── 01 Hierarchy ──────────────────────────────────────── */}
      <Chapter num="01" eyebrow="Hierarchy" heading="Three tiers." headingItalic="One system."
        description="Primitives hold raw values. Semantics describe intent. Components consume semantics only — never a raw hex, px, or ms. Skipping a tier is the defect this whole audit exists to catch.">
        <Reveal className="mt-8 border border-[#E6E3DD] rounded-2xl bg-white overflow-hidden overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-[#F2F0EB]">
                {["Tier", "Holds", "Example", "Rule"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-muted)] px-4 py-3 border-b border-[#E6E3DD]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[13px]">
              <tr className="border-b border-[#E6E3DD]">
                <td className="px-4 py-3 font-medium">1 · Primitive</td>
                <td className="px-4 py-3 text-[#6A6764]">Raw hex / px / ms / curves</td>
                <td className="px-4 py-3 font-[family-name:var(--font-geist-mono)] text-[11.5px]">#C07B50 · 16px</td>
                <td className="px-4 py-3 text-[#6A6764]">Meaningless until referenced</td>
              </tr>
              <tr className="border-b border-[#E6E3DD]">
                <td className="px-4 py-3 font-medium">2 · Semantic</td>
                <td className="px-4 py-3 text-[#6A6764]">Intent</td>
                <td className="px-4 py-3 font-[family-name:var(--font-geist-mono)] text-[11.5px]">color.accent · space.section</td>
                <td className="px-4 py-3 text-[#6A6764]">The only layer components see</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">3 · Component</td>
                <td className="px-4 py-3 text-[#6A6764]">Specific decisions</td>
                <td className="px-4 py-3 font-[family-name:var(--font-geist-mono)] text-[11.5px]">card.border.hover</td>
                <td className="px-4 py-3 text-[#6A6764]">One decision, made once</td>
              </tr>
            </tbody>
          </table>
        </Reveal>
      </Chapter>

      {/* ── 02 Color ──────────────────────────────────────────── */}
      <Chapter num="02" eyebrow="Color" heading="Every color." headingItalic="Every constraint."
        description="Thirteen light-palette tokens, a self-contained dark set, and the copper ramp — as they exist in app/globals.css right now, including the five remediated in the July 2026 audit.">
        <Reveal className="mt-8 border border-[#E6E3DD] rounded-2xl bg-white overflow-hidden overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[#F2F0EB]">
                {["Token", "Value", "Usage", "Not for"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-muted)] px-4 py-3 border-b border-[#E6E3DD]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <TokenRow swatch="#F9F8F5" token="color.warm-bg" value="#F9F8F5" usage="Body, heroes, page background" notFor="Cards needing separation" />
              <TokenRow swatch="#FFFFFF" token="color.surface" value="#FFFFFF" usage="Cards, testimonials, meta cells" notFor="Full-page background" />
              <TokenRow swatch="#F2F0EB" token="color.surface-tinted" value="#F2F0EB" usage="Process, placeholders, dots" notFor="Primary text surface below 4.5:1" />
              <TokenRow swatch="#E6E3DD" token="color.border" value="#E6E3DD" usage="Hairlines, dividers" notFor="Heavy separation" />
              <TokenRow swatch="#18171A" token="color.text" value="#18171A" usage="Headings — 16.4–17.9:1" notFor="Long-form body copy" />
              <TokenRow swatch="#3A3836" token="color.text-body" value="#3A3836" usage="Body/quote copy — 10.99:1" notFor="Headings" badge="new" />
              <TokenRow swatch="#6A6764" token="color.text-secondary" value="#6A6764" usage="Supporting body — 5.29:1" notFor="Primary headings" />
              <TokenRow swatch="#6E6D69" token="color.text-muted" value="#6E6D69" usage="Labels, captions — 4.55–5.18:1" notFor="Essential long-form content" badge="remediated" />
              <TokenRow swatch="#C07B50" token="color.accent" value="#C07B50" usage="Display sizes, decoration, dark surfaces" notFor="Body-size text, focus ring" />
              <TokenRow swatch="#96552F" token="color.text-accent" value="#96552F" usage="Copper at body/label size — 4.7–5.9:1" notFor="Large decorative moments" badge="new" />
              <TokenRow swatch="#A8643C" token="color.accent-hover" value="#A8643C" usage="Focus ring (color.focus-ring points here)" notFor="Resting states" badge="was unused" />
            </tbody>
          </table>
        </Reveal>
        <Reveal className="mt-5 border border-[#E6E3DD] rounded-2xl bg-white overflow-hidden overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[#F2F0EB]">
                {["Dark section token", "Value", "Usage", "Constraint"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-muted)] px-4 py-3 border-b border-[#E6E3DD]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <TokenRow swatch="#141310" token="color.dark" value="#141310" usage="Philosophy & Contact bands only" notFor="Any other section" />
              <TokenRow swatch="#1C1B17" token="color.dark-surface" value="#1C1B17" usage="Cards within dark bands" notFor="Light context" />
              <TokenRow swatch="#EDEBE3" token="color.dark-text" value="#EDEBE3" usage="Body on dark — 15.6:1" notFor="—" />
              <TokenRow swatch="#9A9890" token="color.dark-secondary" value="#9A9890" usage="Supporting on dark — 6.4:1" notFor="—" />
              <TokenRow swatch="#847F76" token="color.dark-muted" value="#847F76" usage="Labels on dark at real 12–16px — 4.67:1" notFor="—" badge="remediated" />
            </tbody>
          </table>
        </Reveal>
      </Chapter>

      {/* ── 03 Typography ──────────────────────────────────────── */}
      <Chapter num="03" eyebrow="Typography" heading="Two voices," headingItalic="strict roles."
        description="Instrument Serif italic carries narrative moments and is never body text. Geist carries facts. Letter-spacing lives only on labels.">
        <Reveal className="mt-8 divide-y divide-[#E6E3DD] border-t border-[#E6E3DD]">
          {[
            { tok: "type.hero", sample: "Building clarity out of complexity.", style: "font-[family-name:var(--font-instrument-serif)] italic text-[clamp(28px,4.2vw,44px)]", rule: "Instrument Serif italic · homepage hero only" },
            { tok: "type.section-heading", sample: "The system behind the site.", style: "font-[family-name:var(--font-instrument-serif)] italic text-[clamp(22px,3vw,30px)]", rule: "Major section / case-study headings" },
            { tok: "type.body", sample: "Explanatory paragraphs stay quiet and readable — secondary in tone, never in contrast.", style: "text-[15px] text-[#6A6764]", rule: "Geist 400 · relaxed leading" },
            { tok: "type.card-title", sample: "Gemini Digital Twin", style: "text-lg font-medium", rule: "Project names · truncate over prose" },
            { tok: "type.label", sample: "SELECTED WORK", style: "text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]", rule: "Section labels · keep short" },
            { tok: "type.meta", sample: "INFINEON · MUNICH · 2025", style: "text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)]", rule: "Dense card/hero metadata" },
          ].map((s) => (
            <div key={s.tok} className="grid gap-1.5 md:grid-cols-[200px_1fr_240px] md:items-center py-5">
              <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--color-text-accent)]">{s.tok}</span>
              <span className={s.style}>{s.sample}</span>
              <span className="text-[11.5px] text-[var(--color-text-muted)]">{s.rule}</span>
            </div>
          ))}
        </Reveal>
      </Chapter>

      {/* ── 04 Spacing ──────────────────────────────────────────── */}
      <Chapter num="04" eyebrow="Spacing" heading="One rhythm," headingItalic="not a feeling."
        description="Section padding roughly doubles from mobile to desktop (py-24 → md:py-36); everything else stays on Tailwind's default spacing scale rather than a custom one.">
        <Reveal className="mt-8 divide-y divide-[#E6E3DD] border-t border-[#E6E3DD]">
          {[
            { tok: "gap-5", px: "20px", use: "Card grids" },
            { tok: "px-6", px: "24px", use: "Mobile section gutters" },
            { tok: "px-6 md:px-10", px: "24px → 40px", use: "Editorial gutter, responsive" },
            { tok: "pt-16", px: "64px", use: "After border dividers" },
            { tok: "py-24", px: "96px", use: "Section padding, mobile" },
            { tok: "md:py-36", px: "144px", use: "Section padding, desktop" },
          ].map((s, i) => (
            <div key={s.tok} className="grid grid-cols-[150px_1fr_70px] md:grid-cols-[190px_1fr_90px] gap-4 items-center py-3.5">
              <span className="font-[family-name:var(--font-geist-mono)] text-[11.5px]">{s.tok}</span>
              <div className="h-3.5 rounded bg-[var(--color-accent-light)] border border-[var(--color-accent)]" style={{ width: `${20 + i * 16}%` }} />
              <span className="font-[family-name:var(--font-geist-mono)] text-[11.5px] text-[var(--color-text-muted)] text-right">{s.px}</span>
            </div>
          ))}
        </Reveal>
      </Chapter>

      {/* ── 05 Radius & Shadows ──────────────────────────────────── */}
      <Chapter num="05" eyebrow="Radius & Shadows" heading="Soft," headingItalic="deliberately flat."
        description="Radius counted directly from the codebase: rounded-full appears 50 times, rounded-2xl 16, rounded-xl 15, rounded-lg 7. Elevation is intentionally minimal — depth appears only where interaction earns it.">
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Reveal className="border border-[#E6E3DD] rounded-2xl bg-white p-6">
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Radius, by real usage count</p>
            <div className="flex flex-wrap gap-4">
              {[
                { r: "16px", cls: "rounded-2xl", n: "×16", label: "Cards" },
                { r: "12px", cls: "rounded-xl", n: "×15", label: "Meta blocks" },
                { r: "8px", cls: "rounded-lg", n: "×7", label: "Images" },
                { r: "999px", cls: "rounded-full", n: "×50", label: "Pills, buttons" },
              ].map((s) => (
                <div key={s.r} className="flex flex-col items-center gap-2">
                  <div className={`w-14 h-14 bg-[#F2F0EB] border border-[#CECAC2] ${s.cls}`} />
                  <span className="font-[family-name:var(--font-geist-mono)] text-[10.5px]">{s.r} {s.n}</span>
                  <span className="text-[10.5px] text-[var(--color-text-muted)]">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="border border-[#E6E3DD] rounded-2xl bg-[#F2F0EB] p-6 flex gap-6 items-center justify-center">
            <div className="text-center">
              <div className="w-28 h-16 bg-white border border-[#E6E3DD] rounded-xl mb-2" />
              <span className="text-[10.5px] text-[var(--color-text-muted)]">resting — border only</span>
            </div>
            <div className="text-center">
              <div className="w-28 h-16 bg-white border border-[#E6E3DD] rounded-xl mb-2" style={{ boxShadow: "0 8px 40px -8px rgba(0,0,0,0.12)" }} />
              <span className="text-[10.5px] text-[var(--color-text-muted)]">shadow.card.hover</span>
            </div>
          </Reveal>
        </div>
      </Chapter>

      {/* ── 06 Motion ──────────────────────────────────────────── */}
      <Chapter num="06" eyebrow="Motion" heading="One curve." headingItalic="Durations aren't tokenized yet."
        description="cubic-bezier(0.16, 1, 0.3, 1) is the only easing actually consumed in code — 19 separate occurrences, always as a literal array, since Framer Motion transitions run in JS and can't read a CSS variable at animation time. Two other easings (ease-in-out-soft, ease-spring) are defined in globals.css and never used anywhere.">
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Reveal className="border border-[#E6E3DD] rounded-2xl bg-white p-6">
            <p className="text-[13px] font-medium mb-4">The curve, drawn</p>
            <svg viewBox="0 0 260 160" width="100%" role="img" aria-label="Bezier easing curve 0.16, 1, 0.3, 1">
              <path d="M20 140 L240 140 M20 140 L20 20" stroke="#E6E3DD" strokeWidth="1" fill="none" />
              <path d="M20 140 C55 -20, 86 20, 240 20" stroke="#C07B50" strokeWidth="2" fill="none" />
              <circle cx="20" cy="140" r="3" fill="#18171A" />
              <circle cx="240" cy="20" r="3" fill="#18171A" />
              <text x="128" y="155" fontFamily="var(--font-geist-mono)" fontSize="10" fill="#6E6D69" textAnchor="middle">cubic-bezier(0.16, 1, 0.3, 1)</text>
            </svg>
          </Reveal>
          <Reveal className="border border-[#E6E3DD] rounded-2xl bg-white p-6">
            <p className="text-[13px] font-medium mb-4">Durations in real use (untokenized)</p>
            <div className="space-y-3">
              {[
                { ms: "150ms", n: "×1", w: "20%" },
                { ms: "200ms", n: "×19", w: "45%" },
                { ms: "300ms", n: "×9", w: "65%" },
                { ms: "500ms", n: "×4", w: "100%" },
              ].map((d) => (
                <div key={d.ms} className="grid grid-cols-[60px_1fr_50px] items-center gap-3">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[11px]">{d.ms}</span>
                  <div className="h-2 rounded-full bg-[#F2F0EB] overflow-hidden">
                    <div className="h-full bg-[var(--color-accent)] rounded-full" style={{ width: d.w }} />
                  </div>
                  <span className="font-[family-name:var(--font-geist-mono)] text-[10.5px] text-[var(--color-text-muted)] text-right">{d.n}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Chapter>

      {/* ── 07 Components ──────────────────────────────────────── */}
      <Chapter num="07" eyebrow="Components" heading="Twenty components," headingItalic="twenty-six blocks."
        description="Every React component in the site (excluding the internal hero-lab sandbox), plus every typed Block variant the case-study renderer understands.">
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Reveal className="border border-[#E6E3DD] rounded-2xl bg-white p-6">
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3">React components (20)</p>
            <div className="flex flex-wrap gap-1.5">
              {["Nav", "Footer", "Hero", "Work", "About", "ExperienceMoments", "Philosophy", "Process", "Testimonials", "Contact", "CaseStudy", "CaseStudyInProgress", "ProjectInProgress", "GeminiProjectHero", "CollabNetworkArt", "ProjectCard", "JumpToNav", "AnnotatedImage", "GeminiThumbnail", "CollabspaceThumbnail / DesignSystemThumbnail"].map((c) => (
                <span key={c} className="text-[11px] font-[family-name:var(--font-geist-mono)] border border-[#E6E3DD] rounded-full px-2.5 py-1 text-[#3A3836]">{c}</span>
              ))}
            </div>
          </Reveal>
          <Reveal className="border border-[#E6E3DD] rounded-2xl bg-white p-6">
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Case-study block types (26)</p>
            <div className="flex flex-wrap gap-1.5">
              {["paragraph", "subheading", "callout", "bullet-list", "meta-grid", "two-col-list", "role-list", "exploration-cards", "stages", "decisions", "before-after", "image-placeholder", "case-study-image", "case-study-video", "pull-quote", "closing-line", "context-cards", "synthesis-flow", "synthesis-table", "decisions-cdo", "publishing-workflow"].map((c) => (
                <span key={c} className="text-[11px] font-[family-name:var(--font-geist-mono)] border border-[#E6E3DD] rounded-full px-2.5 py-1 text-[#3A3836]">{c}</span>
              ))}
              {["drift-audit", "token-chain", "contrast-matrix", "component-anatomy", "benchmark-matrix"].map((c) => (
                <span key={c} className="text-[11px] font-[family-name:var(--font-geist-mono)] border border-[var(--color-accent)]/45 text-[var(--color-text-accent)] rounded-full px-2.5 py-1">{c}</span>
              ))}
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-3">Copper-bordered types were added for this case study — governed additions, same gate as everything else.</p>
          </Reveal>
        </div>
      </Chapter>

      {/* ── 08 Accessibility ──────────────────────────────────────── */}
      <Chapter num="08" eyebrow="Accessibility" heading="Computed," headingItalic="not claimed."
        description="Every rule below is enforced by a token or by markup — the full contrast audit, including the four real failures this system caught in itself, lives in the case study.">
        <Reveal className="mt-8 border border-[#E6E3DD] rounded-2xl bg-white overflow-hidden overflow-x-auto">
          <table className="w-full border-collapse min-w-[560px] text-[13px]">
            <thead>
              <tr className="bg-[#F2F0EB]">
                {["Rule", "Mechanism"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-muted)] px-4 py-3 border-b border-[#E6E3DD]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Text contrast ≥ 4.5:1 (AA)", "Computed per documented pairing — see the case study's contrast matrix"],
                ["Visible focus everywhere", ":focus-visible — 2px ring on color.focus-ring, 3px offset, global"],
                ["Reduced motion honored", "Global media query + useReducedMotion() per animated component"],
                ["Touch targets ≥ 44px", "Nav links, carousel dots, Contact button (min-h-[44px])"],
                ["Whole-card links labeled", "ProjectCard — one Link, aria-label = case-study title"],
              ].map(([rule, mech]) => (
                <tr key={rule} className="border-b border-[#E6E3DD] last:border-b-0">
                  <td className="px-4 py-3">{rule}</td>
                  <td className="px-4 py-3 text-[#6A6764]">{mech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Chapter>

      {/* ── 09 Governance ──────────────────────────────────────── */}
      <Chapter num="09" eyebrow="Governance" heading="The gates" headingItalic="every change passes."
        description="What makes an AI-native build reliable: an agent generates freely inside this contract, and these five gates define its edges.">
        <Reveal className="mt-8 flex flex-col gap-px bg-[#E6E3DD] border border-[#E6E3DD] rounded-2xl overflow-hidden">
          {[
            ["G1", "Token reference only", "No raw hex, px, or ms in new component code — grep is the gatekeeper."],
            ["G2", "Documented before shipped", "A new pattern that isn't in this atlas doesn't merge."],
            ["G3", "Contrast is arithmetic", "Every new color pairing is computed against WCAG AA before it renders."],
            ["G4", "Motion obeys the curve", "One easing everywhere, reduced-motion respected globally."],
            ["G5", "Human signs the decision", "The agent executes; taste and every token value stay mine."],
          ].map(([n, t, d]) => (
            <div key={n} className="bg-white px-6 py-4 grid grid-cols-[32px_1fr] gap-4 items-baseline">
              <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[var(--color-text-accent)]">{n}</span>
              <div>
                <p className="text-[13.5px] font-medium text-[#18171A]">{t}</p>
                <p className="text-[12px] text-[#6A6764] mt-0.5">{d}</p>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-5 border border-[#E6E3DD] rounded-2xl bg-white overflow-hidden overflow-x-auto">
          <table className="w-full border-collapse min-w-[420px] text-[13px]">
            <thead>
              <tr className="bg-[#F2F0EB]">
                {["Roadmap", "Note"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-muted)] px-4 py-3 border-b border-[#E6E3DD]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E6E3DD]">
                <td className="px-4 py-3 font-medium">Icon system</td>
                <td className="px-4 py-3 text-[#6A6764]">No documented stroke weight, grid, or sizing tokens yet</td>
              </tr>
              <tr className="border-b border-[#E6E3DD]">
                <td className="px-4 py-3 font-medium">Motion durations</td>
                <td className="px-4 py-3 text-[#6A6764]">Used consistently (200/300/500ms) but not tokenized in CSS</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Data-visualization palette</td>
                <td className="px-4 py-3 text-[#6A6764]">No dedicated categorical ramp defined yet</td>
              </tr>
            </tbody>
          </table>
        </Reveal>
      </Chapter>

      {/* ── Footer nav ──────────────────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 lg:pl-[150px] xl:pl-10 pt-16">
        <Reveal className="border-t border-[#E6E3DD] pt-8 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[12.5px] text-[var(--color-text-muted)]">Token Atlas · generated from the July 2026 audit</span>
          <Link
            href="/work/design-system"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-accent)] hover:text-[var(--color-accent-hover)] transition-colors duration-200"
          >
            ← Read the case study
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
