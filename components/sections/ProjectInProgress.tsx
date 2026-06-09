"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CaseStudyInProgress } from "./CaseStudyInProgress";
import JumpToNav from "@/components/ui/JumpToNav";
import type { Project } from "@/lib/types";

const EASE = [0.16, 1, 0.3, 1] as const;

function InProgressHero({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const metadata = project.heroMetadata ?? [];

  return (
    <div className="relative isolate overflow-hidden bg-[#F9F8F5]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #E6E3DD 1px, transparent 0)",
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />
      <section
        aria-labelledby="project-hero-title"
        className="relative flex min-h-screen flex-col justify-start px-6 pb-[88px] pt-[72px] md:px-10"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
            className="mb-8"
          >
            <p className="mb-[28px] text-[12px] font-[525] uppercase tracking-widest text-[#1C1A16]/40">
              {project.category}
            </p>
            <h1
              id="project-hero-title"
              className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2.50rem,3.74vw,4.06rem)] italic leading-tight text-[#1C1A16] max-w-[670px]"
            >
              {project.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.1, ease: EASE }}
          >
            <p className="mb-[32px] max-w-[560px] text-base leading-relaxed text-[#1C1A16]/60">
              {project.description}
            </p>

            {metadata.length > 0 && (
              <div
                className="grid w-fit grid-cols-[auto_auto] sm:grid-cols-[auto_auto_auto] overflow-hidden rounded-xl border border-[#E6E3DD] bg-[#E6E3DD] gap-px"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
              >
                {metadata.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1.5 bg-white px-6 py-3">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-[#1C1A16]/[0.38]">
                      {label}
                    </span>
                    <span className="text-[15px] font-normal text-[#1C1A16]/85 leading-snug">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-[20px] flex flex-wrap gap-[10px]">
              {project.impact && (
                <span className="rounded-full bg-[#1C1A16]/[0.09] px-3 py-1.5 text-sm font-medium text-[#1C1A16]">
                  {project.impact}
                </span>
              )}
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#C8BFB2] px-3 py-1.5 text-[12.5px] text-[#1C1A16]/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

interface Props {
  project: Project;
}

export default function ProjectInProgress({ project }: Props) {
  return (
    <>
      <InProgressHero project={project} />
      <CaseStudyInProgress />
      <JumpToNav disabled />
    </>
  );
}
