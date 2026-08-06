"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useReveal } from "@/lib/motion";

const FACTS = [
  "Systems Design",
  "Enterprise UX",
  "User Research",
  "Product Strategy",
  "Complex Workflows",
  "AI-Native Products",
];

export default function About() {
  const reveal = useReveal();

  return (
    <section
      id="about"
      className="relative bg-[#051209] px-6 pb-[52px] pt-10 md:px-10 md:pb-[68px] md:pt-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 w-[calc(100%-3rem)] max-w-[1280px] -translate-x-1/2 border-t border-white/10 md:w-[calc(100%-5rem)]" />
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-10 text-xs font-semibold uppercase tracking-widest text-[var(--about-eyebrow-color)]">
          About
        </p>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch lg:gap-20">
          {/* LEFT — image stretches to full content height */}
          <motion.div
            className="lg:h-full"
            {...reveal()}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[var(--about-border-color)] bg-[var(--about-portrait-surface-color)] shadow-[var(--about-portrait-shadow)] lg:aspect-auto lg:h-full">
              <Image
                src="/about-portrait-2026.jpeg"
                alt="Sameer Gautam seated in a workspace"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-[60%_11%] scale-[1.36] origin-[60%_11%]"
                priority={false}
              />
            </div>
          </motion.div>

          {/* RIGHT — headline at top, body below */}
          <div>
            <motion.h2
              {...reveal()}
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight text-[var(--about-heading-color)]"
            >
              The designer behind the systems.
            </motion.h2>

            <motion.p
              {...reveal(0.08)}
              className="mt-10 max-w-[760px] text-lg leading-relaxed text-[var(--about-body-color)] md:text-xl"
            >
              Product Designer with 10+ years across digital products — engineering, customer
              research, and business — specialising in enterprise UX for complex workflows. At
              Infineon and Rohde & Schwarz, I&apos;ve designed multi-stakeholder systems that
              translate complexity into intuitive, scalable experiences balancing user needs,
              business goals, and technical constraints.
            </motion.p>

            <motion.p
              {...reveal(0.14)}
              className="mt-10 max-w-[420px] font-display text-[clamp(1.2rem,1.6vw,1.5rem)] font-semibold leading-relaxed text-[var(--about-supporting-color)]"
            >
              Think in systems.
              <br />
              Design for humans.
              <br />
              Build with evidence.
              <br />
              Simplify complexity.
            </motion.p>

            <motion.div
              {...reveal(0.18)}
              className="mt-12 flex flex-wrap gap-2"
            >
              {FACTS.map((fact) => (
                <span
                  key={fact}
                  className="cursor-default rounded-full border border-[var(--about-chip-border-color)] bg-[var(--about-chip-background-color)] px-3 py-1.5 text-xs font-medium text-[var(--about-chip-text-color)]"
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
