import Link from 'next/link'
import { PostCardProps } from '@/types'

export default function PostCard({ post, priority = false }: PostCardProps) {
  const { metadata } = post
  
  return (
    <article className="card group hover:shadow-xl transition-all duration-300">
      <Link href={`/posts/${post.slug}`} className="block">
        {metadata.featured_image && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={`${metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          {metadata.category && (
            <span className="inline-block bg-ocean-100 text-ocean-700 px-2 py-1 rounded text-xs font-medium mb-3">
              {metadata.category.metadata?.name}
            </span>
          )}
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {metadata.content?.substring(0, 120)}...
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              {metadata.author && (
                <div className="flex items-center space-x-2">
                  {metadata.author.metadata?.avatar && (
                    <img
                      src={`${metadata.author.metadata.avatar.imgix_url}?w=32&h=32&fit=crop&auto=format,compress`}
                      alt={metadata.author.metadata.name}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span>{metadata.author.metadata?.name}</span>
                </div>
              )}
              
              {metadata.location && (
                <div className="flex items-center space-x-1">
                  <span>📍</span>
                  <span className="truncate">{metadata.location}</span>
                </div>
              )}
            </div>
            
            {metadata.wave_rating && (
              <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded">
                <span>⭐</span>
                <span className="text-xs font-medium">{metadata.wave_rating.key}/5</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}