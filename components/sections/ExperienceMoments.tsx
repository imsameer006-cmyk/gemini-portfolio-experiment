"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useReveal, staggerDelay } from "@/lib/motion";

type ExperienceMoment = {
  title?: string;
  company?: string;
  location: string;
  imageSrc?: string;
  imageAlt?: string;
};

const MOMENTS: ExperienceMoment[] = [
  {
    title: "Facilitating Discussions",
    company: "Rohde & Schwarz",
    location: "Munich",
    imageSrc: "/Gallery/editorial/1.webp",
    imageAlt: "Work moment at Rohde and Schwarz in Munich",
  },
  {
    title: "Cross-functional Collaboration",
    company: "Infineon",
    location: "Munich",
    imageSrc: "/Gallery/editorial/2.webp",
    imageAlt: "Work moment at Infineon Technologies in Munich",
  },
  {
    title: "Content Co-creation",
    company: "Infineon",
    location: "Munich",
    imageSrc: "/Gallery/editorial/3.webp",
    imageAlt: "Work moment at Infineon Technologies in Munich",
  },
  {
    title: "Systems Mapping",
    company: "Rohde & Schwarz",
    location: "Munich",
    imageSrc: "/Gallery/editorial/4.webp",
    imageAlt: "Work moment at Rohde and Schwarz in Munich",
  },
  {
    title: "Design–Engineering Alignment",
    company: "Infineon",
    location: "Munich",
    imageSrc: "/Gallery/editorial/5.webp",
    imageAlt: "Work moment at Infineon Technologies in Munich",
  },
  {
    title: "Eye-Tracking Debrief",
    location: "Technische Hochschule Augsburg",
    imageSrc: "/Gallery/editorial/6-v2.webp",
    imageAlt: "Reviewing an interface with colleagues during an eye-tracking debrief at Technische Hochschule Augsburg",
  },
];

function ExperiencePhotoCard({
  moment,
  index,
}: {
  moment: ExperienceMoment;
  index: number;
}) {
  const reveal = useReveal();

  return (
    <motion.article
      {...reveal(staggerDelay(index))}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--moments-card-background-color)] will-change-transform"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[inherit] bg-[var(--moments-card-background-color)]">
        {moment.imageSrc ? (
          <Image
            src={moment.imageSrc}
            alt={moment.imageAlt ?? [moment.company, moment.location].filter(Boolean).join(", ")}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-[family-name:var(--font-numeral)] text-5xl leading-none text-[var(--moments-metadata-color)]/25">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      <div className="flex min-h-[88px] flex-col justify-start border-t border-[var(--moments-card-border-color)] px-4 py-4">
        {moment.title && (
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium leading-[1.35] text-[var(--moments-title-color)] lg:text-[12px]">
            {moment.title}
          </p>
        )}
        <p
          className={[
            "overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.06em]",
            moment.title ? "mt-2 text-[var(--moments-metadata-color)]" : "text-[var(--moments-metadata-color)]",
          ].join(" ")}
        >
          {moment.company}
          {moment.company ? (
            <span className="mx-1.5 text-[var(--moments-card-border-color)]" aria-hidden="true">
              ·
            </span>
          ) : null}
          {moment.location}
        </p>
      </div>

      <div className="absolute inset-0 rounded-2xl pointer-events-none z-10 shadow-[inset_0_0_0_1px_rgba(182,255,0,0.1)] transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_1px_rgba(182,255,0,0.8),0_0_16px_rgba(182,255,0,0.15)]" />
    </motion.article>
  );
}

