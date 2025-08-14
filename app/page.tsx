import { getAllPosts, getAllCategories } from '@/lib/api'
import Hero from '@/components/Hero'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Post, Category } from '@/types'

export default async function HomePage() {
  const posts = await getAllPosts()
  const categories = await getAllCategories()
  
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)
  
  return (
    <div>
      {/* Hero Section */}
      {featuredPost && (
        <Hero featuredPost={featuredPost} />
      )}
      
      {/* Posts Section */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Latest Stories
              </h2>
              <p className="text-lg text-gray-600">
                Surf destinations, gear reviews, and culture from around the world
              </p>
            </div>
            
            <div className="mt-6 lg:mt-0">
              <CategoryFilter 
                categories={categories}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}