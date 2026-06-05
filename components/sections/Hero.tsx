"use client";

import { ArrowDown, DownloadSimple } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const SIGNALS = [
  { value: "B2B", label: "Product focus" },
  { value: "UX", label: "Research led" },
  { value: "MVP", label: "Launch work" },
  { value: "SYS", label: "Systems thinking" },
];

function SignalPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
      className="mt-7 grid max-w-[660px] grid-cols-2 border-y border-[#E6E3DD] sm:grid-cols-4 md:mt-8"
      aria-label="Portfolio focus areas"
      role="list"
    >
      {SIGNALS.map((signal, index) => (
        <div
          key={signal.label}
          className={[
            "relative px-3 py-3 text-center",
            index === 0 || index === 1 ? "border-b border-[#CECAC2] sm:border-b-0" : "",
            index === 0 || index === 2 ? "after:absolute after:right-0 after:top-1/2 after:h-8 after:w-px after:-translate-y-1/2 after:bg-[rgba(206,202,194,0.58)] after:content-['']" : "",
            index === 1 ? "sm:after:absolute sm:after:right-0 sm:after:top-1/2 sm:after:h-8 sm:after:w-px sm:after:-translate-y-1/2 sm:after:bg-[rgba(206,202,194,0.58)] sm:after:content-['']" : "",
          ].join(" ")}
          role="listitem"
        >
          <div className="font-display text-lg italic leading-none text-[#18171A] md:text-xl">
            {signal.value}
          </div>
          <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.08em] text-[#9C9A95] md:text-[10px]">
            {signal.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      aria-label="Introduction"
      className="relative min-h-[100svh] overflow-hidden px-6 pb-14 pt-16 md:px-10 md:pb-16 md:pt-20"
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #E6E3DD 1px, transparent 0)`,
          backgroundSize: "32px 32px",
          opacity: 0.5,
        }}
      />

      <div className="relative mx-auto min-h-[calc(100svh-7.5rem)] w-full max-w-[1280px] pt-3 md:min-h-[calc(100svh-9rem)] md:pt-0">
        <div className="max-w-[840px]">
          <motion.div
            {...FADE_UP}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-[#3A7A54]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#3A7A54]" />
            Open to product design roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mb-5 max-w-[16ch] text-[clamp(3rem,8vw,7rem)] italic leading-[1.05] text-[#18171A]"
          >
            Building clarity{" "}
            <span className="not-italic">out of</span>{" "}
            complexity.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 max-w-[58ch] text-base leading-relaxed text-[#6A6764] md:whitespace-nowrap md:text-lg"
          >
            I design products that work for people and perform for business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={scrollToWork}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#18171A] px-5 py-3 text-sm font-medium text-[#F9F8F5] transition-colors duration-200 hover:bg-[#C07B50]"
            >
              View work
              <ArrowDown size={14} weight="bold" aria-hidden="true" />
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#E6E3DD] px-5 py-3 text-sm font-medium text-[#6A6764] transition-all duration-200 hover:border-[#C07B50] hover:text-[#18171A]"
            >
              Resume
              <DownloadSimple size={14} weight="bold" aria-hidden="true" />
            </a>
          </motion.div>

          <SignalPanel />
        </div>

      </div>

      {/* Decorative accent line at bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-6 md:left-10 right-6 md:right-10 h-px bg-[#E6E3DD] origin-left"
      />
    </section>
  );
}
