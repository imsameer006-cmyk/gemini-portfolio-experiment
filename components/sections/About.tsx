"use client";

import { motion } from "framer-motion";

const FACTS = [
  "10+ years",
  "Enterprise products",
  "Workflow systems",
  "D2C experiences",
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px] border-t border-[#E6E3DD] pt-16">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#9C9A95]">
              About
            </p>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2rem,4.5vw,3.5rem)] italic leading-tight text-[#18171A]">
              The designer behind the systems.
            </h2>
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[760px] text-lg leading-relaxed text-[#3A3836] md:text-xl"
            >
              I&apos;m a Product Designer with 10+ years of experience designing enterprise products,
              internal tools, D2C experiences, and complex workflow systems. I work at the
              intersection of user needs, business goals, and technical constraints&mdash;transforming
              ambiguity into clear, scalable solutions that simplify complexity, drive business
              outcomes, and help people get work done.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap gap-2"
            >
              {FACTS.map((fact) => (
                <span
                  key={fact}
                  className="rounded-full border border-[#E6E3DD] bg-white px-3 py-1.5 text-xs font-medium text-[#6A6764]"
                >
                  {fact}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
