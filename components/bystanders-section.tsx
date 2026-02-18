import Image from "next/image";
import Link from "next/link";
import { ScrollToTopLink } from "./scroll-to-top-link";

export interface BystanderItem {
  id: number;
  src: string;
  alt: string;
  title?: string;
  caption: string;
  date?: string;
}

type BystandersSectionProps = {
  bystanders: BystanderItem[];
  title?: string;
  seeMoreHref?: string;
};

export function BystandersSection({ 
  bystanders, 
  title = "Bystanders",
  seeMoreHref = "/bystanders"
}: BystandersSectionProps) {
  if (!bystanders || bystanders.length === 0) return null;

  // Show only the first image
  const firstBystander = bystanders[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-black pb-1">
          {title}
        </h2>
      </div>

      <div className="w-full p-10 overflow-hidden">
        <ScrollToTopLink
          href={seeMoreHref}
          className="block"
          aria-label={firstBystander.alt}
        >
          <img 
            src={firstBystander.src} 
            alt={firstBystander.alt} 
            className="object-contain w-full h-full" 
          />
        </ScrollToTopLink>
      </div>
    </div>
  );
}


