# Lueur — "Held Light" homepage

Editorial homepage for a luxury jewelry house. Next.js 16 (App Router), React 19, strict TypeScript, CSS Modules, GSAP + Lenis.

## Run

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start   # production
```

Checks: `npm run lint` · `npm run typecheck` · `npm run format:check`

## Where things live

| Path                       | What                                                                                                                                                                                                       |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/content/`             | All copy and imagery as typed data: `types.ts` (models), `homepage.ts`, `site.ts` (brand, navigation, footer), `media.ts` (photography), `placeholders.ts` (holding pages for linked routes not yet built) |
| `src/styles/`              | Design system: `tokens.css` (palette, type scale, spacing, grid, motion), `themes.css` (surface roles: paper, limestone, ink, media), `typography.css`, `layout.css`, `motion.css`                         |
| `src/components/ui/`       | Primitives: `Section`, `ArtImage`, `Action` (buttons, links), `Eyebrow`, `Lines`, `Hairline`, `MuseumLabel`, `ProductCard`, `Wordmark`, icons                                                              |
| `src/components/sections/` | The ten chapters of the homepage                                                                                                                                                                           |
| `src/components/layout/`   | Header, mobile dock, menu and search dialogs, footer                                                                                                                                                       |
| `src/lib/motion/`          | GSAP setup, motion tokens, reveal utilities, Lenis, header/dock theme following                                                                                                                            |

## Replacing placeholders

- **Brand name:** `src/content/site.ts` → `brand`.
- **Photography:** every image is an entry in `src/content/media.ts` with a desktop source, an optional art-directed mobile crop, a focal point, alt text and a tone colour. Point `src` at commissioned files (in `public/` or any CDN added to `next.config.ts`); components do not change. Placeholders are from Unsplash under the Unsplash License.
- **Fonts:** Newsreader and Instrument Sans (SIL OFL) stand in for the licensed faces. Swap the files in `src/fonts/` and the `localFont` calls in `src/app/layout.tsx`. Newsreader's weight axis is narrowed to 280–420, so serif text stays within that range.
- **CMS:** `getHomepage()` in `src/content/homepage.ts` is the single content boundary; an adapter can replace it.

## Motion

- The opening sequence is CSS, so it starts at first paint.
- Scroll reveals, parallax, the header, the pinned Nocturne sequence and the Atelier steps use GSAP ScrollTrigger.
- Lenis smooth scrolling runs only on desktop with a mouse or trackpad.
- With reduced motion, or without JavaScript, the page renders complete and still.

## Not yet connected

The newsletter form validates locally but does not submit to a provider. Search, wishlist, bag and appointment booking are placeholders.

## Presentation video

`recordings/` holds an automated screen recording of the homepage (headless Chrome at 1440×900, H.264, 30 fps, no browser UI). It starts the production server if one isn't running, records a scripted, slow walk through every chapter, then copies `Luxury_Jewelry_Website_Concept.mp4` and `Luxury_Jewelry_Website_Concept_FINAL.mp4` to the Desktop.

```bash
cd recordings
npm install
npm run record
```
