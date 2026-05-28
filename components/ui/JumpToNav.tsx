"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Must match the section labels in the case study data
const SECTIONS = [
  { label: "Overview" },
  { label: "Challenge" },
  { label: "Context" },
  { label: "Research" },
  { label: "Exploration" },
  { label: "Solution" },
  { label: "Design Decisions" },
  { label: "Architecture" },
  { label: "Interaction Flow" },
  { label: "Validation" },
  { label: "Impact" },
];

// ID format must match what Section component generates
export const toSectionId = (label: string) =>
  `cs-${label.toLowerCase().replace(/\s+/g, "-")}`;

// With bottom bar there's no top obstruction beyond the nav itself
const BOTTOM_SCROLL_OFFSET = 80; // nav (64) + gap (16)
const DESKTOP_SCROLL_OFFSET = 88; // nav (64) + gap (24)

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Shared section list used inside the bottom drawer ────────────
function DrawerList({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (label: string) => void;
}) {
  return (
    <>
      {SECTIONS.map(({ label }) => {
        const isActive = toSectionId(label) === activeId;
        return (
          <button
            key={label}
            role="option"
            aria-selected={isActive}
            onClick={() => onSelect(label)}
            className={[
              "w-full flex items-center gap-3 px-6 h-[48px] text-sm text-left",
              "transition-colors duration-150 focus-visible:outline-none focus-visible:bg-[#F2F0EB]",
              isActive
                ? "text-[#18171A] font-medium"
                : "text-[#6A6764] hover:text-[#18171A]",
            ].join(" ")}
          >
            {/* Left accent line */}
            <span
              className={[
                "w-[2px] h-[14px] rounded-full shrink-0 transition-all duration-200",
                isActive ? "bg-[#C07B50]" : "bg-transparent",
              ].join(" ")}
              aria-hidden="true"
            />
            {label}
          </button>
        );
      })}
    </>
  );
}

export default function JumpToNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(toSectionId("Overview"));
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  const bottomBarRef = useRef<HTMLDivElement>(null);

  // ── Visibility: IntersectionObserver on hero ─────────────────
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("article > div:first-child");
    if (!hero) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      // rootMargin: shrink the viewport top by 64px (nav height)
      // so nav appears the moment hero clears the sticky header
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  // ── Hide desktop sidebar when footer enters the viewport ─────
  useEffect(() => {
    const footer = document.querySelector<HTMLElement>("footer");
    if (!footer) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsNearBottom(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  // ── Active section via Intersection Observer ─────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ label }) => {
      const el = document.getElementById(toSectionId(label));
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(toSectionId(label));
        },
        { rootMargin: "-15% 0px -65% 0px", threshold: 0 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Close drawer on outside click ───────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (bottomBarRef.current?.contains(e.target as Node)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Close on Escape ──────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // ── Scroll helper ────────────────────────────────────────────
  const scrollTo = (label: string) => {
    const id = toSectionId(label);
    const el = document.getElementById(id);
    if (!el) return;

    const isDesktop = window.innerWidth >= 1024;
    const offset = isDesktop ? DESKTOP_SCROLL_OFFSET : BOTTOM_SCROLL_OFFSET;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    prefersReduced
      ? window.scrollTo(0, top)
      : window.scrollTo({ top, behavior: "smooth" });

    setActiveId(id);
    setIsOpen(false);
  };

  const activeLabel =
    SECTIONS.find((s) => toSectionId(s.label) === activeId)?.label ?? "Overview";

  // ── Transition config ────────────────────────────────────────
  const transition = { duration: 0.2, ease: "easeOut" as const };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          DESKTOP — fixed left sidebar, vertically centred
          Outer div owns the breakpoint; motion.nav owns the animation.
          ═══════════════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        <AnimatePresence>
          {isVisible && !isNearBottom && (
            <motion.nav
              aria-label="Jump to section"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={transition}
              className="fixed left-8 z-40 top-[105px]"
            >
              <ul className="flex flex-col gap-3 w-[140px]" role="listbox" aria-label="Page sections">
                {SECTIONS.map(({ label }) => {
                  const isActive = toSectionId(label) === activeId;
                  return (
                    <li key={label} className="flex items-center gap-2" role="presentation">
                      {/* 2px left accent bar */}
                      <span
                        className={[
                          "w-[2px] h-3 rounded-full shrink-0 transition-all duration-200",
                          isActive ? "bg-[#C07B50]" : "bg-transparent",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                      <button
                        role="option"
                        aria-selected={isActive}
                        onClick={() => scrollTo(label)}
                        className={[
                          "text-left text-[11px] tracking-[0.08em] uppercase leading-snug",
                          "transition-colors duration-200 focus-visible:outline-none",
                          isActive
                            ? "text-[#18171A] font-medium"
                            : "text-[#9C9A95] hover:text-[#6A6764]",
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════
          TABLET + MOBILE — fixed bottom bar with slide-up drawer
          Outer div owns the breakpoint; motion.div owns the animation.
          ═══════════════════════════════════════════════════════ */}
      <div className="lg:hidden">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              ref={bottomBarRef}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={transition}
              className="fixed bottom-0 inset-x-0 z-40"
            >
            {/* ── Slide-up drawer ─────────────────────────────── */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={transition}
                  role="listbox"
                  aria-label="Page sections"
                  id="jumpto-drawer"
                  className="bg-[#F9F8F5] border-t border-[#E6E3DD] rounded-t-[12px] overflow-y-auto"
                  style={{ maxHeight: "60vh" }}
                >
                  <DrawerList activeId={activeId} onSelect={scrollTo} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Trigger bar ─────────────────────────────────── */}
            <button
              onClick={() => setIsOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-controls="jumpto-drawer"
              aria-label={`Jump to section. Current: ${activeLabel}`}
              className="w-full h-[52px] flex items-center bg-[#F9F8F5] border-t border-[#E6E3DD]"
            >
              {/* Inner content aligned to the 900px shared grid origin */}
              <div className="max-w-[900px] mx-auto w-full flex items-center justify-between px-6 md:px-10">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[11px] text-[#9C9A95] font-medium tracking-[0.08em] uppercase shrink-0">
                    Jump to
                  </span>
                  <span className="text-[#D4D0C8] shrink-0 select-none">|</span>
                  <span className="text-sm font-medium text-[#18171A] truncate">
                    {activeLabel}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#9C9A95] shrink-0 ml-4"
                >
                  <ChevronDown />
                </motion.span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

    </>
  );
}
