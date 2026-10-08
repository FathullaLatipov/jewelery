"use client";

import type { Ref } from "react";
import { site } from "@/content/site";
import { cx } from "@/lib/cx";
import { ArrowIcon, CloseIcon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import styles from "./SearchPanel.module.css";

interface SearchPanelProps {
  readonly inputRef: Ref<HTMLInputElement>;
  readonly onClose: () => void;
}

export function SearchPanel({ inputRef, onClose }: SearchPanelProps) {
  return (
    <div className={styles.panel} data-theme="paper">
      <div className={cx("container", styles.inner)}>
        <div className={styles.top}>
          <p className={cx("t-label", styles.title)}>{site.search.label}</p>
          <button type="button" className={styles.close} aria-label="Close search" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <form role="search" action="/search" className={styles.form}>
          <label htmlFor="site-search" className="visually-hidden">
            {site.search.label}
          </label>
          <input
            ref={inputRef}
            id="site-search"
            name="q"
            type="search"
            autoComplete="off"
            placeholder={site.search.placeholder}
            className={cx("t-display-m", styles.input)}
          />
          <button type="submit" className={styles.submit} aria-label="Search">
            <ArrowIcon />
          </button>
        </form>

        <div className={styles.suggestions}>
          <p className={cx("t-label", styles.title)} data-overlay-item="">
            {site.search.suggestionsTitle}
          </p>
          <ul className={styles.list}>
            {site.search.suggestions.map((link) => (
              <li key={link.label} data-overlay-item="">
                <SmartLink href={link.href} className={cx("t-heading", styles.suggestion)}>
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
