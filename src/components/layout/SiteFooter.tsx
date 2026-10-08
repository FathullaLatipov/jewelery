import { site } from "@/content/site";
import type { FooterColumn as FooterColumnData } from "@/content/types";
import { cx } from "@/lib/cx";
import { TextLink } from "@/components/ui/Action";
import { Hairline } from "@/components/ui/Hairline";
import { ArrowUpIcon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import { Wordmark } from "@/components/ui/Wordmark";
import styles from "./SiteFooter.module.css";

function FooterColumn({ column, className }: { readonly column: FooterColumnData; readonly className?: string }) {
  return (
    <nav className={cx(styles.column, className)} aria-label={column.title}>
      <p className={cx("t-label", styles.columnTitle)}>{column.title}</p>
      <ul className={styles.links}>
        {column.links.map((link) => (
          <li key={link.label}>
            <SmartLink href={link.href} className={styles.link}>
              {link.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  const { brand, footer } = site;
  return (
    <footer className={styles.footer} data-theme="ink" data-surface="">
      <div className="container">
        <div className={cx("grid", styles.top)}>
          <div className={styles.brand}>
            <Wordmark size="display" />
            <p className={cx("t-lede", styles.tagline)}>{brand.tagline}</p>
            <TextLink href={site.appointment.href} arrow>
              Book an appointment
            </TextLink>
          </div>
          {footer.columns.map((column) => (
            <FooterColumn key={column.title} column={column} className={styles.linkColumn} />
          ))}
          <FooterColumn column={footer.social} className={styles.linkColumn} />
        </div>

        <Hairline reveal={false} />

        <div className={styles.bottom}>
          <SmartLink href={footer.locale.href} className={styles.locale}>
            <span className={cx("t-label", styles.localeTitle)}>{footer.locale.title}</span>
            <span className={styles.localeValue}>{footer.locale.label}</span>
          </SmartLink>
          <ul className={styles.legal}>
            {footer.legal.map((link) => (
              <li key={link.label}>
                <SmartLink href={link.href} className={cx("t-caption", styles.legalLink)}>
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
          <p className={cx("t-caption", styles.copyright)}>{footer.copyright}</p>
          <a href="#content" className={cx("t-label", styles.backToTop)}>
            {footer.backToTop}
            <ArrowUpIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
