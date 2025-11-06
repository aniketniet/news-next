import { CategorySection } from "./category-section"

type CategoryStory = {
  id: string
  title: string
  category: string
  image: string
  byline: string
  time: string
  featured?: boolean
}

type CategorySectionsProps = {
  entertainment: CategoryStory[]
  travel: CategoryStory[]
  foodWellness: CategoryStory[]
}

export function CategorySections({ 
  entertainment, 
  travel, 
  foodWellness 
}: CategorySectionsProps) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Entertainment Section */}
        {entertainment?.length > 0 && (
          <CategorySection
            title="Entertainment"
            stories={entertainment}
            accentColor="bg-[#1a59a9]"
          />
        )}

        {/* Travel Section */}
        {travel?.length > 0 && (
          <CategorySection
            title="Travel"
            stories={travel}
            accentColor="bg-[#1a59a9]"
          />
        )}

        {/* Health & Fitness Section */}
        {foodWellness?.length > 0 && (
          <CategorySection
            title="Health & Fitness"
            stories={foodWellness}
            accentColor="bg-[#1a59a9]"
          />
        )}
      </div>
    </section>
  )
}
