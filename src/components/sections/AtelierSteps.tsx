"use client";

import { useRef, useState } from "react";
import type { AtelierContent } from "@/content/types";
import { cx } from "@/lib/cx";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { QUERY } from "@/lib/motion/tokens";
import { ArtImage } from "@/components/ui/ArtImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lines } from "@/components/ui/Lines";
import styles from "./AtelierSteps.module.css";

interface AtelierStepsProps {
  readonly content: AtelierContent;
  readonly titleId: string;
}

/**
 * Desktop: the photograph stays anchored while the steps pass beside it,
 * changing as each one reaches the middle of the screen.
 * Mobile: every step carries its own photograph.
 */
export function AtelierSteps({ content, titleId }: AtelierStepsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = String(content.steps.length).padStart(2, "0");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(QUERY.desktop, () => {
        root.dataset.tracking = "";
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root);
        steps.forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 62%",
            end: "bottom 62%",
            onToggle: (self) => {
              if (self.isActive) setActive(i);
            },
          });
        });
        return () => {
          delete root.dataset.tracking;
        };
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={cx("container grid", styles.grid)}>
      <div className={styles.media}>
        <div className={styles.sticky}>
          {content.steps.map((step, i) => (
            <div key={step.id} className={styles.layer} data-active={i === active ? "" : undefined}>
              <ArtImage media={step.media} sizes="(min-width: 1024px) 46vw, 1px" />
            </div>
          ))}
          <p className={cx("t-label", styles.counter)} aria-hidden="true">
            <span>{content.steps[active]?.index}</span> / {total}
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <header className={styles.intro}>
          <Eyebrow reveal>{content.chapter.label}</Eyebrow>
          <h2 id={titleId} className="t-display-l" data-reveal="lines">
            <Lines lines={[content.chapter.title]} />
          </h2>
          <p className={cx("t-lede", styles.lede)} data-reveal="fade">
            {content.lede}
          </p>
        </header>

        <ol className={styles.steps}>
          {content.steps.map((step, i) => (
            <li key={step.id} className={styles.step} data-step="" data-active={i === active ? "" : undefined}>
              <ArtImage
                media={step.media}
                ratio="4 / 5"
                sizes="(min-width: 768px) 60vw, 92vw"
                reveal
                className={styles.stepImage}
              />
              <div className={styles.stepText} data-reveal="fade">
                <p className={cx("t-caption", styles.stepIndex)}>{step.index}</p>
                <h3 className={cx("t-display-m", styles.stepTitle)}>{step.title}</h3>
                <p className={cx("t-body", styles.stepBody)}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
