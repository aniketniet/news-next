"use client";

import Link from "next/link";
import type React from "react";

import { scrollToTop } from "./scroll-to-top";

type ScrollToTopLinkProps = React.ComponentProps<typeof Link>;

export function ScrollToTopLink({ onClick, ...props }: ScrollToTopLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        scrollToTop();
        onClick?.(e);
      }}
    />
  );
}
