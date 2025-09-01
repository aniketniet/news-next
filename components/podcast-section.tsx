import Image from "next/image";
import Link from "next/link";

interface PodcastStory {
  id: string;
  title: string;
  description: string;
  subtitle: string;
  image: string;
  category: string;
  host: string;
  duration: string;
}

interface PodcastSectionProps {
  stories: PodcastStory[];
}

export function PodcastSection({ stories }: PodcastSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-yellow-400 pb-1">
          Podcast
        </h2>
        <Link href="#" className="text-sm text-gray-600 hover:underline">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <article key={story.id} className="group cursor-pointer">
            <Link href={`/podcast/${story.id}`} className="block">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-yellow-600 transition-colors duration-200 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {story.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
