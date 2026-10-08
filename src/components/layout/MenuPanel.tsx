"use client";

import { site } from "@/content/site";
import { cx } from "@/lib/cx";
import { CloseIcon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import { Wordmark } from "@/components/ui/Wordmark";
import styles from "./MenuPanel.module.css";

interface MenuPanelProps {
  readonly onClose: () => void;
}

export function MenuPanel({ onClose }: MenuPanelProps) {
  return (
    <div className={styles.panel} data-theme="ink">
      <div className={styles.top}>
        <Wordmark />
      </div>

      <nav aria-label="Menu" className={styles.body}>
        <ul className={styles.primary}>
          {site.menu.primary.map((link, i) => (
            <li key={link.label} data-overlay-item="">
              <SmartLink href={link.href} className={cx("t-display-m", styles.primaryLink)}>
                <span className={cx("t-caption", styles.index)}>{String(i + 1).padStart(2, "0")}</span>
                {link.label}
              </SmartLink>
            </li>
          ))}
        </ul>
        <ul className={styles.secondary}>
          {site.menu.secondary.map((link) => (
            <li key={link.label} data-overlay-item="">
              <SmartLink href={link.href} className={cx("t-label", styles.secondaryLink)}>
                {link.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </nav>

      <button type="button" className={cx("t-label", styles.close)} onClick={onClose}>
        <CloseIcon width={14} height={14} />
        Close
      </button>
    </div>
  );
}
