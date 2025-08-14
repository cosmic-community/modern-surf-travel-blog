import Link from 'next/link'
import { PostCardProps } from '@/types'

export default function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.metadata?.title || 'Post image'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        {/* Category */}
        {post.metadata?.category && (
          <div className="mb-3">
            <span className="inline-block bg-ocean-100 text-ocean-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              {post.metadata.category.metadata?.name || 'Uncategorized'}
            </span>
          </div>
        )}
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ocean-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.metadata?.title || 'Untitled Post'}
          </Link>
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.metadata?.content ? 
            (post.metadata.content.split('\n')[0]?.replace(/^# /, '') || post.metadata.title || 'Read more about this post')
            : (post.metadata?.title || 'Read more about this post')
          }
        </p>
        
        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            {post.metadata?.author?.metadata?.avatar && (
              <img
                src={`${post.metadata.author.metadata.avatar.imgix_url}?w=60&h=60&fit=crop&auto=format,compress`}
                alt={post.metadata.author.metadata?.name || 'Author'}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span>{post.metadata?.author?.metadata?.name || 'Unknown Author'}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            {post.metadata?.location && (
              <span className="flex items-center space-x-1">
                <span>📍</span>
                <span>{post.metadata.location}</span>
              </span>
            )}
            {post.metadata?.wave_rating && (
              <span className="flex items-center space-x-1">
                <span>⭐</span>
                <span>{post.metadata.wave_rating.value?.split(' - ')[0] || post.metadata.wave_rating.value}</span>
              </span>
            )}
          </div>
        </div>
        
        {/* Read More Link */}
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-ocean-600 hover:text-ocean-700 font-medium text-sm transition-colors"
        >
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}