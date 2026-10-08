import type { CorrespondenceContent } from "@/content/types";
import { cx } from "@/lib/cx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Hairline } from "@/components/ui/Hairline";
import { Lines } from "@/components/ui/Lines";
import { Section } from "@/components/ui/Section";
import { CorrespondenceForm } from "./CorrespondenceForm";
import styles from "./Correspondence.module.css";

/** 10 — Correspondence: a single line, like signing a guest book. */
export function Correspondence({ content }: { readonly content: CorrespondenceContent }) {
  return (
    <Section theme="paper" id="correspondence" labelledBy="correspondence-title" spacing="continues">
      <div className="container">
        <Hairline />
      </div>
      <div className={cx("container grid", styles.grid)}>
        <div className={styles.intro}>
          <Eyebrow reveal>{content.eyebrow}</Eyebrow>
          <h2 id="correspondence-title" className="t-display-m" data-reveal="lines">
            <Lines lines={[content.title]} />
          </h2>
          <p className={cx("t-body", styles.lede)} data-reveal="fade">
            {content.lede}
          </p>
        </div>
        <div className={styles.form} data-reveal="fade">
          <CorrespondenceForm content={content} />
        </div>
      </div>
    </Section>
  );
}
