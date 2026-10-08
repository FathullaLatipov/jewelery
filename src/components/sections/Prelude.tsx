import type { PreludeContent } from "@/content/types";
import { cx } from "@/lib/cx";
import { TextLink } from "@/components/ui/Action";
import { ArtImage } from "@/components/ui/ArtImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Line } from "@/components/ui/Lines";
import { Section } from "@/components/ui/Section";
import styles from "./Prelude.module.css";

/** 02 — Prelude: the manifesto, set like the opening page of a monograph. */
export function Prelude({ content }: { readonly content: PreludeContent }) {
  return (
    <Section theme="paper" id="prelude" labelledBy="prelude-title">
      <div className={cx("container grid", styles.grid)}>
        <Eyebrow reveal className={styles.eyebrow}>
          {content.eyebrow}
        </Eyebrow>

        <h2 id="prelude-title" className={cx("t-display-l", styles.statement)} data-reveal="lines">
          {content.statement.map((line, i) => (
            <Line key={i} indent={i % 2 === 1}>
              {line.map((fragment, j) => {
                if (fragment.kind === "media") {
                  return (
                    <ArtImage
                      key={j}
                      media={fragment.media}
                      sizes="(min-width: 1024px) 180px, 110px"
                      inline
                      className={styles.inlineMedia}
                    />
                  );
                }
                return fragment.emphasis ? <em key={j}>{fragment.text}</em> : <span key={j}>{fragment.text}</span>;
              })}
              {i < content.statement.length - 1 ? " " : null}
            </Line>
          ))}
        </h2>

        <div className={styles.aside} data-reveal="fade">
          <p className={cx("t-body", styles.body)}>{content.body}</p>
          <TextLink href={content.link.href} arrow>
            {content.link.label}
          </TextLink>
        </div>
      </div>
    </Section>
  );
}
