"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#F9F8F5]/90 backdrop-blur-md border-b border-[#E6E3DD]"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="max-w-[1360px] mx-auto px-6 md:px-10 h-16 flex items-center">
          {/* Wordmark — flex-1 to balance the CTA on the right */}
          <div className="flex-1">
            <Link
              href="/"
              className="text-[#6A6764] font-medium tracking-tight text-sm hover:text-[#18171A] transition-colors duration-200"
            >
              <span>Sameer Gautam</span>
              <span className="hidden text-[#9C9A95] sm:inline"> - Product Designer</span>
            </Link>
          </div>

          {/* Desktop links — sits at true center */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNavClick(href)}
                  className={[
                    "text-sm transition-colors duration-200 cursor-pointer relative",
                    isActive(href)
                      ? "text-[#18171A] font-medium after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-px after:bg-[#C07B50] after:content-['']"
                      : "text-[#6A6764] hover:text-[#18171A]",
                  ].join(" ")}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA — flex-1 + justify-end to balance the wordmark */}
          <div className="flex-1 flex justify-end">
            <a
              href="mailto:imsameer006@gmail.com"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-[#18171A] border border-[#E6E3DD] rounded-full px-4 py-1.5 hover:border-[#C07B50] hover:text-[#C07B50] transition-all duration-200"
            >
              Get in touch
            </a>

            {/* Mobile menu toggle */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center items-center"
            >
              <span
                className={[
                  "block h-px w-full bg-[#18171A] transition-all duration-300 origin-center",
                  mobileOpen ? "rotate-45 translate-y-[4px]" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-px w-full bg-[#18171A] transition-all duration-300",
                  mobileOpen ? "opacity-0 scale-x-0" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-px w-full bg-[#18171A] transition-all duration-300 origin-center",
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
          className="fixed inset-0 z-40 bg-[#F9F8F5] flex flex-col pt-16"
          role="dialog"
          aria-label="Navigation menu"
        >
          <ul className="flex flex-col px-6 pt-12 gap-6">
            {links.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNavClick(href)}
                  className={[
                    "text-3xl font-medium transition-colors duration-200 cursor-pointer",
                    isActive(href) ? "text-[#C07B50]" : "text-[#18171A] hover:text-[#C07B50]",
                  ].join(" ")}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-auto px-6 pb-12">
            <a
              href="mailto:imsameer006@gmail.com"
              className="inline-flex items-center text-sm text-[#6A6764] hover:text-[#C07B50] transition-colors duration-200"
            >
              imsameer006@gmail.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}
