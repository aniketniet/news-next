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
        <CategorySection
          title="Entertainment"
          stories={entertainment}
          accentColor="bg-yellow-400"
        />

        {/* Travel Section */}
        <CategorySection
          title="Travel"
          stories={travel}
          accentColor="bg-yellow-400"
        />

        {/* Food & Wellness Section */}
        <CategorySection
          title="Food & Wellness"
          stories={foodWellness}
          accentColor="bg-yellow-400"
        />
      </div>
    </section>
  )
}
