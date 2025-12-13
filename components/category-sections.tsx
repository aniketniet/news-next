import { CategorySection } from "./category-section"

type CategoryStory = {
  id: string
  urlKey?: string
  title: string
  category: string
  image: string
  byline: string
  time: string
  featured?: boolean
}

type CategorySectionsProps = {
  page1: CategoryStory[]
  lawAndJustice: CategoryStory[]
  agenda: CategoryStory[]
}

export function CategorySections({ 
  page1, 
  lawAndJustice, 
  agenda   
}: CategorySectionsProps) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Page 1 Section */}
        {page1?.length > 0 && (
          <CategorySection
            title="Page 1"
            stories={page1}
            accentColor="bg-black"
          />
        )}

        {/* Law & Justice Section */}
        {lawAndJustice?.length > 0 && (
          <CategorySection
            title="Law & Justice"
            stories={lawAndJustice}
            accentColor="bg-black"
          />
        )}

        {/* Agenda Section */}
        {agenda?.length > 0 && (
          <CategorySection
            title="Agenda"
            stories={agenda}
            accentColor="bg-black"
          />
        )}
      </div>
    </section>
  )
}
