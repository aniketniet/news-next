import { ExoticaHeader } from "@/components/exotica/exotica-header";
import { ExoticaFooter } from "@/components/exotica/exotica-footer";
import { ExoticaHero } from "@/components/exotica/exotica-hero";
import { FeaturedArticles } from "@/components/exotica/featured-articles";
import { ExploreExperiences } from "@/components/exotica/explore-experiences";
import { TravelQuote } from "@/components/exotica/travel-quote";
import { StayConnected } from "@/components/exotica/stay-connected";

export default function ExoticaPage() {
  return (
    <div className="min-h-screen bg-white">
      <ExoticaHeader />
      
      <main>
        {/* Hero Section - Kansai Nights */}
        <ExoticaHero />
        
        {/* Featured Articles */}
        <FeaturedArticles />
        
        {/* Explore by Experience */}
        <ExploreExperiences />
        
        {/* Travel Quote */}
        <TravelQuote />
        
        {/* Stay Connected */}
        {/* <StayConnected /> */}
      </main>
      
      <ExoticaFooter />
    </div>
  );
}
