import type { Project, ProcessStep, Belief } from "@/lib/types";
import { createElement } from "react";
import GeminiThumbnail from "@/components/thumbnails/GeminiThumbnail";
import CollabspaceThumbnail from "@/components/thumbnails/CollabspaceThumbnail";
import DesignSystemThumbnail from "@/components/thumbnails/DesignSystemThumbnail";

export const projects: Project[] = [
  {
    slug: "gemini-digital-twin",
    title: "Multi-Stakeholder Approval Workflow for a Digital Twin Platform",
    category: "Workflow Design",
    year: "2025–2026",
    description:
      "Designed a multi-role approval workflow that eliminated status uncertainty across 4 engineering roles on a B2B digital twin platform.",
    impact: "Launched to 50+ FAEs",
    tags: ["Systems Design", "Workflow Design", "Enterprise UX", "B2B SaaS", "UX Research"],
    client: "Infineon Technologies",
    featured: true,
    coverColor: "#F2F0EB",
    thumbnail: createElement(GeminiThumbnail),
  },
  {
    slug: "plm-collabspace",
    title: "Driving Adoption of an Enterprise Collaboration Platform",
    category: "Enterprise Platform Design",
    year: "2023–2024",
    description:
      "Building a shared knowledge and collaboration platform that connected 2,000+ employees, domains, and expertise across a global organization.",
    impact: "Platform Adoption",
    tags: ["UX Research", "Stakeholder Discovery", "Information Architecture", "Knowledge Management"],
    client: "Rohde & Schwarz",
    featured: true,
    coverColor: "#E0E8EC",
    thumbnail: createElement(CollabspaceThumbnail),
    heroMetadata: [
      { label: "Year", value: "2023–2024" },
      { label: "Role", value: "UX Research & Product Design" },
      { label: "Product", value: "PLM Collabspace" },
      { label: "Domain", value: "B2B Enterprise" },
      { label: "Users", value: "2,000+ Global Employees" },
      { label: "Scope", value: "Knowledge Ecosystem" },
    ],
  },
  {
    slug: "design-system",
    title: "The System Behind the Site",
    category: "Design Systems",
    year: "2026",
    description:
      "A three-tier token architecture, WCAG-audited and machine-readable — built to stop my own portfolio from disagreeing with itself, in an AI-native workflow.",
    impact: "4 WCAG failures found & fixed",
    tags: ["Design Systems", "Accessibility", "AI-Native Workflow", "Component Architecture"],
    featured: true,
    coverColor: "#F5E8DC",
    thumbnail: createElement(DesignSystemThumbnail),
    heroMetadata: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Design & Architecture" },
      { label: "Stack", value: "Next.js · Tailwind" },
      { label: "Scope", value: "50 tokens audited" },
      { label: "Components", value: "26 block types" },
      { label: "Fixes", value: "4 WCAG issues resolved" },
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
