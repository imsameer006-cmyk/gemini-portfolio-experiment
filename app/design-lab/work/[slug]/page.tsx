import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import { projects } from "@/lib/data/projects";
import { caseStudies } from "@/lib/data/case-studies";
import type { Block, CaseStudyData, Project } from "@/lib/types";
import styles from "../../design-lab.module.css";

const slugAliases: Record<string, string> = {
  gemini: "gemini-digital-twin",
  collabspace: "plm-collabspace",
};

const storyMoments: Record<string, { label: string; parent: string; anchorId: string }[]> = {
  "gemini-digital-twin": [
    { label: "The problem we misread", parent: "Research", anchorId: "moment-misread" },
    { label: "Told to change nothing", parent: "Exploration", anchorId: "moment-mandate" },
    { label: "The proposal I lost", parent: "Solution", anchorId: "moment-lost" },
    { label: "The argument I won", parent: "Design Decisions", anchorId: "moment-won" },
    { label: "The fix we didn't ship", parent: "Validation", anchorId: "moment-unshipped" },
    { label: "The waiting we ended", parent: "Impact", anchorId: "moment-payoff" },
  ],
  "plm-collabspace": [
    { label: "The problem I misread", parent: "Research", anchorId: "moment-reframe" },
    { label: "Skeptic, then convinced", parent: "Design Decisions", anchorId: "moment-skeptic" },
    { label: "I won over a holdout", parent: "Design Decisions", anchorId: "moment-owner" },
    { label: "Designed within limits", parent: "Exploration", anchorId: "moment-constraint" },
    { label: "Six of eight stuck", parent: "Impact", anchorId: "moment-outcome" },
    { label: "Why I think it fails", parent: "Reflection", anchorId: "moment-belief" },
  ],
};

const highlightFragments: { id: string; fragments: string[] }[] = [
  {
    id: "moment-misread",
    fragments: [
      "What the interviews actually showed was that the primary challenge wasn't module customization at all — it was status uncertainty.",
    ],
  },
  { id: "moment-mandate", fragments: ["The mandate was to digitize the existing physical workflow as-is first"] },
  {
    id: "moment-lost",
    fragments: [
      "Manufacturing engineering preferred the existing view, we were out of runway before the November deadline, and I lost that one.",
    ],
  },
  { id: "moment-won", fragments: ["My argument was that the record outlived the decision"] },
  {
    id: "moment-unshipped",
    fragments: [
      "We scoped a fix — iconography improvements and guide overlays — and it went to the backlog, not the launch.",
    ],
  },
  {
    id: "moment-payoff",
    fragments: [
      "an FAE who used to email engineering and wait weeks — sometimes months — for a status reply now opens the module and sees the stage, the owner, and the next action in one view",
    ],
  },
  {
    id: "moment-reframe",
    fragments: [
      "The challenge wasn't storage. It was visibility. I did not walk in with that reframe. It emerged from the rejected first design and the two reactions that followed it.",
    ],
  },
  {
    id: "moment-owner",
    fragments: [
      "One owner was notably reluctant throughout: a marketing manager, not the head of marketing, assigned to own and manage that page.",
      "A business trip stalled progress further because she was the sole assigned owner for that page. After she returned, persistent re-approach eventually led her to participate; the root cause of her initial reluctance was never fully clear, and what worked was patience, not escalation.",
    ],
  },
  {
    id: "moment-skeptic",
    fragments: [
      "One head — the most visibly skeptical in the room — sat arms crossed at the start, not invested, then leaned in and started asking questions once he saw the page working.",
    ],
  },
  {
    id: "moment-constraint",
    fragments: [
      "SAP workspaces gave the platform a hard structural framework. There was not open latitude to invent a different top-level architecture from scratch. The real design freedom was inside that structure: layout, widget placement and prioritisation, content arrangement",
    ],
  },
  {
    id: "moment-outcome",
    fragments: [
      "Six of eight domains sustained regular publishing after the campaign ended. The other two slowed after launch; my read is that those domains likely had less frequent shareable material.",
    ],
  },
  {
    id: "moment-belief",
    fragments: [
      "I've come to think internal platforms don't fail because they're badly designed. They fail because they're never taken seriously past the initial curiosity — started with interest, then left unattended once nobody's explicitly responsible for keeping them alive. No duties assigned, no value clearly defined, so the interest fades and the platform does too.",
    ],
  },
];

