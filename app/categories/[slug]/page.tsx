// app/categories/[slug]/page.tsx
import { getPostsByCategory, getAllCategories } from '@/lib/api'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Post, Category } from '@/types'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getAllCategories()
  const category = categories.find(cat => cat.slug === slug)
  
  if (!category) {
    return {
      title: 'Category Not Found | Surf Travel Blog',
    }
  }

  return {
    title: `${category.metadata?.name || category.title} | Surf Travel Blog`,
    description: category.metadata?.description || `Browse posts in the ${category.metadata?.name || category.title} category`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  // Get category and posts
  const categories = await getAllCategories()
  const category = categories.find(cat => cat.slug === slug)
  
  if (!category) {
    notFound()
  }
  
  const posts = await getPostsByCategory(slug)

  return (
    <div className="py-16">
      <div className="container max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-ocean-600 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/categories" className="hover:text-ocean-600 transition-colors">
                Categories
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              {category.metadata?.name || category.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">
            {slug === 'destinations' && '🏝️'}
            {slug === 'gear-reviews' && '🏄‍♂️'}
            {slug === 'surf-culture' && '🌊'}
            {!['destinations', 'gear-reviews', 'surf-culture'].includes(slug) && '🏷️'}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.metadata?.name || category.title}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            {category.metadata?.description || `Explore stories in the ${category.metadata?.name || category.title} category`}
          </p>
          
          <div className="text-sm text-gray-500">
            {posts.length} {posts.length === 1 ? 'story' : 'stories'} found
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Stories Yet
            </h3>
            <p className="text-gray-600 mb-8">
              We haven't published any stories in this category yet. Check back soon for new content!
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center bg-ocean-600 text-white px-6 py-3 rounded-lg hover:bg-ocean-700 transition-colors font-medium"
            >
              Browse Other Categories
            </Link>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/categories"
            className="inline-flex items-center text-ocean-600 hover:text-ocean-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Categories
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-ocean-600 font-medium transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}