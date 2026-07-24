import Link from "next/link";
import type { Metadata } from "next";
import { homepageContent } from "@/lib/data/homepage";
import { beliefs, processSteps, projects } from "@/lib/data/projects";
import styles from "./design-lab.module.css";

export const metadata: Metadata = {
  title: "Design Lab — Sameer Gautam",
  description: "Structurally isolated redesign sandbox for the portfolio.",
};

export default function DesignLabHomePage() {
  const featuredProjects = projects.filter((project) => project.featured && !project.hidden);

  return (
    <main>
      <div className={styles.shell}>
        <section className={styles.hero} aria-label="Introduction">
          <p className={styles.eyebrow}>Design Lab</p>
          <h1 className={styles.heroTitle}>{homepageContent.hero.headingText}</h1>
          <p className={styles.lead}>{homepageContent.hero.statement}</p>
          <div className={styles.cards} aria-label="Portfolio focus areas">
            {homepageContent.hero.signals.map((signal) => (
              <article key={signal.value} className={styles.card}>
                <h2 className={styles.cardTitle}>{signal.value}</h2>
                <p className={styles.eyebrow}>{signal.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className={styles.section}>
          <div className={styles.sectionGrid}>
            <p className={styles.sectionLabel}>{homepageContent.work.eyebrow}</p>
            <div>
              <h2 className={styles.display}>{homepageContent.work.headline}</h2>
              <p className={styles.body}>{homepageContent.work.summary}</p>
              <div className={`${styles.projectGrid} ${styles.topGap}`}>
                {featuredProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/design-lab/work/${project.slug}`}
                    className={styles.projectCard}
                  >
                    <div>
                      <p className={styles.eyebrow}>{project.category}</p>
                      <h3 className={styles.cardTitle}>{project.title}</h3>
                    </div>
                    <p className={styles.body}>{project.description}</p>
                    <div className={styles.tagRow}>
                      <span className={styles.pill}>{project.impact}</span>
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className={styles.section}>
          <div className={styles.sectionGrid}>
            <p className={styles.sectionLabel}>{homepageContent.about.eyebrow}</p>
            <div className={styles.stack}>
              <h2 className={styles.display}>{homepageContent.about.headline}</h2>
              <p className={styles.body}>{homepageContent.about.body}</p>
              <p className={styles.lead}>{homepageContent.about.mantra.join(" ")}</p>
              <div className={styles.tagRow}>
                {homepageContent.about.facts.map((fact) => (
                  <span key={fact} className={styles.tag}>
                    {fact}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience-moments" className={styles.section}>
          <div className={styles.sectionGrid}>
            <p className={styles.sectionLabel}>{homepageContent.moments.eyebrow}</p>
            <div className={styles.stack}>
              <h2 className={styles.display}>{homepageContent.moments.headline}</h2>
              <p className={styles.body}>{homepageContent.moments.body}</p>
              <div className={styles.cards}>
                {homepageContent.moments.items.map((moment) => (
                  <article key={`${moment.title}-${moment.location}`} className={styles.card}>
                    <h3 className={styles.cardTitle}>{moment.title}</h3>
                    <p className={styles.eyebrow}>
                      {["company" in moment ? moment.company : undefined, moment.location]
                        .filter(Boolean)
                        .join(" / ")}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="philosophy" className={styles.section}>
          <div className={styles.sectionGrid}>
            <p className={styles.sectionLabel}>{homepageContent.philosophy.eyebrow}</p>
            <div className={styles.stack}>
              <blockquote className={styles.heroTitle}>
                “{homepageContent.philosophy.statement}”
              </blockquote>
              <p className={styles.body}>{homepageContent.philosophy.body}</p>
              <div className={styles.cards}>
                {beliefs.map((belief) => (
                  <article key={belief.heading} className={styles.card}>
                    <h3 className={styles.cardTitle}>{belief.heading}</h3>
                    <p className={styles.body}>{belief.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="process" className={styles.section}>
          <div className={styles.sectionGrid}>
            <p className={styles.sectionLabel}>{homepageContent.process.eyebrow}</p>
            <div className={styles.stack}>
              <h2 className={styles.display}>{homepageContent.process.headline}</h2>
              <div className={styles.cards}>
                {processSteps.map((step) => (
                  <article key={step.number} className={styles.card}>
                    <span className={styles.numeral}>{step.number}</span>
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                    <p className={styles.body}>{step.description}</p>
                  </article>
                ))}
              </div>
              <p className={styles.body}>{homepageContent.process.note}</p>
            </div>
          </div>
        </section>

        <section id="testimonials" className={styles.section}>
          <div className={styles.sectionGrid}>
            <p className={styles.sectionLabel}>{homepageContent.testimonials.eyebrow}</p>
            <div className={styles.stack}>
              <h2 className={styles.display}>{homepageContent.testimonials.headline}</h2>
              <div className={styles.cards}>
                {homepageContent.testimonials.items.map((testimonial) => (
                  <article key={testimonial.name} className={styles.card}>
                    <p className={styles.lead}>“{testimonial.quote}”</p>
                    <div>
                      <h3 className={styles.cardTitle}>{testimonial.name}</h3>
                      <p className={styles.body}>
                        {[testimonial.role, testimonial.company].filter(Boolean).join(" / ")}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className={styles.section}>
          <div className={styles.sectionGrid}>
            <p className={styles.sectionLabel}>{homepageContent.contact.eyebrow}</p>
            <div className={styles.stack}>
              <h2 className={styles.display}>{homepageContent.contact.headline}</h2>
              <p className={styles.body}>{homepageContent.contact.body}</p>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <Link href="/design-lab/work/gemini-digital-twin" className={styles.footerLink}>
            Start with Gemini
          </Link>
        </footer>
      </div>
    </main>
  );
}
