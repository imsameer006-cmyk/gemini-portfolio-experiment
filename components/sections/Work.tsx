"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data/projects";

const featured = projects.filter((p) => p.featured);

export default function Work() {
  return (
    <section id="work" className="px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-36">
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs text-[#9C9A95] tracking-widest uppercase font-medium mb-3"
            >
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-[family-name:var(--font-instrument-serif)] italic text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-[#18171A]"
            >
              What I&apos;ve shipped.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-sm text-[#9C9A95] md:text-right max-w-[28ch] leading-relaxed"
          >
            Each project is a case study in systems thinking and human-centered design.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* All projects link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-[#6A6764] border border-[#E6E3DD] rounded-full px-5 py-2.5 hover:border-[#C07B50] hover:text-[#C07B50] transition-all duration-200 min-h-[44px]"
          >
            View all projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
