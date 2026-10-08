import type { PromiseContent } from "@/content/types";
import { cx } from "@/lib/cx";
import { ButtonLink, TextLink } from "@/components/ui/Action";
import { ArtImage } from "@/components/ui/ArtImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lines } from "@/components/ui/Lines";
import { Section } from "@/components/ui/Section";
import styles from "./PromiseChapter.module.css";

/** 08 — Chapter IV: bridal, told through hands and metal rather than ceremony. */
export function PromiseChapter({ content }: { readonly content: PromiseContent }) {
  const [primaryCta, secondaryCta] = content.ctas;
  return (
    <Section theme="limestone" id="promise" labelledBy="promise-title">
      <div className={cx("container grid", styles.grid)}>
        <Eyebrow reveal className={styles.eyebrow}>
          {content.chapter.label} · {content.chapter.title}
        </Eyebrow>
        <h2 id="promise-title" className={cx("t-display-l", styles.headline)} data-reveal="lines">
          <Lines lines={content.headline} indent />
        </h2>

        <figure className={styles.primary}>
          <ArtImage media={content.primary} ratio="4 / 5" sizes="(min-width: 1024px) 52vw, 100vw" reveal parallax />
        </figure>

        <div className={styles.side}>
          <figure className={styles.secondary}>
            <div className={styles.mat}>
              <ArtImage media={content.secondary} ratio="3 / 4" sizes="(min-width: 1024px) 26vw, 60vw" reveal />
            </div>
            <figcaption className={cx("t-caption", styles.caption)}>{content.secondaryCaption}</figcaption>
          </figure>
          <p className={cx("t-lede", styles.lede)} data-reveal="fade">
            {content.lede}
          </p>
          <div className={styles.ctas} data-reveal="fade">
            <ButtonLink href={primaryCta.href} variant="outline">
              {primaryCta.label}
            </ButtonLink>
            <TextLink href={secondaryCta.href} arrow>
              {secondaryCta.label}
            </TextLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
