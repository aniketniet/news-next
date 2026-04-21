"use client";

import Image from "next/image";
import { useState } from "react";

interface NewsDetailFeaturedImageProps {
  src?: string | null;
  alt: string;
}

export function NewsDetailFeaturedImage({ src, alt }: NewsDetailFeaturedImageProps) {
  const [isBroken, setIsBroken] = useState(false);

  if (!src || isBroken) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-sm">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 66vw"
        priority
        onError={() => setIsBroken(true)}
      />
    </div>
  );
}
