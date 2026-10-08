import type { MuseumLabelData } from "@/content/types";
import { cx } from "@/lib/cx";
import styles from "./MuseumLabel.module.css";

interface MuseumLabelProps extends MuseumLabelData {
  readonly titleAs?: "p" | "h3";
  readonly className?: string;
}

/** Product information set like a gallery label: index, object, name, materials, stones. */
export function MuseumLabel({
  index,
  object,
  title,
  materials,
  details,
  titleAs: Title = "p",
  className,
}: MuseumLabelProps) {
  return (
    <div className={cx(styles.label, className)}>
      {(index || object) && (
        <p className={cx("t-label", styles.meta)}>
          {index && <span className={styles.index}>N° {index}</span>}
          {object && <span>{object}</span>}
        </p>
      )}
      <Title className={cx("t-heading", styles.title)}>{title}</Title>
      <p className={cx("t-caption", styles.materials)}>{materials}</p>
      {details && details.length > 0 && <p className={cx("t-caption", styles.details)}>{details.join(" · ")}</p>}
    </div>
  );
}
