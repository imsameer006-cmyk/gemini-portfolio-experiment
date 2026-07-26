"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { useReveal, staggerDelay } from "@/lib/motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const reveal = useReveal();

  return (
    <motion.article
      {...reveal(staggerDelay(index))}
      className="h-full"
    >
      <Link
        href={`/work/${project.slug}`}
        className="group flex flex-col h-full bg-[var(--work-card-surface-color)] border border-[var(--work-card-text-color)]/20 rounded-2xl overflow-hidden hover:border-[var(--work-card-text-color)]/45 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] transition-[border-color,box-shadow] duration-300"
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
              <span className="font-[family-name:var(--font-numeral)] text-4xl md:text-5xl text-[var(--work-card-text-color)]/20 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-7 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[var(--work-card-text-color)] tracking-wide uppercase">
              {project.category}
            </span>
            <span className="text-xs text-[var(--work-card-text-color)]/70">{project.year}</span>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-[var(--work-card-text-color)] leading-snug mb-2 transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-body-compact text-[var(--work-card-description-color)]/70 leading-relaxed mb-6 line-clamp-2">
            {project.description}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.client && (
                <span className="whitespace-nowrap text-xs font-medium text-[var(--work-card-pill-text-color)] bg-[var(--work-card-pill-surface-color)] px-2.5 py-1 rounded-full">
                  {project.client}
                </span>
              )}
              <span className="basis-full md:basis-0 w-0 h-0" aria-hidden="true" />
              <span className="whitespace-nowrap text-xs text-[var(--work-card-pill-text-color)] border border-[var(--work-card-pill-text-color)]/20 bg-[var(--work-card-pill-surface-color)] px-2.5 py-1 rounded-full">
                {project.impact}
              </span>
            </div>
            <div className="flex justify-end">
              <span className="flex items-center gap-1 text-sm text-[var(--work-card-icon-color)] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
