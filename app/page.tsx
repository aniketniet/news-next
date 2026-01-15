import { SiteHeader } from "@/components/site-header";
import { BreakingTicker } from "@/components/ticker";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { NewsCard } from "@/components/news-card";
import { Sidebar } from "@/components/sidebar";
import { SiteFooter } from "@/components/footer";
import { SecondaryStory } from "@/components/secondary-story";
import { MainContent } from "@/components/main-content";
import { BusinessSlider } from "@/components/business-slider";
import { InternationalNews } from "@/components/international-news";
import { CategorySection } from "@/components/category-section";
import { SportsSections } from "@/components/sports-sections";
import { OpinionAnalysisSections } from "@/components/opinion-analysis-sections";
import { VideosSection } from "@/components/videos-section";
import { PodcastSection } from "@/components/podcast-section";
import { HoroscopeSection } from "@/components/horoscope-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { AdvertiseSection } from "@/components/advertise-section";
import { TechnologySection } from "@/components/technology-section";
import { TarotSection } from "@/components/tarot-section";
import Image from "next/image";
import Link from "next/link";
import { PopularPosts } from "@/components/popular-posts";
import { StateEditions } from "@/components/state-editions";

import PhotoGallery from "@/components/PhotoGallery";
import { fetchSectionList, fetchStories } from "@/lib/api/stories";
import { getCategoriesNormalized } from "@/lib/api/categories";
import { fetchGalleryAssets, mapVideosToSectionItems } from "@/lib/api/images";
import { EPaperDownload } from "@/components/epaper-download";
import { ScrollToTopLink } from "@/components/scroll-to-top-link";
import SubscriptionSlider from "@/components/SubscriptionSlider";
import { Story } from "@/lib/api/categories";

// Travel & Health & Fitness stories are derived inside HomePage from API


// Static sports placeholders removed – dynamic mapping from API

const podcastStories = [
  {
    id: "podcast-1",
    title: "Fashion Scoop",
    description: "Cara membuat asap dan memfoto menjadi penuh warna.",
    subtitle:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi (BRS) said it was yet to decide its stand",
    image: "/news-image.jpg",
    category: "LIFESTYLE",
    host: "Fashion Expert",
    duration: "45:30",
  },
  {
    id: "podcast-2",
    title: "Right Swipe",
    description: "Cara membuat asap dan memfoto menjadi penuh warna.",
    subtitle:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi (BRS) said it was yet to decide its stand",
    image: "/news-image.jpg",
    category: "RELATIONSHIPS",
    host: "Dating Coach",
    duration: "32:15",
  },
  {
    id: "podcast-3",
    title: "Nothing But the Truth",
    description: "Cara membuat asap dan memfoto menjadi penuh warna.",
    subtitle:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi (BRS) said it was yet to decide its stand",
    image: "/news-image.jpg",
    category: "NEWS",
    host: "Raj Chengappa",
    duration: "28:45",
  },
  {
    id: "podcast-4",
    title: "In Our Defence",
    description: "Cara membuat asap dan memfoto menjadi penuh warna.",
    subtitle:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi (BRS) said it was yet to decide its stand",
    image: "/news-image.jpg",
    category: "POLITICS",
    host: "Defense Analyst",
    duration: "41:20",
  },
];

const horoscopeData = {
  title:
    "Weekly Horoscope, 18-August To 24-August-2025: Explore Our Weekly Horoscope And Navigate The Week Ahead With Confidence",
  description:
    "Weekly Horoscope, 18-August To 24-August-2025. Stay ahead with our weekly horoscope from our astrology experts. This week brings unique planetary alignments that will discover how the stars have aligned for you this week.",
  date: "December 09, 2020",
  signs: [
    { name: "Aries", icon: "♈" },
    { name: "Taurus", icon: "♉" },
    { name: "Gemini", icon: "♊" },
    { name: "Cancer", icon: "♋" },
    { name: "Leo", icon: "♌" },
    { name: "Virgo", icon: "♍" },
    { name: "Libra", icon: "♎" },
    { name: "Scorpio", icon: "♏" },
    { name: "Sagittarius", icon: "♐" },
    { name: "Capricorn", icon: "♑" },
    { name: "Aquarius", icon: "♒" },
    { name: "Pisces", icon: "♓" },
  ],
};

