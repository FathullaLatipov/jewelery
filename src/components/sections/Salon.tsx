import type { SalonContent } from "@/content/types";
import { cx } from "@/lib/cx";
import { ButtonLink, TextLink } from "@/components/ui/Action";
import { ArtImage } from "@/components/ui/ArtImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lines } from "@/components/ui/Lines";
import { Section } from "@/components/ui/Section";
import styles from "./Salon.module.css";

/** 09 — The Salon: the invitation. The one place the page asks for something. */
export function Salon({ content }: { readonly content: SalonContent }) {
  return (
    <Section theme="paper" id="salon" labelledBy="salon-title">
      <div className={cx("container grid", styles.grid)}>
        <figure className={styles.media}>
          <ArtImage media={content.media} ratio="4 / 5" sizes="(min-width: 1024px) 50vw, 100vw" reveal parallax />
        </figure>

        <div className={styles.content}>
          <Eyebrow reveal>{content.eyebrow}</Eyebrow>
          <h2 id="salon-title" className={cx("t-display-l", styles.title)} data-reveal="lines">
            <Lines lines={[content.title]} />
          </h2>
          <p className={cx("t-lede", styles.lede)} data-reveal="fade">
            {content.lede}
          </p>

          <dl className={styles.services} data-reveal="stagger">
            {content.services.map((service) => (
              <div key={service.id} className={styles.service} data-reveal-item="">
                <dt className="t-label">{service.name}</dt>
                <dd className={cx("t-body", styles.description)}>{service.description}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.actions} data-reveal="fade">
            <ButtonLink href={content.primaryCta.href} wide>
              {content.primaryCta.label}
            </ButtonLink>
            <div className={styles.secondary}>
              <TextLink href={content.secondaryCta.href} arrow>
                {content.secondaryCta.label}
              </TextLink>
              <p className={cx("t-caption", styles.note)}>{content.note}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
