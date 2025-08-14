import { getAllPosts, getAllCategories, getPostsByCategory } from '@/lib/api'
import Hero from '@/components/Hero'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Post, Category } from '@/types'

interface HomePageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { category } = await searchParams
  
  // Get all posts and categories
  const allPosts = await getAllPosts()
  const categories = await getAllCategories()
  
  // Filter posts based on category search param
  let posts = allPosts
  if (category && category !== 'all') {
    posts = await getPostsByCategory(category)
  }
  
  const featuredPost = allPosts[0] // Always use first post from all posts for hero
  const displayPosts = posts.slice(featuredPost && !category ? 1 : 0) // Skip featured post only if showing all posts
  
  return (
    <div>
      {/* Hero Section - Only show when not filtering */}
      {!category && featuredPost && (
        <Hero featuredPost={featuredPost} />
      )}
      
      {/* Posts Section */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {category && category !== 'all' 
                  ? `${categories.find(cat => cat.slug === category)?.metadata?.name || 'Category'} Stories`
                  : 'Latest Stories'
                }
              </h2>
              <p className="text-lg text-gray-600">
                {category && category !== 'all'
                  ? `Stories from the ${categories.find(cat => cat.slug === category)?.metadata?.name || 'selected'} category`
                  : 'Surf destinations, gear reviews, and culture from around the world'
                }
              </p>
            </div>
            
            <div className="mt-6 lg:mt-0">
              <CategoryFilter 
                categories={categories}
                selectedCategory={category}
              />
            </div>
          </div>
          
          {displayPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏄‍♂️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No stories found
              </h3>
              <p className="text-gray-600 mb-8">
                Try selecting a different category or check back later for new content.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}