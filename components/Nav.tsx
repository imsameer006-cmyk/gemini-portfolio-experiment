"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkedinLogo } from "@phosphor-icons/react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

type NavSurface = "light" | "dark";

function NavAsterisk() {
  return (
    <svg
      viewBox="0 0 500 500"
      aria-hidden="true"
      className="h-[15px] w-[15px] flex-shrink-0"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M255 145L243 212L190 185L223 234L110 205L205 258L160 300L230 262L230 365L257 262L345 325L282 250L390 130L278 222Z"
        fill="currentColor"
        shapeRendering="geometricPrecision"
      />
    </svg>
  );
}

function parseRgb(color: string) {
  const match = color.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;

  const [r, g, b, a = "1"] = match[1].split(",").map((part) => part.trim());
  const alpha = Number.parseFloat(a);

  if (alpha <= 0.05) return null;

  return {
    r: Number.parseFloat(r),
    g: Number.parseFloat(g),
    b: Number.parseFloat(b),
  };
}

function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const toLinear = (value: number) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export default function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [surface, setSurface] = useState<NavSurface>("light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  const isWorkPage = pathname.startsWith("/work/");

  useEffect(() => {
    let frame = 0;

    const readSurface = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);

      const header = headerRef.current;
      const rect = header?.getBoundingClientRect();
      const sampleX = Math.round(window.innerWidth / 2);
      const sampleY = Math.round((rect?.bottom ?? 56) + 8);
      const stack = document.elementsFromPoint(sampleX, sampleY);
      const target = stack.find((el) => !header?.contains(el));
      let node = target instanceof HTMLElement ? target : null;

      while (node && node !== document.body) {
        const declared = node.dataset.navSurface;
        if (declared === "light" || declared === "dark") {
          setSurface(declared);
          return;
        }

        const rgb = parseRgb(getComputedStyle(node).backgroundColor);
        if (rgb) {
          setSurface(relativeLuminance(rgb) < 0.28 ? "dark" : "light");
          return;
        }

        node = node.parentElement;
      }

      const bodyRgb = parseRgb(getComputedStyle(document.body).backgroundColor);
      setSurface(bodyRgb && relativeLuminance(bodyRgb) < 0.28 ? "dark" : "light");
    };

    const requestRead = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(readSurface);
    };

    readSurface();
    window.addEventListener("scroll", requestRead, { passive: true });
    window.addEventListener("resize", requestRead);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestRead);
      window.removeEventListener("resize", requestRead);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Track active section via IntersectionObserver on homepage
  useEffect(() => {
    if (isWorkPage) return;

    const sectionIds = links.map((l) => l.href.slice(1));
    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        });
        for (const id of sectionIds) {
          if (intersecting.has(id)) {
            setActiveSection(`#${id}`);
            return;
          }
        }
        setActiveSection(null);
      },
      { rootMargin: "-64px 0px -50% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isWorkPage]);

  const isActive = (href: string) => {
    if (isWorkPage) return href === "#work";
    return activeSection === href;
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.assign(`/${href}`);
      }
    }
  };

  const isDarkSurface = surface === "dark";

  return (
    <>
      <header
        ref={headerRef}
        data-nav-surface-state={surface}
        data-nav-floating={scrolled ? "true" : "false"}
        className={[
          "premium-glass-material fixed z-50 overflow-hidden border transition-[top,left,right,border-radius,background-color,border-color,box-shadow,backdrop-filter] duration-[250ms] ease-in-out",
          scrolled
            ? "top-4 left-4 right-4 rounded-2xl md:left-6 md:right-6"
            : "top-0 left-0 right-0 rounded-none",
          scrolled
            ? isDarkSurface
              ? "border-[var(--nav-glass-dark-border)] bg-[var(--nav-glass-dark-background)] shadow-[var(--nav-glass-dark-shadow)] backdrop-blur-[20px]"
              : "border-[var(--nav-glass-light-border)] bg-[var(--nav-glass-light-background)] shadow-[var(--nav-glass-light-shadow)] backdrop-blur-[20px]"
            : "border-transparent bg-transparent shadow-none backdrop-blur-none",
        ].join(" ")}
      >
        <nav className="max-w-[1360px] mx-auto px-6 md:px-10 h-[46px] flex items-center">
          {/* Wordmark — flex-1 to balance the CTA on the right */}
          <div className="flex-1 flex items-center">
            <Link
              href="/"
              onClick={(e) => {
                setMobileOpen(false);
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className={[
                "inline-flex min-h-11 items-center justify-center gap-[7px] pr-3 md:pr-2",
                isDarkSurface
                  ? "text-[var(--nav-glass-dark-logo-color)]"
                  : "text-[var(--nav-glass-light-logo-color)]",
              ].join(" ")}
            >
              <NavAsterisk />
              <span className="font-display text-[13px] font-semibold tracking-[0.14em]">
                Sameer G.
              </span>
            </Link>
          </div>

          {/* Desktop links — sits at true center */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNavClick(href)}
                  data-analytics-nav-target={href.slice(1)}
                  data-analytics-nav-label={label}
                  className={[
                    "rounded-full border-[1.5px] px-[14px] py-2 text-[13px] font-medium transition-[background-color,border-color,color] duration-150 ease-out cursor-pointer",
                    isActive(href)
                      ? isDarkSurface
                        ? "border-[var(--nav-glass-dark-pill-border)] bg-[var(--nav-glass-dark-pill-background)] text-[var(--nav-glass-dark-link-active-color)]"
                        : "border-[var(--nav-glass-light-pill-border)] bg-[var(--nav-glass-light-pill-background)] text-[var(--nav-glass-light-link-active-color)]"
                      : isDarkSurface
                        ? "border-transparent bg-transparent text-[var(--nav-glass-dark-link-color)] hover:border-[var(--nav-glass-dark-hover-border)] hover:bg-[var(--nav-glass-dark-hover-background)] hover:text-[var(--nav-glass-dark-link-hover-color)]"
                        : "border-transparent bg-transparent text-[var(--nav-glass-light-link-color)] hover:border-[var(--nav-glass-light-hover-border)] hover:bg-[var(--nav-glass-light-hover-background)] hover:text-[var(--nav-glass-light-link-hover-color)]",
                  ].join(" ")}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA — flex-1 + justify-end to balance the wordmark */}
          <div className="flex-1 flex items-center justify-end">
            <a
              href="https://www.linkedin.com/in/uxd-sameer/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={[
                "hidden md:inline-flex h-9 w-9 items-center justify-center opacity-70 transition-[color,opacity] duration-300 ease-[var(--ease-out-expo)] hover:opacity-100",
                isDarkSurface
                  ? "text-[var(--nav-glass-dark-link-active-color)]"
                  : "text-[var(--nav-glass-light-link-active-color)]",
              ].join(" ")}
            >
              <LinkedinLogo size={18} weight="fill" aria-hidden="true" />
            </a>

            {/* Mobile menu toggle */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center items-center opacity-60"
            >
              <span
                className={[
                  "block h-px w-full transition-all duration-300 origin-center",
                  isDarkSurface ? "bg-[var(--nav-glass-dark-logo-color)]" : "bg-[var(--nav-glass-light-logo-color)]",
                  mobileOpen ? "rotate-45 translate-y-[4px]" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-px w-full transition-all duration-300",
                  isDarkSurface ? "bg-[var(--nav-glass-dark-logo-color)]" : "bg-[var(--nav-glass-light-logo-color)]",
                  mobileOpen ? "opacity-0 scale-x-0" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-px w-full transition-all duration-300 origin-center",
                  isDarkSurface ? "bg-[var(--nav-glass-dark-logo-color)]" : "bg-[var(--nav-glass-light-logo-color)]",
                  mobileOpen ? "-rotate-45 -translate-y-[4px]" : "",
                ].join(" ")}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--color-warm-bg)] flex flex-col pt-[46px]"
          role="dialog"
          aria-label="Navigation menu"
        >
          <ul className="flex flex-col px-6 pt-12 gap-6">
            {links.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNavClick(href)}
                  data-analytics-nav-target={href.slice(1)}
                  data-analytics-nav-label={label}
                  className={[
                    "text-3xl transition-colors duration-200 cursor-pointer",
                    isActive(href) ? "text-[var(--color-accent)] font-[450]" : "text-[var(--color-text)] hover:text-[var(--color-accent)] opacity-60 font-medium",
                  ].join(" ")}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t border-[var(--color-border)] px-6 py-8 flex items-center justify-end">
            <a
              href="https://www.linkedin.com/in/uxd-sameer/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-[var(--color-text)]/50 hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              <LinkedinLogo size={18} weight="fill" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
