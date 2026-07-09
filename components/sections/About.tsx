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
    <section id="about" className="px-6 pb-24 pt-0 md:px-10 md:pb-32 md:pt-0">
      <div className="mx-auto max-w-[1280px] border-t border-[#E6E3DD] pt-16">
        <p className="mb-10 text-xs font-medium uppercase tracking-widest text-[var(--color-text-accent)]">
          About
        </p>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch lg:gap-20">
          {/* LEFT — image stretches to full content height */}
          <motion.div
            className="lg:h-full"
            {...reveal()}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[#E6E3DD] bg-[#F4F1EC] lg:aspect-auto lg:h-full">
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
              className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2rem,4.5vw,3.5rem)] italic leading-tight text-[#18171A]"
            >
              The designer behind the systems.
            </motion.h2>

            <motion.p
              {...reveal(0.08)}
              className="mt-10 max-w-[760px] text-lg leading-relaxed text-[#3A3836] md:text-xl"
            >
              Product Designer with 10+ years across digital products — engineering, customer
              research, and business — specialising in enterprise UX for complex workflows. At
              Infineon and Rohde & Schwarz, I&apos;ve designed multi-stakeholder systems that
              translate complexity into intuitive, scalable experiences balancing user needs,
              business goals, and technical constraints.
            </motion.p>

            <motion.p
              {...reveal(0.14)}
              className="mt-10 max-w-[420px] font-[family-name:var(--font-instrument-serif)] text-[clamp(1.2rem,1.6vw,1.5rem)] italic leading-[1.45] text-[#5F5A54]"
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
