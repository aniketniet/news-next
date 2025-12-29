import { OpinionSection } from "./opinion-section"
import Image from "next/image"

type OpinionStory = {
  id: string
  title: string
  category: string
  image: string
  byline: string
  time: string
}

type OpinionAnalysisSectionsProps = {
  opinion: OpinionStory[]
  analysis: OpinionStory[]
  opinionSeeMoreHref?: string
  analysisSeeMoreHref?: string

}

export function OpinionAnalysisSections({ 
  opinion, 
  analysis,
  opinionSeeMoreHref,
  analysisSeeMoreHref,

}: OpinionAnalysisSectionsProps) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Opinion Section */}
        <div className="lg:col-span-4">
          <OpinionSection title="Opinion" stories={opinion} seeMoreHref={opinionSeeMoreHref} />
        </div>

        {/* Analysis Section */}
        <div className="lg:col-span-4">
          <OpinionSection title="Analysis" stories={analysis} seeMoreHref={analysisSeeMoreHref} />
        </div>
      

        {/* Advertisement Banner */}
        <div className="lg:col-span-4">
          <div className="sticky top-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
              <Image
                src="/transglobe.jpg"
                alt="Advertisement"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
