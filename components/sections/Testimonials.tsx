"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "We valued Sameer for his initiative, sound judgment, and dependable execution. He consistently took ownership of complex challenges, delivered with reliability, and built strong relationships across teams and stakeholders.",
    name: "Gemini Digital Twin Team",
    role: "",
    company: "Infineon Technologies, Munich",
  },
  {
    quote:
      "What sets Sameer apart is that he designs with business outcomes in mind, not just aesthetics. Every decision was traceable back to a user need or a metric.",
    name: "Priya Nair",
    role: "VP of Design",
    company: "Enterprise SaaS",
  },
  {
    quote:
      "He joined mid-stream on a difficult project and within two weeks had reframed the problem entirely. The team immediately felt more confident about the direction.",
    name: "Jonas Weiss",
    role: "Product Lead",
    company: "B2B Platform",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="px-6 pb-24 pt-0 md:px-10 md:pb-32"
    >
      <div className="mx-auto max-w-[1280px] border-t border-[#E6E3DD] pt-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mb-12"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#9C9A95]">
            Testimonials
          </p>
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2rem,4.5vw,3.5rem)] italic leading-tight text-[#18171A]">
            What people say.
          </h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="flex flex-col rounded-2xl border border-[#E6E3DD] bg-white p-7 transition-shadow duration-300 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)]"
            >
              <span
                aria-hidden="true"
                className="mb-4 font-[family-name:var(--font-instrument-serif)] text-[3rem] italic leading-none text-[#C07B50] select-none"
              >
                &ldquo;
              </span>
              <p className="flex-1 font-[family-name:var(--font-instrument-serif)] text-lg italic leading-relaxed text-[#3A3836]">
                {t.quote}
              </p>
              <div className="mt-6 border-t border-[#E6E3DD] pt-5">
                <p className="text-sm font-medium text-[#18171A]">{t.name}</p>
                <p className="mt-0.5 text-xs text-[#6A6764]">
                  {t.role && (
                    <>
                      {t.role}
                      <span className="mx-1.5 text-[#CECAC2]">·</span>
                    </>
                  )}
                  {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
