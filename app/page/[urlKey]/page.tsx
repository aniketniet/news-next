import { notFound } from 'next/navigation'
import { fetchPage } from '@/lib/api/pages'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/footer'

interface PageProps {
  params: Promise<{
    urlKey: string
  }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { urlKey } = await params;
  const page = await fetchPage(urlKey)
  
  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold mb-6">{page.page_name}</h1>
          <div 
            dangerouslySetInnerHTML={{ __html: page.page_content }} 
            className="cms-content"
          />
        </article>
      </main>
      
      <SiteFooter />
    </div>
  )
}

// Generate static params for all pages at build time
export async function generateStaticParams() {
  // For now, we'll generate params for the main pages
  // In a production environment, you might want to fetch all pages
  return [
    { urlKey: 'about-us' },
    { urlKey: 'contact-us' },
    { urlKey: 'advertise-with-us' }
  ]
}