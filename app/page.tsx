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
import { CategorySections } from "@/components/category-sections";
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

const breaking = [
  { title: "Parliament session adjourned till 2 PM after opposition uproar" },
  { title: "IMD issues heavy rainfall alert for coastal states" },
  { title: "Markets extend gains for third straight day" },
  { title: "National team announces provisional squad for qualifiers" },
];

const businessStories = [
  {
    id: "1",
    title: "Household energy bills to rise by 2% in October",
    category: "BUSINESS",
    image: "/business-market.png",
    date: "December 09, 2020",
  },
  {
    id: "2",
    title: "Rise in government borrowing costs puts chancellor in a bind",
    category: "ECONOMY",
    image: "/business-meeting-diversity.png",
    date: "December 09, 2020",
  },
  {
    id: "3",
    title: "Profit remains elusive for Victoria Beckham despite sales rise",
    category: "BUSINESS",
    image: "/markets.png",
    date: "December 09, 2020",
  },
  {
    id: "4",
    title: "FT owner sues Perplexity AI for copyright infringement",
    category: "TECHNOLOGY",
    image: "/interconnected-technology.png",
    date: "December 09, 2020",
  },
  {
    id: "5",
    title: "Global markets rally on positive economic indicators",
    category: "MARKETS",
    image: "/business-market.png",
    date: "December 09, 2020",
  },
  {
    id: "6",
    title: "Tech stocks surge following earnings reports",
    category: "TECHNOLOGY",
    image: "/interconnected-technology.png",
    date: "December 09, 2020",
  },
];

const internationalNews = [
  // USA News
  {
    id: "usa-1",
    title: "Sheff Wed show 'togetherness' amid protests at owner",
    description:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/world-summit.png",
    timeAgo: "7 hrs ago",
    source: "BRITIAN",
    country: "USA",
  },
  {
    id: "usa-2",
    title: "Sheff Wed show 'togetherness' amid protests at owner",
    description:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/world.png",
    timeAgo: "7 hrs ago",
    source: "BRITIAN",
    country: "USA",
  },
  {
    id: "usa-3",
    title: "Sheff Wed show 'togetherness' amid protests at owner",
    description:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/world-summit.png",
    timeAgo: "7 hrs ago",
    source: "BRITIAN",
    country: "USA",
  },
  {
    id: "usa-4",
    title: "Sheff Wed show 'togetherness' amid protests at owner",
    description:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/parliament-building.png",
    timeAgo: "7 hrs ago",
    source: "BRITIAN",
    country: "USA",
  },
  {
    id: "usa-5",
    title: "Sheff Wed show 'togetherness' amid protests at owner",
    description:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/world.png",
    timeAgo: "7 hrs ago",
    source: "BRITIAN",
    country: "USA",
  },
  {
    id: "usa-6",
    title: "Sheff Wed show 'togetherness' amid protests at owner",
    description:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/world-summit.png",
    timeAgo: "7 hrs ago",
    source: "BRITIAN",
    country: "USA",
  },
  // China News
  {
    id: "china-1",
    title: "China's economic growth shows resilience",
    description:
      "Latest economic indicators suggest China's economy is maintaining steady growth despite global challenges",
    image: "/business-market.png",
    timeAgo: "5 hrs ago",
    source: "REUTERS",
    country: "China",
  },
  {
    id: "china-2",
    title: "Technology sector developments in Beijing",
    description:
      "Major tech companies announce new initiatives as government support continues for innovation",
    image: "/interconnected-technology.png",
    timeAgo: "6 hrs ago",
    source: "REUTERS",
    country: "China",
  },
  // UK News
  {
    id: "uk-1",
    title: "Parliament debates new economic measures",
    description:
      "MPs discuss proposed legislation aimed at addressing cost of living concerns across the country",
    image: "/parliament-building.png",
    timeAgo: "4 hrs ago",
    source: "BBC",
    country: "UK",
  },
  {
    id: "uk-2",
    title: "London markets respond to policy changes",
    description:
      "Financial markets show positive reaction to government's latest economic announcements",
    image: "/business-market.png",
    timeAgo: "3 hrs ago",
    source: "BBC",
    country: "UK",
  },
  // Europe News
  {
    id: "europe-1",
    title: "EU leaders convene for summit discussions",
    description:
      "European Union officials gather to address regional challenges and cooperation initiatives",
    image: "/world-summit.png",
    timeAgo: "2 hrs ago",
    source: "EURONEWS",
    country: "Europe",
  },
  {
    id: "europe-2",
    title: "Continental markets show stability",
    description:
      "European financial markets demonstrate resilience amid ongoing global economic uncertainties",
    image: "/business-meeting-diversity.png",
    timeAgo: "1 hr ago",
    source: "EURONEWS",
    country: "Europe",
  },
];

