"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useReveal, staggerDelay } from "@/lib/motion";

const TESTIMONIALS = [
  {
    quote:
      "Sameer has the rare ability to dive deep into the topics that are usually avoided due to complexity. Very knowledgeable and very kind — always happy to help and contribute. Was a great pleasure to work with him.",
    name: "Yeva Lalayan",
    role: "Research & Design Lead",
    company: "Infineon Technologies",
    avatar: "/yeva.png",
  },
  {
    quote:
      "We valued Sameer for his initiative, sound judgment, and dependable execution. He consistently took ownership of complex challenges, delivered with reliability, and built strong relationships across teams and stakeholders.",
    name: "Gemini Digital Twin Team",
    role: "",
    company: "Infineon Technologies, Munich",
    logo: "/Infineon-logo.png",
  },
  {
    quote:
      "Sameer stood out for his adaptability, independent mindset, and ability to transform challenges into practical outcomes. He learned quickly, navigated demanding situations with composure, and earned the trust of colleagues and stakeholders through his collaborative and solution-oriented approach.",
    name: "14PL Team",
    role: "",
    company: "Rohde & Schwarz, Munich",
    logo: "/rohde-logo.png",
  },
  {
    quote:
      "Sameer was part of our Product Lifecycle Management team as a UX Designer Working Student. I came across some of his other work during design reviews and team meetings, which consistently stood out as thoughtful and user-centric. Sameer brought a positive attitude to the team and was always receptive to feedback. His contributions were a valuable addition to our team environment.",
    name: "Jürgen Engelbrecht",
    role: "Agile Coach",
    company: "",
    avatar: "/Jurgen.png",
  },
];

export default function Testimonials() {
  const reveal = useReveal();

  return (
    <section
      id="testimonials"
      className="bg-[var(--testimonials-background-color)] px-6 pb-24 pt-0 md:px-10 md:pb-32"
    >
      <div className="mx-auto max-w-[1280px] pt-16">
        <motion.div
          {...reveal()}
          className="mb-12"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--testimonials-eyebrow-color)]">
            Testimonials
          </p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight text-[var(--testimonials-heading-color)]">
            What people say.
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              {...reveal(staggerDelay(i))}
              className="premium-white-surface flex flex-col rounded-2xl border border-[var(--testimonials-card-border-color)] p-7 transition-[border-color,border-width,box-shadow] duration-300 hover:border-[1.5px] hover:border-[var(--testimonials-card-border-hover)] [--surface-shadow-hover:var(--testimonials-card-shadow-hover)] [--surface-shadow:var(--testimonials-card-shadow)]"
            >
              <span
                aria-hidden="true"
                className="mb-4 font-quote text-[3rem] leading-none text-[var(--testimonials-quote-mark-color)] select-none"
              >
                &ldquo;
              </span>
              <p className="flex-1 font-quote text-lg leading-relaxed text-[var(--testimonials-quote-text-color)]">
                {t.quote}
              </p>
              <div className="mt-6 border-t border-[var(--testimonials-divider-color)] pt-5 flex items-center gap-3">
                {"avatar" in t && t.avatar && (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={39}
                    height={39}
                    unoptimized
                    className="rounded-full object-cover shrink-0"
                  />
                )}
                {"logo" in t && t.logo && (
                  <Image
                    src={t.logo}
                    alt={t.company}
                    width={39}
                    height={39}
                    unoptimized
                    className="shrink-0"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-[var(--testimonials-person-name-color)]">{t.name}</p>
                  <p className="mt-0.5 text-xs text-[var(--testimonials-person-meta-color)]">
                    {t.role && (
                      <>
                        {t.role}
                        <span className="mx-1.5 text-[var(--testimonials-divider-color)]">·</span>
                      </>
                    )}
                    {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
