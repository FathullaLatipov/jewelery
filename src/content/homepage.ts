import { media } from "./media";
import type { HomepageContent } from "./types";

const homepage: HomepageContent = {
  hero: {
    eyebrow: "Autumn–Winter 2026 · Chapter I",
    headline: ["Light,", "held still."],
    lede: "Jewelry shaped by material, light and the quiet precision of the hand.",
    primaryCta: { label: "Explore the collection", href: "#collection" },
    secondaryCta: { label: "The House", href: "#atelier" },
    caption: { index: "01", text: "Emerald-cut diamond, platinum" },
    scrollLabel: "Scroll",
    media: media.heroRing,
  },

  prelude: {
    eyebrow: "Prelude",
    statement: [
      [{ kind: "text", text: "Some pieces are designed to catch the eye." }],
      [
        { kind: "text", text: "Others are made to " },
        { kind: "media", media: media.preludeLight },
        { kind: "text", text: " hold the light.", emphasis: true },
      ],
    ],
    body: "Every Lueur piece begins with a single stone and the way it receives light. We draw around it slowly, by hand, until nothing remains that does not belong.",
    link: { label: "The House", href: "#atelier" },
  },

  collection: {
    id: "collection",
    chapter: { numeral: "I", label: "Chapter I", title: "The Form of Light" },
    description:
      "Stones cut long and clean, set low in platinum so light passes straight through them. A collection drawn from the geometry of a single beam.",
    label: {
      index: "01",
      object: "Ring",
      title: "The Form of Light",
      materials: "Platinum, pear-cut sapphire, diamonds.",
      details: ["Sapphire 4.86 ct", "Diamonds 0.92 ct"],
    },
    primaryCaption: "Necklace, The Form of Light — worn in late sun",
    cta: { label: "Discover collection", href: "/collections/the-form-of-light" },
    primary: media.formPortrait,
    detail: media.formDetail,
  },

  edit: {
    eyebrow: "The Edit",
    title: "Ten pieces, chosen this season",
    lede: "Studied in the hand before they are ever seen in a window.",
    cta: { label: "View all creations", href: "/creations" },
    products: [
      {
        id: "meridian",
        name: "Meridian Solitaire",
        object: "Ring",
        materials: "Yellow gold",
        stones: "Emerald-cut diamond 2.10 ct",
        href: "/creations/meridian-solitaire",
        media: media.meridian,
      },
      {
        id: "halo-sapphire",
        name: "Halo, Sapphire",
        object: "Ring",
        materials: "Platinum",
        stones: "Oval sapphire 2.40 ct, diamonds",
        href: "/creations/halo-sapphire",
        media: media.haloSapphire,
      },
      {
        id: "line",
        name: "Line",
        object: "Bracelet",
        materials: "Platinum",
        stones: "Diamonds 6.80 ct",
        href: "/creations/line-bracelet",
        media: media.lineBracelet,
        worn: media.lineBraceletWorn,
      },
      {
        id: "tide",
        name: "Tide",
        object: "Earrings",
        materials: "Yellow gold",
        stones: "Akoya pearls",
        href: "/creations/tide-earrings",
        media: media.tidePearls,
        worn: media.tidePearlsWorn,
      },
      {
        id: "fall",
        name: "Fall",
        object: "Earrings",
        materials: "Yellow gold",
        stones: "Polished, hand-finished",
        href: "/creations/fall-earrings",
        media: media.fallEarrings,
        worn: media.fallEarringsWorn,
      },
      {
        id: "rose-cushion",
        name: "Rose Cushion",
        object: "Ring",
        materials: "Rose gold",
        stones: "Pink sapphire 3.05 ct, diamonds",
        href: "/creations/rose-cushion",
        media: media.roseCushion,
      },
      {
        id: "torsade",
        name: "Torsade",
        object: "Hoops",
        materials: "Yellow gold",
        stones: "Twisted by hand",
        href: "/creations/torsade-hoops",
        media: media.torsadeHoops,
        worn: media.torsadeHoopsWorn,
      },
      {
        id: "constellation",
        name: "Constellation",
        object: "Bracelet",
        materials: "Yellow gold",
        stones: "Sapphires, rubies, emeralds",
        href: "/creations/constellation",
        media: media.constellation,
        worn: media.constellationWorn,
      },
      {
        id: "crossing",
        name: "Crossing",
        object: "Ring",
        materials: "White gold",
        stones: "Pavé diamonds 0.84 ct",
        href: "/creations/crossing",
        media: media.crossing,
      },
      {
        id: "strata",
        name: "Strata",
        object: "Necklaces",
        materials: "Yellow gold",
        stones: "Diamonds, fine chain",
        href: "/creations/strata",
        media: media.strata,
        worn: media.strataWorn,
      },
    ],
  },

  nocturne: {
    chapter: { numeral: "II", label: "Chapter II", title: "Nocturne" },
    lede: "High jewelry, composed after dark. Three pieces, each made once and never repeated.",
    wide: media.nocturneWide,
    wideCaption: "Nocturne — photographed by a single lamp",
    pieces: [
      {
        id: "nocturne-i",
        name: "Nocturne I",
        object: "Necklace",
        facts: ["Blackened platinum", "Diamond, natural pearl", "Hand-finished"],
        media: media.nocturneOne,
      },
      {
        id: "nocturne-ii",
        name: "Nocturne II",
        object: "Pendant",
        facts: ["Platinum, white enamel", "Amethyst 38.20 ct", "Unique piece"],
        media: media.nocturneTwo,
      },
      {
        id: "nocturne-iii",
        name: "Nocturne III",
        object: "Brooch",
        facts: ["Platinum, white gold", "Pink spinel, diamond", "Hand-engraved"],
        media: media.nocturneThree,
      },
    ],
    cta: { label: "Request a private viewing", href: "#salon" },
  },

  atelier: {
    chapter: { numeral: "III", label: "Chapter III", title: "The Atelier" },
    lede: "Each piece passes through four pairs of hands. Nothing is hurried, and nothing leaves the bench until it is ready.",
    steps: [
      {
        id: "sketch",
        index: "01",
        title: "Sketch",
        text: "A piece begins on paper, drawn at full scale around the stone it will hold. Proportion is settled here, long before metal.",
        media: media.atelierSketch,
      },
      {
        id: "stone",
        index: "02",
        title: "Stone",
        text: "Stones are chosen one at a time under north light, for the way they hold colour rather than for size alone.",
        media: media.atelierStone,
      },
      {
        id: "setting",
        index: "03",
        title: "Setting",
        text: "Each claw is raised by hand, with as little metal as the stone allows, so light can enter from every side.",
        media: media.atelierSetting,
      },
      {
        id: "polish",
        index: "04",
        title: "Polish",
        text: "The final finish takes days, not hours. Every surface is worked until it reflects without distortion.",
        media: media.atelierPolish,
      },
    ],
  },

  index: {
    eyebrow: "Index",
    title: "Explore the house",
    categories: [
      {
        id: "high-jewelry",
        name: "High Jewelry",
        note: "Unique pieces, by appointment",
        href: "#nocturne",
        media: media.indexHighJewelry,
      },
      {
        id: "fine-jewelry",
        name: "Fine Jewelry",
        note: "Made to be worn every day",
        href: "/fine-jewelry",
        media: media.indexFineJewelry,
      },
      {
        id: "rings",
        name: "Rings",
        note: "Solitaires, bands, cocktail rings",
        href: "/rings",
        media: media.indexRings,
      },
      {
        id: "necklaces",
        name: "Necklaces",
        note: "Pendants, rivières, fine chains",
        href: "/necklaces",
        media: media.indexNecklaces,
      },
      { id: "earrings", name: "Earrings", note: "Studs, drops, hoops", href: "/earrings", media: media.indexEarrings },
      {
        id: "bracelets",
        name: "Bracelets",
        note: "Line bracelets, bangles, cuffs",
        href: "/bracelets",
        media: media.indexBracelets,
      },
    ],
  },

  promise: {
    chapter: { numeral: "IV", label: "Chapter IV", title: "Promise" },
    headline: ["Made for the moment", [{ text: "you choose to keep.", emphasis: true }]],
    lede: "Engagement rings and wedding bands, made to your hand and finished in our atelier. Every stone is chosen with you, in private.",
    ctas: [
      { label: "Engagement rings", href: "/bridal/engagement-rings" },
      { label: "Book a consultation", href: "#salon" },
    ],
    primary: media.promiseHand,
    secondary: media.promiseBands,
    secondaryCaption: "Wedding bands in yellow gold, finished by hand",
  },

  salon: {
    eyebrow: "The Salon",
    title: "A private experience",
    lede: "Discover the collection in an atmosphere shaped entirely around you.",
    services: [
      { id: "bespoke", name: "Bespoke", description: "A piece designed with you, from first sketch to final polish." },
      { id: "engraving", name: "Engraving", description: "Initials, a date or a line of your own, cut by hand." },
      { id: "care", name: "Care", description: "Cleaning, restringing and restoration for the life of each piece." },
      { id: "gifting", name: "Gifting", description: "Wrapped in the atelier and delivered by hand." },
    ],
    primaryCta: { label: "Book an appointment", href: "/appointments" },
    secondaryCta: { label: "Find a salon", href: "/salons" },
    note: "Paris · London · New York — or by video, wherever you are.",
    media: media.salonInterior,
  },

  correspondence: {
    eyebrow: "Correspondence",
    title: "Stay close to the house",
    lede: "Four letters a year: new collections, private previews and notes from the atelier.",
    emailLabel: "Email address",
    emailPlaceholder: "name@example.com",
    submitLabel: "Subscribe",
    consent: "I would like to receive letters from Maison Lueur.",
    privacy: { label: "Privacy policy", href: "/privacy" },
    success: "Thank you. Your first letter is on its way.",
    errors: {
      email: "Please enter a valid email address.",
      consent: "Please confirm that you would like to receive our letters.",
    },
  },
};

/** Content boundary: a CMS adapter can replace this function without touching components. */
export function getHomepage(): HomepageContent {
  return homepage;
}
