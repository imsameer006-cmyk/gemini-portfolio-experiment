"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/data/projects";

const PROCESS_CONNECTOR_BACKGROUNDS = [
  "linear-gradient(90deg, #F2F0EB 0%, #EEEAE5 55%, #E9E5DF 100%)",
  "linear-gradient(90deg, #E9E5DF 0%, #E2DED8 50%, #DAD6CE 100%)",
  "linear-gradient(90deg, #DAD6CE 0%, #D4D0C8 45%, #CECAC2 100%)",
] as const;

export default function Process() {
  return (
    <section id="process" className="px-6 md:px-10 py-24 md:py-36 bg-[#F2F0EB]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs text-[#9C9A95] tracking-widest uppercase font-medium mb-3"
          >
            How I Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-[#18171A] max-w-[20ch]"
          >
            Process as a design tool.
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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

              <span className="font-[family-name:var(--font-instrument-serif)] italic text-4xl text-[#C07B50]/30 block mb-5 leading-none">
                {step.number}
              </span>
              <h3 className="text-[#18171A] font-medium text-lg mb-3">{step.title}</h3>
              <p className="text-[#6A6764] text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-16 text-xs text-[#9C9A95] max-w-[48ch] leading-relaxed border-t border-[#E6E3DD] pt-8"
        >
          The process is not linear. Real design work is recursive — each step
          sends you back to re-examine earlier assumptions with sharper clarity.
        </motion.p>
      </div>
    </section>
  );
}
