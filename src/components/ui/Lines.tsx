import { Fragment, type ReactNode } from "react";
import type { Phrase } from "@/content/types";
import { cx } from "@/lib/cx";
import styles from "./Lines.module.css";

interface LineProps {
  readonly children: ReactNode;
  readonly indent?: boolean;
  /** Part of the opening sequence rather than a scroll reveal. */
  readonly intro?: boolean;
  readonly className?: string;
}

/** One authored display line inside its own mask, so it can rise into place. */
export function Line({ children, indent = false, intro = false, className }: LineProps) {
  return (
    <span
      className={cx(styles.line, indent && styles.indent, className)}
      data-line=""
      data-intro={intro ? "line" : undefined}
    >
      <span className={styles.inner}>{children}</span>
    </span>
  );
}

export function renderPhrase(phrase: Phrase): ReactNode {
  if (typeof phrase === "string") return phrase;
  return phrase.map((fragment, i) =>
    fragment.emphasis ? <em key={i}>{fragment.text}</em> : <Fragment key={i}>{fragment.text}</Fragment>,
  );
}

interface LinesProps {
  readonly lines: readonly Phrase[];
  /** Indent every second line — the house typographic signature. */
  readonly indent?: boolean;
  readonly intro?: boolean;
}

/**
 * Authored display lines. Place inside a heading that carries
 * data-reveal="lines" (or pass `intro` for the opening sequence).
 */
export function Lines({ lines, indent = false, intro = false }: LinesProps) {
  return (
    <>
      {lines.map((line, i) => (
        <Line key={i} indent={indent && i % 2 === 1} intro={intro}>
          {renderPhrase(line)}
          {i < lines.length - 1 ? " " : null}
        </Line>
      ))}
    </>
  );
}
