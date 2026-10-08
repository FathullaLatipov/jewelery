import type { Product } from "@/content/types";
import { ArtImage } from "./ArtImage";
import { ArrowIcon } from "./Icon";
import { MuseumLabel } from "./MuseumLabel";
import { SmartLink } from "./SmartLink";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  readonly product: Product;
  readonly index: string;
  readonly sizes: string;
}

/** An object on a pedestal: photograph, gallery label, and a quiet arrow. */
export function ProductCard({ product, index, sizes }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <SmartLink href={product.href} className={styles.link}>
        <div className={styles.media}>
          <ArtImage media={product.media} sizes={sizes} ratio="4 / 5" className={styles.primary} />
          {product.worn && <ArtImage media={product.worn} sizes={sizes} className={styles.worn} />}
          <span className={styles.glint} aria-hidden="true" />
        </div>
        <div className={styles.caption}>
          <MuseumLabel
            index={index}
            object={product.object}
            title={product.name}
            titleAs="h3"
            materials={product.materials}
            details={[product.stones]}
          />
          <ArrowIcon className={styles.arrow} />
        </div>
      </SmartLink>
    </article>
  );
}
