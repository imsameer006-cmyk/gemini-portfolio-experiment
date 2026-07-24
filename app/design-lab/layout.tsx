import type React from "react";
import LabNav from "./_components/LabNav";
import styles from "./design-lab.module.css";

export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.lab}>
      <LabNav />
      {children}
    </div>
  );
}
