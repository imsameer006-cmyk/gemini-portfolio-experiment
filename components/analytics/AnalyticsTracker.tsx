"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isAnalyticsEnabled } from "@/lib/analytics/enabled";
import { trackEvent, type AnalyticsEventMap } from "@/lib/analytics/track";

const SCROLL_MILESTONES: AnalyticsEventMap["scroll_depth"]["depth_percent"][] = [25, 50, 75, 90, 100];

function getPagePath() {
  return `${window.location.pathname}${window.location.search}`;
}

function secondsBetween(start: number, end: number) {
  return Math.round(((end - start) / 1000) * 10) / 10;
}

function linkContext(link: HTMLAnchorElement) {
  return link.getAttribute("aria-label") || link.textContent?.trim() || link.href;
}

function caseStudyName(link: HTMLAnchorElement) {
  return link.getAttribute("aria-label")?.replace(/^View case study:\s*/i, "").trim()
    || link.textContent?.replace(/View case study/i, "").trim()
    || link.href.split("/work/")[1]
    || "unknown";
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const pagePath = getPagePath();

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const navButton = target?.closest<HTMLElement>("[data-analytics-nav-target]");
      if (navButton) {
        trackEvent("nav_click", {
          target_id: navButton.dataset.analyticsNavTarget || "unknown",
          label_text: navButton.dataset.analyticsNavLabel || navButton.textContent?.trim() || "unknown",
          page_path: pagePath,
        });
        return;
      }

      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const isResume = href.includes("Resume.pdf");
      const isHashNav = href.startsWith("#");
      const isCaseStudy = href.startsWith("/work/");
      const isExternal = !isResume && Boolean(link.target === "_blank" || /^https?:\/\//.test(href) || href.startsWith("mailto:"));

      if (isResume) {
        trackEvent("resume_download", { page_path: pagePath });
      }

      if (isHashNav) {
        trackEvent("nav_click", {
          target_id: href.slice(1),
          label_text: link.textContent?.trim() || href,
          page_path: pagePath,
        });
      }

      if (isCaseStudy) {
        trackEvent("view_case_study", {
          case_study_name: caseStudyName(link),
          page_path: pagePath,
        });
      }

      if (isExternal) {
        trackEvent("external_link_click", {
          destination_url: link.href,
          link_context: linkContext(link),
          page_path: pagePath,
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const pagePath = getPagePath();
    const fired = new Set<number>();

    const updateScrollDepth = () => {
      const scrollTop = window.scrollY;
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const depth = Math.min(100, Math.round(((scrollTop + window.innerHeight) / scrollable) * 100));

      SCROLL_MILESTONES.forEach((milestone) => {
        if (depth >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          trackEvent("scroll_depth", { depth_percent: milestone, page_path: pagePath });
        }
      });
    };

    updateScrollDepth();
    window.addEventListener("scroll", updateScrollDepth, { passive: true });
    window.addEventListener("resize", updateScrollDepth);
    return () => {
      window.removeEventListener("scroll", updateScrollDepth);
      window.removeEventListener("resize", updateScrollDepth);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const pagePath = getPagePath();
    const sections = Array.from(document.querySelectorAll<HTMLElement>("article section[id^='cs-']"));
    const moments = Array.from(document.querySelectorAll<HTMLElement>("[id^='moment-']"));
    const activeStarts = new Map<Element, number>();

    const record = (element: Element, startedAt: number) => {
      const dwellSeconds = secondsBetween(startedAt, performance.now());
      if (dwellSeconds <= 1) return;

      if (element instanceof HTMLElement && element.id.startsWith("moment-")) {
        trackEvent("moment_dwell", {
          moment_id: element.id,
          dwell_seconds: dwellSeconds,
          page_path: pagePath,
        });
        return;
      }

      if (element instanceof HTMLElement) {
        trackEvent("section_dwell", {
          section_id: element.id,
          dwell_seconds: dwellSeconds,
          page_path: pagePath,
        });
      }
    };

    const flush = () => {
      activeStarts.forEach((startedAt, element) => record(element, startedAt));
      activeStarts.clear();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!activeStarts.has(entry.target)) {
              activeStarts.set(entry.target, performance.now());
            }
            return;
          }

          const startedAt = activeStarts.get(entry.target);
          if (startedAt === undefined) return;
          activeStarts.delete(entry.target);
          record(entry.target, startedAt);
        });
      },
      { threshold: 0.5 },
    );

    [...sections, ...moments].forEach((element) => observer.observe(element));
    window.addEventListener("pagehide", flush);
    return () => {
      flush();
      window.removeEventListener("pagehide", flush);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
