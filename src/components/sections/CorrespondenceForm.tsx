"use client";

import { useRef, useState, type FormEvent } from "react";
import type { CorrespondenceContent } from "@/content/types";
import { cx } from "@/lib/cx";
import { ArrowIcon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import styles from "./CorrespondenceForm.module.css";

interface FieldErrors {
  readonly email?: string;
  readonly consent?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter sign-up. Validation is local; submission is not yet connected
 * to a mailing provider — wire it through a server action when one is chosen.
 */
export function CorrespondenceForm({ content }: { readonly content: CorrespondenceContent }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const next: FieldErrors = {
      email: EMAIL.test(email) ? undefined : content.errors.email,
      consent: data.get("consent") === "on" ? undefined : content.errors.consent,
    };
    setErrors(next);
    if (next.email) {
      emailRef.current?.focus();
      return;
    }
    if (next.consent) {
      consentRef.current?.focus();
      return;
    }
    setSent(true);
  };

  return (
    <div className={styles.wrap}>
      <p className={cx("t-lede", styles.success)} role="status">
        {sent ? content.success : ""}
      </p>

      {!sent && (
        <form className={styles.form} noValidate onSubmit={onSubmit}>
          <label htmlFor="correspondence-email" className={cx("t-label", styles.label)}>
            {content.emailLabel}
          </label>
          <div className={styles.field} data-invalid={errors.email ? "" : undefined}>
            <input
              ref={emailRef}
              id="correspondence-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={content.emailPlaceholder}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "correspondence-email-error" : undefined}
              className={cx("t-lede", styles.input)}
            />
            <button type="submit" className={cx("t-label", styles.submit)}>
              {content.submitLabel}
              <ArrowIcon />
            </button>
          </div>
          {errors.email && (
            <p id="correspondence-email-error" className={cx("t-caption", styles.error)}>
              {errors.email}
            </p>
          )}

          <div className={styles.consentRow}>
            <input
              ref={consentRef}
              id="correspondence-consent"
              name="consent"
              type="checkbox"
              className={styles.checkbox}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "correspondence-consent-error" : undefined}
            />
            <label htmlFor="correspondence-consent" className={cx("t-caption", styles.consent)}>
              {content.consent}
            </label>
            <SmartLink href={content.privacy.href} className={cx("t-caption", styles.privacy)}>
              {content.privacy.label}
            </SmartLink>
          </div>
          {errors.consent && (
            <p id="correspondence-consent-error" className={cx("t-caption", styles.error)}>
              {errors.consent}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
