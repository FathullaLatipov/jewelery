import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { ArrowIcon } from "./Icon";
import { SmartLink } from "./SmartLink";
import styles from "./Action.module.css";

interface ButtonLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: "solid" | "outline";
  /** Spans its column, label left and arrow right — a reply card rather than a pill. */
  readonly wide?: boolean;
  readonly className?: string;
}

export function ButtonLink({ href, children, variant = "solid", wide = false, className }: ButtonLinkProps) {
  return (
    <SmartLink href={href} className={cx(styles.button, styles[variant], wide && styles.wide, className)}>
      <span className="t-label">{children}</span>
      <ArrowIcon className={styles.arrow} />
    </SmartLink>
  );
}

interface TextLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly arrow?: boolean;
  readonly className?: string;
}

/** Small-caps link with a hairline that redraws on hover. */
export function TextLink({ href, children, arrow = false, className }: TextLinkProps) {
  return (
    <SmartLink href={href} className={cx("t-label", styles.textLink, className)}>
      <span className={styles.underline}>{children}</span>
      {arrow && <ArrowIcon className={styles.arrow} />}
    </SmartLink>
  );
}
