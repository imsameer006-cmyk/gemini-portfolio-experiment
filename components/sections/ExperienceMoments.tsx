"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

type ExperienceMoment = {
  title?: string;
  company: string;
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
];

const EASE = [0.16, 1, 0.3, 1] as const;

function ExperiencePhotoCard({
  moment,
  index,
}: {
  moment: ExperienceMoment;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E6E3DD] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#C07B50]/35 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.1)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2F0EB]">
        {moment.imageSrc ? (
          <Image
            src={moment.imageSrc}
            alt={moment.imageAlt ?? `${moment.company}, ${moment.location}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-[family-name:var(--font-instrument-serif)] text-5xl italic leading-none text-[#18171A]/15">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      <div className="flex min-h-[104px] flex-col justify-start border-t border-[#E6E3DD] px-5 py-4">
        {moment.title && (
          <p className="line-clamp-2 min-h-[36px] text-[13px] font-medium leading-[1.35] text-[#18171A]">
            {moment.title}
          </p>
        )}
        <p
          className={[
            "text-xs font-medium uppercase tracking-[0.08em]",
            moment.title ? "mt-2 text-[#9C9A95]" : "text-[#C07B50]",
          ].join(" ")}
        >
          {moment.company}
          <span className="mx-1.5 text-[#CECAC2]" aria-hidden="true">
            ·
          </span>
          {moment.location}
        </p>
      </div>
    </motion.article>
  );
}

export default function ExperienceMoments() {
  const [activeMoment, setActiveMoment] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollToMoment = (index: number) => {
    const scroller = scrollerRef.current;
    const target = scroller?.children[index] as HTMLElement | undefined;

    if (!scroller || !target) {
      return;
    }

    scroller.scrollTo({
      left: target.offsetLeft - scroller.offsetLeft,
      behavior: "smooth",
    });
  };

  const updateActiveMoment = () => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
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

    setActiveMoment(closestIndex);
  };

  return (
    <section
      id="experience-moments"
      className="px-6 pb-24 pt-0 md:px-10 md:pb-32"
    >
      <div className="mx-auto max-w-[1280px] border-t border-[#E6E3DD] pt-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mb-12 grid gap-5 lg:grid-cols-[0.7fr_1fr] lg:items-end"
        >
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#9C9A95]">
              Selected Moments
            </p>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2rem,4.5vw,3.5rem)] italic leading-tight text-[#18171A]">
              In Practice.
            </h2>
          </div>
          <p className="max-w-[640px] text-base leading-relaxed text-[#6A6764] md:text-lg lg:ml-auto">
            Product design is ultimately about working with people. These moments
            capture the conversations, workshops, and collaborations that transform
            ambiguity into shared understanding and shape the systems behind the
            final experience.
          </p>
        </motion.div>

        <div className="lg:hidden">
          <div
            ref={scrollerRef}
            onScroll={updateActiveMoment}
            className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
            <div className="inline-flex items-center gap-3 rounded-full bg-[#F2F0EB] px-6 py-4">
              {MOMENTS.map((moment, index) => (
                <button
                  key={`${moment.company}-${index}-dot`}
                  type="button"
                  onClick={() => scrollToMoment(index)}
                  aria-label={`Show ${moment.title ?? `moment ${index + 1}`}`}
                  aria-current={activeMoment === index ? "true" : undefined}
                  className={[
                    "h-2 w-2 rounded-full border border-[#18171A] transition-colors duration-200",
                    activeMoment === index ? "bg-[#18171A]" : "bg-transparent",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden gap-5 lg:grid lg:grid-cols-5">
          {MOMENTS.map((moment, index) => (
            <div key={`${moment.company}-${moment.location}-${index}`}>
              <ExperiencePhotoCard moment={moment} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
