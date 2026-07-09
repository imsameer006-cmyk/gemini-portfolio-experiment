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
      className="bg-[#141310] px-6 md:px-10 py-24 md:py-36"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section label */}
        <motion.p
          {...reveal()}
          className="text-xs text-[var(--color-accent)] tracking-widest uppercase font-medium mb-10"
        >
          My Design Philosophy
        </motion.p>

        {/* Core statement */}
        <motion.blockquote
          {...reveal(0.08)}
          className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.2] text-[#EDEBE3] mb-6 max-w-[26ch]"
        >
          &ldquo;Design is the practice of understanding complexity, uncovering what matters, and shaping it into experiences people can understand and use.&rdquo;
        </motion.blockquote>

        <motion.p
          {...revealFade(0.2)}
          className="text-[#847F76] text-sm mb-20 max-w-[36ch] leading-relaxed"
        >
          Over the years, I&apos;ve learned that good design isn&apos;t about adding more&mdash;it&apos;s
          about understanding what matters and making it clear.
        </motion.p>

        {/* Divider */}
        <div className="border-t border-[#2E2C27] mb-16" />

        {/* Beliefs grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-12">
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief.heading}
              {...reveal(staggerDelay(i))}
              className="grid h-full grid-rows-[auto_auto_1fr] content-start"
            >
              <span className="mb-5 block text-xs font-medium uppercase tracking-widest text-[#847F76]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-4 max-w-[24ch] text-base font-medium leading-snug text-[#EDEBE3] md:text-lg">
                {belief.heading}
              </h3>
              <p className="max-w-[38ch] text-sm leading-relaxed text-[#847F76]">
                {belief.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
