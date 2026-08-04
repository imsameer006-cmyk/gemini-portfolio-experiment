"use client";

import { motion } from "framer-motion";
import { beliefs } from "@/lib/data/projects";
import { useReveal, useRevealFade, staggerDelay } from "@/lib/motion";

export default function Philosophy() {
  const reveal = useReveal();
  const revealFade = useRevealFade();

  return (
    <section
      id="philosophy"
      className="relative bg-[var(--philosophy-background-color)] px-6 pb-8 pt-10 md:px-10 md:pb-12 md:pt-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 w-[calc(100%-3rem)] max-w-[1280px] -translate-x-1/2 border-t border-white/10 md:w-[calc(100%-5rem)]" />
      <div className="max-w-[1280px] mx-auto">
        {/* Section label */}
        <motion.p
          {...reveal()}
          className="text-xs text-[var(--philosophy-eyebrow-color)] tracking-widest uppercase font-semibold mb-10"
        >
          My Design Philosophy
        </motion.p>

        {/* Core statement */}
        <motion.blockquote
          {...reveal(0.08)}
          className="mb-6 max-w-[26ch] font-quote text-[clamp(1.75rem,4vw,3.25rem)] leading-tight text-[var(--philosophy-heading-color)]"
        >
          &ldquo;For me, design is the practice of understanding complexity, uncovering what matters, and shaping it into experiences people can understand and use.&rdquo;
        </motion.blockquote>

        <motion.p
          {...revealFade(0.2)}
          className="text-[var(--philosophy-body-color)] text-sm mb-20 max-w-[36ch] leading-relaxed"
        >
          Over the years, I&apos;ve learned that good design isn&apos;t about adding more&mdash;it&apos;s
          about understanding what matters and making it clear.
        </motion.p>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Beliefs grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-12">
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief.heading}
              {...reveal(staggerDelay(i))}
              className="grid h-full grid-rows-[auto_auto_1fr] content-start"
            >
              <span className="mb-2 block font-mono text-sm font-semibold uppercase tracking-widest text-[var(--philosophy-secondary-color)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-4 max-w-[24ch] text-base font-semibold leading-snug text-[var(--philosophy-principle-title-color)] md:text-lg">
                {belief.heading}
              </h3>
              <p className="max-w-[38ch] text-sm leading-relaxed text-[var(--philosophy-principle-body-color)]">
                {belief.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
