import type { Metadata } from "next";
import GeminiProjectHeroPreview from "@/components/sections/GeminiProjectHero";

export const metadata: Metadata = {
  title: "Gemini Hero Visual Lab | Sameer Gautam",
  description: "Sandbox for exploring right-side visuals for the Gemini project hero.",
};

export default function HeroLabPage() {
  return <GeminiProjectHeroPreview />;
}
