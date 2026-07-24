import type { Metadata } from "next";
import Link from "next/link";
import styles from "../design-lab.module.css";

export const metadata: Metadata = {
  title: "System — Design Lab",
};

const chapters = [
  "Hierarchy",
  "Color",
  "Typography",
  "Spacing",
  "Radius & Shadows",
  "Motion",
  "Components",
  "Accessibility",
  "Governance",
];

export default function LabSystemPage() {
  return (
    <main>
      <div className={styles.shell}>
        <section className={styles.internalPage}>
          <p className={styles.eyebrow}>Design System / Token Atlas</p>
          <h1 className={styles.heroTitle}>Every value. Every rule.</h1>
          <p className={styles.lead}>
            Lab-local mirror of the current `/system` reference route. The production page is
            hardcoded, so this route mirrors its chapter structure without importing its production
            page component.
          </p>
          <div className={styles.cards}>
            {chapters.map((chapter, index) => (
              <article key={chapter} className={styles.card}>
                <span className={styles.numeral}>{String(index + 1).padStart(2, "0")}</span>
                <h2 className={styles.cardTitle}>{chapter}</h2>
                <p className={styles.body}>Reference chapter mirrored from the production Token Atlas.</p>
              </article>
            ))}
          </div>
          <Link href="/design-lab/work/design-system" className={styles.footerLink}>
            Read the design-system case study
          </Link>
        </section>
      </div>
    </main>
  );
}
