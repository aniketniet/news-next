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
  otherSports: SportsStory[]
}

export function SportsSections({ 
  cricket, 
  football, 
  otherSports 
}: SportsSectionsProps) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SportsSection title="Cricket" stories={cricket} />
        <SportsSection title="Football" stories={football} />
        <SportsSection title="Other Sports" stories={otherSports} />
      </div>
    </section>
  )
}
