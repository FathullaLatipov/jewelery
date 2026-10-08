/*
 * Content models. Components consume these shapes only, so the static
 * data in this folder can later be replaced by a CMS adapter without
 * touching presentation code.
 */

/** Focal point in the 0–1 range, used for object positioning. */
export interface FocalPoint {
  readonly x: number;
  readonly y: number;
}

export interface ImageSource {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly focal?: FocalPoint;
}

/**
 * How a photograph sits on its surface.
 * `multiply` dissolves a white sweep into a light surface;
 * `lighten` dissolves a black sweep into a dark one.
 */
export type MediaBlend = "multiply" | "lighten";

export interface Media {
  readonly alt: string;
  readonly desktop: ImageSource;
  /** Art-directed crop served below 768px. */
  readonly mobile?: ImageSource;
  /** Average colour, painted while the image loads. */
  readonly tone: string;
  readonly blend?: MediaBlend;
  readonly credit?: string;
}

export interface Link {
  readonly label: string;
  readonly href: string;
}

export interface TextFragment {
  readonly text: string;
  readonly emphasis?: boolean;
}

/** A display line: plain text, or fragments when one phrase is set in italic. */
export type Phrase = string | readonly TextFragment[];

export interface Chapter {
  readonly numeral: string;
  readonly label: string;
  readonly title: string;
}

export interface MuseumLabelData {
  readonly index?: string;
  readonly object?: string;
  readonly title: string;
  readonly materials: string;
  readonly details?: readonly string[];
}

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly object: string;
  readonly materials: string;
  readonly stones: string;
  readonly href: string;
  readonly media: Media;
  /** Optional second view shown on hover, usually worn. */
  readonly worn?: Media;
}

export interface Collection {
  readonly id: string;
  readonly chapter: Chapter;
  readonly description: string;
  readonly label: MuseumLabelData;
  readonly primaryCaption: string;
  readonly cta: Link;
  readonly primary: Media;
  readonly detail: Media;
}

export interface Category {
  readonly id: string;
  readonly name: string;
  readonly note: string;
  readonly href: string;
  readonly media: Media;
}

export interface SalonService {
  readonly id: string;
  readonly name: string;
  readonly description: string;
}

export interface HighJewelryPiece {
  readonly id: string;
  readonly name: string;
  readonly object: string;
  readonly facts: readonly string[];
  readonly media: Media;
}

export interface AtelierStep {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly text: string;
  readonly media: Media;
}

/* — Homepage sections — */

export interface HeroContent {
  readonly eyebrow: string;
  readonly headline: readonly Phrase[];
  readonly lede: string;
  readonly primaryCta: Link;
  readonly secondaryCta: Link;
  readonly caption: { readonly index: string; readonly text: string };
  readonly scrollLabel: string;
  readonly media: Media;
}

export type ManifestoFragment =
  | { readonly kind: "text"; readonly text: string; readonly emphasis?: boolean }
  | { readonly kind: "media"; readonly media: Media };

export interface PreludeContent {
  readonly eyebrow: string;
  readonly statement: readonly (readonly ManifestoFragment[])[];
  readonly body: string;
  readonly link: Link;
}

export interface EditContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly lede: string;
  readonly cta: Link;
  readonly products: readonly Product[];
}

export interface NocturneContent {
  readonly chapter: Chapter;
  readonly lede: string;
  readonly wide: Media;
  readonly wideCaption: string;
  readonly pieces: readonly HighJewelryPiece[];
  readonly cta: Link;
}

export interface AtelierContent {
  readonly chapter: Chapter;
  readonly lede: string;
  readonly steps: readonly AtelierStep[];
}

export interface IndexContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly categories: readonly Category[];
}

export interface PromiseContent {
  readonly chapter: Chapter;
  readonly headline: readonly Phrase[];
  readonly lede: string;
  readonly ctas: readonly [Link, Link];
  readonly primary: Media;
  readonly secondary: Media;
  readonly secondaryCaption: string;
}

export interface SalonContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly lede: string;
  readonly services: readonly SalonService[];
  readonly primaryCta: Link;
  readonly secondaryCta: Link;
  readonly note: string;
  readonly media: Media;
}

export interface CorrespondenceContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly lede: string;
  readonly emailLabel: string;
  readonly emailPlaceholder: string;
  readonly submitLabel: string;
  readonly consent: string;
  readonly privacy: Link;
  readonly success: string;
  readonly errors: { readonly email: string; readonly consent: string };
}

export interface HomepageContent {
  readonly hero: HeroContent;
  readonly prelude: PreludeContent;
  readonly collection: Collection;
  readonly edit: EditContent;
  readonly nocturne: NocturneContent;
  readonly atelier: AtelierContent;
  readonly index: IndexContent;
  readonly promise: PromiseContent;
  readonly salon: SalonContent;
  readonly correspondence: CorrespondenceContent;
}

/* — Site chrome — */

export interface FooterColumn {
  readonly title: string;
  readonly links: readonly Link[];
}

export interface SiteContent {
  readonly brand: { readonly name: string; readonly legalName: string; readonly tagline: string };
  readonly primaryNav: readonly Link[];
  readonly appointment: Link;
  readonly wishlist: Link;
  readonly bag: Link & { readonly count: number };
  readonly searchLabel: string;
  readonly dock: { readonly menu: string; readonly search: string; readonly book: Link };
  readonly menu: { readonly primary: readonly Link[]; readonly secondary: readonly Link[] };
  readonly search: {
    readonly label: string;
    readonly placeholder: string;
    readonly suggestionsTitle: string;
    readonly suggestions: readonly Link[];
  };
  readonly footer: {
    readonly columns: readonly FooterColumn[];
    readonly social: FooterColumn;
    readonly locale: Link & { readonly title: string };
    readonly legal: readonly Link[];
    readonly copyright: string;
    readonly backToTop: string;
  };
}
