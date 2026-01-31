"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type ViewState = "hidden" | "expanded" | "collapsing" | "collapsed";

const STORAGE_KEY = "floatBanner:viewState";
const DISMISSED_KEY = "floatBanner:dismissed";
const BANNER_HREF = "https://indiafif.dailypioneer.com/";

export default function FloatBanner() {
  const pathname = usePathname();
  const [view, setView] = useState<ViewState>("hidden");
  const [dismissed, setDismissed] = useState(false);
  const openTimerRef = useRef<number | null>(null);
  const collapseTimerRef = useRef<number | null>(null);

  // Only show on home page (so it behaves like a home-only widget even if mounted in Footer).
  if (pathname !== "/") return null;

  // Restore collapsed state (so it stays as a corner button after refresh).
  useEffect(() => {
    try {
      const isDismissed = window.localStorage.getItem(DISMISSED_KEY) === "1";
      if (isDismissed) {
        setDismissed(true);
        return;
      }

      const saved = window.localStorage.getItem(STORAGE_KEY) as ViewState | null;
      if (saved === "collapsed") {
        setView("collapsed");
      }
    } catch {
      // ignore
    }
  }, []);

  // Show banner after 4 seconds (only if not already collapsed).
  useEffect(() => {
    if (dismissed) return;
    if (view !== "hidden") return;

    openTimerRef.current = window.setTimeout(() => {
      setView("expanded");
    }, 4000);

    return () => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    };
  }, [view]);

  useEffect(() => {
    return () => {
      if (collapseTimerRef.current) window.clearTimeout(collapseTimerRef.current);
    };
  }, []);

  const persistCollapsed = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "collapsed");
    } catch {
      // ignore
    }
  };

  const persistExpanded = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(DISMISSED_KEY);
    } catch {
      // ignore
    }
  };

  const persistDismissed = () => {
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const closeToCornerButton = () => {
    if (view !== "expanded") return;
    setView("collapsing");
    collapseTimerRef.current = window.setTimeout(() => {
      setView("collapsed");
      persistCollapsed();
    }, 300);
  };

  const reopen = () => {
    setView("expanded");
    persistExpanded();
  };

  const dismissPermanently = () => {
    setDismissed(true);
    setView("hidden");
    persistDismissed();
  };

  if (dismissed) return null;

  return (
    <>
      {(view === "expanded" || view === "collapsing") && (
        <div
          className="fixed inset-0"
          style={{ zIndex: 9999 }}
          data-state={view === "expanded" ? "open" : "closed"}
          role="dialog"
          aria-label="Floating banner"
        >
          {/* light overlay behind */}
          <div
            data-state={view === "expanded" ? "open" : "closed"}
            className={[
              "pointer-events-none fixed inset-0 bg-black/25 backdrop-blur-[1px]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
              "data-[state=closed]:duration-300 data-[state=open]:duration-500",
            ].join(" ")}
          />

          {/* centered banner, slides in from right */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              data-state={view === "expanded" ? "open" : "closed"}
              className={[
                "relative",
                "w-[92vw] max-w-[760px]",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
                "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
                "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
                "data-[state=closed]:duration-300 data-[state=open]:duration-500",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={closeToCornerButton}
                aria-label="Close banner"
                className="absolute -right-2 top-16 z-20 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-black shadow hover:bg-white"
              >
                ×
              </button>

              {/* image only (no card/border), but keep rounded + shadow for readability */}
              <a
                href={BANNER_HREF}
                target="_blank"
                rel="noreferrer"
                aria-label="Open IndiaFIF"
                className="relative block w-full aspect-4/3 cursor-pointer"
              >
                <Image
                  src="/float-banner.jpeg"
                  alt="Banner"
                  fill
                  className="object-contain"
                  sizes="(max-width: 400px) 92vw, 760px"
                  priority={false}
                />
              </a>
            </div>
          </div>
        </div>
      )}

      {view === "collapsed" && (
        <div
          style={{ zIndex: 9999 }}
          className={[
            // Floating button in bottom-right corner
            // Keep it above the mobile bottom social bar, but still bottom-right.
            "fixed right-4 bottom-24 md:bottom-8",
            "animate-in fade-in-0 zoom-in-95 duration-300",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={reopen}
            aria-label="Open banner"
            className={[
              // No `relative` here (positioning stays purely fixed); we use an inner relative wrapper for the Image `fill`.
              "block",
              "transition-transform duration-200 hover:scale-105 active:scale-95",
            ].join(" ")}
          >
            <span className="sr-only">Open banner</span>
            <span className="relative block h-32 w-48 overflow-hidden rounded-md">
              <Image
                src="/float-banner.jpeg"
                alt=""
                fill
                className="object-contain"
                sizes="192px"
              />
            </span>
          </button>

          {/* second close: permanently remove */}
          <button
            type="button"
            onClick={dismissPermanently}
            aria-label="Close permanently"
            className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-black text-white shadow-lg ring-1 ring-white/15 hover:bg-black/90"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}


