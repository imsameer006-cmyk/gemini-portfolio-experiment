"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { useReveal, staggerDelay } from "@/lib/motion";
import TransitionLink from "@/components/ui/TransitionLink";

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
      <TransitionLink
        href={`/enter?next=${encodeURIComponent(`/work/${project.slug}`)}`}
        prefetch={false}
        className={[
          // Base layout & structure
          "group flex h-full flex-col overflow-hidden rounded-2xl relative border-[1.5px] border-[rgba(182,255,0,0.1)]",

          // 1. HIGH-CONTRAST FROSTED COLOR TINT
          // Shifted from dark base to a richer, higher-contrast emerald tint with high blur
          "bg-[#0D2E1A]/40 backdrop-blur-xl",

          // 2. INTERNAL SURFACE SHEEN (Top-down ambient light reflection)
          // Adds a soft specular highlight across the card face so it catches ambient light
          "bg-gradient-to-b from-white/[0.08] via-transparent to-black/30",

          // HOVER STATE
          // Brightens the internal glass medium when hovered for immediate feedback
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:border-[rgba(182,255,0,0.3)]",
          "hover:bg-[#133F25]/55 hover:from-white/[0.14]",
          "hover:-translate-y-1.5",
          "hover:shadow-[0_16px_36px_-12px_rgba(3,15,8,0.8)]"
        ].join(" ")}
        aria-label={`View case study: ${project.title}`}
      >
        {/* Visual panel */}
        <div
          className="w-full aspect-[460/256] shrink-0 rounded-t-2xl border-b border-[rgba(182,255,0,0.15)] bg-[#092212] lg:transition-[filter] lg:duration-500 lg:group-hover:saturate-[1.05]"
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
            <span className="font-mono text-xs uppercase tracking-wider text-[#B6FF00]/80">
              {project.category}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#B6FF00]/80">{project.year}</span>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-[#E8E3D5] leading-snug mb-2 transition-[font-weight,opacity] duration-200 group-hover:font-semibold group-hover:opacity-95">
            {project.title}
          </h3>

          <p className="text-body-compact text-[#D9EBE1]/70 leading-relaxed mb-6 line-clamp-2">
            {project.description}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.client && (
                <span className="whitespace-nowrap rounded-full border border-[#B6FF00]/20 bg-white/5 px-2.5 py-1 text-xs font-medium text-[#D9EBE1]">
                  {project.client}
                </span>
              )}
              <span className="basis-full md:basis-0 w-0 h-0" aria-hidden="true" />
              <span className="whitespace-nowrap rounded-full border border-[#B6FF00]/20 bg-white/5 px-2.5 py-1 text-xs font-medium text-[#D9EBE1]">
                {project.impact}
              </span>
            </div>
            <div className="flex justify-end">
              <span className="flex items-center gap-1 font-mono text-xs font-medium text-[#B6FF00] no-underline opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
                View case study
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </TransitionLink>
    </motion.article>
  );
}
