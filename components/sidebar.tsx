"use client"

import { PopularPosts } from "@/components/popular-posts"
import { EPaperDownload } from "@/components/epaper-download"

export function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Popular Posts */}
      {/* <PopularPosts /> */}

      {/* E-Paper Download */}
      <EPaperDownload />
    </aside>
  )
}