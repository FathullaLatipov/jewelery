"use client";

import { useEffect, useRef, useState } from "react";
import type { Link, Product } from "@/content/types";
import { cx } from "@/lib/cx";
import { QUERY } from "@/lib/motion/tokens";
import { TextLink } from "@/components/ui/Action";
import { ArrowIcon } from "@/components/ui/Icon";
import { ProductCard } from "@/components/ui/ProductCard";
import styles from "./EditRail.module.css";

interface EditRailProps {
  readonly products: readonly Product[];
  readonly cta: Link;
  readonly label: string;
}

interface Edges {
  readonly start: boolean;
  readonly end: boolean;
}

/** Native horizontal scroll with snapping; the hairline beneath reports position. */
export function EditRail({ products, cta, label }: EditRailProps) {
  const railRef = useRef<HTMLUListElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const [edges, setEdges] = useState<Edges>({ start: true, end: false });

  useEffect(() => {
    const rail = railRef.current;
    const thumb = thumbRef.current;
    if (!rail || !thumb) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = rail.scrollWidth - rail.clientWidth;
      const ratio = rail.scrollWidth > 0 ? Math.min(rail.clientWidth / rail.scrollWidth, 1) : 1;
      const progress = max > 0 ? rail.scrollLeft / max : 0;
      thumb.style.setProperty("--ratio", ratio.toFixed(4));
      thumb.style.setProperty("--offset", `${(progress * (1 / ratio - 1) * 100).toFixed(2)}%`);
      const next = { start: rail.scrollLeft <= 2, end: rail.scrollLeft >= max - 2 };
      setEdges((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    rail.addEventListener("scroll", schedule, { passive: true });
    const observer = new ResizeObserver(schedule);
    observer.observe(rail);
    return () => {
      rail.removeEventListener("scroll", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const step = (direction: 1 | -1) => {
    const rail = railRef.current;
    const card = rail?.querySelector("li");
    if (!rail || !card) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    const still = !window.matchMedia(QUERY.motion).matches;
    rail.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap) * 2,
      behavior: still ? "auto" : "smooth",
    });
  };

  return (
    <div className={styles.wrap}>
      <ul ref={railRef} className={styles.rail} aria-label={label} data-reveal="stagger">
        {products.map((product, i) => (
          <li key={product.id} className={styles.slide} data-reveal-item="">
            <ProductCard
              product={product}
              index={String(i + 1).padStart(2, "0")}
              sizes="(min-width: 1440px) 20vw, (min-width: 1024px) 22vw, (min-width: 768px) 38vw, 80vw"
            />
          </li>
        ))}
      </ul>

      <div className={cx("container", styles.controls)}>
        <div className={styles.track} aria-hidden="true">
          <span ref={thumbRef} className={styles.thumb} />
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            aria-label="Previous pieces"
            disabled={edges.start}
            onClick={() => step(-1)}
          >
            <ArrowIcon className={styles.back} />
          </button>
          <button
            type="button"
            className={styles.button}
            aria-label="Next pieces"
            disabled={edges.end}
            onClick={() => step(1)}
          >
            <ArrowIcon />
          </button>
        </div>
        <TextLink href={cta.href} arrow className={styles.all}>
          {cta.label}
        </TextLink>
      </div>
    </div>
  );
}
