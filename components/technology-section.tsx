import Image from "next/image";
import Link from "next/link";
import { ScrollToTop } from "./scroll-to-top";

interface TechnologyStory {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
}

interface TechnologySectionProps {
  stories: TechnologyStory[];
  limit?: number;
  seeMoreHref?: string;
}

export function TechnologySection({ stories, limit, seeMoreHref }: TechnologySectionProps) {
  console.log("Technology Stories:", stories);
  const visibleStories = Array.isArray(stories)
    ? (typeof limit === "number" && limit > 0 ? stories.slice(0, limit) : stories)
    : [];
  const hasMore = Array.isArray(stories) && visibleStories.length < stories.length;
  return (
    <div className="space-y-6">
      <div >
        <h2 className="text-2xl font-bold text-gray-900 pb-1">
          Technology
        </h2>
           <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div className="h-full bg-[#1a59a9] rounded" style={{ width: '20%' }} />
          </div>
        {/* <div className="flex items-center gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1a59a9] focus:border-[#1a59a9]"
          />
          <button className="px-4 py-1 bg-[#1a59a9] text-black text-sm font-semibold rounded hover:bg-yellow-500 transition-colors">
            SIGN UP
          </button>
        </div> */}
      </div>

      <div className="space-y-4">
        {visibleStories.map((story) => (
          <article key={story.id} className="group cursor-pointer">
            <Link href={`/news/${story.id}`} onClick={ScrollToTop} className="block">
              <div className="flex gap-4 p-4  hover:bg-gray-50 transition-colors duration-200">
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-[#1a59a9] rounded">
                      {story.category}
                    </span>
                    <span className="text-xs text-gray-500">{story.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#1a59a9] transition-colors duration-200 line-clamp-2 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {story.description}
                  </p>
                </div>
              </div>
            </Link>
          </article>
        ))}
        {hasMore && (
          <div className="pt-2 flex justify-end">
            <Link
              href={seeMoreHref || "/section/tech"}
              className="text-sm font-semibold text-[#1a59a9] hover:underline"
              onClick={ScrollToTop}
            >
              See more
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
