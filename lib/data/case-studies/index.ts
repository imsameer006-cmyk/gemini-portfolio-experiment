import { geminiDigitalTwin } from "./gemini-digital-twin";
import { plmCollabspace } from "./plm-collabspace";
import type { CaseStudyData } from "@/lib/types";

export const caseStudies: Record<string, CaseStudyData> = {
  "gemini-digital-twin": geminiDigitalTwin,
  "design-system": plmCollabspace,
};
