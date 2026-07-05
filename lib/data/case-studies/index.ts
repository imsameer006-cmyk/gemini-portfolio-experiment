import { geminiDigitalTwin } from "./gemini-digital-twin";
import { plmCollabspace } from "./plm-collabspace";
import { designSystem } from "./design-system";
import type { CaseStudyData } from "@/lib/types";

export const caseStudies: Record<string, CaseStudyData> = {
  "gemini-digital-twin": geminiDigitalTwin,
  "plm-collabspace": plmCollabspace,
  "design-system": designSystem,
};
