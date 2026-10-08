import { site } from "@/content/site";
import { cx } from "@/lib/cx";
import styles from "./Wordmark.module.css";

interface WordmarkProps {
  readonly size?: "chrome" | "display";
  readonly className?: string;
}

/** Placeholder wordmark, set in the house serif. The name lives in content/site.ts. */
export function Wordmark({ size = "chrome", className }: WordmarkProps) {
  return <span className={cx(styles.wordmark, styles[size], className)}>{site.brand.name}</span>;
}
