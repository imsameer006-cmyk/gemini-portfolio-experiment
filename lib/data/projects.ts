import type { Project, ProcessStep, Belief } from "@/lib/types";
import { createElement } from "react";
import GeminiThumbnail from "@/components/thumbnails/GeminiThumbnail";

export const projects: Project[] = [
  {
    slug: "gemini-digital-twin",
    title: "Designing a Multi-Stakeholder Approval Workflow for a Digital Twin Platform",
    category: "Workflow Design",
    year: "2025–2026",
    description:
      "Designed a multi-role approval workflow that eliminated status uncertainty across 4 engineering roles on a B2B digital twin platform.",
    impact: "Launched to 20+ FAEs",
    tags: ["Systems Design", "Workflow Design", "Enterprise UX", "B2B SaaS", "UX Research"],
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
    status: "in-progress",
    heroMetadata: [
      { label: "Year", value: "2023" },
      { label: "Role", value: "UX Designer" },
      { label: "Product", value: "Design System" },
      { label: "Domain", value: "Multi-product" },
      { label: "Teams", value: "4 product teams" },
      { label: "Scope", value: "Foundation" },
    ],
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
    status: "in-progress",
    heroMetadata: [
      { label: "Year", value: "2023" },
      { label: "Role", value: "Lead UX Designer" },
      { label: "Product", value: "Mobile Commerce" },
      { label: "Domain", value: "B2C" },
      { label: "Users", value: "Mobile shoppers" },
      { label: "Scope", value: "Full redesign" },
    ],
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
      "I start by understanding people, context, constraints, and goals. The real challenge often lies beneath the initial problem statement.",
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
      "I design systems, not just screens. Every interaction should support a larger experience and scale as products evolve.",
  },
  {
    number: "04",
    title: "Validate",
    description:
      "Reality is the ultimate design review. Every solution is tested against real user behavior, feedback, and measurable outcomes.",
  },
];

export const beliefs: Belief[] = [
  {
    heading: "Clarity is intentional",
    body: "Good design doesn't happen by accident. Every decision—what to include, what to remove, and what to emphasize—shapes how people understand and interact with a product.",
  },
  {
    heading: "Systems before screens",
    body: "Interfaces are the final expression of a system. Before designing screens, I focus on states, relationships, workflows, ownership, and constraints. When the system is clear, the interface becomes obvious.",
  },
  {
    heading: "Design creates alignment",
    body: "The most valuable design work often happens before pixels. It happens when users, business stakeholders, and engineers develop a shared understanding of the problem and move toward the same outcome.",
  },
];
