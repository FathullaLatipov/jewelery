import { cx } from "@/lib/cx";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { TextLink } from "@/components/ui/Action";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import styles from "./Preparation.module.css";

const COPY = {
  preparing: {
    eyebrow: "In preparation",
    lead: "This page is still",
    emphasis: "at the bench.",
    body: "It will open with the rest of the house. Until then, the collection is waiting where you left it.",
  },
  missing: {
    eyebrow: "Not found",
    lead: "This page does",
    emphasis: "not exist.",
    body: "The address may have changed, or the piece may no longer be in the collection.",
  },
} as const;

/** Holding page for routes that are linked but not yet built, and for true 404s. */
export function Preparation({ variant }: { readonly variant: keyof typeof COPY }) {
  const copy = COPY[variant];
  return (
    <Section theme="paper" labelledBy="preparation-title" spacing="none">
      <div className={cx("container", styles.inner)}>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h1 id="preparation-title" className={cx("t-display-l", styles.title)}>
          {copy.lead} <em>{copy.emphasis}</em>
        </h1>
        <p className={cx("t-lede", styles.lede)}>{copy.body}</p>
        <TextLink href="/" arrow>
          Return to the house
        </TextLink>
      </div>
      <MotionRoot />
    </Section>
  );
}
