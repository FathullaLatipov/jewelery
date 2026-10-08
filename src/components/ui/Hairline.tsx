import { cx } from "@/lib/cx";
import styles from "./Hairline.module.css";

interface HairlineProps {
  readonly reveal?: boolean;
  readonly strong?: boolean;
  readonly className?: string;
}

export function Hairline({ reveal = true, strong = false, className }: HairlineProps) {
  return (
    <hr
      className={cx(styles.hairline, strong && styles.strong, className)}
      data-reveal={reveal ? "hairline" : undefined}
    />
  );
}
