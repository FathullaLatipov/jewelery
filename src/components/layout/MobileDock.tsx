"use client";

import type { Ref } from "react";
import { site } from "@/content/site";
import { cx } from "@/lib/cx";
import { SmartLink } from "@/components/ui/SmartLink";
import styles from "./MobileDock.module.css";

interface MobileDockProps {
  readonly ref: Ref<HTMLElement>;
  readonly menuOpen: boolean;
  readonly onMenu: () => void;
  readonly onSearch: () => void;
}

/** Thumb-reach navigation for phones and tablets. */
export function MobileDock({ ref, menuOpen, onMenu, onSearch }: MobileDockProps) {
  return (
    <nav ref={ref} className={styles.dock} aria-label="Quick access" data-theme="media" data-intro="chrome">
      <button
        type="button"
        className={cx("t-label", styles.item)}
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
        onClick={onMenu}
      >
        <span className={styles.menuGlyph} aria-hidden="true" />
        {site.dock.menu}
      </button>
      <button type="button" className={cx("t-label", styles.item)} aria-haspopup="dialog" onClick={onSearch}>
        {site.dock.search}
      </button>
      <SmartLink href={site.dock.book.href} className={cx("t-label", styles.item, styles.book)}>
        {site.dock.book.label}
      </SmartLink>
    </nav>
  );
}
