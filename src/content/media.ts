import type { FocalPoint, ImageSource, Media } from "./types";

/*
 * Placeholder photography, served from the Unsplash CDN under the Unsplash License.
 * Every entry is replaceable: swap `desktop`/`mobile` for commissioned assets
 * (local paths or another CDN) and nothing in the components changes.
 */

const CDN = "https://images.unsplash.com";

interface Intrinsic {
  readonly width: number;
  readonly height: number;
}

interface Crop {
  /** Output width requested from the CDN. */
  readonly w: number;
  /** Output height; when set the CDN crops around the focal point. */
  readonly h?: number;
  readonly focal?: FocalPoint;
  readonly flip?: boolean;
}

function unsplash(id: string, intrinsic: Intrinsic, crop: Crop): ImageSource {
  const params = new URLSearchParams({ fm: "jpg", q: "82", w: String(crop.w) });
  if (crop.h) {
    params.set("h", String(crop.h));
    params.set("fit", "crop");
    params.set("crop", "focalpoint");
    params.set("fp-x", String(crop.focal?.x ?? 0.5));
    params.set("fp-y", String(crop.focal?.y ?? 0.5));
  }
  if (crop.flip) params.set("flip", "h");

  const height = crop.h ?? Math.round((crop.w * intrinsic.height) / intrinsic.width);
  return {
    src: `${CDN}/photo-${id}?${params.toString()}`,
    width: crop.w,
    height,
    focal: crop.h ? { x: 0.5, y: 0.5 } : crop.focal,
  };
}

/** A 4:5 crop — the house format for objects and portraits. */
function portrait(id: string, intrinsic: Intrinsic, focal?: FocalPoint, w = 1600): ImageSource {
  return unsplash(id, intrinsic, { w, h: Math.round(w * 1.25), focal });
}

