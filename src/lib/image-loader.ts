import type { ImageLoaderProps } from "next/image";

/*
 * Image URL builder for next/image.
 * Placeholder photography is resized by the Unsplash CDN itself (AVIF/WebP, cached at the edge),
 * keeping the art-directed crop by scaling width and height together.
 * Any other source — local files or a future asset CDN — goes through the Next.js optimizer.
 */

const UNSPLASH = "https://images.unsplash.com/";

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = String(quality ?? 75);

  if (src.startsWith(UNSPLASH)) {
    const url = new URL(src);
    const sourceWidth = Number(url.searchParams.get("w"));
    const sourceHeight = Number(url.searchParams.get("h"));
    url.searchParams.set("w", String(width));
    if (sourceWidth > 0 && sourceHeight > 0) {
      url.searchParams.set("h", String(Math.round((width * sourceHeight) / sourceWidth)));
    }
    url.searchParams.delete("fm");
    url.searchParams.set("auto", "format");
    url.searchParams.set("q", q);
    return url.toString();
  }

  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${q}`;
}
