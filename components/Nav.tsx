"use client";

import { useEffect, useState } from "react";
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

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  const isWorkPage = pathname.startsWith("/work/");
  const isHeroResting = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <>
      <header
        className={[
          "fixed z-50 transition-all duration-300",
          scrolled
            ? "top-4 left-4 right-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-warm-bg)]/90 shadow-[0_2px_12px_rgba(0,0,0,0.08)] backdrop-blur-md md:left-6 md:right-6"
            : "top-0 left-0 right-0 rounded-none border-0 bg-transparent shadow-none",
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
                "inline-flex min-h-11 items-center justify-center pr-3 md:pr-2",
                isHeroResting
                  ? "text-[var(--nav-wordmark-color-at-rest)]"
                  : "text-[var(--nav-wordmark-color-scrolled)]",
              ].join(" ")}
            >
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
                    "text-[13px] font-normal transition-colors duration-200 cursor-pointer relative",
                    isActive(href)
                      ? isHeroResting
                        ? "text-[var(--nav-link-color-at-rest)] after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-px after:bg-[var(--nav-link-indicator-color-at-rest)] after:content-['']"
                        : "text-[var(--nav-link-color-scrolled)]/80 after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-px after:bg-[var(--nav-link-indicator-color-scrolled)] after:content-['']"
                      : isHeroResting
                        ? "text-[var(--nav-link-color-at-rest)] hover:text-[var(--nav-link-color-at-rest)]"
                        : "text-[var(--nav-link-color-scrolled)]/45 hover:text-[var(--nav-link-color-scrolled)]/70",
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
                "hidden md:inline-flex h-9 w-9 items-center justify-center transition-colors duration-200",
                isHeroResting
                  ? "text-[var(--nav-link-color-at-rest)] hover:text-[var(--nav-link-color-at-rest)]"
                  : "text-[var(--nav-link-color-scrolled)]/45 hover:text-[var(--nav-link-color-scrolled)]/70",
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
                  isHeroResting ? "bg-[var(--nav-link-color-at-rest)]" : "bg-[var(--nav-link-color-scrolled)]",
                  mobileOpen ? "rotate-45 translate-y-[4px]" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-px w-full transition-all duration-300",
                  isHeroResting ? "bg-[var(--nav-link-color-at-rest)]" : "bg-[var(--nav-link-color-scrolled)]",
                  mobileOpen ? "opacity-0 scale-x-0" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-px w-full transition-all duration-300 origin-center",
                  isHeroResting ? "bg-[var(--nav-link-color-at-rest)]" : "bg-[var(--nav-link-color-scrolled)]",
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
