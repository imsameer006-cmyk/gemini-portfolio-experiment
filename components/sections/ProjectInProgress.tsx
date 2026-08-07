"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import CollabNetworkArt from "@/components/sections/CollabNetworkArt";
import type { Project } from "@/lib/types";

const EASE = [0.16, 1, 0.3, 1] as const;

export function InProgressHero({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const metadata = project.heroMetadata ?? [];

  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInteraction = () => {
    setHasInteracted(true);
  };

  return (
    <div data-cs-hero="true" className="relative isolate overflow-hidden bg-[#092212]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(176,188,100,0.22) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          opacity: 0.38,
        }}
      />

      <section
        aria-labelledby="project-hero-title"
        className="relative flex md:min-h-screen flex-col justify-start px-6 pb-16 md:pb-[88px] pt-[72px] md:px-10"
      >
        {/* Hero art — radial community network, desktop only */}
        <div className="hidden md:block">
          <CollabNetworkArt onInteract={handleInteraction} />
        </div>

        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
            className="mb-8"
          >
            <p className="mb-[28px] text-[12px] font-[525] uppercase tracking-widest text-[#B6FF00]">
              {project.category}
            </p>
            <h1
              id="project-hero-title"
              className="font-display max-w-[670px] text-[clamp(2.50rem,3.74vw,4.06rem)] font-bold leading-tight text-[#E8E3D5]"
            >
              {project.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.1, ease: EASE }}
          >
            <p className="mb-[32px] max-w-[560px] text-base leading-relaxed text-[#D9EBE1]/70">
              {project.description}
            </p>

            {metadata.length > 0 && (
              <div
                className="grid w-fit grid-cols-[auto_auto] sm:grid-cols-[auto_auto_auto] overflow-hidden rounded-xl border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.1)] gap-px"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
              >
                {metadata.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1.5 bg-[#061E10] px-6 py-3">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-[#D9EBE1]/40">
                      {label}
                    </span>
                    <span className="text-[15px] font-normal text-[#E8E3D5]/85 leading-snug">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-[20px] flex max-w-[1280px] items-end justify-between">
              <div className="flex max-w-[720px] flex-wrap gap-[10px]">
                {project.client && (
                  <span className="rounded-full bg-[#E8E3D5]/10 px-3 py-1.5 text-sm font-medium text-[#E8E3D5]">
                    {project.client}
                  </span>
                )}
                {project.impact && (
                  <span className="rounded-full border border-[#D9EBE1]/30 px-3 py-1.5 text-[12.5px] text-[#D9EBE1]/70">
                    {project.impact}
                  </span>
                )}
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#D9EBE1]/30 px-3 py-1.5 text-[12.5px] text-[#D9EBE1]/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <AnimatePresence>
                {!hasInteracted ? (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none hidden md:flex items-center gap-2.5 pb-1 opacity-0"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 0.62, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.45, delay: 1.1, ease: EASE }}
                  >
                    <motion.span
                      className="block h-2.5 w-2.5 rounded-full border border-[#C07B50]/75 bg-[#F9F8F5] shadow-[0_0_0_1px_rgba(192,123,80,0.08)]"
                      animate={{
                        boxShadow: [
                          "0 0 0 1px rgba(192,123,80,0.18), 0 0 0 0 rgba(192,123,80,0.18)",
                          "0 0 0 1px rgba(192,123,80,0.22), 0 0 0 8px rgba(192,123,80,0.12)",
                          "0 0 0 1px rgba(192,123,80,0.16), 0 0 0 15px rgba(192,123,80,0)",
                        ],
                        scale: [1, 1.12, 1],
                      }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C07B50]/85">
                      Explore the Collabspace
                    </span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
