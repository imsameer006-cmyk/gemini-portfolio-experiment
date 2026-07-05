"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CaseStudyInProgress() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F9F8F5]">
      <div className="mx-auto max-w-[900px] px-6 pb-32 pt-0 md:px-10 lg:pl-[150px]">
        <div className="border-t border-[#E6E3DD]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
            className="pt-16 lg:pt-20"
          >
            {/* Status indicator */}
            <div className="mb-8 flex items-center gap-2.5">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#C07B50]"
                aria-hidden="true"
              />
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#6E6D69]">
                Case Study In Progress
              </span>
            </div>

            {/* Headline */}
            <p className="font-[family-name:var(--font-instrument-serif)] text-[clamp(1.5rem,2.2vw,2.25rem)] italic leading-tight text-[#18171A] mb-5">
              This project has been delivered.
            </p>

            {/* Body */}
            <p className="max-w-[44ch] text-base leading-relaxed text-[#6A6764]">
              The case study is currently being documented and will be published
              soon.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
