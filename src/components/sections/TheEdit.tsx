import type { EditContent } from "@/content/types";
import { cx } from "@/lib/cx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lines } from "@/components/ui/Lines";
import { Section } from "@/components/ui/Section";
import { EditRail } from "./EditRail";
import styles from "./TheEdit.module.css";

/** 04 — The Edit: a slow walk past ten objects, each with its gallery label. */
export function TheEdit({ content }: { readonly content: EditContent }) {
  return (
    <Section theme="limestone" id="edit" labelledBy="edit-title">
      <div className={cx("container", styles.header)}>
        <div className={styles.heading}>
          <Eyebrow reveal>{content.eyebrow}</Eyebrow>
          <h2 id="edit-title" className={cx("t-display-m", styles.title)} data-reveal="lines">
            <Lines lines={[content.title]} />
          </h2>
        </div>
        <p className={cx("t-body", styles.lede)} data-reveal="fade">
          {content.lede}
        </p>
      </div>
      <EditRail products={content.products} cta={content.cta} label={content.title} />
    </Section>
  );
}
