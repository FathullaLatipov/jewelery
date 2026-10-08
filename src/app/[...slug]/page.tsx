import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlaceholderRoutes, isPlaceholder } from "@/content/placeholders";
import { Preparation } from "@/components/sections/Preparation";

export const metadata: Metadata = {
  title: "In preparation — Lueur",
  robots: { index: false, follow: true },
};

/** Prerenders a holding page for every route the content already links to. */
export function generateStaticParams(): { slug: string[] }[] {
  return getPlaceholderRoutes().map((route) => ({ slug: route.split("/").filter(Boolean) }));
}

export default async function PlaceholderPage({ params }: PageProps<"/[...slug]">) {
  const { slug } = await params;
  if (!isPlaceholder(`/${slug.join("/")}`)) notFound();
  return <Preparation variant="preparing" />;
}
