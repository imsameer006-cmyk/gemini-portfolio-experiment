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
        className="group flex flex-col h-full bg-[var(--work-card-surface-color)] border border-[var(--work-card-border-color)] rounded-2xl overflow-hidden shadow-[var(--work-card-shadow)] hover:border-2 hover:border-[var(--work-card-border-color-hover)] hover:shadow-[var(--work-card-shadow-hover)] transition-[border-color,border-width,box-shadow] duration-300"
        aria-label={`View case study: ${project.title}`}
      >
        {/* Visual panel */}
        <div
          className="w-full aspect-[460/256] overflow-hidden shrink-0 rounded-t-2xl border-b border-[var(--work-thumbnail-border-color)] bg-[var(--work-thumbnail-background-color)] lg:transition-[filter] lg:duration-500 lg:group-hover:saturate-[1.05]"
          style={{ backgroundColor: "var(--work-thumbnail-background-color)" }}
        >
          {project.thumbnail ? (
            <div className="w-full h-full">
              {project.thumbnail}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-[family-name:var(--font-numeral)] text-4xl md:text-5xl text-[var(--work-card-title-color)]/20 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-7 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="rounded-full border border-[var(--work-pill-default-border-color)] bg-[var(--work-pill-default-surface-color)] px-2.5 py-1 text-xs font-medium text-[var(--work-pill-default-text-color)] tracking-wide uppercase">
              {project.category}
            </span>
            <span className="text-xs text-[var(--work-card-metadata-color)]">{project.year}</span>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-[var(--work-card-title-color)] leading-snug mb-2 transition-[font-weight,opacity] duration-200 group-hover:font-semibold group-hover:opacity-95">
            {project.title}
          </h3>

          <p className="text-body-compact text-[var(--work-card-description-color)] leading-relaxed mb-6 line-clamp-2">
            {project.description}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.client && (
                <span className="whitespace-nowrap text-xs font-medium text-[var(--work-pill-company-text-color)] bg-[var(--work-pill-company-surface-color)] px-2.5 py-1 rounded-full">
                  {project.client}
                </span>
              )}
              <span className="basis-full md:basis-0 w-0 h-0" aria-hidden="true" />
              <span className="whitespace-nowrap text-xs text-[var(--work-pill-achievement-text-color)] border border-[var(--work-pill-default-border-color)] bg-[var(--work-pill-achievement-surface-color)] px-2.5 py-1 rounded-full">
                {project.impact}
              </span>
            </div>
            <div className="flex justify-end">
              <span className="flex items-center gap-1 rounded-full border border-[var(--work-card-cta-border-color)] px-3 py-1.5 text-sm text-[var(--work-card-cta-color)] font-medium opacity-60 group-hover:border-[var(--work-card-cta-border-color-hover)] group-hover:opacity-100 transition-[border-color,opacity] duration-200">
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
