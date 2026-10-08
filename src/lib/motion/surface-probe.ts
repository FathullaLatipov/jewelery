"use client";

import { ScrollTrigger } from "./gsap";

/*
 * Keeps a piece of fixed chrome (header, dock) in the theme of whatever
 * section currently sits beneath it. `edge` is the viewport edge the chrome
 * is pinned to and `offset` the distance from that edge to its centre line.
 */

export type ProbeEdge = "top" | "bottom";

const SURFACE = "[data-surface]";

function themeAt(y: number): string | null {
  for (const section of Array.from(document.querySelectorAll<HTMLElement>(SURFACE))) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= y && rect.bottom > y) return section.dataset.theme ?? null;
  }
  return null;
}

export function followSurfaces(target: HTMLElement, edge: ProbeEdge, offset: () => number): () => void {
  const apply = (theme: string | null | undefined) => {
    if (theme && target.dataset.theme !== theme) target.dataset.theme = theme;
  };
  const probeY = () => (edge === "top" ? offset() : window.innerHeight - offset());

  apply(themeAt(probeY()));

  const triggers = Array.from(document.querySelectorAll<HTMLElement>(SURFACE)).map((section) =>
    ScrollTrigger.create({
      trigger: section,
      start: () => (edge === "top" ? `top ${offset()}px` : `top bottom-=${offset()}px`),
      end: () => (edge === "top" ? `bottom ${offset()}px` : `bottom bottom-=${offset()}px`),
      onToggle: (self) => {
        if (self.isActive) apply(section.dataset.theme);
      },
    }),
  );

  return () => {
    for (const trigger of triggers) trigger.kill();
  };
}
