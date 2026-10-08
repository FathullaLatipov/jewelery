"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "@/lib/motion/gsap";
import { pauseScroll, resumeScroll } from "@/lib/motion/smooth-scroll";
import { DURATION, EASE, QUERY, SHIFT, STAGGER } from "@/lib/motion/tokens";
import { cx } from "@/lib/cx";
import styles from "./Overlay.module.css";

interface OverlayProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly label: string;
  /** Edge the panel opens from. */
  readonly from: "top" | "bottom";
  readonly initialFocus?: RefObject<HTMLElement | null>;
  readonly className?: string;
  readonly children: ReactNode;
}

/** Modal panel on the native <dialog>: focus trap, Escape and inert background come for free. */
export function Overlay({ open, onClose, label, from, initialFocus, className, children }: OverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog || !panel) return;

    const still = !window.matchMedia(QUERY.motion).matches;
    const hidden = from === "bottom" ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
    const items = panel.querySelectorAll("[data-overlay-item]");

    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.dataset.overlayOpen = "";
      pauseScroll();
      initialFocus?.current?.focus();
      if (still) return;
      gsap.fromTo(
        panel,
        { clipPath: hidden },
        { clipPath: "inset(0% 0% 0% 0%)", duration: DURATION.short * 1.3, ease: EASE.breath },
      );
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: SHIFT.sm },
          { opacity: 1, y: 0, duration: DURATION.reveal, ease: EASE.silk, stagger: STAGGER.items, delay: 0.18 },
        );
      }
      return;
    }

    if (!open && dialog.open) {
      const finish = () => {
        dialog.close();
        delete document.documentElement.dataset.overlayOpen;
        resumeScroll();
      };
      if (still) {
        finish();
        return;
      }
      gsap.to(panel, { clipPath: hidden, duration: DURATION.short, ease: EASE.breath, onComplete: finish });
    }
  }, [open, from, initialFocus]);

  return (
    <dialog
      ref={dialogRef}
      className={cx(styles.dialog, className)}
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // Backdrop clicks and any followed link close the panel.
        const followedLink = event.target instanceof Element && event.target.closest("a");
        if (event.target === event.currentTarget || followedLink) onClose();
      }}
    >
      <div ref={panelRef} className={styles.panel} data-from={from}>
        {children}
      </div>
    </dialog>
  );
}
