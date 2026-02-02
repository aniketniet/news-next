export const SECTION_SLUG_TO_ID: Record<string, number> = {
  india: 1022,
  business: 1023,
  world: 1024,
  sport: 1027,
  tech: 1052,
  entertainment: 1051,
  trending:1046,
  impact:1045,
  page1:1031,
  laws: 1106,
  agenda:1107,
  "finance-and-innovation": 1108,
}

export const CATEGORY_SLUG_TO_ID: Record<string, number> = {
  opinion: 1055,
  delhi: 1051,
  analysis: 1056,
}

export type TaxonomyKind = 'section' | 'category'

export function resolveSectionId(slug: string): number | undefined {
  return SECTION_SLUG_TO_ID[slug.toLowerCase()]
}

export function resolveCategoryId(slug: string): number | undefined {
  return CATEGORY_SLUG_TO_ID[slug.toLowerCase()]
}
