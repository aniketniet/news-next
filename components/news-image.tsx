"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface NewsImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

export function NewsImage({
  src,
  alt,
  className,
  sizes,
  priority,
  fallbackSrc = "/news-image.jpg",
}: NewsImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
