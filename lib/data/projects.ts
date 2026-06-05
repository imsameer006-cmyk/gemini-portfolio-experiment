import type { Project, ProcessStep, Belief } from "@/lib/types";
import { createElement } from "react";
import GeminiThumbnail from "@/components/thumbnails/GeminiThumbnail";

export const projects: Project[] = [
  {
    slug: "gemini-digital-twin",
    title: "Gemini — Digital Twin",
    category: "Workflow Design",
    year: "2025–2026",
    description:
      "Designed a multi-role approval workflow that eliminated status uncertainty across 4 engineering roles on a B2B digital twin platform.",
    impact: "Launched to 20 FAEs in China",
    tags: ["Workflow Design", "B2B", "UX Research", "Systems Design"],
    featured: true,
    coverColor: "#EAF0EF",
    thumbnail: createElement(GeminiThumbnail),
  },
  {
    slug: "design-system",
    title: "A Design System Built for Scale",
    category: "Systems Design",
    year: "2023",
    description:
      "Created a shared component library and design language adopted by 4 product teams across web and mobile.",
    impact: "3× faster design cycles",
    tags: ["Design Systems", "Figma", "Documentation"],
    featured: true,
    coverColor: "#E0E8EC",
  },
  {
    slug: "mobile-checkout",
    title: "From Zero to Checkout in 3 Taps",
    category: "Mobile UX",
    year: "2023",
    description:
      "Streamlined a 12-step mobile purchase flow into a single contextual sheet — without removing a single required field.",
    impact: "↑ 22% conversion rate",
    tags: ["Mobile Design", "UX Research", "Prototyping"],
    featured: true,
    coverColor: "#E8E0ED",
  },
  {
    slug: "search-intent",
    title: "Search That Understands Intent",
    category: "UX Research + Design",
    year: "2022",
    description:
      "Led research into how users form queries, then redesigned the search experience around mental models rather than keyword matching.",
    impact: "↓ 41% zero-result searches",
    tags: ["UX Research", "Information Architecture", "Data Analysis"],
    featured: false,
    coverColor: "#E0ECE4",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "Deep research into users, business goals, and constraints. I look for the real problem beneath the stated one — the gap between what people ask for and what they actually need.",
  },
  {
    number: "02",
    title: "Structure",
    description:
      "Before pixels, I work in flows, hierarchies, and systems. Information architecture and mental models form the skeleton that design must support.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Iteration from rough to refined, always guided by principles. I design systems, not just screens — every decision should scale and compose.",
  },
  {
    number: "04",
    title: "Validate",
    description:
      "Testing with real users, honest critique, and measurement. Good design is never finished — it is continuously refined against reality.",
  },
];

export const beliefs: Belief[] = [
  {
    heading: "Clarity is a design decision",
    body: "Every word, interaction, and visual element is a choice about what to emphasize and what to leave out. Confusion is never accidental.",
  },
  {
    heading: "Systems over solutions",
    body: "Good design scales. I build foundations that compose, not workarounds that break under pressure. The best component is the one you never have to redesign.",
  },
  {
    heading: "Process reveals product",
    body: "How you work is visible in what you ship. Mine shows rigor, empathy, and a genuine willingness to be wrong before getting it right.",
  },
];
