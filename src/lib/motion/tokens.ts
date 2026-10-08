/* Motion tokens — mirrored from src/styles/tokens.css. Durations in seconds for GSAP. */

export const DURATION = {
  micro: 0.24,
  short: 0.48,
  reveal: 0.9,
  lines: 1.1,
  hero: 1.6,
} as const;

/** Custom eases registered in gsap.ts, matching --ease-silk and --ease-breath. */
export const EASE = {
  silk: "silk",
  breath: "breath",
} as const;

export const SHIFT = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

export const STAGGER = {
  lines: 0.09,
  items: 0.07,
} as const;

export const QUERY = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

/** ScrollTrigger start used by every scroll reveal. */
export const REVEAL_START = "top 88%";
