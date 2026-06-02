export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  impact: string;
  tags: string[];
  featured: boolean;
  coverColor: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Belief {
  heading: string;
  body: string;
}

// ── Case Study Content Blocks ──────────────────────────────────

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "callout"; text: string }
  | { type: "bullet-list"; items: string[] }
  | { type: "meta-grid"; fields: { label: string; value: string }[] }
  | {
      type: "two-col-list";
      left: { heading: string; items: (string | { label: string; detail: string })[]; variant?: "positive" | "warning" | "neutral" };
      right: { heading: string; items: (string | { label: string; detail: string })[]; variant?: "positive" | "warning" | "neutral" };
    }
  | { type: "role-list"; items: { abbr: string; fullName: string; description: string }[] }
  | {
      type: "exploration-cards";
      items: {
        heading: string;
        description: string;
        strength: string;
        limitation: string;
      }[];
    }
  | { type: "stages"; items: string[] }
  | {
      type: "decisions";
      items: { heading: string; body: string; bullets?: string[] }[];
      startIndex?: number;
    }
  | {
      type: "before-after";
      before: { heading: string; items: (string | { label: string; detail: string })[] };
      after: { heading: string; items: (string | { label: string; detail: string })[] };
    }
  | { type: "image-placeholder"; caption: string; tall?: boolean }
  | { type: "case-study-image"; src: string; caption: string; alt?: string }
  | { type: "case-study-video"; src: string; caption: string; poster?: string };

export interface CaseStudySection {
  label: string;
  heading?: string;
  blocks: Block[];
}

export interface CaseStudyData {
  projectSlug: string;
  sections: CaseStudySection[];
}
