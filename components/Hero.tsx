import Link from 'next/link'
import { HeroProps } from '@/types'

export default function Hero({ featuredPost }: HeroProps) {
  if (!featuredPost) return null

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {featuredPost.metadata.featured_image && (
          <img
            src={`${featuredPost.metadata.featured_image.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={featuredPost.metadata.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-6xl text-center text-white">
        <div className="max-w-4xl mx-auto">
          {featuredPost.metadata.category && (
            <div className="mb-6">
              <span className="inline-block bg-ocean-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {featuredPost.metadata.category.metadata.name}
              </span>
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {featuredPost.metadata.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            # {featuredPost.metadata.title} {featuredPost.metadata.content.split('\n')[2].replace('# The Ultimate Guide to Surfing Uluwatu, Bali', '')}
          </p>
          
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="inline-flex items-center px-8 py-4 bg-ocean-600 text-white font-semibold rounded-lg hover:bg-ocean-700 transition-all duration-300 transform hover:scale-105"
          >
            Read Full Story
          </Link>
          
          {/* Author and Meta Info */}
          <div className="mt-12 flex items-center justify-center space-x-6 text-sm">
            {featuredPost.metadata.author && (
              <div className="flex items-center space-x-2">
                {featuredPost.metadata.author.metadata.avatar && (
                  <img
                    src={`${featuredPost.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={featuredPost.metadata.author.metadata.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span>By {featuredPost.metadata.author.metadata.name}</span>
              </div>
            )}
            
            {featuredPost.metadata.location && (
              <span className="flex items-center space-x-1">
                <span>📍</span>
                <span>{featuredPost.metadata.location}</span>
              </span>
            )}
            
            {featuredPost.metadata.wave_rating && (
              <span className="flex items-center space-x-1">
                <span>⭐</span>
                <span>{featuredPost.metadata.wave_rating.value}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}