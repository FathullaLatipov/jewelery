"use client";

import { useRef } from "react";
import type { HighJewelryPiece } from "@/content/types";
import { cx } from "@/lib/cx";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { QUERY, SHIFT } from "@/lib/motion/tokens";
import { ArtImage } from "@/components/ui/ArtImage";
import styles from "./NocturneSequence.module.css";

/**
 * Desktop with motion: the stage pins and each piece replaces the last,
 * like objects changed in a vitrine. Everywhere else: a quiet vertical gallery.
 */
export function NocturneSequence({ pieces }: { readonly pieces: readonly HighJewelryPiece[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const total = String(pieces.length).padStart(2, "0");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(`${QUERY.desktop} and ${QUERY.motion}`, () => {
        root.dataset.mode = "pinned";
        const stage = root.querySelector<HTMLElement>("[data-stage]");
        const items = gsap.utils.toArray<HTMLElement>("[data-piece]", root);
        const progress = root.querySelector("[data-progress]");
        if (!stage || items.length < 2) return;

        const objectOf = (item: HTMLElement) => item.querySelector("[data-object]");
        const textOf = (item: HTMLElement) => item.querySelectorAll("[data-text] > *");

        items.slice(1).forEach((item) => {
          gsap.set(objectOf(item), { clipPath: "inset(100% 0% 0% 0%)" });
          gsap.set(textOf(item), { opacity: 0, y: SHIFT.sm });
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * (items.length - 1) * 1.25}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: 0.4 });
        items.forEach((item, i) => {
          if (i === 0) return;
          const previous = items[i - 1];
          const label = `piece-${i}`;
          tl.addLabel(label)
            .to(objectOf(previous), { opacity: 0, scale: 0.94, duration: 1 }, label)
            .to(textOf(previous), { opacity: 0, y: -SHIFT.sm, duration: 0.45, stagger: 0.04 }, label)
            .fromTo(
              objectOf(item),
              { clipPath: "inset(100% 0% 0% 0%)", scale: 1.04 },
              { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.1 },
              `${label}+=0.3`,
            )
            .to(textOf(item), { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }, `${label}+=0.8`)
            .to({}, { duration: 0.45 });
        });

        if (progress) {
          tl.fromTo(progress, { scaleX: 1 / items.length }, { scaleX: 1, ease: "none", duration: tl.duration() }, 0);
        }

        ScrollTrigger.sort();
        ScrollTrigger.refresh();

        return () => {
          delete root.dataset.mode;
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.stage} data-stage="">
        <ol className={cx("container", styles.pieces)}>
          {pieces.map((piece, i) => (
            <li key={piece.id} className={styles.piece} data-piece="">
              <div className={styles.object} data-object="">
                <ArtImage
                  media={piece.media}
                  fit="contain"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.text} data-text="">
                <p className={cx("t-label", styles.count)}>
                  {String(i + 1).padStart(2, "0")} / {total}
                </p>
                <h3 className={cx("t-display-m", styles.name)}>{piece.name}</h3>
                <p className={cx("t-label", styles.kind)}>{piece.object}</p>
                <ul className={styles.facts}>
                  {piece.facts.map((fact) => (
                    <li key={fact} className="t-caption">
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <div className={cx("container", styles.progressWrap)} aria-hidden="true">
          <span className={styles.progressTrack}>
            <span className={styles.progress} data-progress="" />
          </span>
        </div>
      </div>
    </div>
  );
}
