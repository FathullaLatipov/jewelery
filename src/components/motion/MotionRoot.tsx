"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { heroDrift, parallax, revealAll } from "@/lib/motion/reveal";
import { startSmoothScroll } from "@/lib/motion/smooth-scroll";
import { QUERY } from "@/lib/motion/tokens";

/**
 * Boots the scroll-driven motion layer once per page: reveals, desktop-only
 * drift and smooth scrolling (the opening sequence is CSS, see motion.css).
 * Reduced motion skips all of it, leaving the static composition untouched.
 *
 * Render it as the last child of each page, not in the layout: the page
 * hydrates after the layout, and GSAP must not style markup React has not
 * hydrated yet.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useGSAP(
    () => {
      document.documentElement.dataset.motionReady = "";
      const mm = gsap.matchMedia();

      mm.add(QUERY.motion, () => {
        revealAll(document);
      });

      mm.add(`${QUERY.motion} and ${QUERY.desktop}`, () => {
        parallax(document);
        heroDrift(document);
      });

      mm.add(`${QUERY.motion} and ${QUERY.desktop} and ${QUERY.finePointer}`, () => startSmoothScroll());

      const refresh = () => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      };
      refresh();
      void document.fonts.ready.then(refresh);
      window.addEventListener("load", refresh);

      return () => {
        mm.revert();
        window.removeEventListener("load", refresh);
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
