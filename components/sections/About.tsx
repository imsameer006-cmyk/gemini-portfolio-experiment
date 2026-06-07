"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FACTS = [
  "Systems Design",
  "Enterprise UX",
  "User Research",
  "Product Strategy",
  "Complex Workflows",
  "AI-Native Products",
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
            <div className="mt-10 max-w-[360px] overflow-hidden rounded-lg border border-[#E6E3DD] bg-[#F4F1EC]">
              <Image
                src="/about-portrait.png"
                alt="Sameer Gautam seated in a workspace"
                width={720}
                height={900}
                sizes="(min-width: 1024px) 360px, 100vw"
                className="aspect-[4/5] h-auto w-full object-cover object-[50%_35%]"
                priority={false}
              />
            </div>
          </motion.div>

          <div className="lg:mt-[188px] lg:flex lg:min-h-[450px] lg:flex-col lg:justify-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[760px] text-lg leading-relaxed text-[#3A3836] md:text-xl"
            >
              Product Designer with 6+ years of experience designing enterprise products,
              internal tools, D2C experiences, and complex workflow systems. Drawing on 10+
              years across digital products and design, I translate complexity into intuitive,
              scalable experiences that balance user needs, business goals, and technical
              constraints.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
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
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
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
