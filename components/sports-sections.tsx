import { SportsSection } from "./sports-section"

type SportsStory = {
  id: string
  title: string
  category: string
  image: string
  byline: string
  time: string
}

type SportsSectionsProps = {
  cricket: SportsStory[]
  football: SportsStory[]
  hockey: SportsStory[]
  otherSports: SportsStory[]
  seeMoreHref?: string
}

export function SportsSections({ 
  cricket, 
  football, 
  hockey,
  otherSports,
  seeMoreHref,
}: SportsSectionsProps) {
  const hasCricket = Array.isArray(cricket) && cricket.length > 0
  const hasFootball = Array.isArray(football) && football.length > 0
  const hasHockey = Array.isArray(hockey) && hockey.length > 0
  const hasOther = Array.isArray(otherSports) && otherSports.length > 0

  // Only render this section for the three primary sports columns. The
  // "Other Sports" content will be rendered as a separate carousel section
  // (BusinessSlider-style) after this block from the page.
  if (!hasCricket && !hasFootball && !hasHockey) return null

  return (
    <section className="w-full space-y-8">
      {(hasCricket || hasFootball || hasHockey) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {hasCricket && <SportsSection title="Cricket" stories={cricket} seeMoreHref={seeMoreHref} />}
          {hasFootball && <SportsSection title="Football" stories={football} seeMoreHref={seeMoreHref} />}
          {hasHockey && <SportsSection title="Hockey" stories={hockey} seeMoreHref={seeMoreHref} />}
        </div>
      )}
    </section>
  )
}
