import { BusinessSlider } from "./business-slider"

type OpinionStory = {
  id: string
  title: string
  category: string
  image: string
  byline: string
  time: string
  urlKey?: string
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
  // Transform opinion data to match BusinessSlider format
  const opinionStories = opinion.map(story => ({
    id: story.id,
    title: story.title,
    category: "OPINION",
    image: story.image,
    date: story.time,
    urlKey: story.urlKey || story.id
  }))

  // Transform analysis data to match BusinessSlider format
  const analysisStories = analysis.map(story => ({
    id: story.id,
    title: story.title,
    category: "ANALYSIS",
    image: story.image,
    date: story.time,
    urlKey: story.urlKey || story.id
  }))

  return (
    <section className="w-full space-y-8">
      {/* Opinion Slider - Full Width Row */}
      <div className="w-full">
        <BusinessSlider
          stories={opinionStories}
          title="Opinion"
          seeMoreHref={opinionSeeMoreHref}
        />
      </div>

      {/* Analysis Slider - Full Width Row */}
      <div className="w-full">
        <BusinessSlider
          stories={analysisStories}
          title="Analysis"
          seeMoreHref={analysisSeeMoreHref}
        />
      </div>
    </section>
  )
}
