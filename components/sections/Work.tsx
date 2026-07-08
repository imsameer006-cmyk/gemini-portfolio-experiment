"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data/projects";
import { reveal, revealFade } from "@/lib/motion";

const featured = projects.filter((p) => p.featured && !p.hidden);

export default function Work() {
  return (
    <section id="work" className="px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-36">
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <motion.p
              {...reveal()}
              className="text-xs text-[var(--color-text-accent)] tracking-widest uppercase font-medium mb-3"
            >
              Selected Work
            </motion.p>
            <motion.h2
              {...reveal(0.06)}
              className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-[#18171A]"
            >
              What I&apos;ve shipped.
            </motion.h2>
          </div>

          <motion.p
            {...revealFade(0.15)}
            className="text-sm text-[#6E6D69] md:text-right max-w-[28ch] leading-relaxed"
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
