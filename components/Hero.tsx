import Link from 'next/link'
import { HeroProps } from '@/types'

export default function Hero({ featuredPost }: HeroProps) {
  const { metadata } = featuredPost
  
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={`${metadata.featured_image?.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
          alt={featuredPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="relative container max-w-6xl text-white">
        <div className="max-w-2xl">
          {metadata.category && (
            <span className="inline-block bg-ocean-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              {metadata.category.metadata?.name}
            </span>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {featuredPost.title}
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
            {metadata.content?.substring(0, 200)}...
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link 
              href={`/posts/${featuredPost.slug}`}
              className="btn-primary text-lg px-8 py-3"
            >
              Read Full Story
            </Link>
            
            <div className="flex items-center space-x-4 text-sm">
              {metadata.author && (
                <div className="flex items-center space-x-2">
                  {metadata.author.metadata?.avatar && (
                    <img
                      src={`${metadata.author.metadata.avatar.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                      alt={metadata.author.metadata.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span>By {metadata.author.metadata?.name}</span>
                </div>
              )}
              
              {metadata.location && (
                <div className="flex items-center space-x-1">
                  <span>📍</span>
                  <span>{metadata.location}</span>
                </div>
              )}
              
              {metadata.wave_rating && (
                <div className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>{metadata.wave_rating.value}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}