export default function ExperienceMoments() {
  const reveal = useReveal();
  const [activeMoment, setActiveMoment] = useState(0);
  const [activeDesktopPage, setActiveDesktopPage] = useState(0);
  const mobileScrollerRef = useRef<HTMLDivElement>(null);
  const desktopScrollerRef = useRef<HTMLDivElement>(null);
  const desktopPageStartIndexes = [0, Math.max(0, MOMENTS.length - 4)];

  const scrollToMoment = (
    index: number,
    scroller: HTMLDivElement | null,
  ) => {
    const target = scroller?.children[index] as HTMLElement | undefined;

    if (!scroller || !target) {
      return;
    }

    scroller.scrollTo({
      left: target.offsetLeft - scroller.offsetLeft,
      behavior: "smooth",
    });
  };

  const findClosestChildIndex = (scroller: HTMLDivElement | null) => {
    if (!scroller) {
      return 0;
    }

    const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(scroller.children).forEach((child, index) => {
      const item = child as HTMLElement;
      const itemCenter = item.offsetLeft + item.clientWidth / 2;
      const distance = Math.abs(itemCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  const updateActiveMoment = () => {
    setActiveMoment(findClosestChildIndex(mobileScrollerRef.current));
  };

  const updateActiveDesktopPage = () => {
    const scroller = desktopScrollerRef.current;

    if (!scroller) {
      return;
    }

    const closestIndex = findClosestChildIndex(scroller);
    const closestPageIndex = desktopPageStartIndexes.reduce(
      (closestPage, pageStart, pageIndex) => {
        const closestDistance = Math.abs(desktopPageStartIndexes[closestPage] - closestIndex);
        const pageDistance = Math.abs(pageStart - closestIndex);

        return pageDistance < closestDistance ? pageIndex : closestPage;
      },
      0,
    );

    setActiveDesktopPage(closestPageIndex);
  };

  const scrollToDesktopPage = (index: number) => {
    const scroller = desktopScrollerRef.current;

    if (!scroller) {
      return;
    }

    const scrollLeft = index === 0 ? 0 : scroller.scrollWidth - scroller.clientWidth;
    scroller.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setActiveDesktopPage(index);
  };

  return (
    <section
      id="experience-moments"
      className="relative bg-[#051209] px-6 pb-10 pt-[47px] md:px-10 md:pb-16 md:pt-[63px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 w-[calc(100%-3rem)] max-w-[1280px] -translate-x-1/2 border-t border-white/10 md:w-[calc(100%-5rem)]" />
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          {...reveal()}
          className="mb-12 grid gap-5 lg:grid-cols-[0.7fr_1fr] lg:items-start"
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--moments-eyebrow-color)]">
              Selected Moments
            </p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight text-[var(--moments-heading-color)]">
              In Practice.
            </h2>
          </div>
          <p className="max-w-[640px] text-base leading-relaxed text-[var(--moments-body-color)] md:text-lg lg:ml-auto">
            Product design is ultimately about working with people. These moments
            capture the conversations, workshops, and collaborations that transform
            ambiguity into shared understanding and shape the systems behind the
            final experience.
          </p>
        </motion.div>

        <div className="lg:hidden">
          <div
            ref={mobileScrollerRef}
            onScroll={updateActiveMoment}
            className="-mx-6 -my-20 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 py-20 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Selected work moments"
          >
            {MOMENTS.map((moment, index) => (
              <div
                key={`${moment.company}-${moment.location}-${index}`}
                className="w-[82vw] max-w-[360px] shrink-0 snap-center sm:w-[44vw]"
              >
                <ExperiencePhotoCard moment={moment} index={index} />
              </div>
            ))}
          </div>

          <div
            className="mt-5 flex justify-center"
            aria-label="Selected moment navigation"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-transparent px-6 py-4">
              {MOMENTS.map((moment, index) => (
                <button
                  key={`${moment.company}-${index}-dot`}
                  type="button"
                  onClick={() => scrollToMoment(index, mobileScrollerRef.current)}
                  aria-label={`Show ${moment.title ?? `moment ${index + 1}`}`}
                  aria-current={activeMoment === index ? "true" : undefined}
                  className={[
                    "h-2 w-2 rounded-full border transition-colors duration-200",
                    activeMoment === index
                      ? "border-[var(--moments-indicator-active)] bg-[var(--moments-indicator-active)]"
                      : "border-[var(--moments-indicator-inactive)] bg-[var(--moments-indicator-inactive)]",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div
            ref={desktopScrollerRef}
            onScroll={updateActiveDesktopPage}
            className="-my-20 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-20 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Selected work moments"
          >
            {MOMENTS.map((moment, index) => (
              <div
                key={`${moment.company}-${moment.location}-${index}`}
                className="basis-[calc(25%_-_0.9375rem)] shrink-0 snap-start"
              >
                <ExperiencePhotoCard moment={moment} index={index} />
              </div>
            ))}
          </div>

          <div
            className="mt-5 flex justify-center"
            aria-label="Selected moment navigation"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-transparent px-6 py-4">
              {desktopPageStartIndexes.map((startIndex, index) => (
                <button
                  key={`desktop-moment-page-${index}`}
                  type="button"
                  onClick={() => scrollToDesktopPage(index)}
                  aria-label={`Show selected moments ${startIndex + 1} through ${Math.min(
                    startIndex + 4,
                    MOMENTS.length,
                  )}`}
                  aria-current={activeDesktopPage === index ? "true" : undefined}
                  className={[
                    "h-2 w-2 rounded-full border transition-colors duration-200",
                    activeDesktopPage === index
                      ? "border-[var(--moments-indicator-active)] bg-[var(--moments-indicator-active)]"
                      : "border-[var(--moments-indicator-inactive)] bg-[var(--moments-indicator-inactive)]",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
