import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import type { FocalPoint, Media } from "@/content/types";
import { cx } from "@/lib/cx";
import styles from "./ArtImage.module.css";

type FrameVars = CSSProperties &
  Partial<Record<"--ratio" | "--ratio-mobile" | "--tone" | "--focal" | "--focal-mobile", string>>;

export interface ArtImageProps {
  readonly media: Media;
  /** Rendered width hints, e.g. "(min-width: 1024px) 50vw, 100vw". */
  readonly sizes: string;
  /** The LCP image: fetched eagerly and with high priority. */
  readonly priority?: boolean;
  readonly fit?: "cover" | "contain";
  /** Frame aspect ratio (e.g. "4 / 5"). Omit to fill the parent. */
  readonly ratio?: string;
  readonly ratioMobile?: string;
  /** Curtain reveal when scrolled into view. */
  readonly reveal?: boolean;
  /** Gentle drift inside the frame on desktop. */
  readonly parallax?: boolean;
  /** Part of the opening sequence (hero only). */
  readonly intro?: boolean;
  /** Render with phrasing elements so the image can sit inside headings and inline links. */
  readonly inline?: boolean;
  readonly className?: string;
}

const MOBILE_QUERY = "(max-width: 767px)";

function position(focal: FocalPoint | undefined): string | undefined {
  return focal ? `${Math.round(focal.x * 100)}% ${Math.round(focal.y * 100)}%` : undefined;
}

/** Art-directed photograph: desktop and mobile crops, focal point, tone placeholder, lazy by default. */
export function ArtImage({
  media,
  sizes,
  priority = false,
  fit = "cover",
  ratio,
  ratioMobile,
  reveal = false,
  parallax = false,
  intro = false,
  inline = false,
  className,
}: ArtImageProps) {
  const loading = priority ? "eager" : "lazy";
  const common = { alt: media.alt, sizes, fill: true, quality: 75, loading } as const;

  const {
    props: { srcSet: desktopSrcSet, ...imgProps },
  } = getImageProps({ ...common, src: media.desktop.src, fetchPriority: priority ? "high" : undefined });
  const mobileSrcSet = media.mobile ? getImageProps({ ...common, src: media.mobile.src }).props.srcSet : undefined;

  const vars: FrameVars = {
    "--tone": media.tone,
    "--ratio": ratio,
    "--ratio-mobile": ratioMobile ?? ratio,
    "--focal": position(media.desktop.focal),
    "--focal-mobile": position(media.mobile?.focal ?? media.desktop.focal),
  };

  const Frame = inline ? "span" : "div";

  return (
    <Frame
      className={cx(styles.frame, ratio && styles.ratio, className)}
      style={vars}
      data-fit={fit}
      data-blend={media.blend}
      data-reveal={reveal ? "image" : undefined}
      data-parallax={parallax ? "" : undefined}
    >
      <Frame className={styles.inner} data-media-inner="" data-intro={intro ? "media" : undefined}>
        <picture>
          {mobileSrcSet && <source media={MOBILE_QUERY} srcSet={mobileSrcSet} sizes={sizes} />}
          <img {...imgProps} alt={media.alt} srcSet={desktopSrcSet} className={styles.img} />
        </picture>
      </Frame>
    </Frame>
  );
}
