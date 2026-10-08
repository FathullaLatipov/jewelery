import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  readonly children: ReactNode;
  readonly as?: "p" | "span" | "h2";
  readonly id?: string;
  readonly reveal?: boolean;
  readonly className?: string;
}

/** Chapter marker: a short rule followed by a small-caps label. */
export function Eyebrow({ children, as: Tag = "p", id, reveal = false, className }: EyebrowProps) {
  return (
    <Tag id={id} className={cx("t-label", styles.eyebrow, className)} data-reveal={reveal ? "fade" : undefined}>
      <span className={styles.rule} aria-hidden="true" />
      {children}
    </Tag>
  );
}
