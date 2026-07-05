import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token Atlas — Sameer Gautam Design System",
  description:
    "The complete, current color, typography, spacing, motion, and governance reference for withsameer.design — generated from a real audit of the site's own compiled output.",
};

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
