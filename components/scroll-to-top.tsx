"use client";

import { useEffect, useState } from "react";

export function scrollToTop() {
  if (typeof window === "undefined") return;
  try {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    window.scrollTo(0, 0);
  }
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={
        "fixed right-4 bottom-4 z-50 rounded-full bg-black/70 text-white shadow-lg backdrop-blur " +
        "hover:bg-black transition focus:outline-none focus:ring-2 focus:ring-black " +
        (visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6 m-3"
      >
        <path d="M12 5l7 7-1.41 1.41L13 9.83V20h-2V9.83l-4.59 4.58L5 12z" />
      </svg>
    </button>
  );
}
