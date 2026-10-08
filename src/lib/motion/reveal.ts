"use client";

import { gsap } from "./gsap";
import { DURATION, EASE, REVEAL_START, SHIFT, STAGGER } from "./tokens";

/*
 * Reusable motion utilities. Each one animates from the initial state
 * declared in src/styles/motion.css to rest, once, when it enters view.
 * Markup opts in with data attributes, so server components stay static.
 */

type Root = Document | HTMLElement;

function all<T extends Element = HTMLElement>(root: Root, selector: string): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

function onEnter(trigger: Element) {
  return { trigger, start: REVEAL_START, once: true } as const;
}

/*
 * Masked lines start at translateY(130%) in CSS (enough to clear the mask's descender
 * padding, so no sliver of the letters shows). GSAP reads that computed
 * offset as pixels into `y`, so both `y` and `yPercent` are set explicitly.
 */
const LINE_HIDDEN = { yPercent: 130, y: 0 } as const;
const LINE_REST = { yPercent: 0, y: 0 } as const;

/** Authored lines rise from behind their own mask. */
export function revealLines(root: Root): void {
  for (const block of all(root, '[data-reveal="lines"]')) {
    const lines = all(block, "[data-line] > span");
    if (lines.length === 0) continue;
    gsap.fromTo(lines, LINE_HIDDEN, {
      ...LINE_REST,
      duration: DURATION.lines,
      ease: EASE.silk,
      stagger: STAGGER.lines,
      scrollTrigger: onEnter(block),
    });
  }
}

/** Short rise with a fade, for text blocks and captions. */
export function revealFades(root: Root): void {
  for (const el of all(root, '[data-reveal="fade"]')) {
    gsap.fromTo(
      el,
      { opacity: 0, y: SHIFT.md },
      { opacity: 1, y: 0, duration: DURATION.reveal, ease: EASE.silk, scrollTrigger: onEnter(el) },
    );
  }
}

/** Groups whose children arrive one after another. */
export function revealStaggers(root: Root): void {
  for (const group of all(root, '[data-reveal="stagger"]')) {
    const items = all(group, "[data-reveal-item]");
    if (items.length === 0) continue;
    gsap.fromTo(
      items,
      { opacity: 0, y: SHIFT.sm },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.reveal,
        ease: EASE.silk,
        stagger: STAGGER.items,
        scrollTrigger: onEnter(group),
      },
    );
  }
}

/** A curtain rises over the frame while the photograph settles. */
export function revealImages(root: Root): void {
  for (const frame of all(root, '[data-reveal="image"]')) {
    const img = frame.querySelector("img");
    const tl = gsap.timeline({ scrollTrigger: onEnter(frame) });
    tl.fromTo(
      frame,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: DURATION.reveal, ease: EASE.breath },
    );
    if (img) {
      tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: DURATION.reveal * 1.4, ease: EASE.silk }, 0);
    }
  }
}

/** Hairlines draw from the left. */
export function revealHairlines(root: Root): void {
  for (const line of all(root, '[data-reveal="hairline"]')) {
    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "0% 50%",
        duration: DURATION.lines,
        ease: EASE.breath,
        scrollTrigger: onEnter(line),
      },
    );
  }
}

/** Gentle drift of a photograph inside its frame. Desktop only — kept under ±6%. */
export function parallax(root: Root): void {
  for (const frame of all(root, "[data-parallax]")) {
    const inner = frame.querySelector("[data-media-inner]");
    if (!inner) continue;
    gsap.fromTo(
      inner,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }
}

export function revealAll(root: Root): void {
  revealLines(root);
  revealFades(root);
  revealStaggers(root);
  revealImages(root);
  revealHairlines(root);
}

/*
 * The opening sequence (hero lines, media settle, chrome) is CSS in
 * src/styles/motion.css so it begins at first paint, ahead of hydration.
 */

/** The hero recedes slightly as the page begins. Desktop only. */
export function heroDrift(root: Root): void {
  const hero = root.querySelector("[data-hero]");
  const media = root.querySelector("[data-hero-drift]");
  const content = root.querySelector("[data-hero-content]");
  if (!hero) return;
  const scrollTrigger = { trigger: hero, start: "top top", end: "bottom top", scrub: true } as const;
  if (media) gsap.fromTo(media, { yPercent: 0 }, { yPercent: 8, ease: "none", scrollTrigger });
  if (content) gsap.fromTo(content, { opacity: 1, y: 0 }, { opacity: 0, y: -SHIFT.lg, ease: "none", scrollTrigger });
}
