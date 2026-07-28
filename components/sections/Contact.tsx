"use client";

import { motion } from "framer-motion";
import { useReveal, useRevealFade } from "@/lib/motion";

export default function Contact() {
  const reveal = useReveal();
  const revealFade = useRevealFade();

  return (
    <section
      id="contact"
      className="bg-[var(--contact-background-color)] px-6 md:px-10 py-24 md:py-36"
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.p
          {...reveal()}
          className="text-xs text-[var(--contact-eyebrow-color)] tracking-widest uppercase font-bold mb-8"
        >
          Get in Touch
        </motion.p>

        <motion.h2
          {...reveal(0.08)}
          className="mb-6 max-w-[18ch] font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] text-[var(--contact-heading-color)]"
        >
          Let&apos;s build something good.
        </motion.h2>

        <motion.p
          {...revealFade(0.2)}
          className="text-[var(--contact-body-color)] text-base font-medium mb-12 max-w-[40ch] leading-relaxed"
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
            className="inline-flex items-center gap-2 bg-[var(--contact-primary-button-background)] text-[var(--contact-primary-button-text)] text-sm font-medium px-6 py-3.5 rounded-full hover:bg-[var(--contact-primary-button-background-hover)] hover:text-[var(--contact-primary-button-text-hover)] hover:shadow-lg transition-all duration-300 min-h-[44px]"
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
            className="inline-flex items-center gap-2 border-[1.5px] border-[var(--contact-secondary-button-border)] bg-transparent text-[var(--contact-secondary-button-text)] text-sm font-medium px-6 py-3.5 rounded-full hover:bg-[var(--contact-secondary-button-background-hover)] hover:text-[var(--contact-secondary-button-text-hover)] transition-all duration-300 min-h-[44px]"
          >
            LinkedIn →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
