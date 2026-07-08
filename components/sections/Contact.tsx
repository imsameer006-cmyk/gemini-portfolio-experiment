"use client";

import { motion } from "framer-motion";
import { reveal, revealFade } from "@/lib/motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#141310] px-6 md:px-10 py-24 md:py-36"
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.p
          {...reveal()}
          className="text-xs text-[var(--color-accent)] tracking-widest uppercase font-medium mb-8"
        >
          Get in Touch
        </motion.p>

        <motion.h2
          {...reveal(0.08)}
          className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] text-[#EDEBE3] mb-6 max-w-[18ch]"
        >
          Let&apos;s build something good.
        </motion.h2>

        <motion.p
          {...revealFade(0.2)}
          className="text-[#847F76] text-base mb-12 max-w-[40ch] leading-relaxed"
        >
          Whether you&apos;re building a product from scratch, rethinking an existing
          experience, or just want to talk design — I&apos;d love to hear from you.
        </motion.p>

        <motion.div
          {...reveal(0.3)}
          className="flex flex-wrap gap-4"
        >
          <a
            href="mailto:hi@withsameer.design"
            className="inline-flex items-center gap-2 bg-[#EDEBE3] text-[#18171A] text-sm font-medium px-6 py-3.5 rounded-full hover:bg-[#C07B50] hover:text-white transition-all duration-200 min-h-[44px]"
          >
            hi@withsameer.design
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/uxd-sameer/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#2E2C27] text-[#9A9890] text-sm font-medium px-6 py-3.5 rounded-full hover:border-[#847F76] hover:text-[#EDEBE3] transition-all duration-200 min-h-[44px]"
          >
            LinkedIn →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