interface Props {
  params: Promise<{ slug: string }>;
}

function resolveSlug(slug: string) {
  return slugAliases[slug] ?? slug;
}

function toSectionId(label: string) {
  return label.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function joinItem(item: string | { label: string; detail: string }) {
  return typeof item === "string" ? item : `${item.label}: ${item.detail}`;
}

function renderHighlights(text: string) {
  const matches = highlightFragments
    .flatMap((moment) =>
      moment.fragments
        .map((fragment, fragmentIndex) => {
          const start = text.indexOf(fragment);
          return start >= 0
            ? { id: moment.id, fragment, fragmentIndex, start, end: start + fragment.length }
            : null;
        })
        .filter((match): match is { id: string; fragment: string; fragmentIndex: number; start: number; end: number } =>
          Boolean(match),
        ),
    )
    .sort((a, b) => a.start - b.start);

  if (matches.length === 0) return text;

  const usedIds = new Set<string>();
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  matches.forEach((match, index) => {
    if (match.start < cursor) return;
    if (match.start > cursor) nodes.push(text.slice(cursor, match.start));
    const id = usedIds.has(match.id) ? undefined : match.id;
    usedIds.add(match.id);
    nodes.push(
      <span key={`${match.id}-${match.fragmentIndex}-${index}`} id={id} className={styles.highlight}>
        {match.fragment}
      </span>,
    );
    cursor = match.end;
  });

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <p className={styles.fieldValue}>{value}</p>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return <p className={styles.paragraph}>{renderHighlights(block.text)}</p>;
    case "subheading":
      return <h3 className={styles.cardTitle}>{block.text}</h3>;
    case "callout":
    case "pull-quote":
    case "closing-line":
      return <div className={styles.callout}>{renderHighlights(block.text)}</div>;
    case "bullet-list":
      return (
        <ul className={styles.list}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "meta-grid":
      return (
        <div className={styles.cards}>
          {block.fields.map((field) => (
            <article key={field.label} className={styles.card}>
              <Field label={field.label} value={field.value} />
            </article>
          ))}
        </div>
      );
    case "two-col-list":
      return (
        <div className={styles.cards}>
          {[block.left, block.right].map((col) => (
            <article key={col.heading} className={styles.card}>
              <h3 className={styles.cardTitle}>{col.heading}</h3>
              <ul className={styles.list}>
                {col.items.map((item) => (
                  <li key={joinItem(item)}>{joinItem(item)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      );
    case "role-list":
      return (
        <div className={styles.cards}>
          {block.items.map((item) => (
            <article key={item.abbr} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.abbr}</h3>
              <p className={styles.body}>{item.fullName}. {item.description}</p>
            </article>
          ))}
        </div>
      );
    case "exploration-cards":
      return (
        <div className={styles.cards}>
          {block.items.map((item, index) => (
            <article key={item.heading} className={styles.card}>
              <span className={styles.numeral}>{String(index + 1).padStart(2, "0")}</span>
              <h3 className={styles.cardTitle}>{item.heading}</h3>
              <p className={styles.body}>{item.description}</p>
              <Field label="Strength" value={item.strength} />
              <Field label="Limitation" value={item.limitation} />
            </article>
          ))}
        </div>
      );
    case "stages":
      return (
        <ol className={styles.list}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "decisions":
      return (
        <div className={styles.stack}>
          {block.items.map((item, index) => (
            <article key={item.heading} className={styles.decision}>
              <span className={styles.numeral}>{String((block.startIndex ?? 1) + index).padStart(2, "0")}</span>
              <h3 className={styles.decisionTitle}>{item.heading}</h3>
              <p className={styles.body}>{renderHighlights(item.body)}</p>
              {item.bullets ? (
                <ul className={styles.list}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      );
    case "decisions-cdo":
      return (
        <div className={styles.stack}>
          {block.items.map((item, index) => (
            <article key={item.heading} className={styles.decision}>
              <span className={styles.numeral}>{String((block.startIndex ?? 1) + index).padStart(2, "0")}</span>
              <h3 className={styles.decisionTitle}>{item.heading}</h3>
              <Field label="Challenge" value={renderHighlights(item.challenge)} />
              <Field label="Decision" value={renderHighlights(item.decision)} />
              <Field label="Outcome" value={renderHighlights(item.outcome)} />
            </article>
          ))}
        </div>
      );
    case "before-after":
      return (
        <div className={styles.cards}>
          {[block.before, block.after].map((col) => (
            <article key={col.heading} className={styles.card}>
              <h3 className={styles.cardTitle}>{col.heading}</h3>
              <ul className={styles.list}>
                {col.items.map((item) => (
                  <li key={joinItem(item)}>{joinItem(item)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      );
    case "context-cards":
      return (
        <div className={styles.cards}>
          {block.items.map((item) => (
            <article key={item.heading} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.heading}</h3>
              <p className={styles.body}>{item.body}</p>
            </article>
          ))}
        </div>
      );
    case "synthesis-flow":
      return (
        <div className={styles.stack}>
          {block.rows.map((row) => (
            <Field key={row.label} label={row.label} value={row.items.join("; ")} />
          ))}
        </div>
      );
    case "synthesis-table":
      return (
        <div className={styles.stack}>
          {block.rows.map((row) => (
            <Field key={row.join(" / ")} label={row[0]} value={row[1]} />
          ))}
        </div>
      );
    case "publishing-workflow":
      return (
        <ol className={styles.list}>
          {block.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      );
    case "image-placeholder":
    case "case-study-image":
    case "case-study-video":
      return <p className={styles.mediaBox}>Media: {block.caption}</p>;
    case "drift-audit":
    case "token-chain":
    case "contrast-matrix":
    case "component-anatomy":
    case "benchmark-matrix":
      return <p className={styles.mediaBox}>Specialized design-system block mirrored from live data.</p>;
    default:
      return null;
  }
}

function CaseStudy({ project, content }: { project: Project; content: CaseStudyData }) {
  const moments = storyMoments[project.slug] ?? [];

  return (
    <main>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{project.category}</p>
          <h1 className={styles.heroTitle}>{project.title}</h1>
          <p className={styles.lead}>{project.description}</p>
          <div className={styles.tagRow}>
            <span className={styles.pill}>{project.impact}</span>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </header>

        <div className={styles.caseLayout}>
          <aside className={styles.rail} aria-label="Case study sections">
            {content.sections.map((section) => (
              <div key={section.label}>
                <a href={`#${toSectionId(section.label)}`}>{section.label}</a>
                {moments
                  .filter((moment) => moment.parent === section.label)
                  .map((moment) => (
                    <a key={moment.anchorId} href={`#${moment.anchorId}`} className={styles.railMoment}>
                      ⤷ {moment.label}
                    </a>
                  ))}
              </div>
            ))}
          </aside>

          <div>
            {content.sections.map((section) => (
              <section key={section.label} id={toSectionId(section.label)} className={styles.section}>
                <p className={styles.sectionLabel}>{section.label}</p>
                {section.heading ? <h2 className={styles.sectionHeading}>{section.heading}</h2> : null}
                <div className={styles.stack}>
                  {section.blocks.map((block, index) => (
                    <BlockView key={`${section.label}-${index}`} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <footer className={styles.footer}>
          <Link href="/design-lab" className={styles.footerLink}>Back to lab home</Link>
        </footer>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return [
    ...projects.map((project) => ({ slug: project.slug })),
    { slug: "gemini" },
    { slug: "collabspace" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = resolveSlug(slug);
  const project = projects.find((item) => item.slug === resolvedSlug);
  return project ? { title: `${project.title} — Design Lab` } : {};
}

export default async function LabCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const resolvedSlug = resolveSlug(slug);
  const project = projects.find((item) => item.slug === resolvedSlug);
  const content = caseStudies[resolvedSlug];

  if (!project) notFound();
  if (!content) return <GenericProject project={project} />;

  return <CaseStudy project={project} content={content} />;
}

function GenericProject({ project }: { project: Project }) {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{project.category}</p>
        <h1 className={styles.heroTitle}>{project.title}</h1>
        <p className={styles.lead}>{project.description}</p>
        <div className={styles.metaRow}>
          <span className={styles.pill}>{project.year}</span>
          {project.client ? <span className={styles.pill}>{project.client}</span> : null}
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.pill}>{tag}</span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>Case study</p>
        <h2 className={styles.sectionHeading}>Full case study coming soon</h2>
        <div className={styles.stack}>
          <p className={styles.body}>{project.impact}</p>
          <p className={styles.body}>
            This lab route mirrors the current production fallback state for this project while pulling its summary,
            tags, year, and client from the shared project data source.
          </p>
        </div>
      </section>
    </main>
  );
}
