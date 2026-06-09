import { GeminiProjectHero } from "./GeminiProjectHero";
import { CaseStudyInProgress } from "./CaseStudyInProgress";
import JumpToNav from "@/components/ui/JumpToNav";
import type { Project } from "@/lib/types";

interface Props {
  project: Project;
}

export default function ProjectInProgress({ project }: Props) {
  return (
    <>
      <GeminiProjectHero
        category={project.category}
        title={project.title}
        description={project.description}
        impact={project.impact}
        tags={project.tags}
        metadata={project.heroMetadata}
      />
      <CaseStudyInProgress />
      <JumpToNav disabled />
    </>
  );
}