// Static technology placeholder removed – dynamic mapping from API

const tarotData = {
  signs: [
    { name: "Aries", icon: "♈" },
    { name: "Taurus", icon: "♉" },
    { name: "Gemini", icon: "♊" },
    { name: "Cancer", icon: "♋" },
    { name: "Leo", icon: "♌" },
    { name: "Virgo", icon: "♍" },
    { name: "Libra", icon: "♎" },
    { name: "Scorpio", icon: "♏" },
    { name: "Sagittarius", icon: "♐" },
    { name: "Capricorn", icon: "♑" },
    { name: "Aquarius", icon: "♒" },
    { name: "Pisces", icon: "♓" },
  ],
  promoImage: "/news-image.jpg",
  promoTitle: "SMILE WITH STRENGTH",
  promoSubtitle: "Discover your inner power with our tarot readings",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch grouped stories (top + latest) and category news in parallel
  // NOTE: Increased limit & disabled cache for category news so that
  // sections like Technology & Impact (which may have older dates and
  // were previously missing due to cached / truncated responses) appear
  // consistently with what you see in Postman.
  const [{ latest, popular, stateEditions }, categories, gallery, indiaSection] = await Promise.all([
    fetchStories({ limit: 20, offset: 0 }),
    getCategoriesNormalized({ limit: 12, offset: 0, noCache: true }),
    fetchGalleryAssets({ limit: 20, offset: 0 }),
    fetchSectionList(1022, { limit: 12, offset: 0 }),
  ]);

  // console.log("Fetched Categories:", categories);
  console.log("Fetched Popular Stories:", popular);

  // Map trending news from categories API to match StorySummary format
  const trendingNews = (categories.trending_news.length > 0 ? categories.trending_news || [] as Story[] : latest).map((s: any) => ({
    id: String(s.story_id),
    title: s.story_title,
    category: s.section_name || s.category_name || "NEWS",
    image: s.image_url_medium || s.image_url_big || "/news-image.jpg",
    byline: s.author_name || "",
    time: new Date(s.published_date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    urlKey: s.url_key || '',
  }));

  // Map Business category stories -> BusinessSlider shape
  const businessStoriesMapped = categories.business.map((s) => ({
    id: String(s.story_id),
    title: s.story_title,
    category: s.section_name || s.category_name || "Business",
    image: s.image_url_medium || s.image_url_big || "/news-image.jpg",
    date: new Date(s.published_date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    urlKey: s.url_key || '',
  }));

  // Map India section stories -> BusinessSlider shape
  const indiaStoriesMapped = (indiaSection || []).map((s) => ({
    id: String(s.id),
    title: s.title,
    category: s.category || "India",
    image: s.image_url_medium || s.image || "/news-image.jpg",
    date: new Date(s.publishedDate).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    urlKey: s.urlKey,
  }));

  // Sports mapping by category_id (1086: Cricket, 1087: Football, 1088: Hockey)
  const sportsRaw: any[] = (categories as any).sports || [];
  const byCategoryId = (id: number) =>
    sportsRaw.filter((s) => Number((s as any).category_id) === id);
  const mapSports = (list: any[]) =>
    list.map((s: any) => ({
      id: String(s.story_id),
      title: s.story_title,
      category: s.category_name || s.section_name || "Sports",
      image:
        s.image_url_medium ||
        s.image_url_big ||
        " /news-image.jpg",
      byline: s.author_name || "",
      time: new Date(s.published_date).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      urlKey: s.url_key || '',
    }));
  const cricketStories = mapSports(byCategoryId(1086));
  const footballStories = mapSports(byCategoryId(1087));
  const hockeyStories = mapSports(byCategoryId(1088));
  const otherSportsStories = mapSports(sportsRaw); // Show all sports data

  // Technology mapping
  const technologyStories = categories.technology.map((s) => ({
    id: String(s.story_id),
    title: s.story_title,
    description: "", // no description in payload
    image:
      s.image_url_medium || s.image_url_big || "/news-image.jpg",
    category: s.section_name || "TECHNOLOGY",
    date: new Date(s.published_date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    urlKey: s.url_key || '',
  }));

  // Impact mapping -> reuse BusinessSlider component as a horizontal carousel
  const impactStoriesMapped = categories.impact.map((s) => ({
    id: String(s.story_id),
    title: s.story_title,
    category: s.section_name || "Impact",
    image: s.image_url_medium || s.image_url_big || "/news-image.jpg",
    date: new Date(s.published_date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    urlKey: s.url_key || '',
  }));

  // Map World category stories -> InternationalNews shape grouped by category_id (continents)
  const internationalWorldStories = categories.world.map((s) => ({
    id: String(s.story_id),
    title: s.story_title,
    description: "", // API does not supply short description
    image: s.image_url_medium || s.image_url_big || "/news-image.jpg",
    timeAgo: new Date(s.published_date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    source: s.author_name || "",
    // Use category_id to align with continent tabs in InternationalNews (e.g., 1089 Asia, 1090 Middle East, ...)
    country: String((s as any).category_id || "other"),
    urlKey: s.url_key || '',
  }));

  // Split Opinion stories into Opinion (first half) & Analysis (second half) for existing component contract
  const opinionStoriesAll = categories.opinion.map((s) => ({
    id: String(s.story_id),
    title: s.story_title,
    category: "OPINION",
    image: s.image_url_medium || s.image_url_big || "/news-image.jpg",
    byline: s.author_name || "",
    time: new Date(s.published_date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    urlKey: s.url_key || '',
  }));
  // Use dedicated Analysis array if provided; fallback to split
  const analysisStoriesAll = categories.analysis.length
    ? categories.analysis.map((s) => ({
        id: String(s.story_id),
        title: s.story_title,
        category: "ANALYSIS",
        image: s.image_url_medium || s.image_url_big || "/news-image.jpg",
        byline: s.author_name || "",
        time: new Date(s.published_date).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        urlKey: s.url_key || '',
      }))
    : [];


  const mid = Math.ceil(opinionStoriesAll.length / 2);
  const dynamicOpinion = opinionStoriesAll;
  const dynamicAnalysis = analysisStoriesAll.length
    ? analysisStoriesAll
    : opinionStoriesAll.slice(mid);

  const entertainmentStories = (
    (categories as any).entertainment ||
    (categories as any).section?.Entertainment ||
    []
  ).map((s: any) => ({
    id: String(s.story_id),
    title: s.story_title,
    category: s.section_name || "Entertainment",
    image: s.image_url_medium || s.image_url_big || "/news-image.jpg",
    date: new Date(s.published_date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    urlKey: s.url_key || '',
  }));

  //page1
  const page1Stories = (
    (categories as any).page1 ||
    (categories as any).section?.["Page 1"] ||
    []
  ).map((s: any) => ({
    id: String(s.story_id),
    title: s.story_title,
    urlKey: s.url_key || '',
    category: s.section_name || s.category_name || "PAGE 1",
    image: s.image_url_medium || s.image_url_big || "/news-image.jpg",
    byline: s.author_name || "",
    time: new Date(s.published_date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));
  // Videos: dynamic from images API combined payload
  const dynamicVideos = mapVideosToSectionItems(gallery?.videos || []);

  console.log("Dynamic Videos:", dynamicVideos);

  // agenda 
  const agendaStories = (
    (categories as any).agenda ||
    (categories as any).section?.["Agenda"] ||
    []
  ).map((s: any) => ({
    id: String(s.story_id),
    title: s.story_title,
    urlKey: s.url_key || '',
    category: s.section_name || s.category_name || "AGENDA",
    image: s.image_url_medium || s.image_url_big || "/news-image.jpg",
    byline: s.author_name || "",
    time: new Date(s.published_date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));
  
  // law and justice
  const lawAndJusticeStories = (
    (categories as any).lawAndJustice ||
    (categories as any).section?.["Law & Justice"] ||
    []
  ).map((s: any) => ({
    id: String(s.story_id),
    title: s.story_title,
    urlKey: s.url_key || '',
    category: s.section_name || s.category_name || "LAW & JUSTICE",
    image: s.image_url_medium || s.image_url_big || "/news-image.jpg",
    byline: s.author_name || "",
    time: new Date(s.published_date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));


  

  // Travel: dynamic from API; hide section if empty
  const travelStories = (
    (categories as any).travel ||
    (categories as any).section?.Travel ||
    []
  ).map((s: any) => ({
    id: String(s.story_id),
    title: s.story_title,
    urlKey: s.url_key || '',
    category: s.section_name || s.category_name || "TRAVEL",
    image: s.image_url_medium || s.image_url_big || "/news-image.jpg",
    byline: s.author_name || "",
    time: new Date(s.published_date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));

  // Health & Fitness: dynamic from API; hide section if empty
  const healthFitnessStories = (
    (categories as any).healthFitness ||
    (categories as any).section?.["Health & Fitness"] ||
    (categories as any).section?.Health ||
    []
  ).map((s: any) => ({
    id: String(s.story_id),
    title: s.story_title,
    urlKey: s.url_key || '',
    category: s.section_name || s.category_name || "HEALTH & FITNESS",
    image:
      s.image_url_medium ||
      s.image_url_big ||
      "/news-image.jpg",
    byline: s.author_name || "",
    time: new Date(s.published_date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-2 py-1 rounded"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className="pb-10">
        <Hero />

        {/* Trending News */}
        <div id="section-trending" className="scroll-mt-24" />

        <Section title="Trending News">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Featured + Secondary stories */}
            <div className="lg:col-span-2 space-y-6">
              {/* Featured (top) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingNews.slice(0, 2).map((story, i) => (
                  <article key={i} className="group">
                    <ScrollToTopLink
                      href={`/news/${story.urlKey}`}
                      className="relative block aspect-4/3 rounded-sm w-full overflow-hidden"
                    >
                      <Image
                        src={(story as any).image || "/news-image.jpg"}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </ScrollToTopLink>
                    <div className="pt-3">
                      <h3 className="text-lg font-bold leading-tight text-gray-900">
                        <ScrollToTopLink
                          href={`/news/${story.urlKey}`}
                          className="hover:underline hover:text-gray-900 transition-colors"
                        >
                          {story.title}
                        </ScrollToTopLink>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{(story as any).time || ""}</p>
                    </div>
                  </article>
                ))}
              </div>
              {/* Secondary (below) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingNews.slice(2, 6).map((story, i) => (
                  <SecondaryStory
                    id={String(story.id)}
                    urlKey={story.urlKey}
                    title={story.title}
                    category={story.category || "NEWS"}
                    image={(story as any).image || ""}
                    byline={(story as any).byline || ""}
                    time={(story as any).time || ""}
                  />
                ))}
              </div>
              {/* Show More Link */}
             <div className="pt-2 flex justify-end">
              <ScrollToTopLink
                href={"/trending"}
                className="text-sm font-semibold text-black hover:underline"
              >
                See more
              </ScrollToTopLink>
          </div>
            </div>
            {/* Right: Sidebar */}
            {/* <PopularPosts popular={popular} /> */}
             <SubscriptionSlider />
          </div>
        </Section>

        {/* India */}
        {indiaStoriesMapped.length > 0 && (
          <section id="section-india" className="px-3 md:px-6 py-6 scroll-mt-24">
            <div className="mx-auto w-full max-w-6xl">
              <BusinessSlider
                stories={indiaStoriesMapped}
                title="India"
                seeMoreHref="/section/india"
              />
            </div>
          </section>
        )}

       
     

        {/* International News */}
        <section id="section-world" className="px-3 md:px-6 py-6 scroll-mt-24">
          <div className="mx-auto w-full max-w-6xl">
            <InternationalNews stories={internationalWorldStories} seeMoreHref="/section/world" />
          </div>
        </section>

           {/* Business & Money Slider */}
        <section
          id="section-business"
          className="px-3 md:px-6 py-6 scroll-mt-24"
        >
          <div className="mx-auto w-full max-w-6xl">
            <BusinessSlider
              stories={businessStoriesMapped}
              title="Business & Money"
              seeMoreHref="/section/business"
            />
          </div>
        </section>

        {/* Impact Slider (repurposed carousel) */}
        {impactStoriesMapped.length > 0 && (
          <section id="section-impact" className="px-3 md:px-6 py-6 scroll-mt-24">
            <div className="mx-auto w-full max-w-6xl">
              <BusinessSlider stories={impactStoriesMapped} title="Impact" seeMoreHref="/section/impact" />
            </div>
          </section>
        )}

       

        {/* Category Sections: page1, lawAndJusticeStories and agendaStories */}
        <div id="section-health" className="scroll-mt-24" />
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              <CategorySection
                title="Law & Justice"
                stories={lawAndJusticeStories}
                accentColor="bg-black"
                seeMoreHref="/section/law-and-justice"
              />

              <CategorySection
                title="Agenda"
                stories={agendaStories}
                accentColor="bg-black"
                seeMoreHref="/section/agenda"
              />

              <AdvertiseSection src="/exceed.jpg" />
            </div>
          </div>
        </section>

        {/* Sports Sections: Cricket, Football, Other Sports (dynamic) */}
        <section id="section-sports" className="px-3 md:px-6 py-6 scroll-mt-24">
          <div className="mx-auto w-full max-w-6xl">
            <SportsSections
              cricket={cricketStories}
              football={footballStories}
              hockey={hockeyStories}
              otherSports={otherSportsStories}
              seeMoreHref="/section/sport"
            />
          </div>
        </section>

        {/* Other Sports Slider presented like Business & Impact carousels */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <BusinessSlider
              stories={otherSportsStories.map(s => ({
                id: s.id,
                title: s.title,
                category: s.category,
                image: s.image,
                date: s.time,
                urlKey: s.urlKey,
              }))}
              title="Other Sports"
              seeMoreHref="/section/sport"
            />
          </div>
        </section>

         {/* Opinion & Analysis Sections with Advertisement */}
        
         <section
          id="section-opinion"
          className="px-3 md:px-6 py-6 scroll-mt-24"
        >
          <div className="mx-auto w-full max-w-6xl">
            <OpinionAnalysisSections
              opinion={dynamicOpinion}
              analysis={dynamicAnalysis}
              opinionSeeMoreHref="/category/opinion"
              analysisSeeMoreHref="/category/analysis"
            
            />
          </div>
        </section>

       

       

        {/* Podcast and Horoscope Sections */}
        {/* Anchors for podcast and horoscope in the combined section */}
        <div id="section-podcast" className="scroll-mt-24" />
        <div id="section-horoscope" className="scroll-mt-24" />
        {/* <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PodcastSection stories={podcastStories} />
              <HoroscopeSection data={horoscopeData} />
            </div>
          </div>
        </section> */}

        {/* Technology and Tarot Sections */}
        {/* Anchors for technology and tarot in the combined section */}
        {/* <div id="section-technology" className="scroll-mt-24" /> */}
        {/* <div id="section-tarot" className="scroll-mt-24" /> */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TechnologySection stories={technologyStories} limit={5} seeMoreHref="/section/tech" />

              <CategorySection
                title="Page 1"
                stories={page1Stories}
                accentColor="bg-black"
                seeMoreHref="/section/page1"
              />
            </div>
          </div>
        </section>
      </main>

      {/* <PhotoGallery /> */}
      
         {/* Entertainment Slider */}
         {entertainmentStories.length > 0 && (
          <section id="section-entertainment" className="px-3 md:px-6 py-6 scroll-mt-24">
            <div className="mx-auto w-full max-w-6xl">
              <BusinessSlider stories={entertainmentStories} title="Entertainment" seeMoreHref="/section/entertainment" />
            </div>
          </section>
        )}

         {/* Videos Section (dynamic) */}
         {dynamicVideos.length > 0 && (
          <section id="section-videos" className="px-3 md:px-6 py-6 scroll-mt-24">
            <div className="mx-auto w-full max-w-6xl">
              <VideosSection videos={dynamicVideos} />
            </div>
          </section>
        )}


       {/* Main grid with Sidebar */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* <MainContent nation={nation} world={world} opinion={opinion} /> */}
              <StateEditions stateEditions={stateEditions || {}} />
              {/* <EPaperDownload /> */}

                <AdvertiseSection src="/exceed.jpg" />
             
            </div>
          </div>
        </section>


      <SiteFooter />
    </div>
  );
}
