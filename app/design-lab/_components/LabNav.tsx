import Link from "next/link";
import { projects } from "@/lib/data/projects";
import styles from "../design-lab.module.css";

const sectionLinks = [
  { href: "/design-lab#work", label: "Work" },
  { href: "/design-lab#about", label: "About" },
  { href: "/design-lab#process", label: "Process" },
  { href: "/design-lab#testimonials", label: "Testimonials" },
  { href: "/design-lab#contact", label: "Contact" },
];

const internalLinks = [
  { href: "/design-lab/system", label: "System" },
  { href: "/design-lab/demo", label: "Demo" },
  { href: "/design-lab/hero-lab", label: "Hero Lab" },
];

export default function LabNav() {
  const caseStudies = projects.filter((project) => project.featured && !project.hidden);

  return (
    <header className={styles.nav}>
      <nav className={styles.navInner} aria-label="Design lab navigation">
        <Link href="/design-lab" className={styles.wordmark}>
          Sameer Gautam / Lab
        </Link>
        <div className={styles.navLinks}>
          {sectionLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          {caseStudies.map((project) => (
            <Link key={project.slug} href={`/design-lab/work/${project.slug}`}>
              {project.slug === "gemini-digital-twin"
                ? "Gemini"
                : project.slug === "plm-collabspace"
                  ? "Collabspace"
                  : "Design System"}
            </Link>
          ))}
          {internalLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
