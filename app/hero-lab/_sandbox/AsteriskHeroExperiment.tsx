"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SPOKES = [
  { label: "Research", angle: -60, tag: "01" },
  { label: "Strategy", angle: 0, tag: "02" },
  { label: "Frontend", angle: 60, tag: "03" },
  { label: "Backend", angle: 120, tag: "04" },
  { label: "Systems", angle: 180, tag: "05" },
  { label: "Brainstorming", angle: 240, tag: "06" },
];

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function AsteriskHeroArt() {
  const [activeSpoke, setActiveSpoke] = useState<string | null>(null);

  return (
    <div className="relative flex h-[380px] w-full items-center justify-center overflow-visible md:h-[460px]">
      <svg
        viewBox="-260 -220 520 440"
        fill="none"
        className="h-full w-full max-w-[620px] overflow-visible"
      >
        <defs>
          <radialGradient id="hubBurst" cx="0%" cy="0%" r="70%" fx="0%" fy="0%">
            <stop offset="0%" stopColor="#C07B50" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#C07B50" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#18171A" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C07B50" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C07B50" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <motion.circle
          cx="0"
          cy="0"
          r="140"
          fill="url(#hubBurst)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 1], opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {SPOKES.map((spoke, i) => {
          const rad = (spoke.angle * Math.PI) / 180;
          const radius = 120;
          const labelRadius = 155;
          const x2 = Math.cos(rad) * radius;
          const y2 = Math.sin(rad) * radius;
          const labelX = Math.cos(rad) * labelRadius;
          const labelY = Math.sin(rad) * labelRadius;
          const isHovered = activeSpoke === spoke.label;

          return (
            <g
              key={spoke.label}
              className="group cursor-pointer"
              onMouseEnter={() => setActiveSpoke(spoke.label)}
              onMouseLeave={() => setActiveSpoke(null)}
            >
              <motion.line
                x1="0"
                y1="0"
                x2={x2}
                y2={y2}
                stroke={isHovered ? "#C07B50" : "#18171A"}
                strokeWidth={isHovered ? "2.5" : "1.2"}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: isHovered ? 1 : 0.3 }}
                transition={{ duration: 1, delay: 0.1 * i }}
              />

              <motion.circle
                cx={x2}
                cy={y2}
                r={isHovered ? "4.5" : "2.5"}
                fill={isHovered ? "#C07B50" : "#18171A"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + 0.05 * i }}
              />

              <foreignObject
                x={labelX - 55}
                y={labelY - 14}
                width="110"
                height="28"
                className="pointer-events-auto overflow-visible"
              >
                <div
                  className={[
                    "flex items-center justify-center text-center text-[11px] font-medium uppercase tracking-wide transition-all duration-300",
                    isHovered ? "scale-110 font-semibold text-[#C07B50]" : "text-[#18171A]/60",
                  ].join(" ")}
                >
                  <span className="mr-1 text-[9px] opacity-40">{spoke.tag}</span>
                  {spoke.label}
                </div>
              </foreignObject>
            </g>
          );
        })}

        <motion.path
          d="M -103 60 C -150 110, -180 140, -260 170"
          stroke="url(#threadGradient)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1.6, delay: 1, ease: "easeInOut" }}
        />

        <motion.g
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <circle cx="0" cy="0" r="16" fill="#18171A" />
          <circle cx="0" cy="0" r="5" fill="#C07B50" />
        </motion.g>
      </svg>
    </div>
  );
}

function AsteriskLabNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection] = useState<string | null>(null);
  const pathname = usePathname() || "/";
  const isWorkPage = pathname.startsWith("/work/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (isWorkPage) return href === "#work";
    return activeSection === href;
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={[
          "absolute left-0 right-0 top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-[#E6E3DD] bg-[#F9F8F5]/90 backdrop-blur-md" : "bg-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto flex h-[54px] max-w-[1360px] items-center justify-between px-6 md:px-10">
          <div className="flex flex-1 items-center">
            <Link
              href="/hero-lab"
              className="text-sm font-semibold tracking-wider text-[#18171A] transition-colors hover:text-[#C07B50]"
            >
              SAMEER<span className="text-[#C07B50]">.</span>
            </Link>
          </div>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNavClick(href)}
                  className={[
                    "relative cursor-pointer text-[13px] font-normal transition-colors duration-200",
                    isActive(href)
                      ? "font-medium text-[#18171A] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-[#C07B50]"
                      : "text-[#18171A]/50 hover:text-[#18171A]",
                  ].join(" ")}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-1 items-center justify-end gap-4">
            <a
              href="https://www.linkedin.com/in/uxd-sameer/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-xs font-medium text-[#18171A]/60 transition-colors hover:text-[#C07B50] md:inline-flex"
            >
              LinkedIn ↗
            </a>

            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-5 w-6 flex-col items-center justify-center gap-1.5 opacity-70 md:hidden"
            >
              <span className={`block h-0.5 w-full bg-[#18171A] transition-all ${mobileOpen ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-full bg-[#18171A] transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-full bg-[#18171A] transition-all ${mobileOpen ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="absolute inset-0 z-40 flex flex-col bg-[#F9F8F5] px-6 pt-[60px]">
          <ul className="flex flex-col gap-6 pt-8">
            {links.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNavClick(href)}
                  className="text-2xl font-medium text-[#18171A] hover:text-[#C07B50]"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export function AsteriskHeroExperiment() {
  const [isHeroIntroExpanded, setIsHeroIntroExpanded] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F9F8F5] text-[#18171A] selection:bg-[#C07B50]/20">
      <AsteriskLabNav />

      <section
        aria-label="Introduction"
        className="relative flex overflow-hidden px-6 pb-12 pt-[84px] md:min-h-[100svh] md:items-center md:px-10 md:pt-[100px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #E6E3DD 1px, transparent 0)",
            backgroundSize: "40px 40px",
            opacity: 0.5,
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="max-w-[760px] lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 font-display text-[clamp(2.2rem,5vw,3.75rem)] font-black leading-[1.1] text-[#18171A]"
            >
              Hi, I connect the dots.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="text-base leading-relaxed text-[#6A6764] md:text-lg"
            >
              I&apos;m curious and inquisitive by nature — I guess it&apos;s my hidden superpower. For me,
              nature is the biggest design inspiration.
              {isHeroIntroExpanded && (
                <>
                  {" "}Desert heat from the Middle East warms Europe, ocean water becomes clouds,
                  and travels far to water distant lands. Nothing in an ecosystem is wasted —
                  everything is interwoven, serving the system or failing to survive. I think in
                  systems the same way, treating data, feedback, and failure as signal, not noise.
                  And I prefer honest feedback over praise that sounds good but gives nothing to
                  course-correct on.{" "}
                  <button
                    type="button"
                    onClick={() => setIsHeroIntroExpanded(false)}
                    className="inline text-[#18171A] underline decoration-[#C07B50]/60 underline-offset-4 transition-colors duration-200 hover:text-[#C07B50]"
                  >
                    Less
                  </button>
                </>
              )}
              {!isHeroIntroExpanded && (
                <>
                  {" "}
                  <button
                    type="button"
                    onClick={() => setIsHeroIntroExpanded(true)}
                    className="inline text-[#18171A] underline decoration-[#C07B50]/60 underline-offset-4 transition-colors duration-200 hover:text-[#C07B50]"
                  >
                    More
                  </button>
                </>
              )}
            </motion.p>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <AsteriskHeroArt />
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-6 right-6 h-px origin-left bg-[#E6E3DD] md:left-10 md:right-10"
        />
      </section>
    </div>
  );
}
