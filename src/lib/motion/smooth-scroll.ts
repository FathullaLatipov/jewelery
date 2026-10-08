"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/*
 * Desktop-only inertial scrolling, driven by the GSAP ticker so
 * ScrollTrigger and Lenis share one clock. Touch keeps native scrolling.
 */

let instance: Lenis | null = null;

export function startSmoothScroll(): () => void {
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, allowNestedScroll: true, autoRaf: false });
  const tick = (time: number) => lenis.raf(time * 1000);

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  instance = lenis;

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    instance = null;
  };
}

export function pauseScroll(): void {
  instance?.stop();
}

export function resumeScroll(): void {
  instance?.start();
}

/** Scrolls to an in-page target, smoothly unless the visitor prefers reduced motion. */
export function scrollToTarget(target: HTMLElement): void {
  if (instance) {
    instance.scrollTo(target, { duration: 1.4 });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
