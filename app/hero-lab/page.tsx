import type { Metadata } from "next";
import HeroVisualLab from "@/components/labs/HeroVisualLab";

export const metadata: Metadata = {
  title: "Gemini Hero Visual Lab | Sameer Gautam",
  description: "Sandbox for exploring right-side visuals for the Gemini project hero.",
};

export default function HeroLabPage() {
  return <HeroVisualLab />;
}
