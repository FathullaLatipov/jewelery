"use client";

import type { Ref } from "react";
import { site } from "@/content/site";
import { cx } from "@/lib/cx";
import { BagIcon, HeartIcon, SearchIcon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import { Wordmark } from "@/components/ui/Wordmark";
import styles from "./SiteHeader.module.css";

interface SiteHeaderProps {
  readonly ref: Ref<HTMLElement>;
  readonly onSearch: () => void;
}

export function SiteHeader({ ref, onSearch }: SiteHeaderProps) {
  return (
    <header ref={ref} className={styles.header} data-theme="media" data-intro="chrome">
      <div className={styles.bar}>
        <SmartLink href="/" className={styles.brand} aria-label={`${site.brand.name}, home`}>
          <Wordmark />
        </SmartLink>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {site.primaryNav.map((link) => (
              <li key={link.label}>
                <SmartLink href={link.href} className={cx("t-label", styles.navLink)}>
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.utilities}>
          <button
            type="button"
            className={cx(styles.icon, styles.desktopOnly)}
            aria-label={site.searchLabel}
            onClick={onSearch}
          >
            <SearchIcon />
          </button>
          <SmartLink href={site.appointment.href} className={cx("t-label", styles.navLink, styles.desktopOnly)}>
            {site.appointment.label}
          </SmartLink>
          <SmartLink
            href={site.wishlist.href}
            className={cx(styles.icon, styles.desktopOnly)}
            aria-label={site.wishlist.label}
          >
            <HeartIcon />
          </SmartLink>
          <SmartLink
            href={site.bag.href}
            className={cx(styles.icon, styles.bag)}
            aria-label={`${site.bag.label}, ${site.bag.count} items`}
          >
            <BagIcon />
            <span className={styles.count} aria-hidden="true">
              {site.bag.count}
            </span>
          </SmartLink>
        </div>
      </div>
    </header>
  );
}
