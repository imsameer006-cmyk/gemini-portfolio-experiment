"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/data/projects";
import { useReveal, useRevealFade, staggerDelay } from "@/lib/motion";

const PROCESS_CONNECTOR_BACKGROUNDS = [
  "linear-gradient(90deg, var(--process-connector-soft-color) 0%, var(--process-connector-color) 100%)",
  "linear-gradient(90deg, var(--process-connector-color) 0%, var(--process-connector-color) 100%)",
  "linear-gradient(90deg, var(--process-connector-color) 0%, var(--process-connector-soft-color) 100%)",
] as const;

const PROCESS_TERMINAL_CONNECTOR =
  "linear-gradient(90deg, var(--process-connector-soft-color) 0%, transparent 100%)";

export default function Process() {
  const reveal = useReveal();
  const revealFade = useRevealFade();

  return (
    <section id="process" className="homepage-atmosphere home-process-atmosphere px-6 md:px-10 py-24 md:py-36">
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <motion.p
            {...reveal()}
            className="text-xs text-[var(--process-eyebrow-color)] tracking-widest uppercase font-medium mb-3"
          >
            How I Work
          </motion.p>
          <motion.h2
            {...reveal(0.06)}
            className="font-display max-w-[20ch] text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight text-[var(--process-heading-color)]"
          >
            Process as a design tool.
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              {...reveal(staggerDelay(i))}
              className="relative"
            >
              {/* Connector line (desktop only) */}
              {i < processSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute top-[18px] left-[4.25rem] h-px w-[calc(100%-4.625rem)]"
                  style={{ background: PROCESS_CONNECTOR_BACKGROUNDS[i] }}
                />
              )}

              {i === processSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute top-[18px] left-[4.25rem] h-px w-[calc(100%-4.625rem)]"
                  style={{ background: PROCESS_TERMINAL_CONNECTOR }}
                />
              )}

              <span className="font-[family-name:var(--font-numeral)] text-4xl text-[var(--process-number-color)] block mb-5 leading-none">
                {step.number}
              </span>
              <h3 className="text-[var(--process-title-color)] font-medium text-lg mb-3">{step.title}</h3>
              <p className="text-[var(--process-description-color)] text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          {...revealFade(0.4)}
          className="mt-16 text-xs text-[var(--process-note-color)] max-w-[48ch] leading-relaxed border-t border-[var(--process-divider-color)] pt-8"
        >
          The process is not linear. Real design work is recursive — each step
          sends you back to re-examine earlier assumptions with sharper clarity.
        </motion.p>
      </div>
    </section>
  );
}
