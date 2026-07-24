import type { Metadata } from "next";
import styles from "../design-lab.module.css";

export const metadata: Metadata = {
  title: "Hero Lab — Design Lab",
  robots: { index: false, follow: false },
};

const canvases = [
  "Canvas 1 — Light",
  "Canvas 2 — Dark",
  "Canvas 3 — Silver / Platinum",
  "Sandbox — Gemini Hero",
  "Sandbox — Collabspace Hero",
];

export default function LabHeroLabPage() {
  return (
    <main>
      <div className={styles.shell}>
        <section className={styles.internalPage}>
          <p className={styles.eyebrow}>Hero Banner Lab</p>
          <h1 className={styles.heroTitle}>Building clarity out of complexity.</h1>
          <p className={styles.lead}>
            Lab-local mirror of the current `/hero-lab` route. Production hero-lab content is
            hardcoded and visual-asset heavy, so this sandbox recreates the route structure without
            importing production sandbox components.
          </p>
          <div className={styles.stack}>
            {canvases.map((canvas) => (
              <article key={canvas} className={styles.mediaBox}>
                <p className={styles.sectionLabel}>{canvas}</p>
                <h2 className={styles.display}>Building clarity out of complexity.</h2>
                <p className={styles.body}>
                  Product Design / Enterprise Systems / Workflow Design
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
