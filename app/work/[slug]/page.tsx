import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/lib/data/projects";
import { caseStudies } from "@/lib/data/case-studies";
import CaseStudy from "@/components/sections/CaseStudy";
import ProjectInProgress from "@/components/sections/ProjectInProgress";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Sameer Gautam`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  if (project.status === "in-progress") {
    return <ProjectInProgress project={project} />;
  }

  const content = caseStudies[slug];

  return <CaseStudy project={project} content={content} />;
}