const entertainmentStories = [
  {
    id: "ent-1",
    title: "Republican Senator Vital to Health Indonesia.",
    category: "ENTERTAINMENT",
    image: "/feature-story.png",
    byline: "David Hall",
    time: "December 09, 2020",
    featured: true,
  },
  {
    id: "ent-2",
    title: "6 Best Tips For Building A Good Shipping Boat",
    category: "ENTERTAINMENT",
    image: "/photo-feature.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "ent-3",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "ENTERTAINMENT",
    image: "/feature-photo.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "ent-4",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "ENTERTAINMENT",
    image: "/photo-gallery.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "ent-5",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "ENTERTAINMENT",
    image: "/video-news.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
];

const travelStories = [
  {
    id: "travel-1",
    title: "Republican Senator Vital to Health Indonesia.",
    category: "TRAVEL",
    image: "/world.png",
    byline: "David Hall",
    time: "December 09, 2020",
    featured: true,
  },
  {
    id: "travel-2",
    title: "6 Best Tips For Building A Good Shipping Boat",
    category: "TRAVEL",
    image: "/world-summit.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "travel-3",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "TRAVEL",
    image: "/abstract-feature.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "travel-4",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "TRAVEL",
    image: "/abstract-geometric-shapes.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "travel-5",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "TRAVEL",
    image: "/diverse-group-candid-photo.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
];

const foodWellnessStories = [
  {
    id: "food-1",
    title: "Republican Senator Vital to Health Indonesia.",
    category: "FOOD & WELLNESS",
    image: "/diverse-group-playing-various-sports.png",
    byline: "David Hall",
    time: "December 09, 2020",
    featured: true,
  },
  {
    id: "food-2",
    title: "6 Best Tips For Building A Good Shipping Boat",
    category: "FOOD & WELLNESS",
    image: "/sports-football.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "food-3",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "FOOD & WELLNESS",
    image: "/vibrant-cricket-match.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "food-4",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "FOOD & WELLNESS",
    image: "/sports-football.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "food-5",
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "FOOD & WELLNESS",
    image: "/diverse-group-playing-various-sports.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
];

const cricketStories = [
  {
    id: "cricket-1",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "CRICKET",
    image: "/vibrant-cricket-match.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "cricket-2",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "CRICKET",
    image: "/sports-football.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "cricket-3",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "CRICKET",
    image: "/vibrant-cricket-match.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "cricket-4",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "CRICKET",
    image: "/sports-football.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "cricket-5",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "CRICKET",
    image: "/vibrant-cricket-match.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "cricket-6",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "CRICKET",
    image: "/sports-football.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
];

const footballStories = [
  {
    id: "football-1",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "FOOTBALL",
    image: "/sports-football.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "football-2",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "FOOTBALL",
    image: "/vibrant-cricket-match.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "football-3",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "FOOTBALL",
    image: "/sports-football.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "football-4",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "FOOTBALL",
    image: "/vibrant-cricket-match.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "football-5",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "FOOTBALL",
    image: "/sports-football.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "football-6",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "FOOTBALL",
    image: "/vibrant-cricket-match.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
];

const otherSportsStories = [
  {
    id: "other-1",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "OTHER SPORTS",
    image: "/diverse-group-playing-various-sports.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "other-2",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "OTHER SPORTS",
    image: "/sports-football.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "other-3",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "OTHER SPORTS",
    image: "/diverse-group-playing-various-sports.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "other-4",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "OTHER SPORTS",
    image: "/vibrant-cricket-match.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "other-5",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "OTHER SPORTS",
    image: "/diverse-group-playing-various-sports.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "other-6",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "OTHER SPORTS",
    image: "/sports-football.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
];

const opinionStories = [
  {
    id: "opinion-1",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "OPINION",
    image: "/parliament-building.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "opinion-2",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "OPINION",
    image: "/world-summit.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "opinion-3",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "OPINION",
    image: "/business-market.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "opinion-4",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "OPINION",
    image: "/world.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "opinion-5",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "OPINION",
    image: "/parliament-building.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "opinion-6",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "OPINION",
    image: "/business-meeting-diversity.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
];

const analysisStories = [
  {
    id: "analysis-1",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "ANALYSIS",
    image: "/business-market.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "analysis-2",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "ANALYSIS",
    image: "/interconnected-technology.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "analysis-3",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "ANALYSIS",
    image: "/world-summit.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "analysis-4",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "ANALYSIS",
    image: "/parliament-building.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "analysis-5",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "ANALYSIS",
    image: "/business-meeting-diversity.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    id: "analysis-6",
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "ANALYSIS",
    image: "/markets.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
];

const videoStories = [
  {
    id: "video-1",
    title:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/parliament-building.png",
    duration: "12:09",
  },
  {
    id: "video-2",
    title:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/world-summit.png",
    duration: "12:09",
  },
  {
    id: "video-3",
    title:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide its stand",
    image: "/video-news.png",
    duration: "12:09",
    featured: true,
  },
  {
    id: "video-4",
    title:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/business-meeting-diversity.png",
    duration: "12:09",
  },
  {
    id: "video-5",
    title:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi said it was yet to decide",
    image: "/world.png",
    duration: "12:09",
  },
];

const latest = Array.from({ length: 8 }).map((_, i) => ({
  title: `Latest update headline number ${i + 1} goes here in one or two lines`,
  category: i % 2 === 0 ? "Nation" : "States",
  image: `/placeholder.svg?height=200&width=320&query=latest%20${i + 1}`,
  time: `${(i + 1) * 10}m ago`,
}));

const nation = Array.from({ length: 6 }).map((_, i) => ({
  title: `National story ${i + 1} with concise headline`,
  category: "Nation",
  image: `/placeholder.svg?height=200&width=320&query=nation%20${i + 1}`,
  time: "Today",
}));

const world = Array.from({ length: 6 }).map((_, i) => ({
  title: `Global roundup ${i + 1}: leaders meet, decisions due`,
  category: "World",
  image: `/placeholder.svg?height=200&width=320&query=world%20${i + 1}`,
  time: "Today",
}));

const opinion = Array.from({ length: 4 }).map((_, i) => ({
  title: `Opinion: Perspective ${i + 1} on current affairs`,
  category: "Opinion",
  image: `/placeholder.svg?height=200&width=320&query=opinion%20${i + 1}`,
  time: "This week",
}));

const trendingNews = [
  {
    title: "Republican Senator Vital to Health Indonesia.",
    category: "POLITICS",
    image: "/news-lead-image.png",
    byline: "David Hall",
    time: "December 09, 2020",
    featured: true,
  },
  {
    title: "A classic and sturdy building with history.",
    category: "POLITICS",
    image: "/parliament-building.png",
    byline: "David Hall",
    time: "December 09, 2020",
    featured: true,
  },
  {
    title: "6 Best Tips For Building A Good Shipping Boat",
    category: "BUSINESS",
    image: "/business-meeting-diversity.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    title: "Meeting Room Is Empty Because Of The Covid-19",
    category: "HEALTH",
    image: "/business-market.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    title: "Many Flag Have A Spirit Freedom Placerat Solution Ut Est",
    category: "POLITICS",
    image: "/world-summit.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
  {
    title: "Sovenir Miniature President All Country",
    category: "WORLD",
    image: "/world.png",
    byline: "David Hall",
    time: "December 09, 2020",
  },
];

const popularPosts = [
  {
    title:
      "Gegera Corona, Kekayaan Bos Zoom Nambah Rp 64 T Dalam 3 Bulan - CNBC Indonesia",
    category: "COVID-19",
  },
  {
    title:
      "The West Had A Head Start On Virus Preparations. Why Didn't It Take It?",
    category: "STARTUP",
  },
  {
    title: "America's Social-Distancing Deniers Have Become",
    category: "COVID-19",
  },
  {
    title:
      "Egypt's Soap Operas Defy A Deadly Virus For Ramadan Prime Time. But At What Cost?",
    category: "STARTUP",
  },
];

const podcastStories = [
  {
    id: "podcast-1",
    title: "Fashion Scoop",
    description: "Cara membuat asap dan memfoto menjadi penuh warna.",
    subtitle:
      "In Telangana, from where Justice Reddy hails, the Bharat Rashtra Samithi (BRS) said it was yet to decide its stand",
    image: "/placeholder.svg?height=200&width=200&query=fashion%20scoop",
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
    image: "/placeholder.svg?height=200&width=200&query=right%20swipe",
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
    image: "/placeholder.svg?height=200&width=200&query=truth%20podcast",
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
    image: "/placeholder.svg?height=200&width=200&query=defence%20podcast",
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

const technologyStories = [
  {
    id: "tech-1",
    title: "Tips And Trick Make Notes To Do List Plan Good",
    description:
      "Maecenas accumsan tortor ut velit pharetra mollis. Proin eu nisl et arcu iaculis placerat sollicitudin ut est. In fringilla dui dui.",
    image: "/placeholder.svg?height=200&width=200&query=tech%20notes",
    category: "TRAVEL",
    date: "December 09, 2020",
  },
  {
    id: "tech-2",
    title: "Exercitation Ullamco Laboris Nisl Ut Aliquip",
    description:
      "Maecenas accumsan tortor ut velit pharetra mollis. Proin eu nisl et arcu iaculis placerat sollicitudin ut est. In fringilla dui dui.",
    image: "/placeholder.svg?height=200&width=200&query=tech%20vr",
    category: "TRAVEL",
    date: "December 09, 2020",
  },
  {
    id: "tech-3",
    title: "Akhirnya Instagram Di Beli Oleh Facebook",
    description:
      "Maecenas accumsan tortor ut velit pharetra mollis. Proin eu nisl et arcu iaculis placerat sollicitudin ut est. In fringilla dui dui.",
    image: "/placeholder.svg?height=200&width=200&query=instagram%20phone",
    category: "TRAVEL",
    date: "December 09, 2020",
  },
  {
    id: "tech-4",
    title: "Laptop Murah Yang Super Komplit Cocok Untuk Anak Di Tahun 2020.",
    description:
      "Maecenas accumsan tortor ut velit pharetra mollis. Proin eu nisl et arcu iaculis placerat sollicitudin ut est. In fringilla dui dui.",
    image: "/placeholder.svg?height=200&width=200&query=laptop%20tech",
    category: "TRAVEL",
    date: "December 09, 2020",
  },
];

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
  promoImage: "/placeholder.svg?height=300&width=400&query=tarot%20smile",
  promoTitle: "SMILE WITH STRENGTH",
  promoSubtitle: "Discover your inner power with our tarot readings",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-yellow-400 text-black px-2 py-1 rounded"
      >
        Skip to content
      </a>

      <SiteHeader />
      {/* <BreakingTicker items={breaking} /> */}

      <main id="main" className="pb-10">
        <Hero />

        {/* Latest News */}

        <Section
          title="Latest News"
          action={
            <a href="#" className="text-sm text-gray-600 hover:underline">
              See all
            </a>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latest.map((p, i) => (
              <NewsCard key={i} {...p} />
            ))}
          </div>
        </Section>

        {/* Trending News */}
        <Section
          title="Trending News"
          action={
            <a href="#" className="text-sm text-gray-600 hover:underline">
              See all
            </a>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Featured + Secondary stories */}

            <div className="lg:col-span-2 space-y-6">
              {/* Featured (top) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingNews.slice(0, 2).map((story, i) => (
                  <article key={i} className="relative group">
                    <Link
                      href="#"
                      className="relative block aspect-[4/3] w-full overflow-hidden rounded"
                    >
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="inline-flex items-center text-[10px] uppercase tracking-wide font-bold bg-yellow-400 text-black px-2 py-1 rounded mb-2">
                          {story.category}
                        </span>
                        <h3 className="text-lg font-bold leading-tight mb-2">
                          {story.title}
                        </h3>
                        <p className="text-xs opacity-90">
                          By {story.byline} • {story.time}
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
              {/* Secondary (below) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingNews.slice(2).map((story, i) => (
                  <SecondaryStory
                    key={i}
                    title={story.title}
                    category={story.category}
                    image={story.image}
                    byline={story.byline}
                    time={story.time}
                  />
                ))}
              </div>
            </div>
            {/* Right: Sidebar */}
            <PopularPosts />
          </div>
        </Section>

        {/* Main grid with Sidebar */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <MainContent nation={nation} world={world} opinion={opinion} />
              {/* <StateEditions /> */}
              {/* Right Sidebar */}
              <Sidebar />
            </div>
          </div>
        </section>

        {/* Business & Money Slider */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <BusinessSlider
              stories={businessStories}
              title="Business & Money"
            />
          </div>
        </section>

        {/* International News */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <InternationalNews stories={internationalNews} />
          </div>
        </section>

        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <BusinessSlider stories={businessStories} title="Law & Justice" />
          </div>
        </section>

        {/* Category Sections: Entertainment, Travel, Food & Wellness */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <CategorySections
              entertainment={entertainmentStories}
              travel={travelStories}
              foodWellness={foodWellnessStories}
            />
          </div>
        </section>

        {/* Sports Sections: Cricket, Football, Other Sports */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <SportsSections
              cricket={cricketStories}
              football={footballStories}
              otherSports={otherSportsStories}
            />
          </div>
        </section>

        {/* Opinion & Analysis Sections with Advertisement */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <OpinionAnalysisSections
              opinion={opinionStories}
              analysis={analysisStories}
            />
          </div>
        </section>

        {/* Videos Section */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <VideosSection videos={videoStories} />
          </div>
        </section>

        {/* Podcast and Horoscope Sections */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PodcastSection stories={podcastStories} />
              <HoroscopeSection data={horoscopeData} />
            </div>
          </div>
        </section>

        {/* Technology and Tarot Sections */}
        <section className="px-3 md:px-6 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TechnologySection stories={technologyStories} />
              <TarotSection data={tarotData} />
            </div>
          </div>
        </section>
      </main>

      <PhotoGallery />

      <SiteFooter />
    </div>
  );
}
