import type { Metadata } from "next";
import type React from "react";
import { homepageContent } from "@/lib/data/homepage";
import { projects, processSteps, beliefs } from "@/lib/data/projects";
import { caseStudies } from "@/lib/data/case-studies";
import type { Block, CaseStudyData, Project } from "@/lib/types";
import styles from "./design-lab.module.css";

export const metadata: Metadata = {
  title: "Design Lab — Sameer Gautam",
  description: "Isolated visual redesign sandbox for the portfolio.",
};

function joinItem(item: string | { label: string; detail: string }) {
  return typeof item === "string" ? item : `${item.label}: ${item.detail}`;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className={styles.meta}>
      <strong>{label}:</strong> {children}
    </p>
  );
}

function BlockView({ block, index }: { block: Block; index: number }) {
  switch (block.type) {
    case "paragraph":
      return <p className={styles.paragraph}>{block.text}</p>;
    case "subheading":
      return <h4 className={styles.subheading}>{block.text}</h4>;
    case "callout":
    case "pull-quote":
    case "closing-line":
      return <p className={styles.callout}>{block.text}</p>;
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
        <div className={styles.stack}>
          {block.fields.map((field) => (
            <Field key={field.label} label={field.label}>
              {field.value}
            </Field>
          ))}
        </div>
      );
    case "two-col-list":
      return (
        <div className={styles.stack}>
          {[block.left, block.right].map((col) => (
            <div key={col.heading} className={styles.card}>
              <h4 className={styles.cardTitle}>{col.heading}</h4>
              <ul className={styles.list}>
                {col.items.map((item) => (
                  <li key={joinItem(item)}>{joinItem(item)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "role-list":
      return (
        <div className={styles.stack}>
          {block.items.map((item) => (
            <Field key={item.abbr} label={item.abbr}>
              {item.fullName}. {item.description}
            </Field>
          ))}
        </div>
      );
    case "exploration-cards":
      return (
        <div className={styles.stack}>
          {block.items.map((item) => (
            <article key={item.heading} className={styles.card}>
              <h4 className={styles.cardTitle}>{item.heading}</h4>
              <p className={styles.paragraph}>{item.description}</p>
              <Field label="Strength">{item.strength}</Field>
              <Field label="Limitation">{item.limitation}</Field>
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
    case "publishing-workflow":
      return (
        <ol className={styles.list}>
          {block.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      );
    case "decisions":
      return (
        <div className={styles.stack}>
          {block.items.map((item, itemIndex) => (
            <article key={item.heading} className={styles.card}>
              <p className={styles.eyebrow}>
                {String((block.startIndex ?? 1) + itemIndex).padStart(2, "0")}
              </p>
              <h4 className={styles.cardTitle}>{item.heading}</h4>
              <p className={styles.paragraph}>{item.body}</p>
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
          {block.items.map((item, itemIndex) => (
            <article key={item.heading} className={styles.card}>
              <p className={styles.eyebrow}>
                {String((block.startIndex ?? 1) + itemIndex).padStart(2, "0")}
              </p>
              <h4 className={styles.cardTitle}>{item.heading}</h4>
              <Field label="Challenge">{item.challenge}</Field>
              <Field label="Decision">{item.decision}</Field>
              <Field label="Outcome">{item.outcome}</Field>
            </article>
          ))}
        </div>
      );
    case "before-after":
      return (
        <div className={styles.stack}>
          {[block.before, block.after].map((col) => (
            <div key={col.heading} className={styles.card}>
              <h4 className={styles.cardTitle}>{col.heading}</h4>
              <ul className={styles.list}>
                {col.items.map((item) => (
                  <li key={joinItem(item)}>{joinItem(item)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "context-cards":
      return (
        <div className={styles.stack}>
          {block.items.map((item) => (
            <article key={item.heading} className={styles.card}>
              <h4 className={styles.cardTitle}>{item.heading}</h4>
              <p className={styles.paragraph}>{item.body}</p>
            </article>
          ))}
        </div>
      );
    case "synthesis-flow":
      return (
        <div className={styles.stack}>
          {block.rows.map((row) => (
            <Field key={row.label} label={row.label}>
              {row.items.join("; ")}
            </Field>
          ))}
        </div>
      );
    case "synthesis-table":
      return (
        <div className={styles.stack}>
          {block.rows.map((row) => (
            <Field key={row.join(" / ")} label={row[0]}>
              {row[1]}
            </Field>
          ))}
        </div>
      );
    case "drift-audit":
      return (
        <div className={styles.stack}>
          {block.groups.map((group) => (
            <Field key={group.label} label={group.label}>
              {group.resolved.map((item) => `${item.label} ${item.hex}`).join("; ")}
            </Field>
          ))}
        </div>
      );
    case "token-chain":
      return (
        <ol className={styles.list}>
          {block.steps.map((step) => (
            <li key={step.token}>
              {step.tier}: {step.token}. {step.why}
            </li>
          ))}
        </ol>
      );
    case "contrast-matrix":
      return (
        <div className={styles.stack}>
          {block.rows.map((row) => (
            <Field key={row.pairing} label={row.pairing}>
              {row.ratio}. {row.fix ?? row.verdict}
            </Field>
          ))}
        </div>
      );
    case "component-anatomy":
      return (
        <div className={styles.card}>
          <h4 className={styles.cardTitle}>{block.componentName}</h4>
          <ul className={styles.list}>
            {block.annotations.map((item) => (
              <li key={item.label}>
                {item.label}: {item.token}
              </li>
            ))}
          </ul>
        </div>
      );
    case "benchmark-matrix":
      return (
        <div className={styles.stack}>
          {block.rows.map((row) => (
            <Field key={row.category} label={row.category}>
              {row.note ?? "Benchmark item"}
            </Field>
          ))}
        </div>
      );
    case "image-placeholder":
    case "case-study-image":
    case "case-study-video":
      return (
        <p className={styles.small}>
          Media placeholder: {block.caption}
        </p>
      );
    default:
      return (
        <p className={styles.small}>
          Unsupported content block {index + 1}
        </p>
      );
  }
}

function HomeContentPreview() {
  const featuredProjects = projects.filter((project) => project.featured && !project.hidden);

  return (
    <section className={styles.grid}>
      <h2 className={styles.sectionTitle}>Homepage Content</h2>
      <div className={styles.content}>
        <article className={styles.card}>
          <p className={styles.eyebrow}>Hero</p>
          <h3 className={styles.heading}>{homepageContent.hero.headingText}</h3>
          <p className={styles.paragraph}>{homepageContent.hero.statement}</p>
          <p className={styles.small}>
            {homepageContent.hero.signals.map((signal) => `${signal.value}: ${signal.label}`).join(" / ")}
          </p>
        </article>

        <article className={styles.card}>
          <p className={styles.eyebrow}>{homepageContent.work.eyebrow}</p>
          <h3 className={styles.heading}>{homepageContent.work.headline}</h3>
          <p className={styles.paragraph}>{homepageContent.work.summary}</p>
          {featuredProjects.map((project) => (
            <Field key={project.slug} label={project.title}>
              {project.description}
            </Field>
          ))}
        </article>

        <article className={styles.card}>
          <p className={styles.eyebrow}>{homepageContent.about.eyebrow}</p>
          <h3 className={styles.heading}>{homepageContent.about.headline}</h3>
          <p className={styles.paragraph}>{homepageContent.about.body}</p>
          <p className={styles.paragraph}>{homepageContent.about.mantra.join(" ")}</p>
        </article>

        <article className={styles.card}>
          <p className={styles.eyebrow}>{homepageContent.moments.eyebrow}</p>
          <h3 className={styles.heading}>{homepageContent.moments.headline}</h3>
          <p className={styles.paragraph}>{homepageContent.moments.body}</p>
          <ul className={styles.list}>
            {homepageContent.moments.items.map((item) => (
              <li key={`${item.title}-${item.location}`}>
                {[item.title, "company" in item ? item.company : undefined, item.location]
                  .filter(Boolean)
                  .join(", ")}
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <p className={styles.eyebrow}>{homepageContent.philosophy.eyebrow}</p>
          <h3 className={styles.heading}>{homepageContent.philosophy.statement}</h3>
          <p className={styles.paragraph}>{homepageContent.philosophy.body}</p>
          {beliefs.map((belief) => (
            <Field key={belief.heading} label={belief.heading}>
              {belief.body}
            </Field>
          ))}
        </article>

        <article className={styles.card}>
          <p className={styles.eyebrow}>{homepageContent.process.eyebrow}</p>
          <h3 className={styles.heading}>{homepageContent.process.headline}</h3>
          {processSteps.map((step) => (
            <Field key={step.number} label={`${step.number} ${step.title}`}>
              {step.description}
            </Field>
          ))}
          <p className={styles.paragraph}>{homepageContent.process.note}</p>
        </article>

        <article className={styles.card}>
          <p className={styles.eyebrow}>{homepageContent.testimonials.eyebrow}</p>
          <h3 className={styles.heading}>{homepageContent.testimonials.headline}</h3>
          {homepageContent.testimonials.items.map((item) => (
            <Field key={item.name} label={item.name}>
              {item.quote}
            </Field>
          ))}
        </article>

        <article className={styles.card}>
          <p className={styles.eyebrow}>{homepageContent.contact.eyebrow}</p>
          <h3 className={styles.heading}>{homepageContent.contact.headline}</h3>
          <p className={styles.paragraph}>{homepageContent.contact.body}</p>
        </article>
      </div>
    </section>
  );
}

function CaseStudyPreview({ project, content }: { project: Project; content?: CaseStudyData }) {
  if (!content) {
    return null;
  }

  return (
    <section className={styles.grid}>
      <h2 className={styles.sectionTitle}>{project.title}</h2>
      <div className={styles.content}>
        <article className={styles.card}>
          <p className={styles.eyebrow}>{project.category}</p>
          <h3 className={styles.heading}>{project.title}</h3>
          <p className={styles.paragraph}>{project.description}</p>
        </article>

        {content.sections.map((section) => (
          <article key={section.label} className={styles.card}>
            <p className={styles.eyebrow}>{section.label}</p>
            {section.heading ? <h3 className={styles.heading}>{section.heading}</h3> : null}
            <div className={styles.stack}>
              {section.blocks.map((block, index) => (
                <BlockView key={`${section.label}-${index}`} block={block} index={index} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function DesignLabPage() {
  const visibleCaseStudies = projects.filter(
    (project) => project.featured && !project.hidden && caseStudies[project.slug],
  );

  return (
    <main className={styles.lab}>
      <div className={styles.shell}>
        <header className={styles.masthead}>
          <p className={styles.eyebrow}>Design System Lab</p>
          <h1 className={styles.title}>Isolated redesign scaffold</h1>
          <p className={styles.intro}>
            This route is branch-only scaffolding for a future visual redesign. It uses new
            presentation files and route-scoped styles while reading live homepage and case-study
            content from the same data sources as production.
          </p>
        </header>

        <HomeContentPreview />

        {visibleCaseStudies.map((project) => (
          <CaseStudyPreview
            key={project.slug}
            project={project}
            content={caseStudies[project.slug]}
          />
        ))}
      </div>
    </main>
  );
}
