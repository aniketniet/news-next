import Image from "next/image";
import Link from "next/link";

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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-yellow-400 pb-1">
          Tarot
        </h2>
        <Link href="#" className="text-sm text-gray-600 hover:underline">
          See all
        </Link>
      </div>

      <div className="space-y-4">
        {/* Zodiac signs grid */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
          <div className="grid grid-cols-4 gap-3 mb-4">
            {data.signs.map((sign, index) => (
              <Link
                key={index}
                href={`/tarot/${sign.name.toLowerCase()}`}
                className="group flex flex-col items-center p-2 rounded-lg bg-white hover:bg-purple-50 transition-colors duration-200 shadow-sm hover:shadow-md"
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
        </div>

        {/* Promotional card */}
        <div className="relative rounded-lg overflow-hidden">
          <Link href="/tarot/consultation" className="block group">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={data.promoImage}
                alt={data.promoTitle}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold leading-tight mb-1">
                  {data.promoTitle}
                </h3>
                <p className="text-sm opacity-90">
                  {data.promoSubtitle}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
