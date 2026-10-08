import type { SiteContent } from "./types";

/* Brand placeholder: replace `brand` to rename the house everywhere. */
export const site: SiteContent = {
  brand: {
    name: "Lueur",
    legalName: "Maison Lueur",
    tagline: "Jewelry shaped by material and light.",
  },
  primaryNav: [
    { label: "Collections", href: "/#collection" },
    { label: "High Jewelry", href: "/#nocturne" },
    { label: "Bridal", href: "/#promise" },
    { label: "The House", href: "/#atelier" },
  ],
  appointment: { label: "Appointment", href: "/#salon" },
  wishlist: { label: "Wishlist", href: "/wishlist" },
  bag: { label: "Bag", href: "/bag", count: 0 },
  searchLabel: "Search",
  dock: {
    menu: "Menu",
    search: "Search",
    book: { label: "Book", href: "/#salon" },
  },
  menu: {
    primary: [
      { label: "Collections", href: "/#collection" },
      { label: "High Jewelry", href: "/#nocturne" },
      { label: "Fine Jewelry", href: "/#index" },
      { label: "Bridal", href: "/#promise" },
      { label: "The House", href: "/#atelier" },
    ],
    secondary: [
      { label: "Book an appointment", href: "/#salon" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Client services", href: "/client-services" },
      { label: "United States — English", href: "/locale" },
    ],
  },
  search: {
    label: "Search the house",
    placeholder: "Rings, pearls, a collection…",
    suggestionsTitle: "Often searched",
    suggestions: [
      { label: "Engagement rings", href: "/#promise" },
      { label: "The Form of Light", href: "/#collection" },
      { label: "Pearl earrings", href: "/#edit" },
      { label: "High jewelry", href: "/#nocturne" },
      { label: "Bracelets", href: "/#index" },
    ],
  },
  footer: {
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Collections", href: "/#collection" },
          { label: "High Jewelry", href: "/#nocturne" },
          { label: "Fine Jewelry", href: "/#index" },
          { label: "Bridal", href: "/#promise" },
          { label: "The House", href: "/#atelier" },
          { label: "Craft", href: "/#atelier" },
        ],
      },
      {
        title: "Client Services",
        links: [
          { label: "Appointments", href: "/#salon" },
          { label: "Care", href: "/care" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    social: {
      title: "Follow",
      links: [
        { label: "Instagram", href: "https://www.instagram.com" },
        { label: "Pinterest", href: "https://www.pinterest.com" },
        { label: "YouTube", href: "https://www.youtube.com" },
      ],
    },
    locale: { title: "Country / Language", label: "United States — English", href: "/locale" },
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
    copyright: "© 2026 Maison Lueur",
    backToTop: "Back to top",
  },
};
