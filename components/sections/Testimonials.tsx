"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { homepageContent } from "@/lib/data/homepage";
import { useReveal, staggerDelay } from "@/lib/motion";

export default function Testimonials() {
  const reveal = useReveal();

  return (
    <section
      id="testimonials"
      className="px-6 pb-24 pt-0 md:px-10 md:pb-32"
    >
      <div className="mx-auto max-w-[1280px] border-t border-[#E6E3DD] pt-16">
        <motion.div
          {...reveal()}
          className="mb-12"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--color-text-accent)]">
            {homepageContent.testimonials.eyebrow}
          </p>
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2rem,4.5vw,3.5rem)] italic leading-tight text-[#18171A]">
            {homepageContent.testimonials.headline}
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {homepageContent.testimonials.items.map((t, i) => (
            <motion.div
              key={t.name}
              {...reveal(staggerDelay(i))}
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
              <div className="mt-6 border-t border-[#E6E3DD] pt-5 flex items-center gap-3">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
