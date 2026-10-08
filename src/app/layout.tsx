import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { preconnect } from "react-dom";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/content/site";
import "./globals.css";

const IMAGE_CDN = "https://images.unsplash.com";

/*
 * Newsreader is self-hosted with its weight axis narrowed to 280–420 (optical size kept):
 * the house only sets the serif light-to-regular, and the narrower axis saves ~17%.
 */
const newsreader = localFont({
  src: "../fonts/newsreader-roman.woff2",
  weight: "280 420",
  style: "normal",
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// Italic is reserved for single phrases; it loads on first use rather than up front.
const newsreaderItalic = localFont({
  src: "../fonts/newsreader-italic.woff2",
  weight: "280 420",
  style: "italic",
  variable: "--font-newsreader-italic",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

const instrumentSans = localFont({
  src: "../fonts/instrument-sans.woff2",
  weight: "400 700",
  variable: "--font-instrument",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: `${site.brand.name} — Jewelry shaped by light`,
  description:
    "Maison Lueur: jewelry shaped by material, light and the quiet precision of the hand. High jewelry, bridal and private appointments.",
};

export const viewport: Viewport = {
  themeColor: "#f3efe7",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // The hero photograph comes from the image CDN; open that connection with the document.
  preconnect(IMAGE_CDN);
  return (
    <html lang="en" className={`${newsreader.variable} ${newsreaderItalic.variable} ${instrumentSans.variable}`}>
      <body>
        <a href="#content" className="skip-link t-label">
          Skip to content
        </a>
        <SiteChrome />
        <main id="content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
