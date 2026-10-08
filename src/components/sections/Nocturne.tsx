import type { NocturneContent } from "@/content/types";
import { cx } from "@/lib/cx";
import { ButtonLink } from "@/components/ui/Action";
import { ArtImage } from "@/components/ui/ArtImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lines } from "@/components/ui/Lines";
import { Section } from "@/components/ui/Section";
import { NocturneSequence } from "./NocturneSequence";
import styles from "./Nocturne.module.css";

/** 05 — Chapter II: high jewelry, after dark. Home of the only pinned sequence. */
export function Nocturne({ content }: { readonly content: NocturneContent }) {
  return (
    <Section theme="ink" id="nocturne" labelledBy="nocturne-title">
      <div className={cx("container grid", styles.intro)}>
        <Eyebrow reveal className={styles.eyebrow}>
          {content.chapter.label}
        </Eyebrow>
        <h2 id="nocturne-title" className={cx("t-display-xl", styles.title)} data-reveal="lines">
          <Lines lines={[[{ text: content.chapter.title, emphasis: true }]]} />
        </h2>
        <p className={cx("t-lede", styles.lede)} data-reveal="fade">
          {content.lede}
        </p>
      </div>

      <figure className={styles.wide}>
        <ArtImage media={content.wide} sizes="100vw" ratio="21 / 9" ratioMobile="4 / 5" reveal parallax />
        <figcaption className={cx("container t-caption", styles.wideCaption)}>{content.wideCaption}</figcaption>
      </figure>

      <NocturneSequence pieces={content.pieces} />

      <div className={cx("container", styles.outro)} data-reveal="fade">
        <ButtonLink href={content.cta.href} variant="outline">
          {content.cta.label}
        </ButtonLink>
      </div>
    </Section>
  );
}
