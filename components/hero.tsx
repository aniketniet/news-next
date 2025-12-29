"use client";

import Image from "next/image";
import { fetchStories, type StorySummary } from "@/lib/api/stories";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { ScrollToTopLink } from "./scroll-to-top-link";

// Hero now client-fetches top stories and shows skeletons while loading

export function Hero() {
  const [top, setTop] = useState<StorySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const { top } = await fetchStories({ limit: 12, offset: 0 });
        if (!alive) return;
        setTop(top);
      } catch (e) {
        if (!alive) return;
        setTop([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const [mainStory, ...rest] = top;
  const sideStories = rest.slice(0, 3);
  const bottomStories = rest.slice(3, 7);

  const stripHtml = (input?: string | null) => {
    if (!input) return "";
    return input
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getExcerpt = (story: StorySummary) => {

    // console.log(story,"story.description");
    
    const text = stripHtml(story.description);
    return text;
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Top Stories Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Stories</h2>
          <div className="mt-2 h-1 w-full bg-gray-200 rounded">
            <div
              className="h-full bg-black rounded"
              style={{ width: "20%" }}
            />
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-8 gap-6">
            <div className="lg:col-span-2">
              <Skeleton height={0} style={{ paddingBottom: "56.25%" }} />
              <div className="mt-4">
                <Skeleton height={28} width="80%" />
                <div className="mt-2">
                  <Skeleton height={14} width="30%" />
                </div>
              </div>
            </div>
            <div className="lg:border-l lg:pl-6 border-gray-200">
              <div className="space-y-6">
                {[0, 1, 2].map((i) => (
                  <div key={i}>
                    <Skeleton height={18} width="90%" />
                    <div className="mt-2">
                      <Skeleton height={12} width="40%" />
                    </div>
                    <div className="mt-3">
                      <Skeleton count={3} height={12} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        {!loading && mainStory && (
          <div className="grid grid-cols-1 lg:grid-cols-3 mb-8 gap-6">
            {/* Left Featured */}
            <article className="lg:col-span-2">
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
                <Image
                  src={mainStory.image || "/lead-story.png"}
                  alt={mainStory.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              <div className="pt-4">
                <h3 className="text-2xl lg:text-3xl font-bold leading-tight text-gray-900">
                  <ScrollToTopLink
                    href={`/news/${mainStory.urlKey}`}
                    className="hover:underline hover:text-gray-900 transition-colors"
                  >
                    {mainStory.title}
                  </ScrollToTopLink>
                </h3>
                <time className="mt-2 block text-sm text-gray-500">
                  {formatDate(mainStory.publishedDate)}
                </time>
              </div>
            </article>

            {/* Right list of 3 */}
            <aside className="lg:border-l lg:pl-6 border-gray-200 flex flex-col gap-6">
              {sideStories.map((story) => (
                <article key={story.id} className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                  <h4 className="text-base font-semibold leading-snug text-gray-900">
                    <ScrollToTopLink
                      href={`/news/${story.urlKey}`}
                      className="hover:underline hover:text-gray-900 transition-colors"
                    >
                      {story.title}
                    </ScrollToTopLink>
                  </h4>
                  <time className="mt-1 block text-xs text-gray-500">
                    {formatDate(story.publishedDate)}
                  </time>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                    {getExcerpt(story)}
                  </p>
                </article>
              ))}
            </aside>
          </div>
        )}

        {/* Bottom Stories Grid */}
        {!loading && bottomStories.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {bottomStories.map((story) => (
              <article
                key={story.id}
                className="group flex flex-col overflow-hidden bg-white transition"
              >
                <div className="relative aspect-[16/10] rounded-sm w-full overflow-hidden">
                  <Image
                    src={
                      story.image_url_medium || story.image || "/news-image.png"
                    }
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  {/* <span className="mb-2 inline-block w-fit rounded bg-black text-white px-2 py-1 text-[10px] font-semibold tracking-wide">
                    {story.category || "NEWS"}
                  </span> */}
                  <h4 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-gray-900">
                    <ScrollToTopLink
                      href={`/news/${story.urlKey}`}
                      className="transition-colors hover:text-black"
                    >
                      {story.title}
                    </ScrollToTopLink>
                  </h4>
                  <div className="mt-auto flex items-center text-xs text-gray-500">
                    {story.author && <span>{story.author}</span>}
                    {story.author && <span className="mx-1">•</span>}
                    <time>
                      {new Date(story.publishedDate).toLocaleDateString(
                        undefined,
                        { day: "2-digit", month: "short", year: "numeric" }
                      )}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
