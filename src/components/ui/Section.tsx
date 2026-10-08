import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Section.module.css";

export type SurfaceTheme = "paper" | "limestone" | "ink" | "media";

interface SectionProps {
  readonly theme: SurfaceTheme;
  readonly id?: string;
  readonly labelledBy?: string;
  readonly label?: string;
  /**
   * Vertical rhythm. `continues` drops the top padding when a chapter flows
   * on from the one before it on the same surface.
   */
  readonly spacing?: "default" | "continues" | "tight" | "none";
  /** Layout hooks only. Spacing and surface belong to the props above, so they never compete across modules. */
  readonly className?: string;
  readonly children: ReactNode;
}

/** Every chapter is a Section: it owns a surface theme that the fixed chrome follows. */
export function Section({ theme, id, labelledBy, label, spacing = "default", className, children }: SectionProps) {
  return (
    <section
      id={id}
      data-theme={theme}
      data-surface=""
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cx(styles.section, styles[spacing], className)}
    >
      {children}
    </section>
  );
}
