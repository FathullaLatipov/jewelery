"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { scrollToTarget } from "@/lib/motion/smooth-scroll";
import { followSurfaces } from "@/lib/motion/surface-probe";
import { DURATION, EASE, QUERY } from "@/lib/motion/tokens";
import { MenuPanel } from "./MenuPanel";
import { MobileDock } from "./MobileDock";
import { Overlay } from "./Overlay";
import { SearchPanel } from "./SearchPanel";
import { SiteHeader } from "./SiteHeader";

type OverlayName = "menu" | "search";

const FIELD = "input, textarea, select";

/** Header, mobile dock and their overlays share one state and one scroll observer. */
export function SiteChrome() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const dockRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [overlay, setOverlay] = useState<OverlayName | null>(null);
  const overlayRef = useRef<OverlayName | null>(null);

  useEffect(() => {
    overlayRef.current = overlay;
  }, [overlay]);

  const close = useCallback(() => setOverlay(null), []);

  // Header and dock follow the theme of the section beneath them; the header steps aside while reading.
  useGSAP(
    () => {
      const header = headerRef.current;
      const dock = dockRef.current;
      if (!header || !dock) return;

      const stopHeader = followSurfaces(header, "top", () => header.offsetHeight / 2);
      const stopDock = followSurfaces(dock, "bottom", () => Math.max(dock.offsetHeight / 2, 1));

      let hidden = false;
      const setHidden = (next: boolean) => {
        if (next === hidden) return;
        hidden = next;
        const still = !window.matchMedia(QUERY.motion).matches;
        gsap.to(header, {
          yPercent: next ? -100 : 0,
          duration: still ? 0 : DURATION.short,
          ease: EASE.breath,
          overwrite: "auto",
        });
      };

      const watcher = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (overlayRef.current) return;
          const nearTop = self.scroll() < header.offsetHeight * 2;
          setHidden(!nearTop && self.direction === 1);
        },
      });

      const reveal = () => setHidden(false);
      header.addEventListener("focusin", reveal);

      return () => {
        stopHeader();
        stopDock();
        watcher.kill();
        header.removeEventListener("focusin", reveal);
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  // The dock steps out of the way while the on-screen keyboard is up.
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;
    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.matches(FIELD) && !event.target.closest("dialog")) {
        dock.dataset.keyboard = "";
      }
    };
    const onFocusOut = () => {
      delete dock.dataset.keyboard;
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // In-page anchors scroll smoothly (through Lenis on desktop) and close any open overlay first.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href*='#']") : null;
      if (!link) return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      const wasOpen = overlayRef.current !== null;
      setOverlay(null);
      window.history.pushState(null, "", url.hash);
      window.setTimeout(
        () => {
          scrollToTarget(target);
          // Move focus with the reader so keyboard and screen-reader users land where they asked.
          if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        },
        wasOpen ? DURATION.short * 1000 + 60 : 0,
      );
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <SiteHeader ref={headerRef} onSearch={() => setOverlay("search")} />
      <MobileDock
        ref={dockRef}
        menuOpen={overlay === "menu"}
        onMenu={() => setOverlay("menu")}
        onSearch={() => setOverlay("search")}
      />
      <Overlay open={overlay === "menu"} onClose={close} label={site.dock.menu} from="bottom">
        <MenuPanel onClose={close} />
      </Overlay>
      <Overlay
        open={overlay === "search"}
        onClose={close}
        label={site.search.label}
        from="top"
        initialFocus={searchInputRef}
      >
        <SearchPanel inputRef={searchInputRef} onClose={close} />
      </Overlay>
    </>
  );
}
