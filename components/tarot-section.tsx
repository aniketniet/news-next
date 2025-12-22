import { AdvertiseSection } from "./advertise-section";

interface ZodiacSign {
  name: string;
  icon: string;
}

interface TarotData {
  signs: ZodiacSign[];
  promoImage: string;
  promoTitle: string;
  promoSubtitle: string;
}

interface TarotSectionProps {
  data: TarotData;
}

export function TarotSection({ data }: TarotSectionProps) {
  return (
    <div className="space-y-6">
      {/* <div>
        <h2 className="text-2xl font-bold text-gray-900 pb-1">
          Tarot
        </h2>
          <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-black rounded" style={{ width: '20%' }} />
          </div>
      </div> */}

      <div className="space-y-4">
        {/* Zodiac signs grid */}
        {/* <div className="bg-linear-to-br from-neutral-50 to-white rounded-lg p-4 border border-black/10">
          <div className="grid grid-cols-4 gap-3">
            {data.signs.map((sign, index) => (
              <Link
                key={index}
                href={`/`}
                onClick={ScrollToTop}
                className="group flex flex-col items-center p-2 rounded-lg bg-white hover:bg-black/5 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <div className="text-xl mb-1 group-hover:scale-110 transition-transform duration-200">
                  {sign.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">
                  {sign.name}
                </span>
              </Link>
            ))}
          </div>
        </div> */}

        {/* Tarot promotional card */}
        {/* <div className="relative overflow-hidden rounded-lg border border-black/10 shadow-sm hover:shadow-md transition-shadow">
          <Link href="/tarot/consultation" onClick={ScrollToTop} className="block group">
            <div className="relative aspect-4/3 w-full">
              <Image
                src={data.promoImage}
                alt={data.promoTitle}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-white">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="inline-flex items-center rounded-sm bg-white/15 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide ring-1 ring-white/25 backdrop-blur">
                    TAROT
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white text-black px-3 py-1 text-xs font-bold shadow-sm">
                    Consult →
                  </span>
                </div>
                <h3 className="text-lg font-extrabold leading-tight">{data.promoTitle}</h3>
                <p className="mt-1 text-sm text-white/90">{data.promoSubtitle}</p>
              </div>
            </div>
          </Link>
        </div> */}

        {/* Advertisement card under Tarot section */}
        <AdvertiseSection />
      </div>
    </div>
  );
}
