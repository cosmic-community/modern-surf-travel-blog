// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import { Post } from '@/types'
import Link from 'next/link'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Helper function to process markdown content
function processMarkdown(content: string): string {
  if (!content) return ''
  
  return content
    // Convert headings
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-6">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mt-12 mb-8">$1</h1>')
    
    // Convert bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    
    // Convert italic text
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Convert links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-ocean-600 hover:text-ocean-700 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Convert unordered lists
    .replace(/^\- (.*$)/gim, '<li class="mb-2">$1</li>')
    .replace(/(<li class="mb-2">.*<\/li>)/s, '<ul class="list-disc list-inside mb-6 space-y-2">$1</ul>')
    
    // Convert ordered lists  
    .replace(/^\d+\. (.*$)/gim, '<li class="mb-2">$1</li>')
    .replace(/(<li class="mb-2">.*<\/li>)/s, '<ol class="list-decimal list-inside mb-6 space-y-2">$1</ol>')
    
    // Convert line breaks to paragraphs
    .split('\n\n')
    .map(paragraph => {
      const trimmed = paragraph.trim()
      if (!trimmed) return ''
      
      // Skip if already wrapped in HTML tags
      if (trimmed.startsWith('<')) return trimmed
      
      // Replace single line breaks with <br> within paragraphs
      const withBreaks = trimmed.replace(/\n/g, '<br>')
      return `<p class="mb-6 text-gray-700 leading-relaxed">${withBreaks}</p>`
    })
    .filter(p => p)
    .join('')
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  
  try {
    const post = await getPostBySlug(slug)
    
    if (!post) {
      notFound()
    }

    // Process markdown content
    const processedContent = processMarkdown(post.metadata.content || '')

    return (
      <article className="py-16">
        <div className="container max-w-4xl">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/"
                className="text-ocean-600 hover:text-ocean-700 font-medium"
              >
                ← Back to Stories
              </Link>
            </div>
            
            {post.metadata.category && (
              <div className="mb-4">
                <Link
                  href={`/category/${post.metadata.category.slug}`}
                  className="inline-block bg-ocean-100 text-ocean-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-ocean-200 transition-colors"
                >
                  {post.metadata.category.metadata?.name || post.metadata.category.title}
                </Link>
              </div>
            )}
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {post.metadata.title}
            </h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-4">
                {post.metadata.author?.metadata.avatar && (
                  <img
                    src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.metadata.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {post.metadata.author?.metadata.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {post.metadata.location && (
                  <span className="flex items-center gap-1">
                    📍 {post.metadata.location}
                  </span>
                )}
                {post.metadata.wave_rating && (
                  <span className="flex items-center gap-1">
                    🌊 {post.metadata.wave_rating.value}
                  </span>
                )}
              </div>
            </div>
            
            {post.metadata.featured_image && (
              <div className="mb-12">
                <img
                  src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                  alt={post.metadata.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          {/* Author Bio */}
          {post.metadata.author && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex items-start gap-4">
                {post.metadata.author.metadata.avatar && (
                  <img
                    src={`${post.metadata.author.metadata.avatar.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.metadata.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {post.metadata.author.metadata.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {post.metadata.author.metadata.bio}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    {post.metadata.author.metadata.years_surfing && (
                      <span className="text-gray-500">
                        🏄‍♂️ {post.metadata.author.metadata.years_surfing} years surfing
                      </span>
                    )}
                    {post.metadata.author.metadata.instagram && (
                      <a
                        href={`https://instagram.com/${post.metadata.author.metadata.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ocean-600 hover:text-ocean-700"
                      >
                        📸 {post.metadata.author.metadata.instagram}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Back to posts */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-ocean-600 text-white font-medium rounded-lg hover:bg-ocean-700 transition-colors"
            >
              ← Back to All Stories
            </Link>
          </div>
        </div>
      </article>
    )
  } catch (error) {
    console.error('Error fetching post:', error)
    notFound()
  }
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts()
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}