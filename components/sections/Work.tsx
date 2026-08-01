"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data/projects";
import { useReveal, useRevealFade } from "@/lib/motion";

const featured = projects.filter((p) => p.featured && !p.hidden);

export default function Work() {
  const reveal = useReveal();
  const revealFade = useRevealFade();

  return (
    <section
      id="work"
      className="bg-gradient-to-b from-[#092212] via-[#071A0E] to-[#051209] px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-[104px]"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <motion.p
              {...reveal()}
              className="mb-3 font-mono text-xs uppercase tracking-widest text-[#B6FF00] opacity-90"
            >
              Selected Work
            </motion.p>
            <motion.h2
              {...reveal(0.06)}
              className="font-display text-4xl font-bold tracking-tight text-[#E8E3D5] md:text-5xl"
            >
              What I&apos;ve shipped.
            </motion.h2>
          </div>

          <motion.p
            {...revealFade(0.15)}
            className="max-w-sm text-sm font-normal leading-relaxed text-[#D9EBE1]/70 md:text-right"
          >
            Each project is a case study in systems thinking and human-centered design.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className={[
          "grid gap-5",
          featured.length === 1 ? "grid-cols-1 max-w-[420px]" :
          featured.length === 2 ? "grid-cols-1 md:grid-cols-2" :
                                  "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        ].join(" ")}>
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
