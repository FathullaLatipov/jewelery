"use client";

import { useState } from "react";
import type { IndexContent } from "@/content/types";
import { cx } from "@/lib/cx";
import { ArtImage } from "@/components/ui/ArtImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowIcon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { Section } from "@/components/ui/Section";
import { SmartLink } from "@/components/ui/SmartLink";
import styles from "./CategoryIndex.module.css";

/**
 * 07 — Index: the house as a table of contents.
 * Desktop: hovering or focusing a line sets it in italic and changes the plate.
 * Touch: each line carries its own thumbnail — nothing depends on hover.
 */
export function CategoryIndex({ content }: { readonly content: IndexContent }) {
  const [active, setActive] = useState(0);
  const current = content.categories[active];

  return (
    <Section theme="paper" id="index" labelledBy="index-title">
      <div className={cx("container grid", styles.grid)}>
        <header className={styles.header}>
          <Eyebrow reveal>{content.eyebrow}</Eyebrow>
          <h2 id="index-title" className="t-display-m" data-reveal="lines">
            <Lines lines={[content.title]} />
          </h2>
        </header>

        <ul className={styles.list} data-reveal="stagger">
          {content.categories.map((category, i) => (
            <li key={category.id} data-reveal-item="">
              <SmartLink
                href={category.href}
                className={styles.row}
                data-active={i === active ? "" : undefined}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className={cx("t-caption", styles.number)}>{String(i + 1).padStart(2, "0")}</span>
                <ArtImage media={category.media} ratio="4 / 5" sizes="72px" inline className={styles.thumb} />
                <span className={styles.label}>
                  <span className={styles.name}>
                    <span className={styles.roman}>{category.name}</span>
                    <span className={styles.italic} aria-hidden="true">
                      {category.name}
                    </span>
                  </span>
                  <span className={cx("t-caption", styles.note)}>{category.note}</span>
                </span>
                <ArrowIcon className={styles.arrow} />
              </SmartLink>
            </li>
          ))}
        </ul>

        <div className={styles.preview} aria-hidden="true">
          <div className={styles.plate}>
            {content.categories.map((category, i) => (
              <div key={category.id} className={styles.layer} data-active={i === active ? "" : undefined}>
                <ArtImage media={category.media} sizes="(min-width: 1024px) 30vw, 1px" />
              </div>
            ))}
          </div>
          <p className={cx("t-caption", styles.plateCaption)}>
            <span>{String(active + 1).padStart(2, "0")}</span>
            {current?.name}
          </p>
        </div>
      </div>
    </Section>
  );
}
