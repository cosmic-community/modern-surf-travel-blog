import { getAllCategories } from '@/lib/api'
import Link from 'next/link'
import { Category } from '@/types'

export const metadata = {
  title: 'Browse Categories | Surf Travel Blog',
  description: 'Explore different categories of surf content including destinations, gear reviews, and surf culture stories.',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="py-16">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover surf stories organized by topic. From destination guides to gear reviews and cultural insights.
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-8 text-center">
                  {/* Category Icon */}
                  <div className="text-6xl mb-4">
                    {category.slug === 'destinations' && '🏝️'}
                    {category.slug === 'gear-reviews' && '🏄‍♂️'}
                    {category.slug === 'surf-culture' && '🌊'}
                    {!['destinations', 'gear-reviews', 'surf-culture'].includes(category.slug) && '🏷️'}
                  </div>
                  
                  {/* Category Name */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors">
                    {category.metadata?.name || category.title}
                  </h2>
                  
                  {/* Category Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {category.metadata?.description || 'Explore stories in this category'}
                  </p>
                  
                  {/* Arrow Icon */}
                  <div className="mt-6 flex justify-center">
                    <svg 
                      className="w-6 h-6 text-ocean-600 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Categories Found
            </h3>
            <p className="text-gray-600">
              Categories will appear here once they are added to the CMS.
            </p>
          </div>
        )}

        {/* Back to Home Link */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center text-ocean-600 hover:text-ocean-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}