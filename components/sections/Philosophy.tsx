"use client";

import { motion } from "framer-motion";
import { beliefs } from "@/lib/data/projects";

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="bg-[#141310] px-6 md:px-10 py-24 md:py-36"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs text-[#6A6860] tracking-widest uppercase font-medium mb-10"
        >
          Philosophy
        </motion.p>

        {/* Core statement */}
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.2] text-[#EDEBE3] mb-6 max-w-[26ch]"
        >
          &ldquo;Design is the reduction of complexity to its essential form — and then making that form beautiful.&rdquo;
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-[#6A6860] text-sm mb-20 max-w-[36ch] leading-relaxed"
        >
          I&apos;ve spent years at the intersection of product strategy and interaction craft.
          This is how I think about the work.
        </motion.p>

        {/* Divider */}
        <div className="border-t border-[#2E2C27] mb-16" />

        {/* Beliefs grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs text-[#6A6860] font-medium tracking-widest uppercase block mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[#EDEBE3] font-medium text-base md:text-lg leading-snug mb-3">
                {belief.heading}
              </h3>
              <p className="text-[#6A6860] text-sm leading-relaxed">{belief.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
