"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        href={`/work/${project.slug}`}
        className="group flex flex-col h-full bg-[#FFFFFF] border border-[#E6E3DD] rounded-2xl overflow-hidden hover:border-[#C07B50]/40 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] transition-[border-color,box-shadow] duration-300"
        aria-label={`View case study: ${project.title}`}
      >
        {/* Visual panel */}
        <div
          className="w-full aspect-[460/256] overflow-hidden shrink-0 lg:transition-transform lg:duration-500 lg:group-hover:scale-[1.02] lg:origin-bottom"
          style={{ backgroundColor: project.coverColor }}
        >
          {project.thumbnail ? (
            <div className="w-full h-full">
              {project.thumbnail}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-[family-name:var(--font-instrument-serif)] italic text-4xl md:text-5xl text-[#18171A]/20 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-7 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#C07B50] tracking-wide uppercase">
              {project.category}
            </span>
            <span className="text-xs text-[#9C9A95]">{project.year}</span>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-[#18171A] leading-snug mb-2 group-hover:text-[#C07B50] transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-sm text-[#6A6764] leading-relaxed mb-6 line-clamp-2">
            {project.description}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.client && (
                <span className="whitespace-nowrap text-xs font-medium text-[#18171A] bg-[#F2F0EB] px-2.5 py-1 rounded-full">
                  {project.client}
                </span>
              )}
              <span className="basis-full md:basis-0 w-0 h-0" aria-hidden="true" />
              <span className="whitespace-nowrap text-xs text-[#6A6764] border border-[#E6E3DD] px-2.5 py-1 rounded-full">
                {project.impact}
              </span>
            </div>
            <div className="flex justify-end">
              <span className="flex items-center gap-1 text-sm text-[#C07B50] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View case study
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
