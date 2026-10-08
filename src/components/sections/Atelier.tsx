import type { AtelierContent } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { AtelierSteps } from "./AtelierSteps";

/** 06 — Chapter III: the four hands a piece passes through. */
export function Atelier({ content }: { readonly content: AtelierContent }) {
  return (
    <Section theme="paper" id="atelier" labelledBy="atelier-title">
      <AtelierSteps content={content} titleId="atelier-title" />
    </Section>
  );
}
