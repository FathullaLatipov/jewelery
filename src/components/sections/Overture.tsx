import type { HeroContent } from "@/content/types";
import { cx } from "@/lib/cx";
import { TextLink } from "@/components/ui/Action";
import { ArtImage } from "@/components/ui/ArtImage";
import { Lines } from "@/components/ui/Lines";
import { Section } from "@/components/ui/Section";
import styles from "./Overture.module.css";

/** 01 — Overture: one photograph, one sentence, nothing else asking for attention. */
export function Overture({ content }: { readonly content: HeroContent }) {
  return (
    <Section theme="media" spacing="none" labelledBy="overture-title" className={styles.hero}>
      <div className={styles.media} data-hero-drift="">
        <ArtImage media={content.media} sizes="100vw" priority intro className={styles.image} />
        <div className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={cx("container", styles.stage)} data-hero="">
        <div className={styles.content} data-hero-content="">
          <p className={cx("t-label", styles.eyebrow)} data-intro="fade">
            {content.eyebrow}
          </p>
          <h1 id="overture-title" className={cx("t-display-xl", styles.title)}>
            <Lines lines={content.headline} indent intro />
          </h1>
          <div className={styles.support}>
            <p className={cx("t-lede", styles.lede)} data-intro="fade">
              {content.lede}
            </p>
            <div className={styles.actions} data-intro="fade">
              <TextLink href={content.primaryCta.href} arrow>
                {content.primaryCta.label}
              </TextLink>
              <TextLink href={content.secondaryCta.href}>{content.secondaryCta.label}</TextLink>
            </div>
          </div>
        </div>

        <div className={styles.meta} data-intro="cue">
          <p className={cx("t-caption", styles.caption)}>
            <span className={styles.captionIndex}>N° {content.caption.index}</span>
            {content.caption.text}
          </p>
          <p className={cx("t-label", styles.scroll)} aria-hidden="true">
            {content.scrollLabel}
            <span className={styles.scrollLine} />
          </p>
        </div>
      </div>
    </Section>
  );
}
