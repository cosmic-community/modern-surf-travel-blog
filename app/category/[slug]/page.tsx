// app/category/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPostsByCategory, getAllCategories } from '@/lib/api'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  try {
    // Get posts for this category
    const posts = await getPostsByCategory(slug)
    
    // Get all categories to find the current one
    const categories = await getAllCategories()
    const currentCategory = categories.find(cat => cat.slug === slug)
    
    if (!currentCategory) {
      notFound()
    }

    return (
      <div className="py-16">
        <div className="container max-w-6xl">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/"
                className="text-ocean-600 hover:text-ocean-700 font-medium"
              >
                ← Back to All Stories
              </Link>
            </div>
            
            <div className="mb-4">
              <span className="inline-block bg-ocean-100 text-ocean-800 px-3 py-1 rounded-full text-sm font-medium">
                Category
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {currentCategory.metadata?.name || currentCategory.title}
            </h1>
            
            {currentCategory.metadata?.description && (
              <p className="text-lg text-gray-600 mb-8">
                {currentCategory.metadata.description}
              </p>
            )}
            
            <p className="text-sm text-gray-500">
              {posts.length} {posts.length === 1 ? 'story' : 'stories'} in this category
            </p>
          </header>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏄‍♂️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No stories yet in this category
              </h2>
              <p className="text-gray-600 mb-8">
                Check back soon for new surf adventures and stories!
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-ocean-600 text-white font-medium rounded-lg hover:bg-ocean-700 transition-colors"
              >
                Browse All Stories
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching category page:', error)
    notFound()
  }
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const categories = await getAllCategories()
    return categories.map((category) => ({
      slug: category.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for categories:', error)
    return []
  }
}