import type { Metadata } from "next";
import styles from "../design-lab.module.css";

export const metadata: Metadata = {
  title: "Demo — Design Lab",
};

const annotations = [
  "Workflow stage indicator",
  "Assigned reviewer",
  "Locked edit state",
  "Primary CTA",
];

export default function LabDemoPage() {
  return (
    <main>
      <div className={styles.shell}>
        <section className={styles.internalPage}>
          <p className={styles.eyebrow}>Component Demo</p>
          <h1 className={styles.heroTitle}>Annotated Image</h1>
          <p className={styles.lead}>
            Lab-local mirror of the production `/demo` route for the annotated image pattern.
          </p>

          <section className={styles.section}>
            <p className={styles.sectionLabel}>With annotations</p>
            <div className={styles.mediaBox}>
              <div className={styles.cards}>
                {annotations.map((annotation, index) => (
                  <article key={annotation} className={styles.card}>
                    <span className={styles.numeral}>{index + 1}</span>
                    <h2 className={styles.cardTitle}>{annotation}</h2>
                    <p className={styles.body}>Annotation legend item from the production demo structure.</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <p className={styles.sectionLabel}>Without annotations — caption only</p>
            <p className={styles.mediaBox}>
              Project-level view showing all modules and their individual Short Flow states
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}
