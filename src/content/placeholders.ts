import { getHomepage } from "./homepage";
import { site } from "./site";

/*
 * Every internal route the content links to that has no page yet.
 * They render an "in preparation" page instead of a 404, so links and
 * prefetching stay clean until the real pages are built.
 */

function collectHrefs(value: unknown, into: Set<string>): Set<string> {
  if (Array.isArray(value)) {
    for (const item of value) collectHrefs(item, into);
  } else if (typeof value === "object" && value !== null) {
    for (const [key, child] of Object.entries(value)) {
      if (key === "href" && typeof child === "string") into.add(child);
      else collectHrefs(child, into);
    }
  }
  return into;
}

const BUILT_ROUTES = new Set(["/"]);

function isPlaceholderRoute(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("/#") && !href.includes("?") && !BUILT_ROUTES.has(href);
}

export function getPlaceholderRoutes(): string[] {
  const hrefs = collectHrefs([site, getHomepage()], new Set<string>());
  return [...hrefs].filter(isPlaceholderRoute).sort();
}

export function isPlaceholder(path: string): boolean {
  return getPlaceholderRoutes().includes(path);
}
