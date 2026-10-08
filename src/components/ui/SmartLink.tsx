import Link from "next/link";
import type { ComponentProps } from "react";

type SmartLinkProps = Omit<ComponentProps<"a">, "href"> & { readonly href: string };

/** Routes use client navigation; in-page anchors and external links stay native. */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  if (/^https?:\/\//.test(href)) {
    return <a href={href} target="_blank" rel="noreferrer" {...props} />;
  }
  if (href.startsWith("#") || href.startsWith("/#")) {
    return <a href={href} {...props} />;
  }
  return <Link href={href} {...props} />;
}
