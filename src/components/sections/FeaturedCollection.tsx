import type { Collection } from "@/content/types";
import { cx } from "@/lib/cx";
import { TextLink } from "@/components/ui/Action";
import { ArtImage } from "@/components/ui/ArtImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lines } from "@/components/ui/Lines";
import { MuseumLabel } from "@/components/ui/MuseumLabel";
import { Section } from "@/components/ui/Section";
import styles from "./FeaturedCollection.module.css";

/** 03 — Chapter I: a tall portrait, an offset close-up, and the text set between them. */
export function FeaturedCollection({ collection }: { readonly collection: Collection }) {
  const titleId = `${collection.id}-title`;
  return (
    <Section theme="paper" id={collection.id} labelledBy={titleId} spacing="continues">
      <div className={cx("container grid", styles.grid)}>
        <figure className={styles.primary}>
          <ArtImage media={collection.primary} sizes="(min-width: 1024px) 46vw, 100vw" ratio="4 / 5" reveal parallax />
          <figcaption className={cx("t-caption", styles.caption)} data-reveal="fade">
            {collection.primaryCaption}
          </figcaption>
        </figure>

        <div className={styles.text}>
          <Eyebrow reveal>{collection.chapter.label}</Eyebrow>
          <h2 id={titleId} className={cx("t-display-l", styles.title)} data-reveal="lines">
            <Lines lines={[collection.chapter.title]} />
          </h2>
          <p className={cx("t-lede", styles.description)} data-reveal="fade">
            {collection.description}
          </p>
          <div data-reveal="fade">
            <TextLink href={collection.cta.href} arrow>
              {collection.cta.label}
            </TextLink>
          </div>
        </div>

        <figure className={styles.detail}>
          <div className={styles.mat}>
            <ArtImage media={collection.detail} sizes="(min-width: 1024px) 28vw, 64vw" ratio="3 / 4" reveal parallax />
          </div>
          <figcaption data-reveal="fade">
            <MuseumLabel {...collection.label} className={styles.label} />
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