export const media = {
  heroRing: {
    alt: "An emerald-cut diamond ring resting on sand, caught in a single beam of late light",
    desktop: unsplash(
      "1580247310131-2927f7f0c97e",
      { width: 3936, height: 2624 },
      { w: 2880, flip: true, focal: { x: 0.62, y: 0.6 } },
    ),
    mobile: unsplash(
      "1580247310131-2927f7f0c97e",
      { width: 3936, height: 2624 },
      { w: 1080, h: 1350, flip: true, focal: { x: 0.38, y: 0.6 } },
    ),
    tone: "#413a34",
  },
  preludeLight: {
    alt: "Light falling between limestone columns",
    desktop: unsplash(
      "1759507058804-cc729b38d1ed",
      { width: 4032, height: 3024 },
      { w: 640, h: 400, focal: { x: 0.5, y: 0.5 } },
    ),
    tone: "#65615b",
  },
  formPortrait: {
    alt: "A woman with eyes closed in late sun, wearing a fine diamond necklace",
    desktop: portrait("1643236049958-8c5a4b1b5f71", { width: 4000, height: 6000 }, { x: 0.45, y: 0.5 }, 1800),
    tone: "#7e583b",
  },
  formDetail: {
    alt: "Pear-cut sapphire ring with diamond shoulders, resting on antique lace",
    desktop: unsplash(
      "1612314317004-d650718f188a",
      { width: 3116, height: 2077 },
      { w: 1200, h: 1600, focal: { x: 0.56, y: 0.5 } },
    ),
    tone: "#ab9b8a",
  },

  /* — The Edit — */
  meridian: {
    alt: "Emerald-cut diamond solitaire in yellow gold",
    desktop: portrait("1598560917807-1bae44bd2be8", { width: 3731, height: 3732 }, { x: 0.5, y: 0.5 }, 1200),
    tone: "#dedbd6",
    blend: "multiply",
  },
  haloSapphire: {
    alt: "Oval sapphire ring in platinum with a halo of diamonds",
    desktop: portrait("1586104237516-5b7075e00d45", { width: 2868, height: 1912 }, { x: 0.46, y: 0.5 }, 1200),
    tone: "#e7e7e8",
    blend: "multiply",
  },
  lineBracelet: {
    alt: "Diamond line bracelet in platinum, detail of the clasp",
    desktop: portrait("1619119069152-a2b331eb392a", { width: 4724, height: 3149 }, { x: 0.55, y: 0.5 }, 1200),
    tone: "#dddcdc",
    blend: "multiply",
  },
  lineBraceletWorn: {
    alt: "The Line bracelet worn on a raised wrist",
    desktop: portrait("1721103428054-6bcf4f655594", { width: 4160, height: 4160 }, { x: 0.5, y: 0.5 }, 1200),
    tone: "#9d9b9e",
  },
  fallEarrings: {
    alt: "Polished gold drop earrings beside a fine chain",
    desktop: portrait("1655255114527-d0a834d9a774", { width: 4000, height: 6000 }, { x: 0.5, y: 0.42 }, 1200),
    tone: "#d3d1d1",
    blend: "multiply",
  },
  fallEarringsWorn: {
    alt: "A gold drop earring worn, hair swept back",
    desktop: portrait("1671644730555-916aa8d8157f", { width: 3840, height: 5760 }, { x: 0.5, y: 0.45 }, 1200),
    tone: "#724f2c",
  },
  tidePearls: {
    alt: "Akoya pearl earrings beside a seashell on warm sand",
    desktop: portrait("1748679451184-97ddab571605", { width: 6000, height: 4000 }, { x: 0.62, y: 0.6 }, 1200),
    tone: "#c9ae93",
  },
  tidePearlsWorn: {
    alt: "A pearl drop earring worn in warm light",
    desktop: portrait("1590166223826-12dee1677420", { width: 2592, height: 3872 }, { x: 0.5, y: 0.45 }, 1200),
    tone: "#8b5d3d",
  },
  roseCushion: {
    alt: "Cushion-cut pink sapphire ring in rose gold with a diamond halo",
    desktop: portrait("1603561591411-07134e71a2a9", { width: 3243, height: 3243 }, { x: 0.5, y: 0.5 }, 1200),
    tone: "#ded6d3",
    blend: "multiply",
  },
  torsadeHoops: {
    alt: "Twisted gold hoops resting on white stones in long shadow",
    desktop: portrait("1617038220319-276d3cfab638", { width: 4000, height: 6000 }, { x: 0.5, y: 0.55 }, 1200),
    tone: "#757273",
  },
  torsadeHoopsWorn: {
    alt: "A gold hoop earring worn with a soft knit",
    desktop: portrait("1652766540048-de0a878a3266", { width: 4000, height: 6000 }, { x: 0.5, y: 0.4 }, 1200),
    tone: "#5a3c2b",
  },
  constellation: {
    alt: "Gold bracelet set with sapphires, rubies and emeralds on white silk",
    desktop: portrait("1717605383946-96c6884c36b4", { width: 5184, height: 3456 }, { x: 0.5, y: 0.5 }, 1200),
    tone: "#d8d8d7",
    blend: "multiply",
  },
  constellationWorn: {
    alt: "A fine gold bracelet worn at the wrist",
    desktop: portrait("1633810543462-77c4a3b13f07", { width: 3328, height: 4160 }, { x: 0.5, y: 0.5 }, 1200),
    tone: "#9a8578",
  },
  crossing: {
    alt: "White gold crossover ring paved with diamonds",
    desktop: portrait("1589674781759-c21c37956a44", { width: 3505, height: 2337 }, { x: 0.5, y: 0.5 }, 1200),
    tone: "#dcd8d8",
    blend: "multiply",
  },
  strata: {
    alt: "Three fine gold necklaces layered at the collarbone",
    desktop: portrait("1749125380446-60fd7c5ba4cb", { width: 2744, height: 1823 }, { x: 0.5, y: 0.5 }, 1200),
    tone: "#b09d93",
  },
  strataWorn: {
    alt: "Fine necklaces worn with an open white shirt",
    desktop: portrait("1611652032931-10fc009c980a", { width: 3903, height: 5825 }, { x: 0.5, y: 0.45 }, 1200),
    tone: "#b29f92",
  },

  /* — Nocturne — */
  nocturneWide: {
    alt: "A ring on grey satin, half in shadow",
    desktop: unsplash(
      "1517348663636-31103cb49587",
      { width: 5472, height: 3648 },
      { w: 2880, h: 1234, focal: { x: 0.6, y: 0.62 } },
    ),
    mobile: portrait("1517348663636-31103cb49587", { width: 5472, height: 3648 }, { x: 0.68, y: 0.6 }, 1080),
    tone: "#454342",
  },
  nocturneOne: {
    alt: "A diamond and pearl necklace with a pendant drop, against black",
    desktop: unsplash("1719862056514-0cdacd9142b5", { width: 2680, height: 4394 }, { w: 1400 }),
    tone: "#191917",
    blend: "lighten",
  },
  nocturneTwo: {
    alt: "An octagonal amethyst pendant framed in white enamel and diamonds, against black",
    desktop: unsplash("1719862056532-34900b21387a", { width: 2922, height: 2640 }, { w: 1400 }),
    tone: "#2a2726",
    blend: "lighten",
  },
  nocturneThree: {
    alt: "A garland brooch with a pink spinel and pear drop, against black",
    desktop: unsplash("1719862056472-1e4d4c10d50c", { width: 2577, height: 3486 }, { w: 1400 }),
    tone: "#1c1819",
    blend: "lighten",
  },

  /* — Atelier — */
  atelierSketch: {
    alt: "A hand drawing ring proportions in pencil",
    desktop: portrait("1780241623929-a695fdac13cc", { width: 3742, height: 2807 }, { x: 0.58, y: 0.5 }),
    tone: "#999699",
  },
  atelierStone: {
    alt: "A jeweller examining a stone through a loupe",
    desktop: portrait("1516652695352-6118f7cc1a07", { width: 4256, height: 2832 }, { x: 0.58, y: 0.55 }),
    tone: "#4e4138",
  },
  atelierSetting: {
    alt: "Hands setting a stone at the bench with fine tools",
    desktop: portrait("1628058494685-6c2f796ac24a", { width: 4133, height: 2756 }, { x: 0.5, y: 0.5 }),
    tone: "#61564e",
  },
  atelierPolish: {
    alt: "Hands finishing a ring at a wooden bench",
    desktop: portrait("1623365545467-d0f2c7ecd677", { width: 6240, height: 4160 }, { x: 0.46, y: 0.6 }),
    tone: "#4b4737",
  },

  /* — Index — */
  indexHighJewelry: {
    alt: "An emerald ring held between gloved fingers in darkness",
    desktop: portrait("1685970732254-d2d1f43ddc7c", { width: 3000, height: 4496 }, { x: 0.55, y: 0.42 }, 1200),
    tone: "#0a0a0a",
  },
  indexFineJewelry: {
    alt: "Twisted gold hoops balanced on white stones",
    desktop: portrait("1617038260897-41a1f14a8ca0", { width: 4000, height: 6000 }, { x: 0.55, y: 0.5 }, 1200),
    tone: "#77716c",
  },
  indexRings: {
    alt: "A gold ring set with citrines, standing against travertine",
    desktop: portrait("1689367436629-1d288f1e23b6", { width: 3840, height: 5760 }, { x: 0.5, y: 0.66 }, 1200),
    tone: "#b3957a",
  },
  indexNecklaces: {
    alt: "A fine necklace worn with an open white shirt",
    desktop: portrait("1611652022419-a9419f74343d", { width: 4016, height: 6016 }, { x: 0.5, y: 0.45 }, 1200),
    tone: "#978778",
  },
  indexEarrings: {
    alt: "A baroque pearl earring set in gold, seen in profile",
    desktop: portrait("1763628212781-7d52844cf358", { width: 4000, height: 6000 }, { x: 0.5, y: 0.4 }, 1200),
    tone: "#a99381",
  },
  indexBracelets: {
    alt: "A gold bangle at the wrist against a pale wall",
    desktop: portrait("1708221235482-a6e2a807198f", { width: 3238, height: 4857 }, { x: 0.5, y: 0.5 }, 1200),
    tone: "#c9b6ae",
  },

  /* — Promise — */
  promiseHand: {
    alt: "A hand resting against the cheek, wearing an emerald-cut diamond ring and a pavé band",
    desktop: portrait("1762505464779-17f78cbfa8b4", { width: 4000, height: 5333 }, { x: 0.55, y: 0.42 }, 1800),
    tone: "#765743",
  },
  promiseBands: {
    alt: "Two gold wedding bands resting together on cream linen",
    desktop: unsplash(
      "1622398925373-3f91b1e275f5",
      { width: 3543, height: 2353 },
      { w: 1200, h: 1600, focal: { x: 0.5, y: 0.5 } },
    ),
    tone: "#bc937a",
  },

  /* — Salon — */
  salonInterior: {
    alt: "A quiet arched salon with a low sofa and dried grasses",
    desktop: portrait("1567016376408-0226e4d0c1ea", { width: 16148, height: 24220 }, { x: 0.5, y: 0.56 }, 1800),
    tone: "#d5c8be",
  },
} as const satisfies Record<string, Media>;
