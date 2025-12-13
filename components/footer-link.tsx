"use client"

import Link, { type LinkProps } from "next/link"
import type { ReactNode, MouseEvent } from "react"

type FooterLinkProps = LinkProps & {
  children: ReactNode
  className?: string
  target?: string
  rel?: string
  prefetch?: boolean
  title?: string
  "aria-label"?: string
}

export function FooterLink({
  children,
  className,
  target,
  rel,
  prefetch,
  ...props
}: FooterLinkProps) {
  const handleClick = (_e: MouseEvent<HTMLAnchorElement>) => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      window.scrollTo(0, 0)
    }
  }

  return (
    <Link
      {...props}
      className={className}
      target={target}
      rel={rel}
      prefetch={prefetch}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}


