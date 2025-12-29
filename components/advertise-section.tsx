type AdvertiseSectionProps = {
  src: string;
  href?: string;
  alt?: string;
  showHeader?: boolean;
};

export function AdvertiseSection({
  src,
  href,
  alt = "Advertisement",
  showHeader = true,
}: AdvertiseSectionProps) {
  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-black pb-1">
            Advertise
          </h2>
        </div>
      )}

      <div className="w-full p-10  overflow-hidden">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" aria-label={alt}>
            <img src={src} alt={alt} className="object-contain w-full h-full" />
          </a>
        ) : (
          <img src={src} alt={alt} className="object-contain w-full h-full" />
        )}
      </div>
      
    </div>
  );
}
